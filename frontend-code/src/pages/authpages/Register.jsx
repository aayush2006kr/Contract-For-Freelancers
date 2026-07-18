import { Link } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { registerUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";



function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});
const navigate = useNavigate();

    const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
  alert("Please fill all fields");
  return;
}

if (formData.password !== formData.confirmPassword) {
  alert("Passwords do not match");
  return;
}



  try {
    const userData = {
  name: formData.name,
  email: formData.email,
  password: formData.password,
};

const response = await registerUser(userData);

    alert(response.data.message);

    navigate("/login");
    
  } catch (error) {
    console.log(error);
  }
};



  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 py-8">
      <section className="w-full max-w-md rounded-xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
              <Lock className="h-5 w-5 text-black" />
            </div>

            <h1 className="text-2xl font-bold text-white">
              Contractify
            </h1>
          </div>

          <h2 className="mb-2 text-2xl font-bold text-white">
            Create Your Account
          </h2>

          <p className="text-sm text-neutral-400">
            Start creating professional freelance contracts in minutes.
          </p>
        </div>

        <form className="space-y-5"
        onSubmit={handleSubmit}
        >

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-xs font-medium uppercase tracking-wide text-neutral-300"
            >
              Full Name
            </label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
              />

              <input
                value={formData.name}
                onChange={handleChange}
                    
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                className="w-full rounded-lg border border-neutral-800 bg-neutral-950 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-neutral-600 focus:border-white focus:ring-1 focus:ring-white focus:outline-none"
              />
            </div>
          </div>

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
               value={formData.email}
                onChange={handleChange}
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                className="w-full rounded-lg border border-neutral-800 bg-neutral-950 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-neutral-600 focus:border-white focus:ring-1 focus:ring-white focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-xs font-medium uppercase tracking-wide text-neutral-300"
            >
              Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
              />

              <input
               value={formData.password}
                onChange={handleChange}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full rounded-lg border border-neutral-800 bg-neutral-950 py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-neutral-600 focus:border-white focus:ring-1 focus:ring-white focus:outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 transition hover:text-white"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-xs font-medium uppercase tracking-wide text-neutral-300"
            >
              Confirm Password
            </label>

            <input
               value={formData.confirmPassword}
                onChange={handleChange}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:border-white focus:ring-1 focus:ring-white focus:outline-none"
            />
          </div>

          {/* Error Placeholder */}
          <p className="text-sm text-red-400">
            {/* Error Message */}
          </p>

          {/* Submit */}
          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-neutral-200"
          >
            Create Account
          </button>

          {/* Login */}
          <p className="text-center text-sm text-neutral-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-white transition hover:text-neutral-300"
            >
              Login
            </Link>
          </p>

        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-neutral-600">
          © {new Date().getFullYear()} Contractify. All rights reserved.
        </p>

      </section>
    </main>
  );
}

export default Register;