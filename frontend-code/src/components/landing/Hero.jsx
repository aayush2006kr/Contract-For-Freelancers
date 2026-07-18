import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="mx-auto grid max-w-[1440px] items-center gap-12 px-4 py-24 md:grid-cols-2 md:px-12 md:py-32">
      
      {/* Left Content */}
      <div className="space-y-6">
        <h1 className="text-5xl font-semibold leading-tight tracking-tight text-white">
          Professional Freelance Contracts in Minutes
        </h1>

        <p className="max-w-lg text-base leading-relaxed text-neutral-400">
          Create, manage, preview, and download legally structured freelance
          agreements with a clean and secure workflow.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            to="/register"
            className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 font-medium text-black transition-colors hover:bg-neutral-200"
          >
            Get Started
          </Link>

          <a
            href="https://github.com/aayush2006kr/Contract-For-Freelancers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg border border-neutral-700 bg-transparent px-8 py-3 font-medium text-neutral-300 transition-colors hover:bg-neutral-900"
          >
            <span className="material-symbols-outlined mr-2">code</span>
            View Source Code
          </a>
        </div>
      </div>

      {/* Dashboard Preview */}
      <div className="relative flex h-[400px] w-full flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl md:h-[500px]">

        {/* Top Bar */}
        <div className="flex h-12 items-center justify-between border-b border-neutral-800 bg-neutral-900 px-4">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-neutral-700"></div>
            <div className="h-3 w-3 rounded-full bg-neutral-700"></div>
            <div className="h-3 w-3 rounded-full bg-neutral-700"></div>
          </div>

          <div className="font-mono text-xs font-medium tracking-wide text-neutral-400">
            Dashboard
          </div>

          <span className="material-symbols-outlined text-neutral-400">
            search
          </span>
        </div>

        {/* Dashboard Content */}
        <div className="flex flex-1 flex-col gap-4 overflow-hidden bg-neutral-950 p-6">

          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-xl font-medium text-white">
              Recent Contracts
            </h3>

            <span className="rounded border border-neutral-800 bg-neutral-900 px-3 py-2 font-mono text-xs font-medium tracking-wide text-neutral-300">
              3 Active
            </span>
          </div>

          {/* Card 1 */}
          <div className="group flex cursor-pointer items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900 p-4 transition-colors hover:bg-neutral-800">

            <div>
              <h4 className="mb-1 text-sm font-medium text-white">
                Acme Corp - Web Dev
              </h4>

              <p className="font-mono text-xs text-neutral-400">
                Updated 2 hrs ago
              </p>
            </div>

            <div className="flex gap-3">
              <span className="material-symbols-outlined text-neutral-500 transition-colors group-hover:text-white">
                visibility
              </span>

              <span className="material-symbols-outlined text-neutral-500 transition-colors group-hover:text-white">
                download
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group flex cursor-pointer items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900 p-4 transition-colors hover:bg-neutral-800">

            <div>
              <h4 className="mb-1 text-sm font-medium text-white">
                Stark Ind - UI Design
              </h4>

              <p className="font-mono text-xs text-neutral-400">
                Updated 1 day ago
              </p>
            </div>

            <div className="flex gap-3">
              <span className="material-symbols-outlined text-neutral-500 transition-colors group-hover:text-white">
                visibility
              </span>

              <span className="material-symbols-outlined text-neutral-500 transition-colors group-hover:text-white">
                download
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4 opacity-50">
            <h4 className="mb-1 text-sm font-medium text-white">
              Wayne Ent - Branding
            </h4>

            <p className="font-mono text-xs text-neutral-400">
              Completed
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;