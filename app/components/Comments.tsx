// 'use client'
// import React, { useState } from "react";
// import { Post, Reply} from "@/library/typings";
// import { useForm, SubmitHandler} from "react-hook-form";


// interface Props {
//   post: Post;
  
// }
// type CommentInputs = {
//   _id: string;
//   name: string;
//   email: string;
//   comment: string;
//   parentId?: string;
// };




// const CommentsForm = ({ post }: Props) => {
//   const [submitted, setSubmitted] = useState(false);
//   const [replyTo, setReplyTo] = useState<string | undefined>(undefined); 
  
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<CommentInputs>();

  
//   const onSubmit: SubmitHandler<CommentInputs> = (data) => {
//     fetch("/api/createComment", {
//       method: "POST",
//       body: JSON.stringify(data),
//     })
//       .then(() => {
//         setSubmitted(true);
//       })
//       .catch((err) => setSubmitted(false));
//   };

//   const handleReply = (parentId: string) => {
//     setReplyTo(parentId);
//   };
  
  
// return(
//     <div>
//           <hr className="max-w-lg my-5 mx-auto border[1px]" />
//         <div>
//           <p className="text-l uppercase font-titleFont font-bold">
//             Enjoyed this article?
//           </p>
//           <br />
//           <h3 className="font-titleFont text-3xl font-bold">
//             Leave a comment below
//           </h3>
//           <hr className="py-3 mt-2" />
//           {/* Form Starts here */}

//           {/* Generating Id for hooks form */}
//           <input
//             {...register("_id")}
//             type="hidden"
//             name="_id"
//             value={post._id}
//           />
//           {submitted ? (
//             <div className="flex flex-col max-w-2xl px-10 py-10 mx-auto my-10 text-white bg-green-500">
//               <h3 className="text-3xl font-bold">
//                 Your comment has been submitted!
//               </h3>
//             </div>
//           ) : (
//             <form
//               onSubmit={handleSubmit(onSubmit)}
//               className="mt-7 flex flex-col gap-6"
//             >
//               <label className="flex flex-col">
//                 <span className="font-titleFont font-semibold text-base">
//                   Name
//                 </span>
//                 <input
//                   {...register("name", { required: true })}
//                   className="text-base placeholder:text-sm border-b-[1px]
//                   py-1 px-4 outline-none focus-within:shadow-xl"
//                   type="text"
//                   placeholder="Enter Your Name"
//                 />
//               </label>
//               <label className="flex flex-col">
//                 <span className="font-titleFont font-semibold text-base">
//                   Email
//                 </span>
//                 <input
//                   {...register("email", { required: true })}
//                   className="text-base placeholder:text-sm border-b-[1px]
//                   py-1 px-4 outline-none focus-within:shadow-xl"
//                   type="text"
//                   placeholder="Enter your Email"
//                 />
//               </label>
//               <label className="flex flex-col">
//                 <span className="font-titleFont font-semibold text-base">
//                   Comment
//                 </span>
//                 <textarea
//                   {...register("comment", { required: true })}
//                   className="text-base placeholder:text-sm border-b-[1px]
//                   py-1 px-4 outline-none focus-within:shadow-xl"
//                   placeholder="Enter your Comment"
//                   rows={6}
//                 />
//                 <button
//                   className="w-full bg-pink-500 text-white text-base font-titleFont font-semibold tracking-wider uppercase py-2 rounded-sm 
//                 hover:bg-pink-600 duration-300"
//                   type="submit"
//                 >
//                   Submit
//                 </button>
//               </label>
//             </form>
             
//           )}

          
//           {/* Comments */}
//           <div className="w-full flex flex-col p-10 my-10 mx-auto shadow-bg-pink-400 shadow-lg space-y-2 ">
//             <h3 className="text-3xl font-titleFont font-semibold">Comments</h3>
//             <hr />
//             {post.comments.map((comment) => (
//               <div key={comment._id}>
//                 <p>
//                   <span className="">{comment.name} : </span> {""}
//                   {comment.comment}
//                 </p>
//                 <button
//                 onClick={() => handleReply(comment._id)}
//                 className="text-blue-500 hover:text-pink-700"
//               >
//                 Reply
//               </button>

//            {/* Display replies */}
//            {comment.replies && comment.replies.length > 0 && (
//                 <div className="ml-4">
//                   {comment.replies.map((reply: Reply) => (
//                     <div key={reply._id} className="ml-4">
//                       <p>
//                         <span className="">{reply.name} : </span> {""}
//                         {reply.comment}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
// )}
//             </div>
//             ))}

//              {/* Render reply form */}
//              {replyTo === comment._id && (
//                 <form
//                   onSubmit={handleSubmit(onSubmit)}
//                   className="mt-3 flex flex-col gap-3"
//                 >
//                   <input
//                     {...register("_id")}
//                     type="hidden"
//                     name="_id"
//                     value={post._id}
//                   />
//                   <input
//                     {...register("parentId")}
//                     type="hidden"
//                     name="parentId"
//                     value={replyTo}
//                   />
//                   <input
//                     {...register("name", { required: true })}
//                     type="text"
//                     placeholder="Your Name"
//                   />
//                   <input
//                     {...register("email", { required: true })}
//                     type="text"
//                     placeholder="Your Email"
//                   />
//                   <textarea
//                     {...register("comment", { required: true })}
//                     placeholder="Your Reply"
//                   ></textarea>
//                   <button
//                     className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//                     type="submit"
//                   >
//                     Submit Reply
//                   </button>
//                 </form>
//               )}
//           </div>
//           </div>
//     </div>
// )}

// export default CommentsForm


'use client'

import Giscus from '@giscus/react';

export default function CommentForm() {
  return (
    <Giscus
      id="comments"
      repo="madinkum/next.js-sanity-blog"
      repoId="R_kgDOK2zaCg"
      category="Q&A"
      categoryId="DIC_kwDOK2zaCs4Cc1bV"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="dark"
      lang="en"
      loading="lazy"
    />
  );
}