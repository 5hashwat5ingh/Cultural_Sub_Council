import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ExternalLink,
  RefreshCw,
  Search,
  Image as ImageIcon,
  Music2,
  Palette,
  CheckCircle2,
  CircleSlash2,
} from "lucide-react";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, "");
const STORAGE_KEY = "heats-drive-review-status";
const PAGE_SIZE = 100;
const CLUBS = ["Dance", "Music", "Dramatics", "Fine Arts", "Photography"];

async function apiRequest(path) {
  const response = await fetch(`${API_URL}${path}`, { credentials: "include" });
  const data = await response.json().catch(() => ({}));
  if (response.status === 401) throw new Error("SESSION_EXPIRED");
  if (!response.ok) throw new Error(data.message || "Could not load registrations.");
  return data;
}

function asUrlList(value) {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.flatMap((item) => {
      if (typeof item === "string") return [item];
      if (item && typeof item === "object") {
        const url = item.url || item.link || item.driveLink || item.href;
        return typeof url === "string" ? [url] : [];
      }
      return [];
    });
  }
  if (typeof value === "string") return [value];
  if (typeof value === "object") {
    const url = value.url || value.link || value.driveLink || value.href;
    return typeof url === "string" ? [url] : [];
  }
  return [];
}

function getCandidateLinks(candidate) {
  const links = [];
  const add = (club, label, value, icon) => {
    asUrlList(value).forEach((url, index) => {
      const cleanUrl = String(url || "").trim();
      if (cleanUrl) links.push({ club, label: asUrlList(value).length > 1 ? `${label} ${index + 1}` : label, url: cleanUrl, icon });
    });
  };

  // Known fields used by the registration form.
  add("Dance", "Audio Track", candidate.trackLink || candidate.audioLink || candidate.audioTrackLink, Music2);
  add("Photography", "Photo", candidate.imageLinks || candidate.photoLinks || candidate.photographyLinks, ImageIcon);
  add("Fine Arts", "Artwork", candidate.fineArtLinks || candidate.artworkLinks || candidate.portfolioLinks, Palette);

  // Some versions of the registration form save links in nested event/submission fields.
  const nested = [candidate.submissions, candidate.events, candidate.eventSubmissions, candidate.performances];
  nested.forEach((collection) => {
    if (!Array.isArray(collection)) return;
    collection.forEach((entry) => {
      if (!entry || typeof entry !== "object") return;
      const eventName = String(entry.event || entry.eventName || entry.club || entry.category || "").toLowerCase();
      const values = [entry.driveLink, entry.trackLink, entry.audioLink, entry.link, entry.url, entry.imageLinks, entry.photoLinks, entry.fineArtLinks, entry.artworkLinks, entry.links];
      const icon = /music|dance|audio|song/.test(eventName) ? Music2 : /fine.?art|artwork|paint/.test(eventName) ? Palette : ImageIcon;
      const club = /music|dance|audio|song/.test(eventName) ? "Dance" : /fine.?art|artwork|paint/.test(eventName) ? "Fine Arts" : /photo|image/.test(eventName) ? "Photography" : (CLUBS.includes(entry.club) ? entry.club : "Dramatics");
      values.forEach((value, i) => add(club, entry.label || entry.title || `Submission ${i + 1}`, value, icon));
    });
  });

  // Remove duplicates while retaining the first label and club assignment.
  const seen = new Set();
  return links.filter((link) => {
    const key = `${link.club}|${link.url}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
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

  useEffect(() => setClub(selectedClub), [selectedClub]);

  const loadCandidates = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      let page = 1;
      let allCandidates = [];
      let lastPage = 1;

      // The API limits each response to 100 registrations. Fetch every page.
      do {
        const params = new URLSearchParams({ limit: String(PAGE_SIZE), page: String(page) });
        const result = await apiRequest(`/api/admin/candidates?${params.toString()}`);
        const batch = Array.isArray(result.candidates) ? result.candidates : [];
        allCandidates = allCandidates.concat(batch);

        const pagination = result.pagination || {};
        const reportedPages = Number(pagination.pages ?? pagination.totalPages ?? result.totalPages);
        if (Number.isFinite(reportedPages) && reportedPages > 0) {
          lastPage = reportedPages;
        } else if (batch.length === PAGE_SIZE) {
          // If the API omits page metadata, continue until a short/empty page arrives.
          lastPage = page + 1;
        } else {
          lastPage = page;
        }

        if (batch.length === 0) break;
        page += 1;
      } while (page <= lastPage);

      // Guard against duplicate records if the backend returns overlapping pages.
      const unique = new Map();
      allCandidates.forEach((candidate, index) => {
        const key = candidate._id || candidate.id || `${candidate.email || "candidate"}-${index}`;
        unique.set(key, candidate);
      });
      setCandidates(Array.from(unique.values()));
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
        // Status remains available in this session if storage is blocked.
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
      .map((candidate) => {
        const allLinks = getCandidateLinks(candidate);
        const submittedLinks = club ? allLinks.filter((link) => link.club === club) : allLinks;
        return { ...candidate, submittedLinks };
      })
      .filter((candidate) => {
        if (!candidate.submittedLinks.length) return false;
        const events = Array.isArray(candidate.events) ? candidate.events.join(" ") : String(candidate.events || "");
        const searchable = [
          candidate.name, candidate.roll_no, candidate.rollNo, candidate.email, candidate.phone,
          candidate.branch, candidate.teamName, events,
          ...candidate.submittedLinks.map((link) => `${link.club} ${link.label} ${link.url}`),
        ].filter(Boolean).join(" ").toLowerCase();
        return !query || searchable.includes(query);
      });
  }, [candidates, search, club]);

  const totalLinks = filteredCandidates.reduce((total, candidate) => total + candidate.submittedLinks.length, 0);
  const openedCount = filteredCandidates.filter((candidate) => reviewStatuses[candidate._id] === "opened").length;
  const notPerformedCount = filteredCandidates.filter((candidate) => reviewStatuses[candidate._id] === "not-performed").length;

  return (
    <div className="min-h-screen bg-[#F8F7F2] text-[#211217]">
      <header className="h-2 bg-[#FFE76A]" />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#98712A]">Cultural Sub-Council / Administration</p>
            <h1 className="mt-2 text-2xl font-black sm:text-4xl">Candidate Drive Links</h1>
            <p className="mt-2 text-sm text-gray-600">Review submitted performances, photographs, and Fine Arts portfolios.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/admin/dashboard" className="rounded-lg border border-[#2B0A12] px-4 py-2 text-sm font-bold text-[#2B0A12] transition hover:bg-[#2B0A12] hover:text-white">← Dashboard</Link>
            <button type="button" onClick={loadCandidates} disabled={loading} className="inline-flex items-center gap-2 rounded-lg bg-[#2B0A12] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#501321] disabled:opacity-50"><RefreshCw size={15} className={loading ? "animate-spin" : ""} />{loading ? "Loading..." : "Refresh"}</button>
          </div>
        </div>

        <section className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-[#F0D85C] bg-[#FFE76A] p-5"><p className="text-sm font-bold">Candidates with links</p><p className="mt-2 text-3xl font-black">{filteredCandidates.length}</p></div>
          <div className="rounded-xl border border-gray-200 bg-white p-5"><p className="text-sm font-bold">Submitted links</p><p className="mt-2 text-3xl font-black">{totalLinks}</p></div>
          <div className="rounded-xl border border-red-200 bg-red-50 p-5"><p className="flex items-center gap-2 text-sm font-bold text-red-700"><CheckCircle2 size={16} /> Link opened</p><p className="mt-2 text-3xl font-black text-red-700">{openedCount}</p></div>
          <div className="rounded-xl border border-gray-200 bg-white p-5"><p className="flex items-center gap-2 text-sm font-bold"><CircleSlash2 size={16} /> Not performed</p><p className="mt-2 text-3xl font-black">{notPerformedCount}</p></div>
        </section>

        <section className="mt-5 rounded-xl border border-gray-200 bg-white p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="relative block"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, roll no., email, phone, or club..." className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-[#98712A] focus:ring-2 focus:ring-[#FFE76A]/50" /></label>
            <select value={club} onChange={(event) => changeClub(event.target.value)} className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#98712A]"><option value="">All clubs with submissions</option>{CLUBS.map((item) => <option key={item} value={item}>{item}</option>)}</select>
          </div>
          <p className="mt-2 text-xs text-gray-500">Each submission is labelled with its club. Selecting a club shows only that club’s links.</p>
        </section>

        {error && <div role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

        {loading ? (
          <div className="py-20 text-center text-gray-500"><RefreshCw size={22} className="mx-auto mb-3 animate-spin" />Loading candidate links...</div>
        ) : filteredCandidates.length === 0 ? (
          <div className="mt-5 rounded-xl border border-gray-200 bg-white px-5 py-16 text-center"><div className="text-4xl">📂</div><h2 className="mt-3 text-lg font-bold">No submitted links found</h2><p className="mt-2 text-sm text-gray-500">Try another search or club filter. If links still do not appear, check the registration schema and API response field names.</p></div>
        ) : (
          <section className="mt-5 space-y-4">
            {filteredCandidates.map((candidate) => {
              const candidateId = candidate._id || candidate.id;
              const status = reviewStatuses[candidateId];
              const isOpened = status === "opened";
              const isNotPerformed = status === "not-performed";
              const events = (Array.isArray(candidate.events) ? candidate.events : []).join(", ") || "No events listed";
              return (
                <article key={candidateId} className={`overflow-hidden rounded-2xl border shadow-sm transition-colors duration-200 ${isOpened ? "border-red-300 bg-red-50" : "border-gray-200 bg-white"}`}>
                  <div className={`flex flex-wrap items-start justify-between gap-4 border-b p-5 ${isOpened ? "border-red-200" : "border-gray-100"}`}>
                    <div className="min-w-0">
                      <h2 className="break-words text-lg font-black">{candidate.name || "Unnamed candidate"}</h2>
                      <p className="mt-1 break-all text-sm text-gray-600">{candidate.email || "No email provided"}</p>
                      <p className="mt-1 text-sm text-gray-600">Roll no. {candidate.roll_no || candidate.rollNo || "—"} · {candidate.phone || "No phone"} · {candidate.branch || "No branch"} · {candidate.year || "Year not provided"}</p>
                      <p className="mt-1 text-xs text-gray-500">Registered for: {events}</p>
                      {isOpened && <p className="mt-3 inline-flex rounded-full bg-red-600 px-3 py-1 text-xs font-black text-white">DRIVE LINK OPENED</p>}
                      {isNotPerformed && <p className="mt-3 inline-flex rounded-full bg-gray-200 px-3 py-1 text-xs font-bold text-gray-700">NOT PERFORMED</p>}
                    </div>
                    <div className="rounded-lg bg-white/80 px-4 py-3"><p className="text-xs text-gray-500">Submitted links shown</p><p className="text-2xl font-black">{candidate.submittedLinks.length}</p></div>
                  </div>

                  <div className="space-y-3 p-5">
                    {candidate.submittedLinks.map((link, index) => {
                      const Icon = link.icon || ExternalLink;
                      return (
                        <div key={`${link.club}-${link.url}-${index}`} className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border p-3 sm:p-4 ${isOpened ? "border-red-200 bg-red-50" : "border-gray-200 bg-white"}`}>
                          <div className="flex min-w-0 flex-1 items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FFF3A9] text-[#2B0A12]"><Icon size={18} /></div>
                            <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-[#2B0A12] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#FFE76A]">{link.club}</span><p className="text-sm font-bold">{link.label}</p></div><p className="mt-2 break-all text-xs text-gray-500">{link.url}</p></div>
                          </div>
                          {isValidHttpUrl(link.url) ? <a href={link.url} target="_blank" rel="noopener noreferrer" onClick={() => updateReviewStatus(candidateId, "opened")} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#2B0A12] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#501321]">Open Drive <ExternalLink size={15} /></a> : <span className="text-xs font-semibold text-red-600">Invalid URL</span>}
                        </div>
                      );
                    })}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/10 pt-4"><p className="text-xs text-gray-600">{isOpened ? "A Drive link was clicked. The card is marked red." : isNotPerformed ? "This candidate is marked as not performed." : "Open a submitted link to mark this card red."}</p><button type="button" onClick={() => updateReviewStatus(candidateId, isNotPerformed ? "" : "not-performed")} className={`rounded-lg px-4 py-2 text-sm font-bold transition ${isNotPerformed ? "border border-gray-400 bg-white text-gray-700 hover:bg-gray-100" : "bg-red-600 text-white hover:bg-red-700"}`}>{isNotPerformed ? "✓ Marked Not Performed — Undo" : "Not Performed"}</button></div>
                  </div>
                </article>
              );
            })}
          </section>
        )}
        <footer className="py-8 text-center text-xs text-gray-500">Cultural Sub-Council · HEATS Administration Portal</footer>
      </main>
    </div>
  );
}
