import { Search, FileText } from "lucide-react";

const contracts = [
  {
    id: 1,
    contractName: "Acme Corp - Q4 Services",
    client: "Acme Corp",
  },
  {
    id: 2,
    contractName: "Globex NDA 2024",
    client: "Globex Inc.",
  },
  {
    id: 3,
    contractName: "Soylent Corp Retainer",
    client: "Soylent Corp",
  },
];

const RecentContracts = () => {
  return (
    <section className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 p-4">
        <h3 className="text-xl font-medium text-white">
          Recent Contracts
        </h3>

        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
          />

          <input
            type="text"
            placeholder="Search contracts..."
            className="w-64 rounded-lg border border-neutral-700 bg-neutral-800 py-2 pl-10 pr-4 text-sm text-white placeholder:text-neutral-500 focus:border-white focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="px-4 py-4 text-xs uppercase tracking-widest text-neutral-400">
                Contract Name
              </th>

              <th className="px-4 py-4 text-xs uppercase tracking-widest text-neutral-400">
                Client
              </th>
            </tr>
          </thead>

          <tbody>
            {contracts.map((contract) => (
              <tr
                key={contract.id}
                className="border-b border-neutral-800 hover:bg-neutral-800/50 transition-colors"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded border border-neutral-700 bg-neutral-800">
                      <FileText size={16} className="text-white" />
                    </div>

                    <span className="font-medium text-white">
                      {contract.contractName}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-4 text-neutral-400">
                  {contract.client}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentContracts;