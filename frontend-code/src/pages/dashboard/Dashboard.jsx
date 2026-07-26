import Sidebar from "../../components/dashboard/Sidebar";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import React from 'react'
import Navbar from "../../components/dashboard/Navbar";
import WelcomeSection from "../../components/dashboard/WelcomeSection";
import {
  FileText,
  FilePenLine,
  CircleCheckBig,
} from "lucide-react";

import Card from "../../components/dashboard/Card";

const Dashboard = () => {
  return (
     <div className="min-h-screen bg-black text-white">
      <Sidebar />
      <Navbar title="Dashboard" />

      <main className="md:ml-64 pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <WelcomeSection />

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
  <Card
    title="Total Contracts"
    value={142}
    subtitle="All contracts"
    icon={FileText}
  />

  <Card
    title="Draft Contracts"
    value={24}
    subtitle="Pending completion"
    icon={FilePenLine}
  />

  <Card
    title="Completed"
    value={118}
    subtitle="Ready to download"
    icon={CircleCheckBig}
  />
</section>

        </div>
      </main>
    </div>
  )
}

export default Dashboard

