import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { loginUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

function Login() {
const value = useContext(AuthContext);
const { login } = useContext(AuthContext);


  const [formData, setformData] = useState({
    email:"" ,
    passoword:""

  })

  const handleChange = (e) => {
  const { name, value } = e.target;

  setformData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};


const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
  alert("Please fill all fields");
  return;
}


  try {
  const response = await loginUser(formData);

  alert("logged in succcessfully")
  console.log(response.data)

  login(response.data.user);

  navigate("/dashboard");

    
} catch (error) {
  console.log(error);
}

};






  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 text-neutral-200">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-white">
            Contractify
          </h1>

          <h2 className="mb-3 text-xl font-semibold text-white">
            Welcome Back
          </h2>

          <p className="text-sm text-neutral-400">
            Sign in to continue managing your freelance contracts.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl">
          <form className="space-y-4"
          
            onSubmit={handleSubmit}
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-medium uppercase tracking-wide text-neutral-300"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
                />

                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}

                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-950 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-neutral-600 focus:border-white focus:ring-1 focus:ring-white focus:outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-medium uppercase tracking-wide text-neutral-300"
                >
                  Password
                </label>

                <Link
                  to="#"
                  className="text-xs text-white transition hover:text-neutral-300"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
                />

                <input
                   name="password"
                  value={formData.passowrd}
                  onChange={handleChange}

                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-950 py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-neutral-600 focus:border-white focus:ring-1 focus:ring-white focus:outline-none"
                />

                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 transition hover:text-white"
                >
                  <Eye size={18} />
                </button>
              </div>
            </div>

            {/* Error Placeholder */}
            <p className="text-sm text-red-400">
              {/* Error Message */}
            </p>

            {/* Login Button */}
            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-neutral-200"
            >
              Login
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-800"></div>
            </div>

            <div className="relative flex justify-center">
              <span className="bg-neutral-900 px-3 text-xs text-neutral-500">
                or
              </span>
            </div>
          </div>

          {/* Register */}
          <p className="text-center text-sm text-neutral-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-white transition hover:text-neutral-300"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;