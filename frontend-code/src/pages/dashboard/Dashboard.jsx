import { useCallback, useEffect, useState } from "react";
import { Archive, CircleCheckBig, FilePenLine, FileText } from "lucide-react";
import Card from "../../components/dashboard/Card";
import Navbar from "../../components/dashboard/Navbar";
import RecentContracts from "../../components/dashboard/RecentContracts";
import Sidebar from "../../components/dashboard/Sidebar";
import WelcomeSection from "../../components/dashboard/WelcomeSection";
import { getAllContracts } from "../../api/contractApi";

const Dashboard = () => {
  const [contracts, setContracts] = useState([]);
  const [loadingContracts, setLoadingContracts] = useState(true);
  const [contractsError, setContractsError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const fetchContracts = useCallback(async () => {
    try {
      const response = await getAllContracts();
      setContracts(Array.isArray(response.data?.contracts) ? response.data.contracts : []);
    } catch (error) {
      setContractsError(error.response?.data?.message || "We couldn’t load your contracts. Check your connection and try again.");
    } finally {
      setLoadingContracts(false);
    }
  }, []);

  useEffect(() => {
    const request = window.setTimeout(() => fetchContracts(), 0);
    return () => window.clearTimeout(request);
  }, [fetchContracts, reloadKey]);

  const retryContracts = () => {
    setLoadingContracts(true);
    setContractsError("");
    setReloadKey((key) => key + 1);
  };

  const statusCount = (status) => contracts.filter((contract) => contract.status === status).length;

  return (
    <div className="min-h-screen bg-black text-white">
      <Sidebar />
      <Navbar title="Dashboard" />
      <main className="pt-16 md:ml-64">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <WelcomeSection />

          <section aria-label="Contract summary" className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <Card title="Total Contracts" value={loadingContracts || contractsError ? "—" : contracts.length} subtitle="All saved contracts" icon={FileText} />
            <Card title="Draft" value={loadingContracts || contractsError ? "—" : statusCount("Draft")} subtitle="Saved as drafts" icon={FilePenLine} />
            <Card title="Final" value={loadingContracts || contractsError ? "—" : statusCount("Final")} subtitle="Final contracts" icon={CircleCheckBig} />
            <Card title="Archived" value={loadingContracts || contractsError ? "—" : statusCount("Archived")} subtitle="Archived contracts" icon={Archive} />
          </section>

          <RecentContracts
            contracts={contracts}
            loading={loadingContracts}
            error={contractsError}
            onRetry={retryContracts}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
