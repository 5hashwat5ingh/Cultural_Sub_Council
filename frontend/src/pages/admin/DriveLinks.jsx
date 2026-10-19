import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ExternalLink, RefreshCw, Search } from "lucide-react";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, "");
const STORAGE_KEY = "heats-drive-review-status";
const CLUBS = ["Dance", "Music", "Dramatics", "Fine Arts", "Photography", "Technical", "Other"];

async function apiRequest(path) {
  const response = await fetch(`${API_URL}${path}`, { credentials: "include" });
  const data = await response.json().catch(() => ({}));
  if (response.status === 401) throw new Error("SESSION_EXPIRED");
  if (!response.ok) throw new Error(data.message || "Could not load registrations.");
  return data;
}

function getCandidateLinks(candidate) {
  const links = [];
  if (candidate.trackLink) links.push({ label: "Performance / Track", url: candidate.trackLink });
  (candidate.imageLinks || []).forEach((url, index) => {
    links.push({ label: `Image / Portfolio ${index + 1}`, url });
  });
  return links;
}

function isValidHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function readStatuses() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export default function DriveLinks() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedClub = searchParams.get("club") || "";

  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");
  const [club, setClub] = useState(selectedClub);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviewStatuses, setReviewStatuses] = useState(readStatuses);

  useEffect(() => {
    setClub(selectedClub);
  }, [selectedClub]);

  const loadCandidates = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ limit: "100", page: "1" });
      const result = await apiRequest(`/api/admin/candidates?${params.toString()}`);
      setCandidates(result.candidates || []);
    } catch (err) {
      if (err.message === "SESSION_EXPIRED") {
        navigate("/admin/login", { replace: true });
        return;
      }
      setError(err.message || "Unable to load Drive links.");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadCandidates();
  }, [loadCandidates]);

  function updateReviewStatus(candidateId, status) {
    setReviewStatuses((previous) => {
      const updated = { ...previous, [candidateId]: status };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Status remains available in the current session if storage is blocked.
      }
      return updated;
    });
  }

  function changeClub(value) {
    setClub(value);
    if (value) setSearchParams({ club: value });
    else setSearchParams({});
  }

  const filteredCandidates = useMemo(() => {
    const query = search.trim().toLowerCase();
    return candidates
      .map((candidate) => ({ ...candidate, submittedLinks: getCandidateLinks(candidate) }))
      .filter((candidate) => {
        if (!candidate.submittedLinks.length) return false;
        const matchesClub = !club || (candidate.events || []).includes(club);
        const searchable = [
          candidate.name,
          candidate.email,
          candidate.phone,
          candidate.branch,
          candidate.teamName,
          ...(candidate.events || []),
        ].filter(Boolean).join(" ").toLowerCase();
        return matchesClub && (!query || searchable.includes(query));
      });
  }, [candidates, search, club]);

  const totalLinks = filteredCandidates.reduce((total, candidate) => total + candidate.submittedLinks.length, 0);
  const openedCount = filteredCandidates.filter((candidate) => reviewStatuses[candidate._id] === "opened").length;
  const notPerformedCount = filteredCandidates.filter((candidate) => reviewStatuses[candidate._id] === "not-performed").length;

  return (
    <div className="min-h-screen bg-[#F8F7F2] text-[#211217]">
      <header className="h-3 bg-[#FFE76A]" />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#98712A]">Cultural Synod / Administration</p>
            <h1 className="mt-2 text-2xl font-black sm:text-4xl">Candidate Drive Links</h1>
            <p className="mt-2 text-sm text-gray-600">Review submitted performances and portfolios.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/admin/dashboard" className="rounded-lg border border-[#2B0A12] px-4 py-2 text-sm font-bold text-[#2B0A12] hover:bg-[#2B0A12] hover:text-white">← Dashboard</Link>
            <button type="button" onClick={loadCandidates} disabled={loading} className="inline-flex items-center gap-2 rounded-lg bg-[#2B0A12] px-4 py-2 text-sm font-bold text-white hover:bg-[#501321] disabled:opacity-50"><RefreshCw size={15} />{loading ? "Loading..." : "Refresh"}</button>
          </div>
        </div>

        <section className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-[#F0D85C] bg-[#FFE76A] p-5"><p className="text-sm font-bold">Candidates with links</p><p className="mt-2 text-3xl font-black">{filteredCandidates.length}</p></div>
          <div className="rounded-xl border border-gray-200 bg-white p-5"><p className="text-sm font-bold">Submitted links</p><p className="mt-2 text-3xl font-black">{totalLinks}</p></div>
          <div className="rounded-xl border border-red-200 bg-red-50 p-5"><p className="text-sm font-bold text-red-700">Link opened</p><p className="mt-2 text-3xl font-black text-red-700">{openedCount}</p></div>
          <div className="rounded-xl border border-gray-200 bg-white p-5"><p className="text-sm font-bold">Not performed</p><p className="mt-2 text-3xl font-black">{notPerformedCount}</p></div>
        </section>

        <section className="mt-5 rounded-xl border border-gray-200 bg-white p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="relative block"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, email, phone, or club..." className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-[#98712A] focus:ring-2 focus:ring-[#FFE76A]/50" /></label>
            <select value={club} onChange={(event) => changeClub(event.target.value)} className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#98712A]">
              <option value="">All clubs</option>{CLUBS.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
        </section>

        {error && <div role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
        {loading ? <div className="py-20 text-center text-gray-500">Loading candidate links...</div> : filteredCandidates.length === 0 ? (
          <div className="mt-5 rounded-xl border border-gray-200 bg-white px-5 py-16 text-center"><div className="text-4xl">📂</div><h2 className="mt-3 text-lg font-bold">No submitted links found</h2><p className="mt-2 text-sm text-gray-500">Try another search or club filter.</p></div>
        ) : (
          <section className="mt-5 space-y-4">
            {filteredCandidates.map((candidate) => {
              const status = reviewStatuses[candidate._id];
              const isOpened = status === "opened";
              const isNotPerformed = status === "not-performed";
              return (
                <article key={candidate._id} className={`overflow-hidden rounded-xl border shadow-sm transition-colors duration-200 ${isOpened ? "border-red-500 bg-red-100" : "border-gray-200 bg-white"}`}>
                  <div className={`flex flex-wrap items-start justify-between gap-4 border-b p-5 ${isOpened ? "border-red-200" : "border-gray-100"}`}>
                    <div className="min-w-0">
                      <h2 className="break-words text-lg font-black">{candidate.name}</h2>
                      <p className="mt-1 break-all text-sm text-gray-600">{candidate.email}</p>
                      <p className="mt-1 text-sm text-gray-600">{candidate.phone || "No phone"} · {candidate.branch || "No branch"} · {candidate.year || "Year not provided"}</p>
                      <div className="mt-3 flex flex-wrap gap-2">{(candidate.events || []).map((event) => <span key={event} className="rounded-full bg-[#FFF3A9] px-3 py-1 text-xs font-bold">{event}</span>)}</div>
                      {isOpened && <p className="mt-3 inline-flex rounded-full bg-red-600 px-3 py-1 text-xs font-black text-white">DRIVE LINK OPENED</p>}
                      {isNotPerformed && <p className="mt-3 inline-flex rounded-full bg-gray-200 px-3 py-1 text-xs font-bold text-gray-700">NOT PERFORMED</p>}
                    </div>
                    <div className="rounded-lg bg-white/80 px-4 py-3"><p className="text-xs text-gray-500">Submitted links</p><p className="text-2xl font-black">{candidate.submittedLinks.length}</p></div>
                  </div>
                  <div className="space-y-3 p-5">
                    {candidate.submittedLinks.map((link, index) => (
                      <div key={`${link.url}-${index}`} className={`flex flex-wrap items-center justify-between gap-3 rounded-lg border p-3 sm:p-4 ${isOpened ? "border-red-200 bg-red-50" : "border-gray-200 bg-white"}`}>
                        <div className="flex min-w-0 flex-1 items-start gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FFF3A9] text-lg"><ExternalLink size={18} /></div><div className="min-w-0"><p className="text-sm font-bold">{link.label}</p><p className="mt-1 break-all text-xs text-gray-500">{link.url}</p></div></div>
                        {isValidHttpUrl(link.url) ? <a href={link.url} target="_blank" rel="noopener noreferrer" onClick={() => updateReviewStatus(candidate._id, "opened")} className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[#2B0A12] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#501321]">Open Drive ↗</a> : <span className="text-xs font-semibold text-red-600">Invalid URL</span>}
                      </div>
                    ))}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/10 pt-4">
                      <p className="text-xs text-gray-600">{isOpened ? "A Drive link was clicked. The card is marked red." : isNotPerformed ? "This candidate is marked as not performed." : "Open a submitted link to mark this card red."}</p>
                      <button type="button" onClick={() => updateReviewStatus(candidate._id, "not-performed")} className={`rounded-lg px-4 py-2 text-sm font-bold transition ${isNotPerformed ? "border border-gray-400 bg-white text-gray-700 hover:bg-gray-100" : "bg-red-600 text-white hover:bg-red-700"}`}>{isNotPerformed ? "✓ Marked Not Performed" : "Not Performed"}</button>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}
        <footer className="py-8 text-center text-xs text-gray-500">Cultural Synod · HEATS Administration Portal</footer>
      </main>
    </div>
  );
}
