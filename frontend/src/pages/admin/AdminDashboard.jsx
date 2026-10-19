import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  Check,
  X,
  RefreshCw,
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  LogOut,
  LayoutDashboard,
  Users,
  ExternalLink,
  ChevronDown,
} from "lucide-react";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, "");
const CLUBS = ["Dance", "Music", "Dramatics", "Fine Arts", "Photography", "Technical", "Other"];

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });
  const data = await response.json().catch(() => ({}));
  if (response.status === 401) throw new Error("SESSION_EXPIRED");
  if (!response.ok) throw new Error(data.message || "Request failed.");
  return data;
}

function StatCard({ title, value, subtitle }) {
  return (
    <div className="flex min-h-24 flex-col justify-between border border-[#F4D84F] bg-[#FFE76A] p-3 text-center text-[#17120A] sm:min-h-28 sm:p-4">
      <p className="text-xs font-bold uppercase sm:text-sm">{title}</p>
      <p className="mt-1 text-2xl font-black sm:text-3xl">{value}</p>
      {subtitle && <p className="mt-1 text-[10px] text-[#5D4A15] sm:text-xs">{subtitle}</p>}
    </div>
  );
}

function ReviewModal({ candidate, onClose, onDecision, busy }) {
  if (!candidate) return null;
  const links = [
    ...(candidate.trackLink ? [{ label: "Performance / track link", url: candidate.trackLink }] : []),
    ...(Array.isArray(candidate.imageLinks) ? candidate.imageLinks.map((url, index) => ({ label: `Submitted portfolio ${index + 1}`, url })) : []),
  ];
  const fields = [
    ["Email", candidate.email], ["Phone", candidate.phone], ["Branch", candidate.branch],
    ["Year", candidate.year], ["Participation", candidate.participationType],
    ["Team Name", candidate.teamName || "Not provided"],
    ["Registered On", candidate.createdAt ? new Date(candidate.createdAt).toLocaleString() : "Not available"],
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="candidate-review-title" className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-[#FFE76A]/40 bg-[#111] text-white shadow-2xl">
        <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/10 bg-[#111] p-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#FFE76A]">Registration Review</p>
            <h2 id="candidate-review-title" className="mt-1 text-2xl font-black">{candidate.name}</h2>
            <p className="mt-1 break-all text-xs text-gray-400">Registration ID: {candidate._id}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close review" className="rounded-lg border border-white/20 p-2 hover:bg-white/10"><X size={20} /></button>
        </header>
        <div className="space-y-6 p-5">
          <section>
            <h3 className="mb-3 font-bold text-[#FFE76A]">Personal Information</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {fields.map(([label, value]) => <div key={label} className="rounded-lg border border-white/10 bg-white/[0.04] p-3"><p className="text-xs text-gray-400">{label}</p><p className="mt-1 break-words text-sm font-semibold">{value ?? "Not provided"}</p></div>)}
            </div>
          </section>
          <section>
            <h3 className="mb-3 font-bold text-[#FFE76A]">Applied Clubs</h3>
            <div className="flex flex-wrap gap-2">
              {(candidate.events || []).map((event) => <span key={event} className="rounded-full border border-[#FFE76A]/40 bg-[#FFE76A]/10 px-3 py-1 text-sm">{event}</span>)}
              {!(candidate.events || []).length && <p className="text-sm text-gray-400">No clubs listed.</p>}
            </div>
          </section>
          <section>
            <h3 className="mb-3 font-bold text-[#FFE76A]">Submitted Links</h3>
            <div className="space-y-2">
              {links.map((link, index) => <a key={`${link.url}-${index}`} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 break-all text-sm text-sky-300 underline"><ExternalLink size={15} className="shrink-0" />Open {link.label}</a>)}
              {!links.length && <p className="text-sm text-gray-400">No submitted links available.</p>}
            </div>
            <p className="mt-2 text-xs text-gray-500">Private Drive files must be shared with the reviewer.</p>
          </section>
          <section>
            <h3 className="mb-2 font-bold text-[#FFE76A]">Next-Round Decision</h3>
            <span className={`inline-flex rounded-full border px-3 py-1 text-sm ${candidate.adminStatus === "Selected" ? "border-green-500/50 bg-green-500/10 text-green-300" : candidate.adminStatus === "Rejected" ? "border-red-500/50 bg-red-500/10 text-red-300" : "border-white/20 text-gray-300"}`}>
              {candidate.adminStatus === "Selected" ? "Selected for Next Round" : candidate.adminStatus === "Rejected" ? "Not Selected for Next Round" : "Pending Decision"}
            </span>
          </section>
          <div className="flex flex-wrap justify-end gap-3 border-t border-white/10 pt-5">
            <button type="button" onClick={onClose} className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10">Close</button>
            <button type="button" disabled={busy} onClick={() => onDecision(candidate, "reject")} className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-bold hover:bg-red-500 disabled:opacity-50"><X size={17} />Not Selected</button>
            <button type="button" disabled={busy} onClick={() => onDecision(candidate, "approve")} className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-bold hover:bg-green-500 disabled:opacity-50"><Check size={17} />Select for Next Round</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [driveLinksOpen, setDriveLinksOpen] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [club, setClub] = useState("");
  const [decisionFilter, setDecisionFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0, limit: 50 });
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [reviewCandidate, setReviewCandidate] = useState(null);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const me = await apiRequest("/api/admin/me");
      setAdmin(me.admin);
      const params = new URLSearchParams({ search, club, page: String(page), limit: "50" });
      const result = await apiRequest(`/api/admin/candidates?${params.toString()}`);
      const rows = result.candidates || [];
      setCandidates(rows);
      setPagination(result.pagination || { page: 1, pages: 1, total: rows.length, limit: 50 });
      setReviewCandidate((previous) => previous ? (rows.find((item) => item._id === previous._id) || previous) : null);
    } catch (err) {
      if (err.message === "SESSION_EXPIRED") { navigate("/admin/login", { replace: true }); return; }
      setError(err.message || "Could not load registrations.");
    } finally { setLoading(false); }
  }, [navigate, search, club, page]);

  useEffect(() => { loadDashboard(); }, [loadDashboard]);

  const clubCounts = useMemo(() => {
    const counts = Object.fromEntries(CLUBS.map((item) => [item, 0]));
    candidates.forEach((candidate) => (candidate.events || []).forEach((event) => { if (event in counts) counts[event] += 1; }));
    return counts;
  }, [candidates]);

  const selectedCount = candidates.filter((candidate) => candidate.adminStatus === "Selected").length;
  const notSelectedCount = candidates.filter((candidate) => candidate.adminStatus === "Rejected").length;
  const pendingCount = candidates.filter((candidate) => !["Selected", "Rejected"].includes(candidate.adminStatus)).length;
  const visibleCandidates = candidates.filter((candidate) => {
    if (decisionFilter === "Selected") return candidate.adminStatus === "Selected";
    if (decisionFilter === "Rejected") return candidate.adminStatus === "Rejected";
    if (decisionFilter === "Pending") return !["Selected", "Rejected"].includes(candidate.adminStatus);
    return true;
  });

  async function quickDecision(candidate, decision) {
    const adminStatus = decision === "approve" ? "Selected" : "Rejected";
    const decisionLabel = decision === "approve" ? "Selected for next round" : "Not selected for next round";
    if (!window.confirm(`${decisionLabel}: ${candidate.name}?`)) return;
    setBusyId(candidate._id); setError(""); setNotice("");
    try {
      const result = await apiRequest(`/api/admin/candidates/${candidate._id}`, { method: "PATCH", body: JSON.stringify({ adminStatus }) });
      const updated = result.candidate;
      setCandidates((previous) => previous.map((item) => item._id === candidate._id ? updated : item));
      setReviewCandidate((previous) => previous?._id === candidate._id ? updated : previous);
      setNotice(`${candidate.name}: ${decisionLabel}.`);
    } catch (err) {
      if (err.message === "SESSION_EXPIRED") { navigate("/admin/login", { replace: true }); return; }
      setError(err.message || "Could not update candidate decision.");
    } finally { setBusyId(""); }
  }

  async function handleLogout() {
    setLoggingOut(true);
    try { await apiRequest("/api/admin/logout", { method: "POST" }); }
    catch { /* Always return to login, even if logout request fails. */ }
    finally { navigate("/admin/login", { replace: true }); setLoggingOut(false); }
  }

  function clearFilters() { setSearch(""); setSearchInput(""); setClub(""); setDecisionFilter(""); setPage(1); }

  function exportCSV() {
    const columns = ["Name", "Email", "Phone", "Branch", "Year", "Clubs", "Participation", "Team", "Next Round Decision", "Registration Date"];
    const rows = candidates.map((candidate) => [candidate.name, candidate.email, candidate.phone, candidate.branch, candidate.year, (candidate.events || []).join(", "), candidate.participationType, candidate.teamName, candidate.adminStatus === "Selected" ? "Selected for Next Round" : candidate.adminStatus === "Rejected" ? "Not Selected for Next Round" : "Pending", candidate.createdAt ? new Date(candidate.createdAt).toLocaleString() : ""]);
    const escapeCSV = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
    const csv = [columns, ...rows].map((row) => row.map(escapeCSV).join(",")).join("\r\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob); const link = document.createElement("a");
    link.href = url; link.download = `heats-registrations-page-${page}.csv`; link.click(); URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="h-9 border-b border-[#F2D74B] bg-[#FFE76A] sm:h-10" />
      <div className="flex min-h-[calc(100vh-2.25rem)]">
        <aside className="flex w-16 shrink-0 flex-col bg-black text-white sm:w-48 lg:w-56">
          <div className="border-b border-white/15 px-2 py-5 sm:px-5 sm:py-7">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFE76A] font-black text-black sm:h-12 sm:w-12">C</div>
            <h2 className="text-xs font-black sm:text-xl"><span className="sm:hidden">Admin</span><span className="hidden sm:inline">Cultural Synod</span></h2>
            <p className="mt-2 hidden break-words text-xs text-gray-400 sm:block">HEATS Registration Portal</p>
          </div>
          <nav className="flex-1 space-y-2 px-2 py-5 sm:px-3">
            <a href="#overview" className="flex items-center gap-3 rounded-md bg-[#FFE76A] px-2 py-3 text-xs font-bold text-black sm:px-4 sm:text-sm"><LayoutDashboard size={17} /><span className="hidden sm:inline">Dashboard</span></a>
            <a href="#registrations" className="flex items-center gap-3 rounded-md px-2 py-3 text-xs text-gray-300 transition hover:bg-white/10 hover:text-white sm:px-4 sm:text-sm"><Users size={17} /><span className="hidden sm:inline">Registrations</span></a>
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setDriveLinksOpen((open) => !open)}
                aria-expanded={driveLinksOpen}
                className="flex w-full items-center gap-3 rounded-md px-2 py-3 text-xs text-gray-300 transition hover:bg-white/10 hover:text-white sm:px-4 sm:text-sm"
              >
                <ExternalLink size={17} />
                <span className="hidden flex-1 text-left sm:inline">Drive Links</span>
                <span className="hidden sm:inline">
                  {driveLinksOpen ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                </span>
              </button>
              {driveLinksOpen && (
                <div className="ml-4 space-y-1 border-l border-white/20 pl-3 sm:ml-6">
                  {CLUBS.map((clubName) => (
                    <button
                      key={clubName}
                      type="button"
                      onClick={() => navigate(`/admin/drive-links?club=${encodeURIComponent(clubName)}`)}
                      className="block w-full rounded-md px-2 py-2 text-left text-xs text-gray-400 transition hover:bg-[#FFE76A] hover:text-black sm:text-sm"
                    >
                      {clubName}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>
          <div className="border-t border-white/15 p-2 sm:p-4">
            <p className="mb-3 hidden truncate text-xs text-gray-400 sm:block">{admin?.email || "Administrator"}</p>
            <button onClick={handleLogout} disabled={loggingOut} className="flex w-full items-center justify-center gap-2 rounded-md border border-white/25 px-2 py-2 text-[10px] text-white transition hover:bg-white/10 disabled:opacity-50 sm:px-3 sm:text-xs"><LogOut size={14} /><span className="sm:hidden">Exit</span><span className="hidden sm:inline">{loggingOut ? "Signing out..." : "Sign out"}</span></button>
          </div>
        </aside>

        <main className="min-w-0 flex-1 bg-white">
          <div id="overview" className="mx-auto max-w-[1800px] px-2 py-3 sm:px-5 sm:py-5 lg:px-7">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#90731B] sm:text-xs">Cultural Synod / Administration</p><h1 className="mt-1 text-xl font-black sm:text-3xl">Registration Dashboard</h1><p className="mt-1 text-xs text-gray-500 sm:text-sm">View registrations and record next-round decisions.</p></div>
              <button onClick={loadDashboard} disabled={loading} className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-xs font-bold hover:bg-gray-50 disabled:opacity-50"><RefreshCw size={14} />Refresh</button>
            </div>
            <section className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
              <StatCard title="Total Registrations" value={pagination.total} subtitle="Matching records" />
              <StatCard title="Selected" value={selectedCount} subtitle="On this page" />
              <StatCard title="Not Selected" value={notSelectedCount} subtitle="On this page" />
              <StatCard title="Pending Decision" value={pendingCount} subtitle="On this page" />
            </section>
            <section className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
              {CLUBS.map((item) => <button key={item} onClick={() => { setClub(club === item ? "" : item); setPage(1); }} className={`min-h-[68px] border p-2 text-left transition sm:min-h-20 ${club === item ? "border-black bg-[#FFE76A]" : "border-[#F0D85C] bg-[#FFF3A9] hover:bg-[#FFE76A]"}`}><p className="text-[10px] font-bold uppercase text-gray-600">Club-wise</p><p className="mt-1 text-xs font-black leading-tight sm:text-sm">{item}</p><p className="mt-1 text-lg font-black">{clubCounts[item] ?? 0}</p></button>)}
            </section>
            <section className="mt-3 rounded-md border border-[#F0DDA0] bg-white p-2 sm:p-3">
              <form className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-[minmax(180px,1.5fr)_minmax(130px,1fr)_minmax(150px,1fr)_auto]" onSubmit={(event) => { event.preventDefault(); setPage(1); setSearch(searchInput.trim()); }}>
                <label className="relative"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="search" value={searchInput} onChange={(event) => setSearchInput(event.target.value)} placeholder="Search name, email, phone, branch..." className="w-full min-w-0 rounded-md border border-gray-300 py-2 pl-9 pr-3 text-xs outline-none focus:border-[#B99A2B] focus:ring-2 focus:ring-[#FFE76A]/60" /></label>
                <select value={club} onChange={(event) => { setClub(event.target.value); setPage(1); }} className="min-w-0 rounded-md border border-gray-300 bg-white px-3 py-2 text-xs outline-none"><option value="">All clubs</option>{CLUBS.map((item) => <option key={item} value={item}>{item}</option>)}</select>
                <select value={decisionFilter} onChange={(event) => setDecisionFilter(event.target.value)} className="min-w-0 rounded-md border border-gray-300 bg-white px-3 py-2 text-xs outline-none"><option value="">All next-round decisions</option><option value="Pending">Pending</option><option value="Selected">Selected for next round</option><option value="Rejected">Not selected</option></select>
                <button type="submit" className="rounded-md bg-[#2B0A12] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#501321]">Search</button>
              </form>
              <button onClick={clearFilters} className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 text-[10px] font-bold text-gray-600 transition hover:bg-gray-50 sm:text-xs">Clear filters</button>
            </section>

            <section id="registrations" className="mt-3 overflow-hidden bg-black text-white">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 px-3 py-3 sm:px-5"><div><h2 className="text-lg font-black sm:text-2xl">All Registrations</h2><p className="mt-1 text-[10px] text-gray-400 sm:text-xs">{pagination.total} matching registrations · Page {pagination.page} of {Math.max(1, pagination.pages)}</p></div><button onClick={exportCSV} disabled={candidates.length === 0} className="inline-flex items-center gap-2 rounded-md bg-[#FFE76A] px-3 py-2 text-xs font-bold text-black transition hover:bg-[#FFF09A] disabled:cursor-not-allowed disabled:opacity-40"><Download size={14} />Export CSV</button></div>
              {error && <div role="alert" className="m-3 rounded-md border border-red-500/40 bg-red-950 p-3 text-sm text-red-200">{error}</div>}
              {notice && <div role="status" className="m-3 rounded-md border border-green-500/40 bg-green-950 p-3 text-sm text-green-200">{notice}</div>}
              {loading ? <div className="px-4 py-16 text-center text-sm text-gray-300">Loading registrations...</div> : visibleCandidates.length === 0 ? <div className="px-4 py-16 text-center"><p className="text-lg font-bold">No registrations found</p><p className="mt-2 text-xs text-gray-400">Try clearing your filters or refreshing the dashboard.</p></div> : (
                <div className="max-h-[75vh] overflow-auto"><table className="w-full min-w-[1000px] border-collapse text-left text-xs"><thead className="sticky top-0 z-10 bg-[#1B1B1B] text-[#FFE76A]"><tr>{["Candidate", "Contact", "Branch / Year", "Club(s)", "Participation", "Registration Date", "Next-Round Status", "Actions"].map((heading) => <th key={heading} className="border-b border-white/15 px-3 py-3 font-bold">{heading}</th>)}</tr></thead>
                  <tbody>{visibleCandidates.map((candidate) => {
                    const statusLabel = candidate.adminStatus === "Selected" ? "Selected for Next Round" : candidate.adminStatus === "Rejected" ? "Not Selected" : "Pending";
                    return <tr key={candidate._id} className="border-b border-white/10 align-top transition hover:bg-white/[0.06]">
                      <td className="px-3 py-4"><p className="max-w-48 font-bold text-white">{candidate.name}</p><p className="mt-1 text-[10px] text-gray-400">ID: {String(candidate._id).slice(-8)}</p></td>
                      <td className="px-3 py-4"><p>{candidate.email}</p><p className="mt-1 text-gray-400">{candidate.phone}</p></td>
                      <td className="px-3 py-4"><p>{candidate.branch}</p><p className="mt-1 text-gray-400">{candidate.year}</p></td>
                      <td className="max-w-36 px-3 py-4"><div className="flex flex-wrap gap-1">{(candidate.events || []).map((event) => <span key={event} className="rounded bg-white/10 px-2 py-1 text-[10px]">{event}</span>)}</div></td>
                      <td className="px-3 py-4"><p>{candidate.participationType}</p>{candidate.teamName && <p className="mt-1 text-gray-400">{candidate.teamName}</p>}</td>
                      <td className="px-3 py-4 text-gray-300">{candidate.createdAt ? new Date(candidate.createdAt).toLocaleDateString() : "—"}</td>
                      <td className="px-3 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${candidate.adminStatus === "Selected" ? "bg-green-500/15 text-green-300" : candidate.adminStatus === "Rejected" ? "bg-red-500/15 text-red-300" : "bg-white/10 text-gray-300"}`}>{statusLabel}</span></td>
                      <td className="px-3 py-4"><div className="flex items-center gap-2">
                        <button type="button" onClick={() => setReviewCandidate(candidate)} title="Review registration" aria-label={`Review ${candidate.name}`} className="rounded-md border border-sky-400/60 p-2 text-sky-300 transition hover:bg-sky-400/15"><Eye size={17} /></button>
                        <button type="button" onClick={() => quickDecision(candidate, "approve")} title="Select for next round" aria-label={`Select ${candidate.name} for next round`} disabled={busyId === candidate._id || candidate.adminStatus === "Selected"} className={`rounded-md p-2 text-white transition disabled:cursor-not-allowed disabled:opacity-40 ${candidate.adminStatus === "Selected" ? "bg-green-800" : "bg-green-600 hover:bg-green-500"}`}><Check size={17} /></button>
                        <button type="button" onClick={() => quickDecision(candidate, "reject")} title="Not selected for next round" aria-label={`Do not select ${candidate.name}`} disabled={busyId === candidate._id || candidate.adminStatus === "Rejected"} className={`rounded-md p-2 text-white transition disabled:cursor-not-allowed disabled:opacity-40 ${candidate.adminStatus === "Rejected" ? "bg-red-800" : "bg-red-600 hover:bg-red-500"}`}><X size={17} /></button>
                      </div></td>
                    </tr>;
                  })}</tbody></table></div>
              )}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/15 px-3 py-4 sm:px-5"><p className="text-xs text-gray-400">Showing {visibleCandidates.length} records on this page</p><div className="flex items-center gap-2"><button onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page <= 1 || loading} className="inline-flex items-center gap-1 rounded border border-white/25 px-3 py-2 text-xs hover:bg-white/10 disabled:opacity-30"><ChevronLeft size={14} />Previous</button><span className="text-xs text-gray-300">{page} / {Math.max(1, pagination.pages)}</span><button onClick={() => setPage((current) => Math.min(pagination.pages || 1, current + 1))} disabled={page >= pagination.pages || loading} className="inline-flex items-center gap-1 rounded border border-white/25 px-3 py-2 text-xs hover:bg-white/10 disabled:opacity-30">Next<ChevronRight size={14} /></button></div></div>
            </section>
            <footer className="py-5 text-center text-[10px] text-gray-400 sm:text-xs">Cultural Synod · HEATS Administration Portal</footer>
          </div>
        </main>
      </div>
      <ReviewModal candidate={reviewCandidate} onClose={() => setReviewCandidate(null)} onDecision={quickDecision} busy={Boolean(busyId && reviewCandidate && busyId === reviewCandidate._id)} />
    </div>
  );
}
