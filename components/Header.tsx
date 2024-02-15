
import Link from "next/link";
import ThemeButton from "./ThemeButton";


const Header = () => {
  return (
    <div className="w-full h-20 border-b-[1px] border-b-black font-titleFont sticky top-0 bg-white z-50 px-4">
      <div className="max-w-7xl h-full mx-auto flex justify-between items-center">
        <Link href="/">
        <h1 className="text-2xl font-medium">
              Tech <span className="text-pink-600">Blog</span>
            </h1>
        </Link>
        <div>
          
      <div className="hidden lg:inline-flex gap-8 uppercase text-sm font-semibold">
        
          <Link href={"/"} shallow className="text-l font-medium">Home</Link>

          <Link href={"/blog"} shallow className="text-l font-medium">Blog</Link>
          <ThemeButton />
        
        </div>
    
        </div>
        <div className="flex items-center gap-8 text-lg">
          <div className="flex items-center gap-1">
            <img
              className="w-8 h-8 rounded-full"
              src="https://www.noormohammad.live/static/media/roundedProfile.477a194221d255c8ce26.png"
              alt="logo"
            />
            <p className="text-sm font-medium">Hello Stranger!</p>
          </div>

          <button className="uppercase text-sm border-[1px] border-primaryColor hover:border-secondaryColor px-4 py-1 font-semibold hover:text-white rounded-md hover:bg-secondaryColor transition-all duration-300 active:bg-yellow-600">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
