"use client";

import Head from "next/head";
import { createClient } from "@supabase/supabase-js";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { userAgent } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseKey);

interface CommentParams {
  id: string;
  created_at: string;
  updated_at: string;
  username: string;
  payload: string;
  reply_of?: string;
}

interface EditCommentParams {
  id: string;
  payload: string;
}

const addCommentRequest = (url: string, data: any) =>
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());

const editCommentRequest = (url: string, data: any) =>
  fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());

const deleteCommentRequest = (url: string, id: string) =>
  fetch(`${url}?comment_id=${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );

const fetcher = (url: string) =>
  fetch(url, { method: "GET" }).then((res) => res.json());

const SupabaseComments = () => {
  const [comment, setComment] = useState<string>("");
  const [username, setUserName] = useState('');

  
  const { data: commentList, error: commentListError } = useSWR<
    CommentParams[]
  >("/api/comments", fetcher);
  const [replyOf, setReplyOf] = useState<string | null>(null);
  const [editComment, setEditComment] = useState<EditCommentParams>({
    id: "",
    payload: "",
  });

  const onChangeEditComment = (event: ChangeEvent<HTMLInputElement>) => {
    const payload = event.target.value;
    setEditComment({ ...editComment, payload });
  };

  const confirmEdit = async () => {
    const editData = {
      payload: editComment.payload,
      commentId: editComment.id,
    };
    if (typeof commentList !== "undefined") {
      mutate(
        "api/comments",
        commentList.map((comment) => {
          if (comment.id === editData.commentId) {
            return { ...comment, payload: editData.payload };
          }
        }),
        false
      );
      const response = await editCommentRequest("api/comments", editData);
      console.log(response);
      if (response[0].created_at) {
        mutate("api/comments");
        window.alert("Hooray!");
        setEditComment({ id: "", payload: "" });
      }
    }
  };

  const confirmDelete = async (id: string) => {
    const ok = window.confirm("Delete comment?");
    if (ok && typeof commentList !== "undefined") {
      mutate(
        "api/comments",
        commentList.filter((comment) => comment.id !== id),
        false
      );
      const response = await deleteCommentRequest("api/comments", id);
      if (response[0].created_at) {
        mutate("api/comments");
        window.alert("Deleted Comment :)");
      }
    }
  };


  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const commentValue = event.target.value;
    setComment(commentValue);

  };

  

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newComment = {
      username: username,
      payload: comment,
      reply_of: replyOf,
    };
    if (typeof commentList !== "undefined") {
      mutate("api/comments", [...commentList, newComment], false);
      const response = await addCommentRequest("api/comments", newComment);
      if (response[0].created_at) {
        mutate("api/comments");
        window.alert("Hooray!");
        setComment("");
      }
    }
  };

  return (
    <div>
      <Head>
        <title>Comments Page</title>
      </Head>
      <div className="pt-36 flex justify-center">
        <div className="min-w-[600px]">
          <h1 className="text-4xl font-bold ">Comments</h1>
          <form onSubmit={onSubmit} className="mt-8 flex gap-8">
            <div className="w-full">
              {replyOf && (
                <div className="flex gap-4 my-2 items-center justify-start">
                  <p className="text-xs font-extralight italic text-gray-600">
                    Reply of:{" "}
                    {commentList?.find((comment) => comment.id === replyOf)
                      ?.payload ?? ""}
                  </p>
                  <button
                    onClick={() => setReplyOf(null)}
                    className="text-xs font-light text-red-600"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
            <input 
            onChange={(e)=>setUserName(e.target.value)}
            type="text" 
            value={username}
            placeholder="Username"
            className="p-2 border-b focus:border-b-gray-700 w-full outline-none"
            />
            <input
              onChange={onChange}
              value={comment}
              type="text"
              placeholder="Add a comment"
              className="p-2 border-b focus:border-b-gray-700 w-full outline-none"
            />
            <button className="px-4 py-2 bg-green-500 rounded-lg text-white">
              Submit
            </button>
          </form>
          <div className="flex flex-col gap-4 pt-12">
            {(commentList ?? [])
              .sort((a: any, b: any) => {
                const aDate = new Date(a.created_at);
                const bDate = new Date(b.created_at);
                return +aDate - +bDate;
              })
              .map((comment) => (
                <div key={comment.id} className="border rounded-md p-4">
                  {comment.reply_of && (
                    <p className="font-extralight italic text-gray-600 text-xs">
                      Reply of:{" "}
                      {commentList?.find((c: any) => c.id === comment.reply_of)
                        ?.payload ?? ""}
                    </p>
                  )}
                  <p className="font-semibold mb-2">
                    {comment.username}
                    {comment.updated_at !== comment.created_at && (
                      <span className="ml-4 text-sm italic font-extralight">
                        edited
                      </span>
                    )}
                  </p>

                  <div className="flex items-center gap-2 justify-between">
                    {comment.id === editComment.id ? (
                      <input
                        type="text"
                        value={editComment.payload}
                        onChange={onChangeEditComment}
                        className="pb-1 border-b w-full"
                      />
                    ) : (
                      <p className="font-light">{comment.payload}</p>
                    )}

                    <div className="flex gap-2">
                      {editComment.id === comment.id ? (
                        <>
                          <button
                            type="button"
                            onClick={confirmEdit}
                            disabled={editComment.payload === comment.payload}
                            className="text-green-500"
                          >
                            Confirm
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setEditComment({ id: "", payload: "" })
                            }
                            className="text-gray-500"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              setEditComment({
                                id: comment.id,
                                payload: comment.payload,
                              })
                            }
                            className="text-green-500"
                            title="Edit comment"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                              />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => confirmDelete(comment.id)}
                            className="text-gray-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => setReplyOf(comment.id)}
                            className="text-orange-500"
                          >
                            Reply
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupabaseComments;
