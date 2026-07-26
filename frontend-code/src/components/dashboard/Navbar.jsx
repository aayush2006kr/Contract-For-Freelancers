import { Menu } from "lucide-react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="fixed top-0 right-0 md:left-64 h-16 bg-black/80 backdrop-blur-xl border-b border-neutral-800 flex items-center justify-between px-6 z-10">

      {/* Left */}
      <div className="flex items-center gap-4">
        <button className="md:hidden text-neutral-400 hover:text-white">
          <Menu size={22} />
        </button>

        <h2 className="text-xl font-semibold text-white">
          Dashboard
        </h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        <div className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center font-semibold">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

      </div>

    </header>
  );
};

export default Navbar;