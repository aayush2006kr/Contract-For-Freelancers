import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950">
      <div className="mx-auto max-w-[1440px] px-4 py-16 md:px-12">

        <div className="grid gap-12 md:grid-cols-3">

          {/* Brand */}
          <div>
            <h2 className="mb-4 text-2xl font-bold text-white">
              Contractify
            </h2>

            <p className="max-w-sm leading-7 text-neutral-400">
              A modern platform for creating, managing, and exporting
              professional freelance contracts with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-neutral-400">

              <a
                href="#features"
                className="transition-colors hover:text-white"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                className="transition-colors hover:text-white"
              >
                How It Works
              </a>

              <Link
                to="/login"
                className="transition-colors hover:text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="transition-colors hover:text-white"
              >
                Get Started
              </Link>

            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Resources
            </h3>

            <div className="flex flex-col gap-3 text-neutral-400">

              <a
                href="https://github.com/aayush2006kr/Contract-For-Freelancers"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/aayush-kumar-03b291348/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                LinkedIn
              </a>

              <a
                href="mailto:hit.aayush2006@gmail.com"
                className="transition-colors hover:text-white"
              >
                Contact
              </a>

            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-6 text-sm text-neutral-500 md:flex-row">

          <p>
            © {new Date().getFullYear()} Contractify. All rights reserved.
          </p>

          <p>
            Designed & Developed by Aayush Kumar
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;