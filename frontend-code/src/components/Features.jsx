function Features() {
  return (
    <section
      id="features"
      className="mx-auto max-w-[1440px] border-t border-neutral-800 px-4 py-24 md:px-12"
    >
      {/* Section Header */}
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="mb-4 text-3xl font-semibold text-white md:text-4xl">
          Everything You Need to Manage Freelance Contracts
        </h2>

        <p className="text-base leading-relaxed text-neutral-400 md:text-lg">
          Create, organize, preview, and download professional freelance
          contracts with a secure and modern workflow.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <div className="group rounded-2xl border border-neutral-800 bg-neutral-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-600 hover:bg-neutral-800 hover:shadow-xl">
          <span className="material-symbols-outlined mb-5 text-4xl text-white transition-transform duration-300 group-hover:scale-110">
            description
          </span>

          <h3 className="mb-3 text-lg font-semibold text-white">
            Generate Contracts
          </h3>

          <p className="text-sm leading-6 text-neutral-400">
            Create professional freelance contracts in minutes using a simple,
            guided workflow.
          </p>
        </div>

        {/* Card 2 */}
        <div className="group rounded-2xl border border-neutral-800 bg-neutral-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-600 hover:bg-neutral-800 hover:shadow-xl">
          <span className="material-symbols-outlined mb-5 text-4xl text-white transition-transform duration-300 group-hover:scale-110">
            folder_managed
          </span>

          <h3 className="mb-3 text-lg font-semibold text-white">
            Contract Management
          </h3>

          <p className="text-sm leading-6 text-neutral-400">
            View, edit, organize, and manage all your contracts from one secure
            dashboard.
          </p>
        </div>

        {/* Card 3 */}
        <div className="group rounded-2xl border border-neutral-800 bg-neutral-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-600 hover:bg-neutral-800 hover:shadow-xl">
          <span className="material-symbols-outlined mb-5 text-4xl text-white transition-transform duration-300 group-hover:scale-110">
            visibility
          </span>

          <h3 className="mb-3 text-lg font-semibold text-white">
            Live PDF Preview
          </h3>

          <p className="text-sm leading-6 text-neutral-400">
            Preview your contract before downloading to ensure everything looks
            exactly as expected.
          </p>
        </div>

        {/* Card 4 */}
        <div className="group rounded-2xl border border-neutral-800 bg-neutral-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-600 hover:bg-neutral-800 hover:shadow-xl">
          <span className="material-symbols-outlined mb-5 text-4xl text-white transition-transform duration-300 group-hover:scale-110">
            download
          </span>

          <h3 className="mb-3 text-lg font-semibold text-white">
            Export as PDF
          </h3>

          <p className="text-sm leading-6 text-neutral-400">
            Download polished PDF contracts that are ready to share with your
            clients instantly.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Features;