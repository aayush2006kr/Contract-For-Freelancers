import { FileText, LayoutDashboard, Plus } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const navClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
    isActive
      ? "border-l-4 border-white bg-white/10 text-white"
      : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
  }`;

const Sidebar = () => (
  <aside className="fixed left-0 top-0 z-20 hidden h-screen w-64 flex-col border-r border-neutral-800 bg-neutral-900 py-4 md:flex">
    <div className="mb-8 mt-3 px-6">
      <Link to="/" className="text-xl font-bold tracking-tight text-white">Contractify</Link>
      <p className="mt-2 font-mono text-xs font-medium uppercase tracking-widest text-neutral-400">Freelancer Pro</p>
    </div>

    <nav className="flex-1 space-y-1 px-3" aria-label="Main navigation">
      <NavLink to="/dashboard" end className={navClass}>
        <LayoutDashboard size={20} /><span className="text-sm font-medium">Dashboard</span>
      </NavLink>
      <NavLink to="/dashboard#contracts" className={navClass}>
        <FileText size={20} /><span className="text-sm font-medium">Contracts</span>
      </NavLink>
    </nav>

    <div className="mt-auto space-y-4 px-3">
      <Link to="/contracts/new" className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-3 text-sm font-medium text-black transition-opacity hover:opacity-90">
        <Plus size={18} /><span>Create Contract</span>
      </Link>
      <div className="flex justify-between px-2 text-xs text-neutral-500">
        <Link to="/" className="hover:text-white">Home</Link>
        <Link to="/login" className="hover:text-white">Login</Link>
        <Link to="/register" className="hover:text-white">Sign up</Link>
      </div>
    </div>
  </aside>
);

export default Sidebar;
