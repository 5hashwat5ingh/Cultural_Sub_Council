import React, { useState } from "react";
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
  "inline-flex items-center justify-center rounded-xl border border-[#dfd0b8] bg-white px-5 py-3 text-sm font-bold text-[#6f2435] transition hover:bg-[#fbf4e8] disabled:opacity-50";

const blankMember = () => ({
  name: "",
  roll_no: "",
  branch: "",
  phone: "",
  email: "",
});

const blankEntry = (name) => ({
  eventName: name,
  participationType: EVENTS.find((e) => e.name === name).types[0],
  teamName: "",
  members: [],
});

const isValidRollNumber = (value) => /^2026\d{6}$/.test(value.trim());

const isValidPhone = (value) => /^[6-9]\d{9}$/.test(value.trim());

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
      onChange={(e) => onChange(e.target.value)}
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

export default function Registration() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [registrationId, setRegistrationId] = useState("");
  const [errors, setErrors] = useState({});

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

  const selectedEvents = EVENTS.filter((e) =>
    form.selectedEvents.includes(e.name)
  );

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "", submit: "" }));
  };

  const toggleEvent = (name) => {
    setForm((prev) => {
      const exists = prev.selectedEvents.includes(name);

      const selected = exists
        ? prev.selectedEvents.filter((n) => n !== name)
        : [...prev.selectedEvents, name];

      const eventEntries = { ...prev.eventEntries };

      if (exists) {
        delete eventEntries[name];
      } else {
        eventEntries[name] = blankEntry(name);
      }

      return {
        ...prev,
        selectedEvents: selected,
        eventEntries,
      };
    });

    setErrors((prev) => ({ ...prev, selectedEvents: "" }));
  };

  const updateEntry = (name, key, value) => {
    setForm((prev) => ({
      ...prev,
      eventEntries: {
        ...prev.eventEntries,
        [name]: {
          ...prev.eventEntries[name],
          [key]: value,
        },
      },
    }));

    setErrors((prev) => ({
      ...prev,
      [`${name}_${key}`]: "",
      [`${name}_members`]: "",
    }));
  };

  const addMember = (name) => {
    setForm((prev) => {
      const entry = prev.eventEntries[name];

      if (!entry) return prev;

      const maxMembers = entry.participationType === "Duo" ? 1 : 19;

      if (entry.members.length >= maxMembers) return prev;

      return {
        ...prev,
        eventEntries: {
          ...prev.eventEntries,
          [name]: {
            ...entry,
            members: [...entry.members, blankMember()],
          },
        },
      };
    });
  };

  const updateMember = (eventName, index, key, value) => {
    setForm((prev) => {
      const entry = prev.eventEntries[eventName];

      return {
        ...prev,
        eventEntries: {
          ...prev.eventEntries,
          [eventName]: {
            ...entry,
            members: entry.members.map((member, i) =>
              i === index ? { ...member, [key]: value } : member
            ),
          },
        },
      };
    });

    setErrors((prev) => ({
      ...prev,
      [`${eventName}_member_${index}`]: "",
    }));
  };

  const removeMember = (eventName, index) => {
    setForm((prev) => {
      const entry = prev.eventEntries[eventName];

      return {
        ...prev,
        eventEntries: {
          ...prev.eventEntries,
          [eventName]: {
            ...entry,
            members: entry.members.filter((_, i) => i !== index),
          },
        },
      };
    });
  };

  const validateDetails = () => {
    const e = {};

    if (!form.name.trim()) {
      e.name = "Enter your full name.";
    }

    if (!form.roll_no.trim()) {
      e.roll_no = "Enter your roll number.";
    } else if (!isValidRollNumber(form.roll_no)) {
      e.roll_no =
        "Roll number must contain exactly 10 digits and start with 2026.";
    }

    if (!form.branch.trim()) {
      e.branch = "Enter your branch or department.";
    }

    if (!isValidPhone(form.phone)) {
      e.phone = "Enter a valid 10-digit Indian mobile number.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      e.email = "Enter a valid email address.";
    }

    if (!form.selectedEvents.length) {
      e.selectedEvents = "Select at least one event.";
    }

    form.selectedEvents.forEach((name) => {
      const entry = form.eventEntries[name];

      if (!entry) {
        e.selectedEvents = "Please reselect your event.";
        return;
      }

      const allowed = EVENTS.find((event) => event.name === name).types;

      if (!allowed.includes(entry.participationType)) {
        e[`${name}_participationType`] =
          "Choose a valid participation type.";
      }

      if (["Duo", "Team"].includes(entry.participationType)) {
        if (!entry.teamName.trim()) {
          e[`${name}_teamName`] = "Enter a duo or team name.";
        }

        const minimum = entry.participationType === "Duo" ? 1 : 2;

        if (entry.members.length < minimum) {
          e[`${name}_members`] =
            entry.participationType === "Duo"
              ? "Add exactly one partner."
              : "Add at least two other members.";
        }

        if (
          entry.participationType === "Duo" &&
          entry.members.length > 1
        ) {
          e[`${name}_members`] =
            "A duo must have exactly one partner in addition to you.";
        }

        entry.members.forEach((member, i) => {
          const errorKey = `${name}_member_${i}`;

          if (!member.name.trim()) {
            e[errorKey] = `Enter member ${i + 1}'s name.`;
          } else if (!isValidRollNumber(member.roll_no)) {
            e[errorKey] =
              `Member ${i + 1}'s roll number must be 10 digits starting with 2026.`;
          } else if (!member.branch.trim()) {
            e[errorKey] = `Enter member ${i + 1}'s branch.`;
          } else if (!isValidPhone(member.phone)) {
            e[errorKey] =
              `Enter a valid phone number for member ${i + 1}.`;
          } else if (
            member.email.trim() &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email.trim())
          ) {
            e[errorKey] =
              `Enter a valid email address for member ${i + 1}.`;
          }
        });
      }
    });

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateDetails()) {
      setStep(1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setStep((s) => Math.min(3, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setStep((s) => Math.max(1, s - 1));
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async (event) => {
    event.preventDefault();

    if (!validateDetails()) {
      setStep(1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const e = {};

    if (form.selectedEvents.includes("Dance")) {
      if (!form.trackLink.trim()) {
        e.trackLink = "Add your Dance audio Google Drive link.";
      } else if (!isDriveLink(form.trackLink)) {
        e.trackLink = "Enter a valid HTTPS Google Drive link.";
      }
    }

    const images = form.imageLinks
      .split(/\n/)
      .map((x) => x.trim())
      .filter(Boolean);

    if (form.selectedEvents.includes("Photography")) {
      if (images.length < 1 || images.length > 10) {
        e.imageLinks = "Add between 1 and 10 Google Drive image links.";
      } else if (!images.every(isDriveLink)) {
        e.imageLinks =
          "Every image must be a valid HTTPS Google Drive link.";
      }
    }

    const fineArtLinks = form.fineArtLinks
      .split(/\n/)
      .map((x) => x.trim())
      .filter(Boolean);

    if (form.selectedEvents.includes("Fine Arts")) {
      if (fineArtLinks.length < 1 || fineArtLinks.length > 5) {
        e.fineArtLinks =
          "Add between 1 and 5 Google Drive artwork links, one per line.";
      } else if (!fineArtLinks.every(isDriveLink)) {
        e.fineArtLinks =
          "Every artwork must be a valid HTTPS Google Drive link.";
      }
    }

    if (!form.confirmed) {
      e.confirmed = "Confirm your registration details.";
    }

    setErrors(e);

    if (Object.keys(e).length) return;

    const payload = {
      name: form.name.trim(),
      roll_no: form.roll_no.trim(),
      branch: form.branch.trim(),
      phone: form.phone.trim(),
      email: form.email.trim().toLowerCase(),
      events: form.selectedEvents,

      eventEntries: form.selectedEvents.map((name) => {
        const entry = form.eventEntries[name];
        const isGroup = ["Duo", "Team"].includes(
          entry.participationType
        );

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

      imageLinks: form.selectedEvents.includes("Photography")
        ? images
        : [],

      fineArtLinks: form.selectedEvents.includes("Fine Arts")
        ? fineArtLinks
        : [],

      confirmed: form.confirmed,
    };

    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/registrations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message || `Registration failed (${response.status}).`
        );
      }

      setRegistrationId(
        result.registrationId || result._id || "Submitted"
      );

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setErrors({
        submit:
          err.message || "Could not connect to the registration server.",
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
  };

  // Successful registration screen
  if (registrationId) {
    const reference = `${form.roll_no.trim()}${String(
      registrationId
    ).slice(10)}`;

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

          <h1 className="mt-3 text-3xl font-black">
            You're on the list!
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#8a776b]">
            Your registration has been submitted. Keep this reference
            for future communication.
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

            <button
              className={primary}
              onClick={reset}
              type="button"
            >
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
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-[#7a1b2f]/70 blur-3xl" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#e5c47b]/30 bg-white/5 px-3 py-2 text-[10px] font-black uppercase tracking-[.2em] text-[#e5c47b]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e5c47b]" />
              Registrations open
            </span>

            <p className="mt-10 text-xs font-bold uppercase tracking-[.25em] text-[#e5c47b]">
              Make your mark
            </p>

            <h1 className="mt-4 text-4xl font-black leading-[1.08] sm:text-5xl">
              Every talent.
              <br />
              Every stage.
              <br />
              <span className="text-[#e5c47b]">Your moment.</span>
            </h1>

            <p className="mt-6 max-w-sm text-sm leading-7 text-[#f4e7d3]/75">
              Choose your disciplines, define your team for each event,
              and bring your creativity to the spotlight.
            </p>

            <div className="mt-10">
              <div className="mb-3 flex justify-between text-xs font-bold">
                <span className="text-[#f4e7d3]/65">YOUR PROGRESS</span>
                <span className="text-[#e5c47b]">
                  {Math.round((step / 3) * 100)}%
                </span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#e5c47b] transition-all"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>

              <div className="mt-6 space-y-4">
                {[
                  ["01", "Your details"],
                  ["02", "Event line-up"],
                  ["03", "Review & submit"],
                ].map(([number, title], index) => (
                  <div
                    key={number}
                    className={`flex items-center gap-3 ${
                      step === index + 1 ? "opacity-100" : "opacity-45"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl border text-xs font-black ${
                        step > index + 1
                          ? "border-[#e5c47b] bg-[#e5c47b] text-[#32131b]"
                          : step === index + 1
                            ? "border-[#e5c47b] text-[#e5c47b]"
                            : "border-white/20"
                      }`}
                    >
                      {step > index + 1 ? "✓" : number}
                    </div>
                    <p className="text-sm font-bold">{title}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-[#e5c47b]/20 bg-white/[.04] p-5">
              <p className="text-xs font-black uppercase tracking-[.18em] text-[#e5c47b]">
                Good to know
              </p>
              <ul className="mt-3 space-y-2 text-xs leading-5 text-[#f4e7d3]/70">
                <li>• Choose a different participation type for each event.</li>
                <li>• Music, Fine Arts and Photography are solo-only.</li>
                <li>• Duo and Team members are tracked separately per event.</li>
                <li>• Roll numbers must be 10 digits starting with 2026.</li>
              </ul>
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          <div className="mb-6">
            <p className="text-[10px] font-black uppercase tracking-[.24em] text-[#9b7133]">
              Registration form · Step 0{step}
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              {step === 1
                ? "Start with you."
                : step === 2
                  ? "Build your line-up."
                  : "Ready for the spotlight?"}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#8a776b]">
              {step === 1
                ? "Tell us who you are and choose your events."
                : step === 2
                  ? "Choose Solo, Duo or Team separately for each event."
                  : "Review event requirements and confirm your details."}
            </p>
          </div>

          <form
            onSubmit={submit}
            noValidate
            className="rounded-[1.75rem] border border-[#e9deca] bg-white p-5 shadow-[0_18px_60px_rgba(64,20,31,.06)] sm:p-8"
          >
            {step === 1 && (
              <div className="space-y-9">
                <section>
                  <Heading
                    eyebrow="01 / Personal details"
                    title="The essentials"
                    desc="Use contact details where the event team can reach you."
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" error={errors.name}>
                      <TextInput
                        value={form.name}
                        onChange={(v) => update("name", v)}
                        placeholder="Your full name"
                        autoComplete="name"
                      />
                    </Field>

                    <Field label="Roll number" error={errors.roll_no}>
                      <TextInput
                        value={form.roll_no}
                        onChange={(v) =>
                          update("roll_no", v.replace(/\D/g, "").slice(0, 10))
                        }
                        placeholder="e.g. 2026123456"
                        inputMode="numeric"
                        maxLength={10}
                        autoComplete="off"
                      />
                      <span className="mt-1 block text-xs font-normal text-[#9a887a]">
                        Enter exactly 10 digits beginning with 2026.
                      </span>
                    </Field>

                    <Field label="Branch / department" error={errors.branch}>
                      <TextInput
                        value={form.branch}
                        onChange={(v) => update("branch", v)}
                        placeholder="e.g. Electrical Engineering"
                      />
                    </Field>

                    <Field label="Mobile number" error={errors.phone}>
                      <TextInput
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        value={form.phone}
                        onChange={(v) =>
                          update("phone", v.replace(/\D/g, "").slice(0, 10))
                        }
                        placeholder="10-digit mobile number"
                      />
                    </Field>

                    <div className="sm:col-span-2">
                      <Field label="Email address" error={errors.email}>
                        <TextInput
                          type="email"
                          value={form.email}
                          onChange={(v) => update("email", v)}
                          placeholder="you@example.com"
                          autoComplete="email"
                        />
                      </Field>
                    </div>
                  </div>
                </section>

                <div className="h-px bg-[#f0e8dc]" />

                <section>
                  <Heading
                    eyebrow="02 / Your interests"
                    title="Choose your events"
                    desc="*You can participate in multiple events."
                  />

                  <div className="grid gap-3 sm:grid-cols-2">
                    {EVENTS.map((ev) => {
                      const active = form.selectedEvents.includes(ev.name);

                      return (
                        <button
                          key={ev.name}
                          type="button"
                          onClick={() => toggleEvent(ev.name)}
                          aria-pressed={active}
                          className={`rounded-2xl border p-4 text-left transition ${
                            active
                              ? "border-[#7a1b2f] bg-[#fcf3f1] ring-2 ring-[#7a1b2f]/5"
                              : "border-[#eee5d8] hover:border-[#c6a56d] hover:bg-[#fffcf6]"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <span
                              className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl ${
                                active
                                  ? "bg-[#7a1b2f] text-[#f7e8c6]"
                                  : "bg-[#f8f1e5] text-[#946d32]"
                              }`}
                            >
                              {ev.icon}
                            </span>
                            <span
                              className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs ${
                                active
                                  ? "border-[#7a1b2f] bg-[#7a1b2f] text-white"
                                  : "border-[#ded2c0] text-transparent"
                              }`}
                            >
                              ✓
                            </span>
                          </div>

                          <p className="mt-4 font-extrabold">{ev.name}</p>
                          <p className="mt-1 text-xs leading-5 text-[#958174]">
                            {ev.desc}
                          </p>
                          <p className="mt-3 text-[10px] font-bold uppercase tracking-[.13em] text-[#9b7133]">
                            {ev.types.join(" · ")}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {errors.selectedEvents && (
                    <p className="mt-3 text-xs text-red-600">
                      {errors.selectedEvents}
                    </p>
                  )}

                  {selectedEvents.length > 0 && (
                    <p className="mt-4 rounded-xl bg-[#f8f1e5] px-4 py-3 text-xs text-[#795c45]">
                      <strong>{selectedEvents.length} selected:</strong>{" "}
                      {selectedEvents.map((e) => e.name).join(", ")}
                    </p>
                  )}
                </section>

                <div className="flex justify-end border-t border-[#f0e8dc] pt-6">
                  <button type="button" className={primary} onClick={next}>
                    Continue to event setup →
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                {!selectedEvents.length ? (
                  <div className="rounded-2xl border border-dashed border-[#d8c8ad] bg-[#fffcf6] p-8 text-center">
                    <p className="font-bold">No events selected yet</p>
                    <p className="mt-2 text-sm text-[#8a776b]">
                      Go back and select at least one event.
                    </p>
                    <button
                      type="button"
                      className={`${secondary} mt-5`}
                      onClick={back}
                    >
                      ← Back
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="rounded-2xl border border-[#eadfcf] bg-[#fffcf6] p-4 text-sm leading-6 text-[#795c45]">
                      <strong>Each event is independent.</strong> You can
                      choose Duo for Dance and Solo for Music in the same
                      registration.
                    </div>

                    {selectedEvents.map((ev, i) => {
                      const entry = form.eventEntries[ev.name];
                      const group = ["Duo", "Team"].includes(
                        entry.participationType
                      );

                      return (
                        <section
                          key={ev.name}
                          className="overflow-hidden rounded-2xl border border-[#e9deca]"
                        >
                          <div className="flex items-center gap-3 border-b border-[#eee5d8] bg-[#fffcf6] px-4 py-4 sm:px-5">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f3e6d9] text-xl text-[#7a1b2f]">
                              {ev.icon}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#9b7133]">
                                Event {String(i + 1).padStart(2, "0")}
                              </p>
                              <h3 className="font-black">{ev.name}</h3>
                            </div>
                            <span className="rounded-full border border-[#e5d8c5] bg-white px-3 py-1 text-[10px] font-bold text-[#846f5e]">
                              {ev.types.length === 1
                                ? "Solo only"
                                : "Choose format"}
                            </span>
                          </div>

                          <div className="space-y-5 p-4 sm:p-5">
                            <div>
                              <p className="mb-3 text-sm font-bold">
                                How will you participate?
                              </p>

                              <div
                                className={`grid gap-2 ${
                                  ev.types.length === 1
                                    ? "grid-cols-1"
                                    : "grid-cols-3"
                                }`}
                              >
                                {ev.types.length === 1 ? (
                                  <div className="rounded-xl border border-[#7a1b2f] bg-[#7a1b2f] px-3 py-3 text-center text-sm font-bold text-white">
                                    Solo
                                    <span className="mt-1 block text-[10px] font-normal text-white/70">
                                      Just me · Required for this event
                                    </span>
                                  </div>
                                ) : (
                                  ev.types.map((type) => (
                                    <button
                                      key={type}
                                      type="button"
                                      onClick={() =>
                                        updateEntry(
                                          ev.name,
                                          "participationType",
                                          type
                                        )
                                      }
                                      className={`rounded-xl border px-3 py-3 text-sm font-bold transition ${
                                        entry.participationType === type
                                          ? "border-[#7a1b2f] bg-[#7a1b2f] text-white"
                                          : "border-[#e9deca] bg-white text-[#795c45] hover:border-[#b89963]"
                                      }`}
                                    >
                                      {type}
                                      <span
                                        className={`mt-1 block text-[10px] font-normal ${
                                          entry.participationType === type
                                            ? "text-white/70"
                                            : "text-[#a08c7b]"
                                        }`}
                                      >
                                        {type === "Solo"
                                          ? "Just me"
                                          : type === "Duo"
                                            ? "2 people total"
                                            : "3+ people total"}
                                      </span>
                                    </button>
                                  ))
                                )}
                              </div>

                              {ev.types.length === 1 && (
                                <p className="mt-2 text-xs text-[#8a776b]">
                                  This event accepts solo registrations only.
                                </p>
                              )}
                            </div>

                            {group && (
                              <div className="space-y-4 rounded-xl bg-[#fbf5e9] p-4">
                                <Field
                                  label={
                                    entry.participationType === "Duo"
                                      ? "Duo name"
                                      : "Team name"
                                  }
                                  error={errors[`${ev.name}_teamName`]}
                                >
                                  <TextInput
                                    value={entry.teamName}
                                    onChange={(v) =>
                                      updateEntry(ev.name, "teamName", v)
                                    }
                                    placeholder={
                                      entry.participationType === "Duo"
                                        ? "Give your duo a name"
                                        : "Enter your team name"
                                    }
                                  />
                                </Field>

                                <div className="flex flex-wrap items-center justify-between gap-3">
                                  <div>
                                    <p className="text-sm font-bold">
                                      {entry.participationType === "Duo"
                                        ? "Your partner"
                                        : "Other team members"}
                                    </p>
                                    <p className="mt-1 text-xs text-[#958174]">
                                      {entry.participationType === "Duo"
                                        ? "Add exactly one partner. You are already included."
                                        : "You are already included as the lead participant."}
                                    </p>
                                  </div>

                                  <button
                                    type="button"
                                    className={secondary}
                                    disabled={
                                      (entry.participationType === "Duo" &&
                                        entry.members.length >= 1) ||
                                      entry.members.length >= 19
                                    }
                                    onClick={() => addMember(ev.name)}
                                  >
                                    + Add{" "}
                                    {entry.participationType === "Duo"
                                      ? "partner"
                                      : "member"}
                                  </button>
                                </div>

                                {entry.members.map((member, j) => (
                                  <div
                                    key={j}
                                    className="rounded-xl border border-[#e8dece] bg-white p-4"
                                  >
                                    <div className="mb-3 flex items-center justify-between">
                                      <p className="text-xs font-black uppercase tracking-[.12em] text-[#9b7133]">
                                        {entry.participationType === "Duo"
                                          ? "Partner details"
                                          : `Member ${j + 1}`}
                                      </p>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          removeMember(ev.name, j)
                                        }
                                        className="text-xs font-bold text-red-600"
                                      >
                                        Remove
                                      </button>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                      <Field label="Full name">
                                        <TextInput
                                          value={member.name}
                                          onChange={(v) =>
                                            updateMember(
                                              ev.name,
                                              j,
                                              "name",
                                              v
                                            )
                                          }
                                          placeholder="Member's full name"
                                        />
                                      </Field>

                                      <Field
                                        label="Roll number"
                                        error={errors[`${ev.name}_member_${j}`]}
                                      >
                                        <TextInput
                                          value={member.roll_no}
                                          onChange={(v) =>
                                            updateMember(
                                              ev.name,
                                              j,
                                              "roll_no",
                                              v.replace(/\D/g, "").slice(0, 10)
                                            )
                                          }
                                          placeholder="e.g. 2026123456"
                                          inputMode="numeric"
                                          maxLength={10}
                                          autoComplete="off"
                                        />
                                      </Field>

                                      <Field label="Branch / department">
                                        <TextInput
                                          value={member.branch}
                                          onChange={(v) =>
                                            updateMember(
                                              ev.name,
                                              j,
                                              "branch",
                                              v
                                            )
                                          }
                                          placeholder="e.g. Electrical Engineering"
                                        />
                                      </Field>

                                      <Field label="Mobile number">
                                        <TextInput
                                          type="tel"
                                          inputMode="numeric"
                                          maxLength={10}
                                          value={member.phone}
                                          onChange={(v) =>
                                            updateMember(
                                              ev.name,
                                              j,
                                              "phone",
                                              v.replace(/\D/g, "").slice(0, 10)
                                            )
                                          }
                                          placeholder="10-digit mobile number"
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
                                            onChange={(v) =>
                                              updateMember(
                                                ev.name,
                                                j,
                                                "email",
                                                v
                                              )
                                            }
                                            placeholder="member@example.com"
                                          />
                                        </Field>
                                      </div>
                                    </div>
                                  </div>
                                ))}

                                {errors[`${ev.name}_members`] && (
                                  <p className="text-xs font-medium text-red-600">
                                    {errors[`${ev.name}_members`]}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </section>
                      );
                    })}
                  </>
                )}

                <div className="flex flex-col-reverse gap-3 border-t border-[#f0e8dc] pt-6 sm:flex-row sm:justify-between">
                  <button
                    type="button"
                    className={secondary}
                    onClick={back}
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    className={primary}
                    onClick={next}
                  >
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
                        onChange={(v) => update("trackLink", v)}
                        placeholder="https://drive.google.com/file/d/..."
                      />
                      <span className="mt-2 block text-xs font-normal text-[#9a887a]">
                        *Ensure that the uploaded Google Drive link is set to “Anyone with the link – Viewer”
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
                          onChange={(e) =>
                            update("imageLinks", e.target.value)
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
                        Paste 1–5 Google Drive links to your artwork, one
                        link per line. Ensure the event team can view them.
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
                            onChange={(e) =>
                              update("fineArtLinks", e.target.value)
                            }
                            placeholder={
                              "https://drive.google.com/file/d/ARTWORK_ID_1/view\nhttps://drive.google.com/file/d/ARTWORK_ID_2/view"
                            }
                          />
                        </Field>
                      </div>

                      <p className="mt-2 text-xs text-[#9a887a]">
                        Tip: In Google Drive, open Share and set access so
                        the event team can view the artwork.
                      </p>
                    </div>
                  )}

                  {!form.selectedEvents.includes("Dance") &&
                    !form.selectedEvents.includes("Photography") &&
                    !form.selectedEvents.includes("Fine Arts") && (
                      <p className="rounded-xl border border-dashed border-[#e4d5bf] bg-[#fffcf6] p-5 text-sm text-[#8a776b]">
                        No additional media submissions are required for
                        your selected events.
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
                        <p className="mt-1 font-bold">
                          {form.name || "—"}
                        </p>
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
                      {selectedEvents.map((ev) => {
                        const entry = form.eventEntries[ev.name];

                        return (
                          <div key={ev.name} className="p-4 sm:p-5">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <p className="font-black">{ev.name}</p>
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
                                {entry.members.map((member, j) => (
                                  <p
                                    key={j}
                                    className="mt-1 text-xs text-[#8a776b]"
                                  >
                                    {member.name || `Member ${j + 1}`} ·{" "}
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
                      onChange={(e) =>
                        update("confirmed", e.target.checked)
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
                    disabled={submitting}
                  >
                    {submitting
                      ? "Submitting registration…"
                      : "Submit registration →"}
                  </button>
                </div>

                <p className="text-center text-xs leading-5 text-[#a08c7b]">
                  Your details are saved when the registration server
                  accepts them.
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
