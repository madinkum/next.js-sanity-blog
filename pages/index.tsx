import Head from "next/head";
import "slick-carousel/slick/slick.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { sanityClient, urlFor } from '../sanity';
import { Post } from "../typings";
import Image from "next/image";
import Link from "next/link";

import { title } from "process";
import SubscriptionForm from "../components/SubscriptionForm";

interface Props {
  posts: [Post];
}
export default function Home({ posts }: Props) {
  console.log(posts);
  return (
    <div>
      <main className="font-bodyFont">
        <Header />
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text--900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
          Madinku Mabala
        </h1>
        <div>
          <br />
          <p className="md:text-l">
            {" "}
            Hi, Welcome to my blog. As an individual you have plans, goals and
            desires that you one day wish to archive. Learning programming was
            certainly not one of them for me. I am surrounded by computer
            scientists, network administrators and IT technicians and this is
            where I drew my inspiration from. I am a self taught web developer.
            I have had countless sleepless nights figuring out and learning
            coding on my own. I have learned so much discipline ever since I
            have started coding and and my skills have improved for the better.
          </p>
          <br />
          <p className="md:text-l">
            I have build a few websites using different programming languages
            and I will share what I know about coding as I learn more different
            languages.
          </p>
        </div>
        <br />
        <br />

        <div className="max-w-7xl mx-auto h-60 relative"></div>
        {/* <SubscriptionForm /> */}
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
      </main>
    </div>
  );
}


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
  