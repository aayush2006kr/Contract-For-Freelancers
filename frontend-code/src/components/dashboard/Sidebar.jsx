import {
  LayoutDashboard,
  FileText,
  User,
  Settings,
  LogOut,
  Plus,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="hidden md:flex h-screen w-64 fixed left-0 top-0 bg-neutral-900 border-r border-neutral-800 flex-col py-4 z-20">
      {/* Logo */}
      <div className="px-6 mb-8 mt-3">
        <h1 className="text-xl font-bold text-white tracking-tight">
          Contractify
        </h1>

        <p className="font-mono text-xs font-medium text-neutral-400 mt-2 tracking-widest uppercase">
          Freelancer Pro
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 text-white bg-white/10 border-l-4 border-white rounded-r-lg"
        >
          <LayoutDashboard size={20} />

          <span className="text-sm font-medium">Dashboard</span>
        </a>

        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
        >
          <FileText size={20} />

          <span>Contracts</span>
        </a>

        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
        >
          <User size={20} />

          <span>Profile</span>
        </a>

        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
        >
          <Settings size={20} />

          <span>Settings</span>
        </a>
      </nav>

      {/* Bottom Section */}
      <div className="px-3 mt-auto space-y-4">
        <button className="w-full flex items-center justify-center gap-2 bg-white text-black py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus size={18} />

          <span>Create Contract</span>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-red-400 transition-colors">
          <LogOut size={20} />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;