import { useCallback, useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import {

  Eye, Check, X, RefreshCw, Search, Download, ChevronLeft, ChevronRight,

  LogOut, LayoutDashboard, Users, ExternalLink, ChevronDown, Mail, Phone,

  GraduationCap, CalendarDays, Filter, UserRound, Music, Image as ImageIcon,

  FileText, ClipboardList

} from "lucide-react";



const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, "");

const CLUBS = ["Dance", "Music", "Dramatics", "Fine Arts", "Photography"];

const GOLD = "#E8C879";



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



const display = (value) => value === undefined || value === null || value === "" ? "—" : value;

const dateLabel = (value) => value ? new Date(value).toLocaleString() : "—";

const getEventEntries = (candidate) => Array.isArray(candidate.eventEntries) ? candidate.eventEntries : [];

const getLinks = (candidate) => [

  ...(candidate.trackLink ? [{ label: "Dance audio track", url: candidate.trackLink }] : []),

  ...(Array.isArray(candidate.imageLinks) ? candidate.imageLinks.map((url, i) => ({ label: `Photography artwork ${i + 1}`, url })) : []),

  ...(Array.isArray(candidate.fineArtLinks) ? candidate.fineArtLinks.map((url, i) => ({ label: `Fine Arts artwork ${i + 1}`, url })) : []),

];



function StatusBadge({ status }) {

  const styles = status === "Selected"

    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"

    : status === "Rejected"

      ? "border-rose-400/30 bg-rose-400/10 text-rose-300"

      : "border-amber-300/30 bg-amber-300/10 text-amber-200";

  const label = status === "Selected" ? "Selected for next round" : status === "Rejected" ? "Not selected" : "Pending decision";

  return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold ${styles}`}>{label}</span>;

}



function StatCard({ title, value, icon: Icon, detail }) {

  return (

    <div className="rounded-2xl border border-white/10 bg-[#17151A] p-4 shadow-lg shadow-black/10 sm:p-5">

      <div className="flex items-center justify-between gap-3">

        <p className="text-xs font-semibold uppercase tracking-[.13em] text-white/55">{title}</p>

        <span className="rounded-xl border border-[#E8C879]/20 bg-[#E8C879]/10 p-2 text-[#E8C879]"><Icon size={18} /></span>

      </div>

      <p className="mt-4 text-3xl font-black tracking-tight text-white">{value}</p>

      <p className="mt-1 text-xs text-white/40">{detail}</p>

    </div>

  );

}



function InfoTile({ label, value, icon: Icon }) {

  return (

    <div className="min-w-0 rounded-xl border border-white/[.08] bg-black/20 p-3">

      <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.13em] text-white/40">

        {Icon && <Icon size={13} className="text-[#E8C879]" />} {label}

      </p>

      <p className="mt-1.5 break-words text-sm font-semibold leading-5 text-white/90">{display(value)}</p>

    </div>

  );

}



function ReviewModal({ candidate, onClose, onDecision, busy }) {

  if (!candidate) return null;

  const links = getLinks(candidate);

  const entries = getEventEntries(candidate);

  const hasNewFormat = entries.length > 0;

  const oldFields = [

    ["Participation type", candidate.participationType],

    ["Team name", candidate.teamName],

    ["Year", candidate.year],

  ];



  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>

      <section role="dialog" aria-modal="true" aria-labelledby="candidate-modal-title" className="max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-[#E8C879]/25 bg-[#100F12] text-white shadow-2xl shadow-black/50">

        <header className="sticky top-0 z-20 flex items-start justify-between gap-4 border-b border-white/10 bg-[#100F12]/95 p-5 backdrop-blur sm:p-7">

          <div className="min-w-0">

            <p className="text-[10px] font-black uppercase tracking-[.25em] text-[#E8C879]">Candidate profile</p>

            <h2 id="candidate-modal-title" className="mt-2 break-words text-2xl font-black sm:text-3xl">{display(candidate.name)}</h2>

            <p className="mt-1 break-all text-xs text-white/40">Registration ID: {candidate._id}</p>

            <div className="mt-3"><StatusBadge status={candidate.adminStatus} /></div>

          </div>

          <button type="button" onClick={onClose} aria-label="Close profile" className="rounded-xl border border-white/10 p-2.5 text-white/70 transition hover:border-white/25 hover:bg-white/10"><X size={20} /></button>

        </header>



        <div className="space-y-7 p-4 sm:p-7">

          <section>

            <h3 className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[.14em] text-[#E8C879]"><UserRound size={17} /> Personal details</h3>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">

              <InfoTile label="Full name" value={candidate.name} icon={UserRound} />

              <InfoTile label="Roll number" value={candidate.roll_no} icon={ClipboardList} />

              <InfoTile label="Branch / department" value={candidate.branch} icon={GraduationCap} />

              <InfoTile label="Email address" value={candidate.email} icon={Mail} />

              <InfoTile label="Mobile number" value={candidate.phone} icon={Phone} />

              <InfoTile label="Registration date" value={dateLabel(candidate.createdAt)} icon={CalendarDays} />

              {oldFields.map(([label, value]) => <InfoTile key={label} label={label} value={value} />)}

            </div>

          </section>



          <section>

            <h3 className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[.14em] text-[#E8C879]"><Users size={17} /> Event registrations & participants</h3>

            {hasNewFormat ? (

              <div className="space-y-3">

                {entries.map((entry, index) => (

                  <div key={`${entry.eventName || entry.event || "event"}-${index}`} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[.025]">

                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[.035] px-4 py-3">

                      <div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#E8C879]">Event {String(index + 1).padStart(2, "0")}</p><h4 className="mt-1 text-lg font-black">{display(entry.eventName || entry.event)}</h4></div>

                      <span className="rounded-full border border-[#E8C879]/25 bg-[#E8C879]/10 px-3 py-1.5 text-xs font-bold text-[#F1DDA8]">{display(entry.participationType)}</span>

                    </div>

                    <div className="grid gap-3 p-4 sm:grid-cols-2">

                      {["Duo", "Team"].includes(entry.participationType) && <InfoTile label={entry.participationType === "Duo" ? "Duo name" : "Team name"} value={entry.teamName} />}

                      <InfoTile label="Lead participant" value={candidate.name} />

                      <InfoTile label="Lead roll number" value={candidate.roll_no} />

                    </div>

                    {Array.isArray(entry.members) && entry.members.length > 0 && (

                      <div className="border-t border-white/10 p-4">

                        <p className="mb-3 text-xs font-bold uppercase tracking-[.13em] text-white/55">Additional participants ({entry.members.length})</p>

                        <div className="grid gap-3 lg:grid-cols-2">

                          {entry.members.map((member, i) => (

                            <div key={`${member.roll_no || member.name || "member"}-${i}`} className="rounded-xl border border-white/10 bg-[#0C0B0E] p-4">

                              <div className="mb-3 flex items-center gap-3">

                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E8C879]/10 text-xs font-black text-[#E8C879]">{String(i + 1).padStart(2, "0")}</span>

                                <div className="min-w-0"><p className="break-words font-bold">{display(member.name)}</p><p className="text-xs text-white/40">Roll no. {display(member.roll_no)}</p></div>

                              </div>

                              <div className="grid gap-2 sm:grid-cols-2">

                                <InfoTile label="Branch" value={member.branch} icon={GraduationCap} />

                                <InfoTile label="Phone" value={member.phone} icon={Phone} />

                                <div className="sm:col-span-2"><InfoTile label="Email" value={member.email} icon={Mail} /></div>

                              </div>

                            </div>

                          ))}

                        </div>

                      </div>

                    )}

                    {(!entry.members || entry.members.length === 0) && <p className="px-4 pb-4 text-xs text-white/40">{entry.participationType === "Solo" ? "Solo registration — lead participant is the only registered participant." : "No additional participants recorded."}</p>}

                  </div>

                ))}

              </div>

            ) : (

              <div className="rounded-2xl border border-white/10 bg-white/[.025] p-4">

                <div className="mb-3 flex flex-wrap gap-2">{(candidate.events || []).map((event) => <span key={event} className="rounded-full border border-[#E8C879]/25 bg-[#E8C879]/10 px-3 py-1 text-xs font-bold text-[#F1DDA8]">{event}</span>)}</div>

                <p className="text-sm text-white/50">This record uses the older registration format, so per-event participant details may not be available.</p>

              </div>

            )}

          </section>



          <section>

            <h3 className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[.14em] text-[#E8C879]"><ExternalLink size={17} /> Submitted work & links</h3>

            <div className="grid gap-2 sm:grid-cols-2">

              {links.map((link, index) => <a key={`${link.url}-${index}`} href={link.url} target="_blank" rel="noopener noreferrer" className="flex min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-white/[.025] p-3 transition hover:border-[#E8C879]/40 hover:bg-[#E8C879]/[.06]">

                <span className="rounded-lg bg-[#E8C879]/10 p-2 text-[#E8C879]"><ExternalLink size={16} /></span>

                <span className="min-w-0 flex-1"><span className="block text-sm font-bold">{link.label}</span><span className="mt-1 block truncate text-xs text-white/40">{link.url}</span></span>

              </a>)}

              {!links.length && <p className="rounded-xl border border-dashed border-white/15 p-4 text-sm text-white/40">No submitted links available.</p>}

            </div>

            <p className="mt-2 text-xs text-white/35">Google Drive files must be shared with the reviewer or set to an appropriate viewing permission.</p>

          </section>



          <div className="flex flex-col-reverse gap-2 border-t border-white/10 pt-5 sm:flex-row sm:justify-between">

            <button type="button" onClick={onClose} className="rounded-xl border border-white/15 px-4 py-3 text-sm font-bold text-white/75 transition hover:bg-white/5">Close profile</button>

            <div className="grid gap-2 sm:flex">

              <button type="button" disabled={busy} onClick={() => onDecision(candidate, "reject")} className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-400/25 bg-rose-500/10 px-4 py-3 text-sm font-bold text-rose-200 transition hover:bg-rose-500/20 disabled:opacity-50"><X size={16} /> Not selected</button>

              <button type="button" disabled={busy} onClick={() => onDecision(candidate, "approve")} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-black text-[#07130D] transition hover:bg-emerald-400 disabled:opacity-50"><Check size={16} /> Select for next round</button>

            </div>

          </div>

        </div>

      </section>

    </div>

  );

}



function CandidateCard({ candidate, onOpen, onDecision, busy }) {

  const entries = getEventEntries(candidate);

  const status = candidate.adminStatus;

  return (

    <article className="rounded-2xl border border-white/10 bg-[#17151A] p-4 transition hover:border-[#E8C879]/30 sm:p-5">

      <div className="flex flex-col gap-4 xl:flex-row xl:items-start">

        <div className="flex min-w-0 flex-1 gap-3">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#E8C879]/20 bg-[#E8C879]/10 text-lg font-black text-[#E8C879]">{(candidate.name || "?").trim().charAt(0).toUpperCase()}</div>

          <div className="min-w-0 flex-1">

            <div className="flex flex-wrap items-center gap-2"><h3 className="break-words text-lg font-black text-white">{display(candidate.name)}</h3><StatusBadge status={status} /></div>

            <p className="mt-1 break-all text-xs text-white/40">ID · {String(candidate._id || "").slice(-10)}</p>

            <div className="mt-3 flex flex-wrap gap-2">

              {(candidate.events || []).map((event) => <span key={event} className="rounded-full border border-[#E8C879]/20 bg-[#E8C879]/[.07] px-2.5 py-1 text-[10px] font-bold text-[#E8C879]">{event}</span>)}

              {entries.length > 0 && <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-white/55">{entries.length} event {entries.length === 1 ? "entry" : "entries"}</span>}

            </div>

          </div>

        </div>

        <div className="grid min-w-0 flex-1 gap-2 sm:grid-cols-2 xl:max-w-[580px]">

          <InfoTile label="Roll number" value={candidate.roll_no} icon={ClipboardList} />

          <InfoTile label="Branch / department" value={candidate.branch} icon={GraduationCap} />

          <InfoTile label="Email address" value={candidate.email} icon={Mail} />

          <InfoTile label="Mobile number" value={candidate.phone} icon={Phone} />

        </div>

        <div className="flex shrink-0 flex-wrap gap-2 xl:flex-col">

          <button type="button" onClick={() => onOpen(candidate)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#E8C879]/30 bg-[#E8C879]/10 px-3 py-2.5 text-xs font-bold text-[#F1DDA8] transition hover:bg-[#E8C879]/20 xl:flex-none"><Eye size={15} /> Full details</button>

          <button type="button" onClick={() => onDecision(candidate, "approve")} disabled={busy || status === "Selected"} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-3 py-2.5 text-xs font-black text-[#07130D] transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-35 xl:flex-none"><Check size={15} /> Select</button>

          <button type="button" onClick={() => onDecision(candidate, "reject")} disabled={busy || status === "Rejected"} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-rose-400/25 bg-rose-500/10 px-3 py-2.5 text-xs font-bold text-rose-200 transition hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-35 xl:flex-none"><X size={15} /> Reject</button>

        </div>

      </div>

      {entries.length > 0 && (

        <div className="mt-4 border-t border-white/[.07] pt-4">

          <p className="mb-2 text-[10px] font-black uppercase tracking-[.15em] text-white/40">Participation at a glance</p>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">

            {entries.map((entry, index) => <div key={`${entry.eventName || entry.event}-${index}`} className="rounded-xl border border-white/[.07] bg-black/20 px-3 py-2.5">

              <div className="flex items-center justify-between gap-2"><p className="text-sm font-bold">{display(entry.eventName || entry.event)}</p><span className="rounded-md bg-white/[.07] px-2 py-1 text-[10px] font-bold text-[#E8C879]">{display(entry.participationType)}</span></div>

              {entry.teamName && <p className="mt-1 text-xs text-white/50">Team: {entry.teamName}</p>}

              <p className="mt-1 text-xs text-white/40">{Array.isArray(entry.members) ? entry.members.length + (entry.members.length === 1 ? " additional participant" : " additional participants") : "Solo entry"}</p>

            </div>)}

          </div>

        </div>

      )}

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/[.07] pt-3 text-[11px] text-white/35">

        <CalendarDays size={13} /> Registered {dateLabel(candidate.createdAt)}

      </div>

    </article>

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

  const [candidateNameInput, setCandidateNameInput] = useState("");

  const [candidateRollInput, setCandidateRollInput] = useState("");

  const [candidateLookupLoading, setCandidateLookupLoading] = useState(false);

  const [candidateLookupError, setCandidateLookupError] = useState("");

  const [candidateLookupResults, setCandidateLookupResults] = useState([]);



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



  async function lookupCandidate(event) {

    event.preventDefault();

    const enteredName = candidateNameInput.trim().toLowerCase().replace(/\s+/g, " ");

    const enteredRoll = candidateRollInput.trim().toLowerCase();

    if (!enteredName || !enteredRoll) {

      setCandidateLookupError("Enter both the candidate’s full name and roll number.");

      setCandidateLookupResults([]);

      return;

    }



    setCandidateLookupLoading(true);

    setCandidateLookupError("");

    setCandidateLookupResults([]);

    try {

      // Search by roll number first (normally unique), then verify the name too.

      const params = new URLSearchParams({ search: candidateRollInput.trim(), page: "1", limit: "100" });

      let result = await apiRequest(`/api/admin/candidates?${params.toString()}`);

      let rows = result.candidates || [];

      let matches = rows.filter((candidate) =>

        String(candidate.roll_no || "").trim().toLowerCase() === enteredRoll &&

        String(candidate.name || "").trim().toLowerCase().replace(/\s+/g, " ") === enteredName

      );



      // If the API's search behavior doesn't return a roll-number match, search by name.

      if (matches.length === 0) {

        const nameParams = new URLSearchParams({ search: candidateNameInput.trim(), page: "1", limit: "100" });

        result = await apiRequest(`/api/admin/candidates?${nameParams.toString()}`);

        rows = result.candidates || [];

        matches = rows.filter((candidate) =>

          String(candidate.roll_no || "").trim().toLowerCase() === enteredRoll &&

          String(candidate.name || "").trim().toLowerCase().replace(/\s+/g, " ") === enteredName

        );

      }



      setCandidateLookupResults(matches);

      if (matches.length === 0) {

        setCandidateLookupError("No candidate matched both details. Check the spelling of the name and roll number.");

      }

    } catch (err) {

      if (err.message === "SESSION_EXPIRED") { navigate("/admin/login", { replace: true }); return; }

      setCandidateLookupError(err.message || "Could not search for this candidate.");

    } finally {

      setCandidateLookupLoading(false);

    }

  }



  function exportCSV() {

    const columns = ["Name", "Roll Number", "Email", "Phone", "Branch", "Year", "Events", "Event Participation Details", "Next Round Decision", "Registration Date"];

    const rows = candidates.map((candidate) => [

      candidate.name, candidate.roll_no, candidate.email, candidate.phone, candidate.branch, candidate.year,

      (candidate.events || []).join(", "),

      getEventEntries(candidate).map((entry) => `${entry.eventName || entry.event}: ${entry.participationType}${entry.teamName ? ` (${entry.teamName})` : ""}; Members: ${(entry.members || []).map((m) => `${m.name} / ${m.roll_no} / ${m.branch} / ${m.phone} / ${m.email}`).join(" | ")}`).join(" | "),

      candidate.adminStatus === "Selected" ? "Selected for next round" : candidate.adminStatus === "Rejected" ? "Not selected for next round" : "Pending",

      candidate.createdAt ? new Date(candidate.createdAt).toLocaleString() : "",

    ]);

    const escapeCSV = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;

    const csv = [columns, ...rows].map((row) => row.map(escapeCSV).join(",")).join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url; link.download = `cultural-sub-council-registrations-page-${page}.csv`; link.click();

    URL.revokeObjectURL(url);

  }



  return (

    <div className="relative min-h-screen overflow-hidden bg-[#0B0A0D] text-white"><div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-0 overflow-hidden"><div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#6D1735]/20 blur-[120px]" /><div className="absolute -right-40 top-[35rem] h-96 w-96 rounded-full bg-[#E8C879]/[.07] blur-[120px]" /></div>

      <header className="sticky top-0 z-30 border-b border-[#E8C879]/20 bg-[#100F12]/90 shadow-[0_8px_40px_rgba(0,0,0,.25)] backdrop-blur-2xl">

        <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">

          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#F1DDA8]/50 bg-gradient-to-br from-[#F5DEA0] to-[#C99A45] text-lg font-black text-[#21150A] shadow-lg shadow-[#E8C879]/10">C</div>

            <div className="min-w-0"><p className="truncate text-xs font-black tracking-[.16em] sm:text-sm">CULTURAL SUB-COUNCIL</p><p className="mt-0.5 truncate text-[10px] text-white/40">HEATS · ADMINISTRATION PORTAL</p></div>

          </div>

          <div className="flex items-center gap-2 sm:gap-3">

            <span className="hidden max-w-48 truncate text-xs text-white/45 sm:inline">{admin?.email || "Administrator"}</span>

            <button onClick={loadDashboard} disabled={loading} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-xs font-bold text-white/75 transition hover:border-[#E8C879]/30 hover:text-[#E8C879] disabled:opacity-50"><RefreshCw size={15} className={loading ? "animate-spin" : ""}/><span className="hidden sm:inline">Refresh</span></button>

            <button onClick={handleLogout} disabled={loggingOut} className="inline-flex items-center gap-2 rounded-xl border border-rose-400/20 px-3 py-2.5 text-xs font-bold text-rose-200 transition hover:bg-rose-500/10 disabled:opacity-50"><LogOut size={15}/><span className="hidden sm:inline">{loggingOut ? "Signing out…" : "Sign out"}</span></button>

          </div>

        </div>

      </header>



      <div className="relative z-10 mx-auto grid max-w-[1800px] lg:grid-cols-[230px_minmax(0,1fr)]">

        <aside className="border-b border-white/10 bg-[#100F12] p-3 lg:min-h-[calc(100vh-65px)] lg:border-b-0 lg:border-r lg:p-5">

          <p className="hidden px-3 pb-3 pt-2 text-[10px] font-black uppercase tracking-[.2em] text-white/30 lg:block">Workspace</p>

          <nav className="flex gap-2 overflow-x-auto lg:flex-col">

            <a href="#overview" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#E8C879] px-4 py-3 text-xs font-black text-[#21150A]"><LayoutDashboard size={16}/> Dashboard</a>

            <a href="#registrations" className="inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold text-white/60 transition hover:bg-white/5 hover:text-white"><Users size={16}/> Registrations</a>

            <a href="#candidate-lookup" className="inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold text-white/60 transition hover:bg-white/5 hover:text-white"><Search size={16}/> Candidate</a>

            <button type="button" onClick={() => setDriveLinksOpen((open) => !open)} aria-expanded={driveLinksOpen} className="inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-left text-xs font-semibold text-white/60 transition hover:bg-white/5 hover:text-white"><ExternalLink size={16}/> Drive links <ChevronDown size={14} className={`transition ${driveLinksOpen ? "rotate-180" : ""}`}/></button>

          </nav>

          {driveLinksOpen && <div className="mt-2 flex flex-wrap gap-2 lg:flex-col lg:pl-3">{CLUBS.map((clubName) => <button key={clubName} type="button" onClick={() => navigate(`/admin/drive-links?club=${encodeURIComponent(clubName)}`)} className="rounded-lg border border-white/10 px-3 py-2 text-left text-xs text-white/55 transition hover:border-[#E8C879]/30 hover:text-[#E8C879]">{clubName}</button>)}</div>}

          <div className="mt-6 hidden rounded-2xl border border-[#E8C879]/15 bg-[#E8C879]/[.04] p-4 lg:block"><p className="text-xs font-black text-[#E8C879]">Review tip</p><p className="mt-2 text-xs leading-5 text-white/45">Open “Full details” on a candidate card to inspect every event, team member and submission link.</p></div>

        </aside>



        <main id="overview" className="min-w-0 px-3 py-5 sm:px-5 sm:py-7 lg:px-8">

          <div className="relative mb-7 overflow-hidden rounded-[1.75rem] border border-[#E8C879]/20 bg-gradient-to-br from-[#35101F] via-[#171319] to-[#111014] p-5 shadow-2xl shadow-black/20 sm:p-8"><div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-12 h-48 w-48 rounded-full border border-[#E8C879]/15 sm:h-64 sm:w-64" /><div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div><p className="text-[10px] font-black uppercase tracking-[.25em] text-[#E8C879]">Registration management</p><h1 className="mt-2 text-2xl font-black tracking-tight sm:text-4xl">Candidate dashboard</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-white/45">All participant information at a glance, with per-event team details available in each profile.</p></div>

            <button onClick={exportCSV} disabled={candidates.length === 0} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E8C879] px-4 py-3 text-xs font-black text-[#21150A] transition hover:bg-[#F2DDA5] disabled:cursor-not-allowed disabled:opacity-40"><Download size={16}/> Export current page</button>

          </div></div>



          <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">

            <StatCard title="Total registrations" value={pagination.total} icon={Users} detail="Matching current search and event"/>

            <StatCard title="Selected" value={selectedCount} icon={Check} detail="On this page"/>

            <StatCard title="Not selected" value={notSelectedCount} icon={X} detail="On this page"/>

            <StatCard title="Pending decision" value={pendingCount} icon={ClipboardList} detail="On this page"/>

          </section>



          <section className="mt-5">

            <div className="mb-3 flex items-center gap-2"><Filter size={16} className="text-[#E8C879]"/><h2 className="text-sm font-black uppercase tracking-[.14em] text-white/75">Browse by event</h2></div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-7">

              {CLUBS.map((item) => <button key={item} onClick={() => { setClub(club === item ? "" : item); setPage(1); }} className={`rounded-xl border p-3 text-left transition ${club === item ? "border-[#E8C879]/60 bg-[#E8C879]/10" : "border-white/10 bg-[#17151A] hover:border-white/20"}`}><p className="text-[10px] font-bold uppercase tracking-wider text-white/40">Event filter</p><p className={`mt-1 text-xs font-bold ${club === item ? "text-[#E8C879]" : "text-white/80"}`}>{item}</p><p className="mt-2 text-xl font-black">{clubCounts[item] ?? 0}</p></button>)}

            </div>

          </section>



          <section className="mt-5 rounded-2xl border border-white/10 bg-[#131216] p-3 sm:p-4">

            <form className="grid gap-2 sm:grid-cols-2 xl:grid-cols-[minmax(220px,1.5fr)_minmax(140px,1fr)_minmax(170px,1fr)_auto]" onSubmit={(event) => { event.preventDefault(); setPage(1); setSearch(searchInput.trim()); }}>

              <label className="relative block"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35"/><input type="search" value={searchInput} onChange={(event) => setSearchInput(event.target.value)} placeholder="Search name, roll no., email, phone…" className="w-full rounded-xl border border-white/10 bg-[#0B0A0D] py-3 pl-10 pr-3 text-xs text-white outline-none placeholder:text-white/30 focus:border-[#E8C879]/50"/></label>

              <select value={club} onChange={(event) => { setClub(event.target.value); setPage(1); }} className="rounded-xl border border-white/10 bg-[#0B0A0D] px-3 py-3 text-xs text-white outline-none focus:border-[#E8C879]/50"><option value="">All events</option>{CLUBS.map((item) => <option key={item} value={item}>{item}</option>)}</select>

              <select value={decisionFilter} onChange={(event) => setDecisionFilter(event.target.value)} className="rounded-xl border border-white/10 bg-[#0B0A0D] px-3 py-3 text-xs text-white outline-none focus:border-[#E8C879]/50"><option value="">All decisions</option><option value="Pending">Pending</option><option value="Selected">Selected for next round</option><option value="Rejected">Not selected</option></select>

              <button type="submit" className="rounded-xl bg-white px-5 py-3 text-xs font-black text-[#17151A] transition hover:bg-[#E8C879]">Search</button>

            </form>

            <button onClick={clearFilters} className="mt-2 rounded-lg px-2 py-2 text-xs font-semibold text-white/40 transition hover:text-[#E8C879]">Clear all filters</button>

          </section>



          <section id="candidate-lookup" className="mt-7 scroll-mt-24 rounded-2xl border border-[#E8C879]/20 bg-[#131216] p-4 sm:p-6">

            <div className="mb-4 flex items-start gap-3">

              <div className="rounded-xl border border-[#E8C879]/20 bg-[#E8C879]/10 p-3 text-[#E8C879]"><Search size={20}/></div>

              <div>

                <h2 className="text-xl font-black">Find a candidate</h2>

                <p className="mt-1 text-sm leading-6 text-white/45">Enter the candidate’s full name and roll number to open their complete registration profile.</p>

              </div>

            </div>

            <form onSubmit={lookupCandidate} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">

              <label className="block"><span className="mb-1.5 block text-xs font-bold text-white/55">Candidate full name</span><input value={candidateNameInput} onChange={(event) => setCandidateNameInput(event.target.value)} autoComplete="off" placeholder="e.g. Rahul Kumar" className="w-full rounded-xl border border-white/10 bg-[#0B0A0D] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#E8C879]/50" required/></label>

              <label className="block"><span className="mb-1.5 block text-xs font-bold text-white/55">Roll number</span><input value={candidateRollInput} onChange={(event) => setCandidateRollInput(event.target.value)} autoComplete="off" placeholder="Enter roll number" className="w-full rounded-xl border border-white/10 bg-[#0B0A0D] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#E8C879]/50" required/></label>

              <button type="submit" disabled={candidateLookupLoading} className="inline-flex items-center justify-center gap-2 self-end rounded-xl bg-[#E8C879] px-5 py-3 text-sm font-black text-[#21150A] transition hover:bg-[#F2DDA5] disabled:cursor-wait disabled:opacity-60"><Search size={16}/>{candidateLookupLoading ? "Searching…" : "Find candidate"}</button>

            </form>

            {candidateLookupError && <p role="alert" className="mt-4 rounded-xl border border-rose-400/25 bg-rose-500/10 p-3 text-sm text-rose-200">{candidateLookupError}</p>}

            {candidateLookupResults.length > 0 && <div className="mt-4 space-y-3">{candidateLookupResults.map((candidate) => <div key={candidate._id} className="flex flex-col gap-3 rounded-xl border border-white/10 bg-black/20 p-4 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><p className="break-words font-bold text-white">{display(candidate.name)}</p><p className="mt-1 text-xs text-white/45">Roll no. {display(candidate.roll_no)} · {display(candidate.branch)} · {display(candidate.email)}</p><div className="mt-2"><StatusBadge status={candidate.adminStatus}/></div></div><button type="button" onClick={() => setReviewCandidate(candidate)} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[#E8C879]/30 bg-[#E8C879]/10 px-4 py-3 text-xs font-black text-[#F1DDA8] transition hover:bg-[#E8C879]/20"><Eye size={15}/> Open full details</button></div>)}</div>}

          </section>



          <section id="registrations" className="mt-7 scroll-mt-24">

            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">

              <div><h2 className="text-xl font-black sm:text-2xl">Registered participants</h2><p className="mt-1 text-xs text-white/40">{pagination.total} matching registrations · Page {pagination.page} of {Math.max(1, pagination.pages)}</p></div>

              <p className="text-xs text-white/35">Showing up to 50 registrations per page</p>

            </div>

            {error && <div role="alert" className="mb-4 rounded-xl border border-rose-400/25 bg-rose-500/10 p-4 text-sm text-rose-200">{error}</div>}

            {notice && <div role="status" className="mb-4 rounded-xl border border-emerald-400/25 bg-emerald-500/10 p-4 text-sm text-emerald-200">{notice}</div>}

            {loading ? <div className="rounded-2xl border border-white/10 bg-[#17151A] px-4 py-20 text-center text-sm text-white/50"><RefreshCw size={22} className="mx-auto mb-3 animate-spin text-[#E8C879]"/>Loading registrations…</div>

              : visibleCandidates.length === 0 ? <div className="rounded-2xl border border-dashed border-white/15 bg-[#17151A] px-4 py-20 text-center"><Users size={28} className="mx-auto text-white/25"/><p className="mt-3 font-bold">No registrations found</p><p className="mt-1 text-xs text-white/40">Try clearing filters or refreshing the dashboard.</p></div>

              : <div className="space-y-3">{visibleCandidates.map((candidate) => <CandidateCard key={candidate._id} candidate={candidate} onOpen={setReviewCandidate} onDecision={quickDecision} busy={busyId === candidate._id}/>)}</div>}

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#17151A] p-3 sm:p-4"><p className="text-xs text-white/40">Showing {visibleCandidates.length} records on this page</p><div className="flex items-center gap-2"><button onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page <= 1 || loading} className="inline-flex items-center gap-1 rounded-xl border border-white/10 px-3 py-2.5 text-xs font-bold text-white/70 hover:border-[#E8C879]/30 disabled:opacity-30"><ChevronLeft size={14}/> Previous</button><span className="px-2 text-xs font-bold text-[#E8C879]">{page} / {Math.max(1, pagination.pages)}</span><button onClick={() => setPage((current) => Math.min(pagination.pages || 1, current + 1))} disabled={page >= pagination.pages || loading} className="inline-flex items-center gap-1 rounded-xl border border-white/10 px-3 py-2.5 text-xs font-bold text-white/70 hover:border-[#E8C879]/30 disabled:opacity-30">Next <ChevronRight size={14}/></button></div></div>

          </section>

          <footer className="py-8 text-center text-[10px] tracking-wide text-white/25 sm:text-xs">Cultural Sub-Council · HEATS Administration Portal</footer>

        </main>

      </div>

      <ReviewModal candidate={reviewCandidate} onClose={() => setReviewCandidate(null)} onDecision={quickDecision} busy={Boolean(busyId && reviewCandidate && busyId === reviewCandidate._id)}/>

    </div>

  );

}
