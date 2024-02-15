import React from 'react'
import { sanityClient, urlFor } from '../sanity';
import Footer from '../components/Footer';
import { Post } from '../typings';
import Image from "next/image";
import Link from "next/link";

interface Props {
    posts: [Post];
  }
const blocPage = ({posts}:Props) => {
  return (
<div>
 <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 
        lg:grid-cols-3 gap-3 md:gap-6 py-20 px-4">Posts will go here</div>
        {posts.map((post)=>(
          <div>
            <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="border-[1px] border-pink-500 border-opacity-40 h-[450px] group-hover:brightness-100 duration-300 group-hover:scale-110">
            <Image
            width={300}
            height={350}
            src={urlFor(post.mainImage).url()!}
            alt="images"
            />
            </div>
            <div className="h-2/5 w-full flex flex-col justify-center">
              <div className="flex justify-between items-center px-4 py-1 border-b-[1px]
              border-b-gray-500">
                <p>{post.title}</p>
                <img 
                className="w-12 h-12 rounded-full origin object-cover"
                src={urlFor(post.author.image).url()!} 
                alt="authorImage" 
                />
              </div>
              <p className="py-2 px-4 text-base">
                {post.description.substring(0,60)}...by 
                <span className="font-semibold">
                  {post.author.name}
                </span>
                </p>
            </div>
            </Link>
            
          </div>
          ))}
        
        <Footer />

    </div>
  )
}

export default blocPage

export const getServerSideProps = async () => {
    const query = `*[_type== "post"]{
      _id,
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
  