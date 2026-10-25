import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function requestOtp(event) {
    event?.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `${API_URL}/api/admin/auth/request-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to send OTP");
      }

      setOtpSent(true);
      setOtp("");
      setMessage("OTP sent successfully. Check your inbox.");
    } catch (err) {
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp(event) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `${API_URL}/api/admin/auth/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to verify OTP.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7edda] px-4 py-10 font-sans text-[#300d17]">
      <section className="w-full max-w-md rounded-[28px] border border-[#eddfc4] bg-white p-7 shadow-[0_18px_40px_rgba(48,13,23,0.12)] sm:p-9">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#300d17] text-2xl font-bold text-[#e4bd62]">
          C
        </div>

        <p className="mt-6 text-xs font-bold tracking-[0.28em] text-[#a57627]">
          CULTURAL SYNOD
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Admin Portal
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#777078]">
          Sign in to manage registrations and induction evaluations.
        </p>

        {!otpSent ? (
          <form onSubmit={requestOtp} className="mt-8 space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="admin-email"
                className="block text-sm font-semibold"
              >
                Admin email
              </label>

              <input
                id="admin-email"
                type="email"
                autoComplete="email"
                placeholder="Enter your authorized email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full rounded-xl border border-[#e1d7cc] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#a57627] focus:ring-4 focus:ring-[#a57627]/10"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-xl bg-[#300d17] px-4 py-3.5 font-semibold text-[#f5e6c8] transition hover:bg-[#491625] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="mt-8 space-y-4">
            <div className="rounded-xl bg-[#f9f3e7] p-4">
              <p className="text-sm leading-6 text-[#65545a]">
                Enter the six-digit verification code sent to
              </p>
              <p className="mt-1 break-all text-sm font-semibold">
                {email}
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="admin-otp"
                className="block text-sm font-semibold"
              >
                Verification code
              </label>

              <input
                id="admin-otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="Enter 6-digit OTP"
                pattern="[0-9]{6}"
                maxLength={6}
                value={otp}
                onChange={(event) =>
                  setOtp(
                    event.target.value.replace(/\D/g, "").slice(0, 6)
                  )
                }
                required
                className="w-full rounded-xl border border-[#e1d7cc] bg-white px-4 py-4 text-center text-xl font-bold tracking-[0.5em] outline-none transition placeholder:text-sm placeholder:font-normal placeholder:tracking-normal focus:border-[#a57627] focus:ring-4 focus:ring-[#a57627]/10"
              />
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full rounded-xl bg-[#300d17] px-4 py-3.5 font-semibold text-[#f5e6c8] transition hover:bg-[#491625] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify & Login"}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => requestOtp()}
              className="w-full rounded-xl bg-[#f5ecd8] px-4 py-3 font-semibold text-[#300d17] transition hover:bg-[#eee0c3] disabled:opacity-60"
            >
              Resend OTP
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => {
                setOtpSent(false);
                setOtp("");
                setError("");
                setMessage("");
              }}
              className="w-full py-2 text-sm font-medium text-[#8b672e] hover:underline"
            >
              Change email
            </button>
          </form>
        )}

        {message && (
          <p
            role="status"
            className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-800"
          >
            {message}
          </p>
        )}

        {error && (
          <p
            role="alert"
            className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <p className="mt-7 text-center text-xs text-[#827a7a]">
          Authorized administrators only
        </p>
      </section>
    </main>
  );
}
