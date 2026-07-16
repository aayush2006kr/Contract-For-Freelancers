import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-xl">
        
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 md:px-12">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-white"
        >
          Contractify
        </Link>

        {/* Navigation Links */}
        <div className="hidden space-x-6 text-sm text-neutral-400 md:flex">
          <a
            href="#features"
            className="cursor-pointer transition-colors duration-200 hover:text-white active:opacity-80"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="cursor-pointer transition-colors duration-200 hover:text-white active:opacity-80"
          >
            How It Works
          </a>

         
        </div>

        

        {/* Login Button */}
        <Link
          to="/login"
          className="rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition-colors duration-200 hover:bg-neutral-200 active:opacity-80"
        >
          Login
        </Link>

        </div>
    </nav>
  )
}

export default Navbar