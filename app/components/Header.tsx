import Link from "next/link";
import ThemeButton from "./ThemeButton";


const Header = () => {
 
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
     
     <div className="flex justify-between h-16">
        <div className="flex justify-between items-center w-full">
          <Link href={"/"} shallow>
            <h1 className="text-2xl font-medium">
              Tech <span className="text-pink-600">Blog</span>
            </h1>
          </Link>
          <Link href={"/"} shallow className="text-2xl font-medium">Home</Link>

          <Link href={"/blog"} shallow className="text-2xl font-medium">Blog</Link>
          <ThemeButton />
        </div>
      </div>          
    </div>
  );
};

export default Header;
