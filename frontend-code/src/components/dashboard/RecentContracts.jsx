import { useMemo, useState } from "react";
import { FileText, Search } from "lucide-react";

const RecentContracts = ({ contracts = [], loading, error, onRetry }) => {
  const [search, setSearch] = useState("");
  const visibleContracts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return [...contracts]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .filter((contract) => [
        contract.projectDetails?.title,
        contract.clientDetails?.name,
        contract.clientDetails?.company,
        contract.templateType,
      ].some((value) => value?.toLowerCase().includes(query)));
  }, [contracts, search]);

  return (
    <section id="contracts" className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
      <div className="flex flex-col justify-between gap-4 border-b border-neutral-800 p-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-xl font-medium text-white">Recent Contracts</h3>
          <p className="mt-1 text-sm text-neutral-500">Your latest saved agreements</p>
        </div>
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search contracts..."
            aria-label="Search contracts"
            className="w-64 max-w-[80vw] rounded-lg border border-neutral-700 bg-neutral-800 py-2 pl-10 pr-4 text-sm text-white placeholder:text-neutral-500 focus:border-white focus:outline-none"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left">
          <thead>
            <tr className="border-b border-neutral-800">
              {["Contract", "Client", "Type", "Status", "Created"].map((heading) => (
                <th key={heading} className="px-4 py-4 text-xs uppercase tracking-widest text-neutral-400">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="px-4 py-10 text-center text-neutral-400">Loading your contracts…</td></tr>
            ) : error ? (
              <tr><td colSpan="5" className="px-4 py-10 text-center text-red-300">
                <p>{error}</p>
                <button type="button" onClick={onRetry} className="mt-3 rounded-lg border border-neutral-700 px-4 py-2 text-sm text-white hover:bg-neutral-800">Try again</button>
              </td></tr>
            ) : visibleContracts.length === 0 ? (
              <tr><td colSpan="5" className="px-4 py-10 text-center text-neutral-400">
                {contracts.length === 0 ? "You haven’t created any contracts yet." : "No contracts match your search."}
              </td></tr>
            ) : visibleContracts.map((contract) => (
              <tr key={contract._id} className="border-b border-neutral-800 transition-colors hover:bg-neutral-800/50">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded border border-neutral-700 bg-neutral-800"><FileText size={16} className="text-white" /></div>
                    <div>
                      <span className="font-medium text-white">{contract.projectDetails?.title || "Untitled contract"}</span>
                      <p className="mt-1 text-xs text-neutral-500">{contract._id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-neutral-400">{contract.clientDetails?.company || contract.clientDetails?.name || "—"}</td>
                <td className="px-4 py-4 text-neutral-400">{contract.templateType || "—"}</td>
                <td className="px-4 py-4"><span className="rounded-full border border-neutral-700 px-2.5 py-1 text-xs text-neutral-200">{contract.status || "—"}</span></td>
                <td className="px-4 py-4 text-neutral-400">{contract.createdAt ? new Date(contract.createdAt).toLocaleDateString() : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentContracts;
