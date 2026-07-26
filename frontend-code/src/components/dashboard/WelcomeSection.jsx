import { useContext } from "react";
import { Plus } from "lucide-react";
import AuthContext from "../../context/AuthContext";

const WelcomeSection = () => {
  const { user } = useContext(AuthContext);

  return (
    <section className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
      <div>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-2">
          Welcome back, {user?.name}
        </h1>

        <p className="text-neutral-400 text-base">
          Manage all your contracts from one centralized hub.
        </p>
      </div>

      <button className="flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
        <Plus size={18} />
        Create Contract
      </button>
    </section>
  );
};

export default WelcomeSection;