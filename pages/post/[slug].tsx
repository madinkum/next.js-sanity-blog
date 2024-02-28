import React, { useState } from "react";
const BlockContent = require("@sanity/block-content-to-react");
import SyntaxHighlighter from "react-syntax-highlighter";
import { sanityClient} from "../../sanity";
import type { Post } from "../../typings";
import { GetStaticProps } from "next";

import { useForm, SubmitHandler } from "react-hook-form";


interface Props {
  post: Post;
}
type Inputs = {
  _id: string;
  name: string;
  email: string;
  comment: string;
};

const Post = ({ post }: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        setSubmitted(true);
      })
      .catch((err) => setSubmitted(false));
  };

  const serializers = {
    types: {
      code: (props: any) => (
        <div className="my-2">
          <SyntaxHighlighter language={props.node.language}>
            {props.node.code}
          </SyntaxHighlighter>
        </div>
      ),
      h1: (props: any) => (
        <h1 className="my-5 text-2xl font-bold" {...props} />
      ),
      h2: (props: any) => (
        <h2 className="my-5 text-xl font-bold" {...props} />
      ),
      h3: (props: any) => (
        <h3 className="my-5 text-l font-bold" {...props} />
      ),
      li: ({ children }: any) => (
        <li className="ml-4 list-disc"> {children}</li>
      ),
      link: ({ href, children }: any) => (
        <a href={href} className="text-blue-500 hover:underline">
          {children}
        </a>
      ),

    },
    
  };

  return (
    <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
      <div className="max-w-3xl mx-auto mb-10">
        <article className="w-full max-auto p-5">
          <h1 className="text-3xl font-extrabold text-gray-900 ">
            {post.title}
          </h1>

          <h2 className="text-[18px]">{post.description}</h2>
          <div>
           
            <p >
              Blog post by {""} <span>{post.author.name}</span>- Published at{" "}
              {new Date(post.publishedAt).toISOString().split("T")[0]}
            </p>
          </div>
          <div className="divide-y divide-gray-200 pb-7 dark:divide-gray-700 xl:divide-y-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">

            <div  className="prose max-w-none pb-8 pt-10  prose-lg">
            
            <BlockContent 
              blocks={post.body}
              projectId="dbfhkj94"
              dataset="production"
              serializers={serializers}
            />
          </div>
            </div>
          </div>
          
        </article>
        <hr className="max-w-lg my-5 mx-auto border[1px]" />
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
    </div>
  );
};

export default Post;
export const getStaticPaths = async () => {
  const query = `*[_type=="post"]{
        _id,
        slug{
            current
        }
    }`;
  const posts = await sanityClient.fetch(query);
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        publishedAt,
        title,
        author->{
            name,
            image,
        },
        "comments":*[_type=="comment" && post._ref == ^._id && approved == true],
        description,
        mainImage,
        slug,
        body,
    }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
