
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || `Login failed (${response.status}).`);
      }

      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError(
        err instanceof TypeError
          ? "Cannot connect to the server. Check that your backend is running."
          : err.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7EBD0] px-4 py-10 text-[#2B0A12]">
      <section className="w-full max-w-md rounded-3xl border border-[#D9B86C]/50 bg-white p-7 shadow-xl sm:p-9">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2B0A12] text-2xl font-black text-[#D9B86C]">
          C
        </div>

        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#98712A]">
          Cultural Synod
        </p>

        <h1 className="mt-2 text-3xl font-black">Admin Portal</h1>

        <p className="mt-2 text-sm text-gray-600">
          Sign in to manage registrations and induction evaluations.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="admin-email"
              className="mb-2 block text-sm font-semibold"
            >
              Admin email
            </label>

            <input
              id="admin-email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#98712A] focus:ring-2 focus:ring-[#D9B86C]/30"
              placeholder="Enter your authorized email"
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="mb-2 block text-sm font-semibold"
            >
              Password
            </label>

            <input
              id="admin-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#98712A] focus:ring-2 focus:ring-[#D9B86C]/30"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#2B0A12] px-5 py-3.5 font-bold text-[#F7EBD0] transition hover:bg-[#501321] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in securely"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-500">
          Authorized administrators only
        </p>
      </section>
    </main>
  );
}
