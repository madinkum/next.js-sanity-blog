'use client'
import React, { useState } from 'react'
import { Post } from '@/library/interface'
import { useForm, SubmitHandler } from "react-hook-form"


export interface Props {
    post: Post;
  }

  interface Inputs {
    _id: string;
    name: string;
    email: string;
    comment: string;
  };

const CommentsForm = ({post}:Props) => {
    const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
console.log(post);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await fetch("/api/comments", {
          method: "POST",
         
          body: JSON.stringify(data),
      });

      setSubmitted(true);
  } catch (err) {
      console.error("Error submitting comment:", err);
      setSubmitted(false);
  }
};
  return (
    <div>
        <div>
          <p className="text-xs uppercase font-titleFont font-bold">
            Enjoyed this article?
          </p>
      <h3 className="font-titleFont text-3xl font-bold">
            Leave a comment below
          </h3>
          <hr className="py-3 mt-2" />
          {/* Form Starts here */}

          {/* Generating Id for hooks form */}
          <input
            {...register("_id")}
            type="hidden"
            name="_id"
            value={post._id}
          />
          { submitted? (
            <div className="flex flex-col max-w-2xl px-10 py-10 mx-auto my-10 text-white bg-green-500">
            <h3 className="text-3xl font-bold">
              Your comment has been submitted!
            </h3>
            <p> Once it has been approved, it will appear below</p>
          </div>

          ):(
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
          )}
          {/* Comments */}
          <div className="w-full flex flex-col p-10 my-10 mx-auto shadow-bg-pink-400 shadow-lg space-y-2 ">
            <h3 className="text-3xl font-titleFont font-semibold">Comments</h3>
            <hr />
            {post.comments.map((comment) => (
              <div key={comment._id}>
                <p>
                  <span className="">{comment.name} : </span> {""}
                  {comment.comment}
                </p>
              </div>
            ))}
          </div>
          
    </div>
    </div>
  )
}

export default CommentsForm
