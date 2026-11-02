import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const EVENTS = [
  {
    name: "Dance",
    icon: "✦",
    desc: "Movement, choreography and stage energy",
    types: ["Solo", "Duo", "Team"],
  },
  {
    name: "Music",
    icon: "♫",
    desc: "Vocal and instrumental performances",
    types: ["Solo"],
  },
  {
    name: "Dramatics",
    icon: "✧",
    desc: "Acting, theatre and storytelling",
    types: ["Solo", "Duo", "Team"],
  },
  {
    name: "Fine Arts",
    icon: "✿",
    desc: "Painting and visual expression",
    types: ["Solo"],
  },
  {
    name: "Photography",
    icon: "◎",
    desc: "Capture a story through your lens",
    types: ["Solo"],
  },
];

const inputClass =
  "mt-2 w-full rounded-xl border border-[#e8dece] bg-white px-4 py-3 text-sm text-[#32131b] outline-none placeholder:text-[#ad9d90] focus:border-[#7a1b2f] focus:ring-4 focus:ring-[#7a1b2f]/10";

const primary =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-[#7a1b2f] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#5e1223] disabled:cursor-not-allowed disabled:opacity-50";

const secondary =
  "inline-flex items-center justify-center rounded-xl border border-[#dfd0b8] bg-white px-5 py-3 text-sm font-bold text-[#6f2435] transition hover:bg-[#fbf4e8] disabled:cursor-not-allowed disabled:opacity-50";

const blankMember = () => ({
  name: "",
  roll_no: "",
  branch: "",
  phone: "",
  email: "",
});

const blankEntry = (name) => ({
  eventName: name,
  participationType: EVENTS.find((event) => event.name === name).types[0],
  teamName: "",
  members: [],
});

const isValidRollNumber = (value) => /^2026\d{6}$/.test(value.trim());
const isValidPhone = (value) => /^[6-9]\d{9}$/.test(value.trim());
const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const isDriveLink = (value) => {
  try {
    const url = new URL(value.trim());
    return (
      url.protocol === "https:" &&
      ["drive.google.com", "docs.google.com"].includes(url.hostname)
    );
  } catch {
    return false;
  }
};

const parseDriveLinks = (value) =>
  value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);

function Field({ label, hint, error, children }) {
  return (
    <label className="block min-w-0 text-sm font-semibold text-[#48232b]">
      {label}
      {hint && (
        <span className="ml-2 text-xs font-normal text-[#9a887a]">
          {hint}
        </span>
      )}
      {children}
      {error && (
        <span className="mt-1 block text-xs font-medium text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
  ...props
}) {
  return (
    <input
      {...props}
      type={type}
      className={inputClass}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
    />
  );
}

function Heading({ eyebrow, title, desc }) {
  return (
    <div className="mb-6">
      <p className="text-[10px] font-black uppercase tracking-[.24em] text-[#9b7133]">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-tight text-[#32131b] sm:text-3xl">
        {title}
      </h2>
      {desc && (
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#8a776b]">
          {desc}
        </p>
      )}
    </div>
  );
}

function StatusScreen({ title, message, children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fbf5e9] p-4 text-[#32131b]">
      <div className="w-full max-w-lg rounded-[2rem] border border-[#e9deca] bg-white p-8 text-center shadow-xl sm:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-white">
          <img
            src="/Logo.png"
            alt="Cultural Sub-Council Logo"
            className="h-full w-full object-contain"
          />
        </div>
        <p className="mt-7 text-xs font-black uppercase tracking-[.24em] text-[#9b7133]">
          Cultural Sub-Council
        </p>
        <h1 className="mt-3 text-3xl font-black">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-[#8a776b]">{message}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {children}
          <Link to="/" className={secondary}>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Registration() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [registrationId, setRegistrationId] = useState("");
  const [errors, setErrors] = useState({});

  // null means the status has not yet been verified.
  const [registrationOpen, setRegistrationOpen] = useState(null);
  const [registrationStatusLoading, setRegistrationStatusLoading] =
    useState(true);
  const [registrationStatusError, setRegistrationStatusError] = useState("");

  const [form, setForm] = useState({
    name: "",
    roll_no: "",
    branch: "",
    phone: "",
    email: "",
    selectedEvents: [],
    eventEntries: {},
    trackLink: "",
    imageLinks: "",
    fineArtLinks: "",
    confirmed: false,
  });

  const selectedEvents = EVENTS.filter((event) =>
    form.selectedEvents.includes(event.name)
  );

  // Public endpoint; no admin authentication is required.
  const loadRegistrationStatus = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/registrations/status`, {
        method: "GET",
        cache: "no-store",
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || typeof result.registrationOpen !== "boolean") {
        throw new Error(
          result.message || "Could not verify registration availability."
        );
      }

      setRegistrationOpen(result.registrationOpen);
      setRegistrationStatusError("");
    } catch (error) {
      // Keep the last verified status during a temporary polling failure.
      // On the first load, null means the page remains safely unavailable.
      setRegistrationStatusError(
        error.message || "Unable to connect to the registration server."
      );
    } finally {
      setRegistrationStatusLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRegistrationStatus();
    const intervalId = window.setInterval(loadRegistrationStatus, 15000);
    return () => window.clearInterval(intervalId);
  }, [loadRegistrationStatus]);

  const update = (key, value) => {
    setForm((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: "", submit: "" }));
  };

  const toggleEvent = (name) => {
    setForm((previous) => {
      const exists = previous.selectedEvents.includes(name);
      const selectedEvents = exists
        ? previous.selectedEvents.filter((item) => item !== name)
        : [...previous.selectedEvents, name];

      const eventEntries = { ...previous.eventEntries };
      if (exists) {
        delete eventEntries[name];
      } else {
        eventEntries[name] = blankEntry(name);
      }

      return { ...previous, selectedEvents, eventEntries };
    });

    setErrors((previous) => ({ ...previous, selectedEvents: "" }));
  };

  const updateEntry = (name, key, value) => {
    setForm((previous) => ({
      ...previous,
      eventEntries: {
        ...previous.eventEntries,
        [name]: {
          ...previous.eventEntries[name],
          [key]: value,
        },
      },
    }));

    setErrors((previous) => ({
      ...previous,
      [`${name}_${key}`]: "",
      [`${name}_members`]: "",
    }));
  };

  const addMember = (name) => {
    setForm((previous) => {
      const entry = previous.eventEntries[name];
      if (!entry) return previous;

      const maxMembers = entry.participationType === "Duo" ? 1 : 19;
      if (entry.members.length >= maxMembers) return previous;

      return {
        ...previous,
        eventEntries: {
          ...previous.eventEntries,
          [name]: {
            ...entry,
            members: [...entry.members, blankMember()],
          },
        },
      };
    });
  };

  const updateMember = (eventName, index, key, value) => {
    setForm((previous) => {
      const entry = previous.eventEntries[eventName];
      return {
        ...previous,
        eventEntries: {
          ...previous.eventEntries,
          [eventName]: {
            ...entry,
            members: entry.members.map((member, memberIndex) =>
              memberIndex === index ? { ...member, [key]: value } : member
            ),
          },
        },
      };
    });

    setErrors((previous) => ({
      ...previous,
      [`${eventName}_member_${index}`]: "",
    }));
  };

  const removeMember = (eventName, index) => {
    setForm((previous) => {
      const entry = previous.eventEntries[eventName];
      return {
        ...previous,
        eventEntries: {
          ...previous.eventEntries,
          [eventName]: {
            ...entry,
            members: entry.members.filter(
              (_, memberIndex) => memberIndex !== index
            ),
          },
        },
      };
    });
  };

  const validateDetails = () => {
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Enter your full name.";

    if (!form.roll_no.trim()) {
      nextErrors.roll_no = "Enter your roll number.";
    } else if (!isValidRollNumber(form.roll_no)) {
      nextErrors.roll_no =
        "Roll number must contain exactly 10 digits and start with 2026.";
    }

    if (!form.branch.trim()) {
      nextErrors.branch = "Enter your branch or department.";
    }

    if (!isValidPhone(form.phone)) {
      nextErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    }

    if (!isValidEmail(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.selectedEvents.length) {
      nextErrors.selectedEvents = "Select at least one event.";
    }

    form.selectedEvents.forEach((name) => {
      const entry = form.eventEntries[name];
      const event = EVENTS.find((item) => item.name === name);

      if (!entry || !event) {
        nextErrors.selectedEvents = "Please reselect your event.";
        return;
      }

      if (!event.types.includes(entry.participationType)) {
        nextErrors[`${name}_participationType`] =
          "Choose a valid participation type.";
      }

      if (["Duo", "Team"].includes(entry.participationType)) {
        if (!entry.teamName.trim()) {
          nextErrors[`${name}_teamName`] = "Enter a duo or team name.";
        }

        const minimum = entry.participationType === "Duo" ? 1 : 2;
        if (entry.members.length < minimum) {
          nextErrors[`${name}_members`] =
            entry.participationType === "Duo"
              ? "Add exactly one partner."
              : "Add at least two other members.";
        }

        if (
          entry.participationType === "Duo" &&
          entry.members.length > 1
        ) {
          nextErrors[`${name}_members`] =
            "A duo must have exactly one partner in addition to you.";
        }

        entry.members.forEach((member, index) => {
          const errorKey = `${name}_member_${index}`;

          if (!member.name.trim()) {
            nextErrors[errorKey] = `Enter member ${index + 1}'s name.`;
          } else if (!isValidRollNumber(member.roll_no)) {
            nextErrors[errorKey] =
              `Member ${index + 1}'s roll number must be 10 digits starting with 2026.`;
          } else if (!member.branch.trim()) {
            nextErrors[errorKey] = `Enter member ${index + 1}'s branch.`;
          } else if (!isValidPhone(member.phone)) {
            nextErrors[errorKey] =
              `Enter a valid phone number for member ${index + 1}.`;
          } else if (member.email.trim() && !isValidEmail(member.email)) {
            nextErrors[errorKey] =
              `Enter a valid email address for member ${index + 1}.`;
          }
        });
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const next = () => {
    if (registrationOpen !== true || registrationStatusLoading) return;

    if (!validateDetails()) {
      setStep(1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setStep((current) => Math.min(3, current + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setStep((current) => Math.max(1, current - 1));
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async (event) => {
    event.preventDefault();

    if (registrationOpen !== true || registrationStatusLoading) {
      setErrors({
        submit: "Registration is currently unavailable. Please refresh and try again.",
      });
      return;
    }

    if (!validateDetails()) {
      setStep(1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const nextErrors = {};

    if (form.selectedEvents.includes("Dance")) {
      if (!form.trackLink.trim()) {
        nextErrors.trackLink = "Add your Dance audio Google Drive link.";
      } else if (!isDriveLink(form.trackLink)) {
        nextErrors.trackLink = "Enter a valid HTTPS Google Drive link.";
      }
    }

    const images = parseDriveLinks(form.imageLinks);
    if (form.selectedEvents.includes("Photography")) {
      if (images.length < 1 || images.length > 10) {
        nextErrors.imageLinks =
          "Add between 1 and 10 Google Drive image links.";
      } else if (!images.every(isDriveLink)) {
        nextErrors.imageLinks =
          "Every image must be a valid HTTPS Google Drive link.";
      }
    }

    const fineArtLinks = parseDriveLinks(form.fineArtLinks);
    if (form.selectedEvents.includes("Fine Arts")) {
      if (fineArtLinks.length < 1 || fineArtLinks.length > 5) {
        nextErrors.fineArtLinks =
          "Add between 1 and 5 Google Drive artwork links, one per line.";
      } else if (!fineArtLinks.every(isDriveLink)) {
        nextErrors.fineArtLinks =
          "Every artwork must be a valid HTTPS Google Drive link.";
      }
    }

    if (!form.confirmed) {
      nextErrors.confirmed = "Confirm your registration details.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const payload = {
      name: form.name.trim(),
      roll_no: form.roll_no.trim(),
      branch: form.branch.trim(),
      phone: form.phone.trim(),
      email: form.email.trim().toLowerCase(),
      events: form.selectedEvents,
      eventEntries: form.selectedEvents.map((name) => {
        const entry = form.eventEntries[name];
        const isGroup = ["Duo", "Team"].includes(entry.participationType);

        return {
          eventName: name,
          participationType: entry.participationType,
          teamName: isGroup ? entry.teamName.trim() : "",
          members: isGroup
            ? entry.members.map((member) => ({
                name: member.name.trim(),
                roll_no: member.roll_no.trim(),
                branch: member.branch.trim(),
                phone: member.phone.trim(),
                email: member.email.trim().toLowerCase(),
              }))
            : [],
        };
      }),
      trackLink: form.selectedEvents.includes("Dance")
        ? form.trackLink.trim()
        : "",
      imageLinks: form.selectedEvents.includes("Photography") ? images : [],
      fineArtLinks: form.selectedEvents.includes("Fine Arts")
        ? fineArtLinks
        : [],
      confirmed: form.confirmed,
    };

    setSubmitting(true);
    setErrors({});

    try {
      const response = await fetch(`${API_URL}/api/registrations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (response.status === 403) {
        setRegistrationOpen(false);
        setRegistrationStatusError(
          result.message || "Registration has been closed by the administrator."
        );
        setErrors({
          submit:
            result.message ||
            "Registration closed before your form could be submitted. Your entered details have been kept on this page.",
        });
        return;
      }

      if (!response.ok) {
        throw new Error(
          result.message || `Registration failed (${response.status}).`
        );
      }

      setRegistrationId(
        result.registrationId || result._id || "Submitted"
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setErrors({
        submit:
          error.message || "Could not connect to the registration server.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setStep(1);
    setRegistrationId("");
    setErrors({});
    setForm({
      name: "",
      roll_no: "",
      branch: "",
      phone: "",
      email: "",
      selectedEvents: [],
      eventEntries: {},
      trackLink: "",
      imageLinks: "",
      fineArtLinks: "",
      confirmed: false,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    loadRegistrationStatus();
  };

  if (registrationStatusLoading && registrationOpen === null) {
    return (
      <StatusScreen
        title="Checking registration"
        message="Please wait while we check whether the registration portal is open."
      />
    );
  }

  if (registrationOpen === null) {
    return (
      <StatusScreen
        title="Unable to verify status"
        message={
          registrationStatusError ||
          "The registration server could not be reached. Please try again."
        }
      >
        <button
          type="button"
          className={primary}
          onClick={() => {
            setRegistrationStatusLoading(true);
            loadRegistrationStatus();
          }}
        >
          Retry
        </button>
      </StatusScreen>
    );
  }

  if (registrationOpen === false && !registrationId) {
    return (
      <StatusScreen
        title="Registrations are closed"
        message={
          registrationStatusError ||
          "The registration window is currently closed. Please check again later for updates."
        }
      >
        <button
          type="button"
          className={primary}
          onClick={() => {
            setRegistrationStatusLoading(true);
            loadRegistrationStatus();
          }}
        >
          Check again
        </button>
      </StatusScreen>
    );
  }

  if (registrationId) {
    const reference = `${form.roll_no.trim()}${String(registrationId).slice(10)}`;

    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbf5e9] p-4 text-[#32131b]">
        <div className="w-full max-w-lg rounded-[2rem] border border-[#e9deca] bg-white p-8 text-center shadow-xl sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-white">
            <img
              src="/Logo.png"
              alt="Cultural Sub-Council Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <p className="mt-7 text-xs font-black uppercase tracking-[.24em] text-[#9b7133]">
            Cultural Sub-Council
          </p>
          <h1 className="mt-3 text-3xl font-black">You're on the list!</h1>
          <p className="mt-3 text-sm leading-6 text-[#8a776b]">
            Your registration has been submitted. Keep this reference for
            future communication.
          </p>
          <div className="mt-6 rounded-2xl bg-[#fbf5e9] p-4">
            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#9a887a]">
              Registration Reference
            </p>
            <p className="mt-2 break-all font-black text-[#7a1b2f]">
              {reference}
            </p>
          </div>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/" className={secondary}>
              Back to home
            </Link>
            <button className={primary} onClick={reset} type="button">
              Register another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbf5e9] text-[#32131b]">
      <header className="border-b border-[#e8dece] bg-[#fbf5e9]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
              <img
                src="/Logo.png"
                alt="Cultural Sub-Council Logo"
                className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
              />
            </div>
            <div>
              <p className="text-xs font-black tracking-[.13em] sm:text-sm">
                CULTURAL SUB-COUNCIL
              </p>
              <p className="mt-0.5 text-[9px] uppercase tracking-[.22em] text-[#9a887a]">
                Registration portal
              </p>
            </div>
          </Link>
          <Link
            to="/"
            className="text-xs font-bold text-[#7a1b2f] transition hover:text-[#9b7133] sm:text-sm"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-7 sm:px-8 sm:py-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-12">
        <aside className="relative overflow-hidden rounded-[2rem] bg-[#32131b] p-7 text-[#fbf5e9] sm:p-10 lg:sticky lg:top-6 lg:h-fit">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-[#e5c47b]/20" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full border border-[#e5c47b]/20" />

          <div className="relative">
            <p className="text-[10px] font-black uppercase tracking-[.25em] text-[#e5c47b]">
              HEATS · Cultural Sub-Council
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
              Let your talent take the stage.
            </h1>
            <p className="mt-5 text-sm leading-7 text-[#e8d9c5]">
              Be a part of the celebration. Register for the events that
              inspire you and showcase your creativity.
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#e8d9c5]">
                  Registration status
                </span>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-200">
                  OPEN
                </span>
              </div>
              <p className="mt-2 text-xs leading-5 text-[#d6c3ad]">
                You can participate in multiple events. Select all the events
                you wish to enter.
              </p>
            </div>

            <div className="mt-8 space-y-5">
              {[
                ["01", "Your details", "Basic participant information"],
                ["02", "Event format", "Solo, duo or team participation"],
                ["03", "Final review", "Media links and confirmation"],
              ].map(([number, title, description], index) => (
                <div key={number} className="flex items-start gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-black ${
                      step === index + 1
                        ? "bg-[#e5c47b] text-[#32131b]"
                        : "border border-white/15 bg-white/5 text-[#e5c47b]"
                    }`}
                  >
                    {number}
                  </div>
                  <div>
                    <p className="font-bold">{title}</p>
                    <p className="mt-1 text-xs text-[#cbb8a2]">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <section className="min-w-0 rounded-[2rem] border border-[#e9deca] bg-white p-5 shadow-sm sm:p-8 lg:p-10">
          <div className="mb-8">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-bold uppercase tracking-[.18em] text-[#9b7133]">
                Registration form
              </p>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                ● Registrations open
              </span>
            </div>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#f1e9dc]">
              <div
                className="h-full rounded-full bg-[#7a1b2f] transition-all"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-right text-xs text-[#9a887a]">
              Step {step} of 3
            </p>
          </div>

          <form onSubmit={submit} className="space-y-8">
            {step === 1 && (
              <div>
                <Heading
                  eyebrow="01 / Personal information"
                  title="Tell us about yourself"
                  desc="Enter your details carefully. Your roll number and contact information will be used for event communication."
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name" error={errors.name}>
                    <TextInput
                      value={form.name}
                      onChange={(value) => update("name", value)}
                      placeholder="Enter your full name"
                      autoComplete="name"
                    />
                  </Field>

                  <Field
                    label="Roll number"
                    hint="10 digits, starts with 2026"
                    error={errors.roll_no}
                  >
                    <TextInput
                      value={form.roll_no}
                      onChange={(value) =>
                        update("roll_no", value.replace(/\D/g, "").slice(0, 10))
                      }
                      placeholder="e.g. 2026123456"
                      inputMode="numeric"
                      maxLength={10}
                      autoComplete="off"
                    />
                  </Field>

                  <Field label="Branch / department" error={errors.branch}>
                    <TextInput
                      value={form.branch}
                      onChange={(value) => update("branch", value)}
                      placeholder="e.g. Electrical Engineering"
                    />
                  </Field>

                  <Field label="Mobile number" error={errors.phone}>
                    <TextInput
                      type="tel"
                      value={form.phone}
                      onChange={(value) =>
                        update("phone", value.replace(/\D/g, "").slice(0, 10))
                      }
                      placeholder="10-digit mobile number"
                      inputMode="numeric"
                      maxLength={10}
                      autoComplete="tel"
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <Field label="Email address" error={errors.email}>
                      <TextInput
                        type="email"
                        value={form.email}
                        onChange={(value) => update("email", value)}
                        placeholder="you@example.com"
                        autoComplete="email"
                      />
                    </Field>
                  </div>
                </div>

                <div className="mt-9 border-t border-[#f0e8dc] pt-7">
                  <Heading
                    eyebrow="02 / Choose your events"
                    title="Where would you like to participate?"
                    desc="You can participate in multiple events. Select all the events you want; participation type is configured separately for each event in the next step."
                  />

                  <div className="grid gap-3 sm:grid-cols-2">
                    {EVENTS.map((event) => {
                      const selected = form.selectedEvents.includes(event.name);
                      return (
                        <button
                          type="button"
                          key={event.name}
                          onClick={() => toggleEvent(event.name)}
                          aria-pressed={selected}
                          className={`rounded-2xl border p-4 text-left transition ${
                            selected
                              ? "border-[#7a1b2f] bg-[#fbf2ed] ring-2 ring-[#7a1b2f]/10"
                              : "border-[#e9deca] bg-[#fffcf6] hover:border-[#c9ad87]"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-2xl text-[#9b7133]">
                              {event.icon}
                            </span>
                            <span
                              className={`flex h-5 w-5 items-center justify-center rounded-md border text-xs ${
                                selected
                                  ? "border-[#7a1b2f] bg-[#7a1b2f] text-white"
                                  : "border-[#d8c8b2] bg-white"
                              }`}
                            >
                              {selected ? "✓" : ""}
                            </span>
                          </div>
                          <p className="mt-3 font-black">{event.name}</p>
                          <p className="mt-1 text-xs leading-5 text-[#8a776b]">
                            {event.desc}
                          </p>
                          <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[#9b7133]">
                            {event.types.join(" · ")}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                  {errors.selectedEvents && (
                    <p className="mt-2 text-xs font-medium text-red-600">
                      {errors.selectedEvents}
                    </p>
                  )}
                </div>

                <div className="mt-8 flex justify-end border-t border-[#f0e8dc] pt-6">
                  <button type="button" className={primary} onClick={next}>
                    Continue to event format →
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <Heading
                  eyebrow="02 / Participation details"
                  title="Choose your format"
                  desc="Select a participation type separately for every event. For duo and team entries, add the details of your fellow participants."
                />

                {selectedEvents.map((event) => {
                  const entry = form.eventEntries[event.name];
                  if (!entry) return null;

                  return (
                    <section
                      key={event.name}
                      className="rounded-2xl border border-[#e9deca] bg-[#fffcf6] p-5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#9b7133]">
                            Selected event
                          </p>
                          <h3 className="mt-1 text-xl font-black">
                            {event.name}
                          </h3>
                        </div>
                        <span className="rounded-full bg-[#f7eadb] px-3 py-1 text-xs font-bold text-[#7a1b2f]">
                          {event.types.join(" / ")}
                        </span>
                      </div>

                      <Field
                        label="Participation type"
                        error={errors[`${event.name}_participationType`]}
                      >
                        <select
                          className={inputClass}
                          value={entry.participationType}
                          onChange={(eventChange) =>
                            updateEntry(
                              event.name,
                              "participationType",
                              eventChange.target.value
                            )
                          }
                        >
                          {event.types.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </Field>

                      {["Duo", "Team"].includes(entry.participationType) && (
                        <div className="mt-5 space-y-5">
                          <Field
                            label={
                              entry.participationType === "Duo"
                                ? "Duo name"
                                : "Team name"
                            }
                            error={errors[`${event.name}_teamName`]}
                          >
                            <TextInput
                              value={entry.teamName}
                              onChange={(value) =>
                                updateEntry(event.name, "teamName", value)
                              }
                              placeholder="Enter your duo / team name"
                            />
                          </Field>

                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                              <p className="font-bold text-[#48232b]">
                                Other participants
                              </p>
                              <p className="mt-1 text-xs text-[#8a776b]">
                                {entry.participationType === "Duo"
                                  ? "Add exactly one partner."
                                  : "Add at least two other team members."}
                              </p>
                            </div>
                            <button
                              type="button"
                              className={secondary}
                              onClick={() => addMember(event.name)}
                              disabled={
                                entry.members.length >=
                                (entry.participationType === "Duo" ? 1 : 19)
                              }
                            >
                              + Add member
                            </button>
                          </div>

                          {entry.members.map((member, index) => (
                            <div
                              key={`${event.name}-${index}`}
                              className="rounded-xl border border-[#eee3d4] bg-white p-4"
                            >
                              <div className="mb-4 flex items-center justify-between">
                                <p className="text-sm font-black">
                                  {entry.participationType === "Duo"
                                    ? "Partner"
                                    : `Member ${index + 1}`}
                                </p>
                                <button
                                  type="button"
                                  onClick={() => removeMember(event.name, index)}
                                  className="text-xs font-bold text-red-600 hover:text-red-800"
                                >
                                  Remove
                                </button>
                              </div>

                              <div className="grid gap-4 sm:grid-cols-2">
                                <Field label="Full name">
                                  <TextInput
                                    value={member.name}
                                    onChange={(value) =>
                                      updateMember(
                                        event.name,
                                        index,
                                        "name",
                                        value
                                      )
                                    }
                                    placeholder="Member full name"
                                  />
                                </Field>

                                <Field label="Roll number">
                                  <TextInput
                                    value={member.roll_no}
                                    onChange={(value) =>
                                      updateMember(
                                        event.name,
                                        index,
                                        "roll_no",
                                        value.replace(/\D/g, "").slice(0, 10)
                                      )
                                    }
                                    placeholder="e.g. 2026123456"
                                    inputMode="numeric"
                                    maxLength={10}
                                  />
                                </Field>

                                <Field label="Branch / department">
                                  <TextInput
                                    value={member.branch}
                                    onChange={(value) =>
                                      updateMember(
                                        event.name,
                                        index,
                                        "branch",
                                        value
                                      )
                                    }
                                    placeholder="e.g. Electrical Engineering"
                                  />
                                </Field>

                                <Field label="Mobile number">
                                  <TextInput
                                    type="tel"
                                    value={member.phone}
                                    onChange={(value) =>
                                      updateMember(
                                        event.name,
                                        index,
                                        "phone",
                                        value.replace(/\D/g, "").slice(0, 10)
                                      )
                                    }
                                    placeholder="10-digit mobile number"
                                    inputMode="numeric"
                                    maxLength={10}
                                  />
                                </Field>

                                <div className="sm:col-span-2">
                                  <Field
                                    label="Email address"
                                    hint="optional"
                                  >
                                    <TextInput
                                      type="email"
                                      value={member.email}
                                      onChange={(value) =>
                                        updateMember(
                                          event.name,
                                          index,
                                          "email",
                                          value
                                        )
                                      }
                                      placeholder="member@example.com"
                                    />
                                  </Field>
                                </div>
                              </div>

                              {errors[`${event.name}_member_${index}`] && (
                                <p className="mt-3 text-xs font-medium text-red-600">
                                  {errors[`${event.name}_member_${index}`]}
                                </p>
                              )}
                            </div>
                          ))}

                          {errors[`${event.name}_members`] && (
                            <p className="text-xs font-medium text-red-600">
                              {errors[`${event.name}_members`]}
                            </p>
                          )}
                        </div>
                      )}
                    </section>
                  );
                })}

                <div className="flex flex-col-reverse gap-3 border-t border-[#f0e8dc] pt-6 sm:flex-row sm:justify-between">
                  <button type="button" className={secondary} onClick={back}>
                    ← Back
                  </button>
                  <button type="button" className={primary} onClick={next}>
                    Continue to review →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <section>
                  <Heading
                    eyebrow="01 / Event requirements"
                    title="A few final details"
                    desc="Only the requirements for your selected events appear here."
                  />

                  {form.selectedEvents.includes("Dance") && (
                    <Field
                      label="Dance audio track"
                      hint="Google Drive link"
                      error={errors.trackLink}
                    >
                      <TextInput
                        type="url"
                        value={form.trackLink}
                        onChange={(value) => update("trackLink", value)}
                        placeholder="https://drive.google.com/file/d/..."
                      />
                      <span className="mt-2 block text-xs font-normal text-[#9a887a]">
                        Ensure that the uploaded Google Drive link is set to
                        “Anyone with the link – Viewer”.
                      </span>
                    </Field>
                  )}

                  {form.selectedEvents.includes("Photography") && (
                    <div className="mt-5">
                      <Field
                        label="Photography submissions"
                        hint="1–10 links, one per line"
                        error={errors.imageLinks}
                      >
                        <textarea
                          className={`${inputClass} min-h-32 resize-y`}
                          value={form.imageLinks}
                          onChange={(event) =>
                            update("imageLinks", event.target.value)
                          }
                          placeholder={
                            "https://drive.google.com/file/d/IMAGE_ID_1/view\nhttps://drive.google.com/file/d/IMAGE_ID_2/view"
                          }
                        />
                      </Field>
                    </div>
                  )}

                  {form.selectedEvents.includes("Fine Arts") && (
                    <div className="mt-5 rounded-2xl border border-[#e9deca] bg-[#fffcf6] p-5">
                      <p className="font-bold text-[#48232b]">
                        Fine Arts artwork links
                      </p>
                      <p className="mt-1 text-xs leading-5 text-[#8a776b]">
                        Paste 1–5 Google Drive links to your artwork, one link
                        per line. Ensure the event team can view them.
                      </p>
                      <div className="mt-4">
                        <Field
                          label="Google Drive links"
                          hint="1–5 links, one per line"
                          error={errors.fineArtLinks}
                        >
                          <textarea
                            className={`${inputClass} min-h-32 resize-y`}
                            value={form.fineArtLinks}
                            onChange={(event) =>
                              update("fineArtLinks", event.target.value)
                            }
                            placeholder={
                              "https://drive.google.com/file/d/ARTWORK_ID_1/view\nhttps://drive.google.com/file/d/ARTWORK_ID_2/view"
                            }
                          />
                        </Field>
                      </div>
                      <p className="mt-2 text-xs text-[#9a887a]">
                        In Google Drive, open Share and set access so the
                        event team can view the artwork.
                      </p>
                    </div>
                  )}

                  {!form.selectedEvents.includes("Dance") &&
                    !form.selectedEvents.includes("Photography") &&
                    !form.selectedEvents.includes("Fine Arts") && (
                      <p className="rounded-xl border border-dashed border-[#e4d5bf] bg-[#fffcf6] p-5 text-sm text-[#8a776b]">
                        No additional media submissions are required for your
                        selected events.
                      </p>
                    )}
                </section>

                <div className="h-px bg-[#f0e8dc]" />

                <section>
                  <Heading
                    eyebrow="02 / Double-check"
                    title="Registration summary"
                    desc="Participation type and teammates are listed separately for every event."
                  />

                  <div className="overflow-hidden rounded-2xl border border-[#e9deca]">
                    <div className="grid gap-3 bg-[#fffcf6] p-4 sm:grid-cols-2">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#9a887a]">
                          Participant
                        </p>
                        <p className="mt-1 font-bold">{form.name || "—"}</p>
                        <p className="mt-1 text-xs text-[#8a776b]">
                          {form.roll_no} · {form.branch}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#9a887a]">
                          Contact
                        </p>
                        <p className="mt-1 text-sm font-semibold">
                          {form.phone || "—"}
                        </p>
                        <p className="mt-1 break-all text-xs text-[#8a776b]">
                          {form.email || "—"}
                        </p>
                      </div>
                    </div>

                    <div className="divide-y divide-[#eee5d8]">
                      {selectedEvents.map((event) => {
                        const entry = form.eventEntries[event.name];
                        return (
                          <div key={event.name} className="p-4 sm:p-5">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <p className="font-black">{event.name}</p>
                              <span className="rounded-full bg-[#f7eadb] px-3 py-1 text-xs font-bold text-[#7a1b2f]">
                                {entry.participationType}
                              </span>
                            </div>

                            {["Duo", "Team"].includes(
                              entry.participationType
                            ) && (
                              <>
                                <p className="mt-2 text-sm text-[#795c45]">
                                  Name: {entry.teamName || "Not entered"}
                                </p>
                                <p className="mt-1 text-xs text-[#8a776b]">
                                  Additional participants:{" "}
                                  {entry.members.length}
                                </p>
                                {entry.members.map((member, index) => (
                                  <p
                                    key={index}
                                    className="mt-1 text-xs text-[#8a776b]"
                                  >
                                    {member.name || `Member ${index + 1}`} ·{" "}
                                    {member.roll_no || "No roll number"}
                                  </p>
                                ))}
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>

                <section>
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#e9deca] bg-[#fffcf6] p-4">
                    <input
                      type="checkbox"
                      className="mt-1 accent-[#7a1b2f]"
                      checked={form.confirmed}
                      onChange={(event) =>
                        update("confirmed", event.target.checked)
                      }
                    />
                    <span className="text-sm leading-6 text-[#795c45]">
                      I confirm that my details, participation type and team
                      members are correct for each selected event.
                    </span>
                  </label>
                  {errors.confirmed && (
                    <p className="mt-2 text-xs font-medium text-red-600">
                      {errors.confirmed}
                    </p>
                  )}
                </section>

                {errors.submit && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                  >
                    {errors.submit}
                  </div>
                )}

                <div className="flex flex-col-reverse gap-3 border-t border-[#f0e8dc] pt-6 sm:flex-row sm:justify-between">
                  <button
                    type="button"
                    className={secondary}
                    onClick={back}
                    disabled={submitting}
                  >
                    ← Edit registration
                  </button>
                  <button
                    type="submit"
                    className={primary}
                    disabled={submitting || registrationOpen !== true}
                  >
                    {submitting
                      ? "Submitting registration…"
                      : "Submit registration →"}
                  </button>
                </div>

                <p className="text-center text-xs leading-5 text-[#a08c7b]">
                  Your details are saved when the registration server accepts
                  them.
                </p>
              </div>
            )}
          </form>

          <p className="mt-5 text-center text-xs text-[#a08c7b]">
            Celebrate creativity. Celebrate culture.
          </p>
        </section>
      </main>
    </div>
  );
}
