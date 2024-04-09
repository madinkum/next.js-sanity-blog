"use client";
import React, { useState } from "react";
import { Post } from "@/library/typings";
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
  post: Post;
}

type CommentInputs = {
  _id: string;
  name: string;
  email: string;
  comment: string;
  parentId?: string;
};

const CommentsForm = ({ post }: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentInputs>();

  const handleReply = (parentId: string) => {
    setShowCommentForm(true);
    setReplyingTo(parentId);
  };

  const onSubmit: SubmitHandler<CommentInputs> = (data) => {
    // Include parentId if replying to a comment
    if (replyingTo) {
      data.parentId = replyingTo;
    }

    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        setSubmitted(true);
        // Reset reply state after submission
        setReplyingTo(null);
      })
      .catch((err) => setSubmitted(false));
  };

  return (
    <div>
      <hr className="max-w-lg my-5 mx-auto border[1px]" />
      <div>
        <p className="text-l uppercase font-titleFont font-bold">
          Enjoyed this article?
        </p>
        <br />
        <h3 className="font-titleFont text-3xl font-bold">
          Leave a comment below
        </h3>
        <hr className="py-3 mt-2" />

        <input {...register("_id")} type="hidden" name="_id" value={post._id} />
        {submitted ? (
          <div className="flex flex-col max-w-2xl px-10 py-10 mx-auto my-10 text-white bg-green-500">
            <h3 className="text-3xl font-bold">
              Your comment has been submitted!
            </h3>
          </div>
        ) : (
          showCommentForm && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-7 flex flex-col gap-6"
            >
              <label className="flex flex-col">
                <span className="font-titleFont font-semibold text-base">
                  Name
                </span>
                <input
                  {...register("name", { required: true })}
                  className="text-base placeholder:text-sm border-b-[1px]
                  py-1 px-4 outline-none focus-within:shadow-xl"
                  type="text"
                  placeholder="Enter Your Name"
                />
              </label>
              <label className="flex flex-col">
                <span className="font-titleFont font-semibold text-base">
                  Email
                </span>
                <input
                  {...register("email", { required: true })}
                  className="text-base placeholder:text-sm border-b-[1px]
                  py-1 px-4 outline-none focus-within:shadow-xl"
                  type="text"
                  placeholder="Enter your Email"
                />
              </label>
              <label className="flex flex-col">
                <span className="font-titleFont font-semibold text-base">
                  Comment
                </span>
                <textarea
                  {...register("comment", { required: true })}
                  className="text-base placeholder:text-sm border-b-[1px]
                  py-1 px-4 outline-none focus-within:shadow-xl"
                  placeholder="Enter your Comment"
                  rows={6}
                />
                <button
                  className="w-full bg-pink-500 text-white text-base font-titleFont font-semibold tracking-wider uppercase py-2 rounded-sm 
                hover:bg-pink-600 duration-300"
                  type="submit"
                >
                  Submit
                </button>
              </label>
            </form>
          )
        )}

        <div className="w-full flex flex-col p-10 my-10 mx-auto shadow-bg-pink-400 shadow-lg space-y-2 ">
          <h3 className="text-3xl font-titleFont font-semibold">Comments</h3>
          <hr />
          <div >
          {post.comments.map((comment) => (
            
            <div className="border-l-4 border-gray-300 pl-4 mb-2" key={comment._id}>
              <p>
                <span className="">{comment.name}:</span> {comment.comment}
              </p>
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-4">
                  {comment.replies.map((reply) => (
                    <div key={reply._id} className="ml-4">
                      <p>
                        <span className="font-semibold">{reply.name}:</span>{" "}
                        {reply.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <button
                className="text-sm text-gray-500 hover:text-gray-800"
                onClick={() => handleReply(comment._id)}
              >
                Reply
              </button>
             
            </div>
          ))}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CommentsForm;
