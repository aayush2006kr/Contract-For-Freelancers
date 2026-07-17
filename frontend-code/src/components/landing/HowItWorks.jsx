import React from 'react'

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-[1440px] border-t border-neutral-800 px-4 py-24 md:px-12"
    >
      {/* Section Header */}
      <div className="mx-auto mb-20 max-w-2xl text-center">
        <h2 className="mb-4 text-3xl font-semibold text-white md:text-4xl">
          How It Works
        </h2>

        <p className="text-base leading-relaxed text-neutral-400 md:text-lg">
          Generate professional freelance contracts in just three simple steps.
        </p>
      </div>

      {/* Steps */}
      <div className="relative flex flex-col items-start justify-center gap-10 md:flex-row">
        {/* Connecting Line (Desktop Only) */}
        <div className="absolute left-[10%] right-[10%] top-12 z-0 hidden border-t border-dashed border-neutral-800 md:block"></div>

        {/* Step 1 */}
        <div className="relative z-10 mx-auto flex max-w-[250px] flex-col items-center text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-5xl font-semibold text-white shadow-xl">
            1
          </div>

          <h3 className="mb-3 text-lg font-semibold text-white">
            Create Contract
          </h3>

          <p className="text-sm leading-6 text-neutral-400">
            Fill in your client information, project details, payment terms, and
            agreement conditions using our guided form.
          </p>
        </div>

        {/* Step 2 */}
        <div className="relative z-10 mx-auto flex max-w-[250px] flex-col items-center text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-5xl font-semibold text-white shadow-xl">
            2
          </div>

          <h3 className="mb-3 text-lg font-semibold text-white">
            Preview PDF
          </h3>

          <p className="text-sm leading-6 text-neutral-400">
            Review the generated contract to ensure every section is accurate
            before exporting the final version.
          </p>
        </div>

        {/* Step 3 */}
        <div className="relative z-10 mx-auto flex max-w-[250px] flex-col items-center text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-5xl font-semibold text-white shadow-xl">
            3
          </div>

          <h3 className="mb-3 text-lg font-semibold text-white">
            Download & Share
          </h3>

          <p className="text-sm leading-6 text-neutral-400">
            Export your professional PDF contract and share it with your client
            for review and signing.
          </p>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks