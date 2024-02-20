import Link from "next/link";

import { useSession, signIn, signOut } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  return (
    <div className="w-full h-20 border-b-[1px] border-b-black font-titleFont sticky top-0 bg-white z-50 px-4">
      <div className="max-w-7xl h-full mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-medium">
            Tech <span className="text-pink-600">Blog</span>
          </h1>
        </Link>
        <Link href={"/"} shallow className="text-2xl font-medium">
          Home
        </Link>
         
        <Link href={"/blog"} shallow className="text-2xl font-medium">
          Blog
        </Link>
        
        <div className="flex items-center text-lg">
          {/* <div className="flex items-center ">
            <p className="text-m font-medium">
              {session ? session?.user!.name : "Hello Stranger"}
            </p>
          </div> */}

          {session ? (
            <button
              onClick={() => signOut()}
              className="uppercase text-sm border-[1px]  hover:border-pink-400 px-4 py-1 font-semibold hover:text-white rounded-md hover:bg-secondaryColor transition-all duration-300 active:bg-yellow-600"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className="uppercase text-sm border-[1px] hover:border-pink-400 px-4 py-1 font-semibold hover:text-white rounded-md hover:bg-secondaryColor transition-all duration-300 active:bg-yellow-600"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
