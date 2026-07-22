import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";

function Register() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await registerUser(form);

      login(data.user, data.token);

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-10 rounded-2xl w-full max-w-md space-y-6"
      >

        <h1 className="text-4xl font-bold text-center text-white">
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-4 rounded-xl bg-zinc-800 text-white outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-4 rounded-xl bg-zinc-800 text-white outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full p-4 rounded-xl bg-zinc-800 text-white outline-none"
        />

        <button
          disabled={loading}
          className="w-full bg-white text-black py-4 rounded-xl font-semibold hover:bg-gray-300 transition"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-white"
          >
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Register;