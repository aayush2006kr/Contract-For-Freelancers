import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="mx-auto max-w-[1440px] border-t border-neutral-800 px-4 py-32 md:px-12">
      <div className="flex flex-col items-center rounded-2xl border border-neutral-800 bg-neutral-900 px-8 py-16 text-center md:px-20 md:py-24">

        <h2 className="mb-5 max-w-3xl text-3xl font-semibold leading-tight text-white md:text-4xl">
          Ready to Create Professional Freelance Contracts?
        </h2>

        <p className="mb-8 max-w-2xl text-base leading-relaxed text-neutral-400 md:text-lg">
          Generate legally structured contracts, manage them securely, and
          download polished PDFs—all from one modern platform.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            to="/register"
            className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-medium text-black transition-all duration-300 hover:scale-105 hover:bg-neutral-200"
          >
            Get Started Free
          </Link>

          <a
            href="https://github.com/aayush2006kr/Contract-For-Freelancers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg border border-neutral-700 px-8 py-4 text-lg font-medium text-neutral-300 transition-all duration-300 hover:border-neutral-500 hover:bg-neutral-800 hover:text-white"
          >
            View Source Code
          </a>
        </div>
      </div>
    </section>
  );
}

export default CTA;