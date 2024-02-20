import React from "react";
import { sanityClient} from "@/sanity";
import { Post } from "@/typings";
import Link from "next/link";


interface Props {
  posts: [Post];
}
const blockPage = ({ posts }: Props) => {
  return (
    <div>
      
      <div className="font-bodyFont max-w-3xl mx-auto mb-10 divide-gray-200 dark:divide-gray-700  border-b-[1px] space-y-2" >
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900  sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
            ALL BLOG POSTS
          </h1>
        </div>
        {posts.map((post) => (
          <div>
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className="h-2/5 w-full flex flex-col justify-center">
                <div
                  className=" px-4 [py-1] border-b-gray-500"
                >
                  <p className="text-base font-medium leading-6 text-pink-500">
                    {new Date(post.publishedAt).toISOString().split("T")[0]}
                  </p>
                  <div>
                    <h2 className="text-2xl font-bold">{post.title}</h2>
                  </div>
                </div>
                <p className="py-2 px-4 text-base">
                  {post.description.substring(0, 200)}: by
                  <span className="font-semibold">
                    {""} {post.author.name}
                  </span>
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default blockPage;

export const getServerSideProps = async () => {
  const query = `*[_type== "post"]|order(publishedAt desc){
      _id,
      publishedAt,
      title,
      slug,
        author->{
          name,
          image
        },
        description,
        mainImage,
        slug
      }`;
  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts,
    },
  };
};
