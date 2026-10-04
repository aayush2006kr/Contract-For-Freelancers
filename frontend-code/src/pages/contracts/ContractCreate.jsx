import { useState } from "react";
import { ArrowLeft, Download, Eye, Plus, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/Sidebar";
import {
  createContract,
  downloadContract,
  previewContract,
} from "../../api/contractApi";

const initialForm = {
  templateType: "Web Development",
  freelancerDetails: { name: "", email: "", phone: "", address: "" },
  clientDetails: { name: "", email: "", company: "", address: "" },
  projectDetails: {
    title: "",
    description: "",
    deliverables: [""],
    startDate: "",
    endDate: "",
  },
  paymentDetails: {
    totalAmount: "",
    currency: "INR",
    advancePayment: "0",
    dueDate: "",
    lateFee: "0",
  },
  terms: {
    revisions: "2",
    ownershipTransfer: true,
    cancellation: "Either party may terminate the agreement with written notice.",
    confidentiality: true,
  },
};

const inputClass = "mt-2 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:border-white focus:outline-none";
const labelClass = "block text-sm font-medium text-neutral-300";

function Field({ label, name, value, onChange, type = "text", required = false, ...props }) {
  return (
    <label className={labelClass}>
      {label}
      <input className={inputClass} name={name} type={type} value={value} onChange={onChange} required={required} {...props} />
    </label>
  );
}

function Section({ number, title, children }) {
  return (
    <section className="rounded-xl border border-neutral-800 bg-neutral-900 p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-700 text-sm text-neutral-300">{number}</span>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>
      {children}
    </section>
  );
}

const ContractCreate = () => {
  const [form, setForm] = useState(initialForm);
  const [contractId, setContractId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [pdfAction, setPdfAction] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const updateSection = (section, name, value) => {
    setForm((current) => ({
      ...current,
      [section]: { ...current[section], [name]: value },
    }));
  };

  const handleChange = (section) => (event) => {
    updateSection(section, event.target.name, event.target.value);
    setError("");
  };

  const handleDeliverableChange = (index, value) => {
    setForm((current) => {
      const deliverables = [...current.projectDetails.deliverables];
      deliverables[index] = value;
      return { ...current, projectDetails: { ...current.projectDetails, deliverables } };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const deliverables = form.projectDetails.deliverables.map((item) => item.trim()).filter(Boolean);
    if (deliverables.length === 0) {
      setError("Add at least one deliverable before creating the contract.");
      return;
    }
    if (new Date(form.projectDetails.endDate) < new Date(form.projectDetails.startDate)) {
      setError("The project end date must be after the start date.");
      return;
    }
    const totalAmount = Number(form.paymentDetails.totalAmount);
    const advancePayment = Number(form.paymentDetails.advancePayment || 0);
    if (totalAmount < 0 || advancePayment < 0 || advancePayment > totalAmount) {
      setError("Enter valid payment amounts. The advance cannot exceed the total.");
      return;
    }

    const payload = {
      ...form,
      projectDetails: { ...form.projectDetails, deliverables },
      paymentDetails: {
        ...form.paymentDetails,
        totalAmount,
        advancePayment,
        lateFee: Number(form.paymentDetails.lateFee || 0),
      },
      terms: { ...form.terms, revisions: Number(form.terms.revisions) },
    };

    setSubmitting(true);
    try {
      const response = await createContract(payload);
      const savedId = response.data?.contract?._id;
      if (!savedId) throw new Error("The server did not return a contract ID.");
      setContractId(savedId);
      setSuccess("Contract saved. You can now preview or download its PDF.");
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || "Could not create the contract. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const runPdfAction = async (action) => {
    setError("");
    setPdfAction(action);
    let previewWindow;
    if (action === "preview") {
      previewWindow = window.open("about:blank", "_blank");
      if (!previewWindow) {
        setError("Allow pop-ups to open the contract preview.");
        setPdfAction("");
        return;
      }
      previewWindow.opener = null;
      previewWindow.document.title = "Preparing contract preview…";
      previewWindow.document.body.innerHTML = "<p style='font-family: sans-serif; padding: 2rem'>Preparing your contract preview…</p>";
    }

    try {
      const response = action === "preview"
        ? await previewContract(contractId)
        : await downloadContract(contractId);
      const pdfUrl = URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
      if (action === "preview") {
        previewWindow.location.replace(pdfUrl);
      } else {
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = `contract-${contractId}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
      window.setTimeout(() => URL.revokeObjectURL(pdfUrl), 60_000);
    } catch (requestError) {
      previewWindow?.close();
      setError(requestError.response?.data?.message || "Could not retrieve the PDF. Please try again.");
    } finally {
      setPdfAction("");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Sidebar />
      <Navbar title="Create Contract" />
      <main className="px-4 pb-12 pt-20 sm:px-6 md:ml-64">
        <div className="mx-auto max-w-4xl">
          <Link to="/dashboard" className="mb-5 inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white">
            <ArrowLeft size={16} /> Back to dashboard
          </Link>
          <div className="mb-8">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">Contract workspace</p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Create a contract</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-400">Add the details of your agreement. Once saved, you can review the PDF or download a copy.</p>
          </div>

          {error && <div role="alert" className="mb-5 rounded-lg border border-red-900 bg-red-950/50 px-4 py-3 text-sm text-red-200">{error}</div>}
          {success && <div role="status" className="mb-5 rounded-lg border border-emerald-900 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-200">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Section number="1" title="Contract type">
              <label className={labelClass}>Template type
                <select className={inputClass} value={form.templateType} onChange={(event) => setForm((current) => ({ ...current, templateType: event.target.value }))}>
                  {["Web Development", "Graphic Design", "Content Writing", "Digital Marketing", "Consulting"].map((type) => <option key={type}>{type}</option>)}
                </select>
              </label>
            </Section>

            <Section number="2" title="Freelancer details">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" name="name" value={form.freelancerDetails.name} onChange={handleChange("freelancerDetails")} required autoComplete="name" />
                <Field label="Email address" name="email" type="email" value={form.freelancerDetails.email} onChange={handleChange("freelancerDetails")} required autoComplete="email" />
                <Field label="Phone" name="phone" type="tel" value={form.freelancerDetails.phone} onChange={handleChange("freelancerDetails")} required />
                <Field label="Address (optional)" name="address" value={form.freelancerDetails.address} onChange={handleChange("freelancerDetails")} />
              </div>
            </Section>

            <Section number="3" title="Client details">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Client name" name="name" value={form.clientDetails.name} onChange={handleChange("clientDetails")} required />
                <Field label="Email address" name="email" type="email" value={form.clientDetails.email} onChange={handleChange("clientDetails")} required />
                <Field label="Company (optional)" name="company" value={form.clientDetails.company} onChange={handleChange("clientDetails")} />
                <Field label="Address (optional)" name="address" value={form.clientDetails.address} onChange={handleChange("clientDetails")} />
              </div>
            </Section>

            <Section number="4" title="Project details">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Project title" name="title" value={form.projectDetails.title} onChange={handleChange("projectDetails")} required />
                <Field label="Start date" name="startDate" type="date" value={form.projectDetails.startDate} onChange={handleChange("projectDetails")} required />
                <Field label="End date" name="endDate" type="date" min={form.projectDetails.startDate} value={form.projectDetails.endDate} onChange={handleChange("projectDetails")} required />
                <label className={`${labelClass} sm:col-span-2`}>Project description
                  <textarea className={`${inputClass} min-h-28 resize-y`} name="description" value={form.projectDetails.description} onChange={handleChange("projectDetails")} required />
                </label>
              </div>
              <div className="mt-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className={labelClass}>Deliverables</h3>
                  <button type="button" onClick={() => setForm((current) => ({ ...current, projectDetails: { ...current.projectDetails, deliverables: [...current.projectDetails.deliverables, ""] } }))} className="inline-flex items-center gap-1.5 text-sm text-neutral-300 hover:text-white"><Plus size={16} /> Add item</button>
                </div>
                <div className="space-y-2">
                  {form.projectDetails.deliverables.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input className={inputClass} aria-label={`Deliverable ${index + 1}`} placeholder={`Deliverable ${index + 1}`} value={item} onChange={(event) => handleDeliverableChange(index, event.target.value)} />
                      {form.projectDetails.deliverables.length > 1 && <button type="button" aria-label={`Remove deliverable ${index + 1}`} onClick={() => setForm((current) => ({ ...current, projectDetails: { ...current.projectDetails, deliverables: current.projectDetails.deliverables.filter((_, itemIndex) => itemIndex !== index) } }))} className="mt-2 rounded-lg border border-neutral-700 px-3 text-neutral-400 hover:text-white"><Trash2 size={16} /></button>}
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            <Section number="5" title="Payment details">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Total amount" name="totalAmount" type="number" min="0" step="0.01" value={form.paymentDetails.totalAmount} onChange={handleChange("paymentDetails")} required />
                <label className={labelClass}>Currency
                  <select className={inputClass} name="currency" value={form.paymentDetails.currency} onChange={handleChange("paymentDetails")}>
                    {["INR", "USD", "EUR", "GBP"].map((currency) => <option key={currency}>{currency}</option>)}
                  </select>
                </label>
                <Field label="Advance payment" name="advancePayment" type="number" min="0" step="0.01" value={form.paymentDetails.advancePayment} onChange={handleChange("paymentDetails")} />
                <Field label="Payment due date" name="dueDate" type="date" value={form.paymentDetails.dueDate} onChange={handleChange("paymentDetails")} required />
                <Field label="Late fee (% per week)" name="lateFee" type="number" min="0" step="0.01" value={form.paymentDetails.lateFee} onChange={handleChange("paymentDetails")} />
              </div>
            </Section>

            <Section number="6" title="Terms and conditions">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Included revisions" name="revisions" type="number" min="0" step="1" value={form.terms.revisions} onChange={handleChange("terms")} />
                <label className={labelClass}>Cancellation policy
                  <textarea className={`${inputClass} min-h-24 resize-y`} name="cancellation" value={form.terms.cancellation} onChange={handleChange("terms")} />
                </label>
                <label className="flex items-center gap-3 text-sm text-neutral-300"><input type="checkbox" checked={form.terms.ownershipTransfer} onChange={(event) => updateSection("terms", "ownershipTransfer", event.target.checked)} className="h-4 w-4 accent-white" />Transfer ownership after full payment</label>
                <label className="flex items-center gap-3 text-sm text-neutral-300"><input type="checkbox" checked={form.terms.confidentiality} onChange={(event) => updateSection("terms", "confidentiality", event.target.checked)} className="h-4 w-4 accent-white" />Confidentiality applies</label>
              </div>
            </Section>

            <div className="flex flex-col justify-between gap-4 rounded-xl border border-neutral-800 bg-neutral-900 p-5 sm:flex-row sm:items-center">
              <p className="text-sm text-neutral-400">Saved contracts start with the status <span className="text-neutral-200">Draft</span>.</p>
              <button type="submit" disabled={submitting} className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200 disabled:cursor-wait disabled:opacity-60">
                {submitting ? "Saving contract…" : "Create contract"}
              </button>
            </div>
          </form>

          {contractId && <section className="mt-5 rounded-xl border border-neutral-800 bg-neutral-900 p-5 sm:flex sm:items-center sm:justify-between">
            <div><h2 className="font-semibold">Contract saved</h2><p className="mt-1 text-sm text-neutral-400">ID: <span className="font-mono">{contractId}</span></p></div>
            <div className="mt-4 flex flex-wrap gap-3 sm:mt-0">
              <button type="button" onClick={() => runPdfAction("preview")} disabled={Boolean(pdfAction)} className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 px-4 py-2.5 text-sm hover:bg-neutral-800 disabled:opacity-50"><Eye size={16} />{pdfAction === "preview" ? "Preparing…" : "Preview PDF"}</button>
              <button type="button" onClick={() => runPdfAction("download")} disabled={Boolean(pdfAction)} className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 px-4 py-2.5 text-sm hover:bg-neutral-800 disabled:opacity-50"><Download size={16} />{pdfAction === "download" ? "Downloading…" : "Download PDF"}</button>
              <button type="button" onClick={() => navigate("/dashboard")} className="rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black hover:bg-neutral-200">Dashboard</button>
            </div>
          </section>}
        </div>
      </main>
    </div>
  );
};

export default ContractCreate;
