import React, { useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const EVENT_CATEGORIES = [
  "Dance",
  "Music",
  "Dramatics",
  "Fine Arts",
  "Photography",
  "Technical",
  "Other",
];

const YEARS = ["First Year", "Second Year", "Third Year", "Final Year"];

const inputClass =
  "w-full rounded-xl border border-[#ded5c1] bg-white px-4 py-3 text-sm text-[#2B0A12] outline-none focus:border-[#7A1B2F] focus:ring-2 focus:ring-[#7A1B2F]/10";

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-[#7A1B2F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5c1221] disabled:cursor-not-allowed disabled:opacity-50";

const secondaryButton =
  "inline-flex items-center justify-center rounded-xl border border-[#d8cbb4] bg-white px-6 py-3 text-sm font-semibold text-[#51212a] hover:bg-[#f8f0e4]";

const initialMember = () => ({
  name: "",
  phone: "",
  branch: "",
  year: "",
  email: "",
});

function isGoogleDriveLink(value) {
  try {
    const url = new URL(value.trim());
    return (
      url.protocol === "https:" &&
      ["drive.google.com", "docs.google.com"].includes(url.hostname)
    );
  } catch {
    return false;
  }
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#40252a]">
        {label}
      </label>
      {children}
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="grid grid-cols-[105px_1fr] gap-3 border-b border-[#eee4d4] px-4 py-3 last:border-b-0 sm:grid-cols-[140px_1fr]">
      <span className="text-xs font-semibold text-[#907c6b]">{label}</span>
      <span className="break-words text-sm font-medium text-[#40252a]">
        {value || "—"}
      </span>
    </div>
  );
}

export default function Registration() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [registrationId, setRegistrationId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    year: "",
    phone: "",
    email: "",
    events: [],
    multipleEvents: false,
    participationType: "Solo",
    teamName: "",
    members: [initialMember()],
    trackLink: "",
    imageLinks: "",
    confirmed: false,
  });

  const [errors, setErrors] = useState({});

  const isTeam = formData.participationType !== "Solo";
  const selectedEvents = formData.events;

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "", submit: "" }));
  };

  const toggleMultipleEvents = (checked) => {
    setFormData((prev) => ({
      ...prev,
      multipleEvents: checked,
      events: checked ? prev.events : prev.events.slice(0, 1),
    }));
    setErrors((prev) => ({ ...prev, events: "" }));
  };

  const toggleEvent = (eventName) => {
    setFormData((prev) => {
      const alreadySelected = prev.events.includes(eventName);

      let events;

      if (alreadySelected) {
        events = prev.events.filter((event) => event !== eventName);
      } else if (prev.multipleEvents) {
        events = [...prev.events, eventName];
      } else {
        events = [eventName];
      }

      return { ...prev, events };
    });

    setErrors((prev) => ({ ...prev, events: "" }));
  };

  const updateMember = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.map((member, i) =>
        i === index ? { ...member, [field]: value } : member
      ),
    }));

    setErrors((prev) => ({ ...prev, members: "", submit: "" }));
  };

  const addMember = () => {
    if (formData.members.length >= 19) {
      setErrors((prev) => ({
        ...prev,
        members: "You can add a maximum of 19 additional participants.",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      members: [...prev.members, initialMember()],
    }));
  };

  const removeMember = (index) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index),
    }));

    setErrors((prev) => ({ ...prev, members: "" }));
  };

  const validateStepOne = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name.";
    }

    if (!formData.branch.trim()) {
      newErrors.branch = "Please enter your branch.";
    }

    if (!formData.year) {
      newErrors.year = "Please select your academic year.";
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address.";
    }

    if (formData.events.length === 0) {
      newErrors.events = "Please select at least one event.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStepTwo = () => {
    const newErrors = {};

    if (!formData.teamName.trim()) {
      newErrors.teamName = "Please enter your team name.";
    }

    if (formData.members.length === 0) {
      newErrors.members = "Add at least one other participant.";
    }

    const allPhones = [
      formData.phone.trim(),
      ...formData.members.map((member) => member.phone.trim()),
    ].filter(Boolean);

    if (new Set(allPhones).size !== allPhones.length) {
      newErrors.members = "Each participant must have a different phone number.";
    }

    formData.members.forEach((member, index) => {
      const participant = index + 2;

      if (!member.name.trim()) {
        newErrors.members = `Enter the name of participant ${participant}.`;
      } else if (!member.branch.trim()) {
        newErrors.members = `Enter the branch of participant ${participant}.`;
      } else if (!member.year) {
        newErrors.members = `Select the year of participant ${participant}.`;
      } else if (!/^[6-9]\d{9}$/.test(member.phone.trim())) {
        newErrors.members = `Enter a valid phone number for participant ${participant}.`;
      } else if (
        member.email.trim() &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email.trim())
      ) {
        newErrors.members = `Enter a valid email for participant ${participant}.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateFinalStep = () => {
    const newErrors = {};

    if (selectedEvents.includes("Dance")) {
      if (!formData.trackLink.trim()) {
        newErrors.trackLink = "Please enter your Dance audio Google Drive link.";
      } else if (!isGoogleDriveLink(formData.trackLink)) {
        newErrors.trackLink = "Enter a valid HTTPS Google Drive link.";
      }
    }

    if (selectedEvents.includes("Photography")) {
      const links = formData.imageLinks
        .split(/\n/)
        .map((link) => link.trim())
        .filter(Boolean);

      if (links.length < 1 || links.length > 10) {
        newErrors.imageLinks = "Enter between 1 and 10 Google Drive image links.";
      } else if (!links.every(isGoogleDriveLink)) {
        newErrors.imageLinks =
          "Every image link must be a valid HTTPS Google Drive link.";
      }
    }

    if (!formData.confirmed) {
      newErrors.confirmed = "Please confirm your registration details.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (!validateStepOne()) return;
      setStep(isTeam ? 2 : 3);
    } else if (step === 2) {
      if (!validateStepTwo()) return;
      setStep(3);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    if (step === 3) {
      setStep(isTeam ? 2 : 1);
    } else if (step === 2) {
      setStep(1);
    }

    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateFinalStep()) return;

    setSubmitting(true);
    setErrors({});

    const imageLinks = formData.imageLinks
      .split(/\n/)
      .map((link) => link.trim())
      .filter(Boolean);

    const payload = {
      name: formData.name.trim(),
      branch: formData.branch.trim(),
      year: formData.year,
      phone: formData.phone.trim(),
      email: formData.email.trim().toLowerCase(),
      events: formData.events,
      multipleEvents: formData.multipleEvents,
      participationType: formData.participationType,
      teamName: isTeam ? formData.teamName.trim() : "",
      members: isTeam ? formData.members : [],
      trackLink: selectedEvents.includes("Dance")
        ? formData.trackLink.trim()
        : "",
      imageLinks: selectedEvents.includes("Photography") ? imageLinks : [],
      confirmed: formData.confirmed,
    };

    try {
      const response = await fetch(`${API_URL}/api/registrations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message || `Registration failed (${response.status}).`
        );
      }

      setRegistrationId(result.registrationId || "");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Registration submission failed:", error);

      setErrors({
        submit:
          error.message ||
          "Could not connect to the registration server. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setRegistrationId("");
    setErrors({});

    setFormData({
      name: "",
      branch: "",
      year: "",
      phone: "",
      email: "",
      events: [],
      multipleEvents: false,
      participationType: "Solo",
      teamName: "",
      members: [initialMember()],
      trackLink: "",
      imageLinks: "",
      confirmed: false,
    });
  };

  const progress = step === 1 ? 33 : step === 2 ? 66 : 100;

  if (registrationId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7EBD0] px-4 py-12 text-[#2B0A12]">
        <div className="w-full max-w-xl rounded-3xl border border-[#e5d9c3] bg-white p-8 text-center shadow-xl sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-700">
            ✓
          </div>

          <h1 className="mt-6 text-3xl font-black">Registration successful!</h1>

          <p className="mt-3 leading-7 text-[#755e55]">
            Your registration has been saved successfully.
          </p>

          {registrationId && (
            <div className="mt-6 rounded-xl bg-[#fcf8f0] p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#907c6b]">
                Registration reference
              </p>
              <p className="mt-2 break-all font-bold text-[#7A1B2F]">
                {registrationId}
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/" className={secondaryButton}>
              Back to Home
            </Link>
            <button type="button" className={primaryButton} onClick={resetForm}>
              Register another participant
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7EBD0] text-[#2B0A12]">
      <header className="border-b border-[#d7c8a9] bg-[#F7EBD0]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link to="/" className="flex items-center gap-3" aria-label="Go home">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2B0A12] text-lg font-black text-[#D9B86C]">
              C
            </div>
            <div>
              <p className="text-sm font-extrabold tracking-wide">
                CULTURAL COUNCIL
              </p>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#806b5a]">
                Registration Portal
              </p>
            </div>
          </Link>

          <Link
            to="/"
            className="text-sm font-semibold text-[#7A1B2F] hover:text-[#2B0A12]"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-8 lg:grid-cols-[0.85fr_1.35fr] lg:gap-12 lg:py-12">
        <aside className="relative overflow-hidden rounded-[2rem] bg-[#2B0A12] p-7 text-[#F7EBD0] sm:p-10 lg:flex lg:min-h-[760px] lg:flex-col lg:justify-between">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#D9B86C]/25" />
          <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border border-[#D9B86C]/25" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#7A1B2F]/40 blur-2xl" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D9B86C]/40 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#D9B86C]">
              <span className="h-2 w-2 rounded-full bg-[#D9B86C]" />
              Registrations Open
            </span>

            <p className="mt-10 text-sm font-semibold uppercase tracking-[0.25em] text-[#D9B86C]">
              Make your mark
            </p>

            <h1 className="mt-4 max-w-lg text-4xl font-black leading-[1.12] sm:text-5xl">
              Your stage.
              <br />
              Your story.
              <br />
              <span className="text-[#D9B86C]">Your moment.</span>
            </h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-[#eadfc9]/80 sm:text-base">
              Bring your talent to the spotlight. Register for cultural events,
              find your team, and get ready to create something unforgettable.
            </p>
          </div>

          <div className="relative z-10 mt-10">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#D9B86C]">
              Registration progress
            </p>

            <div className="mb-7 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#D9B86C] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="space-y-5">
              {[
                { number: 1, title: "Your details" },
                { number: 2, title: "Your team" },
                { number: 3, title: "Final review" },
              ].map((item) => {
                const active = step === item.number;
                const completed = step > item.number;

                return (
                  <div
                    key={item.number}
                    className={`flex items-center gap-4 ${
                      active ? "text-[#F7EBD0]" : "text-[#F7EBD0]/45"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${
                        completed
                          ? "border-[#D9B86C] bg-[#D9B86C] text-[#2B0A12]"
                          : active
                            ? "border-[#D9B86C] text-[#D9B86C]"
                            : "border-white/20"
                      }`}
                    >
                      {completed ? "✓" : `0${item.number}`}
                    </div>
                    <p className="text-sm font-semibold">{item.title}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 rounded-2xl border border-[#D9B86C]/20 bg-white/[0.04] p-5">
              <p className="text-sm font-bold text-[#D9B86C]">Before you begin</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-[#F7EBD0]/75">
                <li>• Keep your contact details ready.</li>
                <li>• Choose your events carefully.</li>
                <li>• Prepare any required Google Drive links.</li>
              </ul>
            </div>
          </div>

          <p className="relative z-10 mt-8 text-xs text-[#F7EBD0]/40">
            Celebrate creativity. Celebrate culture.
          </p>
        </aside>

        <section className="min-w-0">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#9C762E]">
              Registration form
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              {step === 1
                ? "Let's get to know you."
                : step === 2
                  ? "Meet your team."
                  : "One last thing."}
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#755e55]">
              {step === 1
                ? "Fill in your details and choose the events you want to participate in."
                : step === 2
                  ? "Add the details of your fellow participants."
                  : "Add the required Google Drive links, review your details, and confirm your information."}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[1.75rem] border border-[#e5d9c3] bg-white p-5 shadow-[0_20px_70px_rgba(43,10,18,0.07)] sm:p-8"
            noValidate
          >
            {step === 1 && (
              <div className="space-y-8">
                <section>
                  <h3 className="mb-5 font-bold">Personal information</h3>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" error={errors.name}>
                      <input
                        className={inputClass}
                        value={formData.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        placeholder="Enter your full name"
                        autoComplete="name"
                      />
                    </Field>

                    <Field label="Branch / Department" error={errors.branch}>
                      <input
                        className={inputClass}
                        value={formData.branch}
                        onChange={(e) => updateField("branch", e.target.value)}
                        placeholder="e.g. Electrical Engineering"
                      />
                    </Field>

                    <Field label="Academic year" error={errors.year}>
                      <select
                        className={inputClass}
                        value={formData.year}
                        onChange={(e) => updateField("year", e.target.value)}
                      >
                        <option value="">Select your year</option>
                        {YEARS.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Mobile number" error={errors.phone}>
                      <input
                        className={inputClass}
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        value={formData.phone}
                        onChange={(e) =>
                          updateField(
                            "phone",
                            e.target.value.replace(/\D/g, "").slice(0, 10)
                          )
                        }
                        placeholder="10-digit mobile number"
                      />
                    </Field>

                    <div className="sm:col-span-2">
                      <Field label="Email address" error={errors.email}>
                        <input
                          className={inputClass}
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          placeholder="you@example.com"
                        />
                      </Field>
                    </div>
                  </div>
                </section>

                <div className="h-px bg-[#eee4d4]" />

                <section>
                  <h3 className="font-bold">Choose your events</h3>
                  <p className="mb-4 mt-1 text-xs text-[#907c6b]">
                    Enable multiple events to select more than one category.
                  </p>

                  <label className="mb-4 flex cursor-pointer items-start gap-3 rounded-xl border border-[#e8ddc9] bg-[#fcf8f0] p-4">
                    <input
                      type="checkbox"
                      className="mt-1 accent-[#7A1B2F]"
                      checked={formData.multipleEvents}
                      onChange={(e) => toggleMultipleEvents(e.target.checked)}
                    />
                    <span className="text-sm font-semibold">
                      I want to participate in multiple events
                    </span>
                  </label>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {EVENT_CATEGORIES.map((eventName) => {
                      const selected = formData.events.includes(eventName);

                      return (
                        <button
                          key={eventName}
                          type="button"
                          onClick={() => toggleEvent(eventName)}
                          className={`rounded-xl border p-4 text-left transition ${
                            selected
                              ? "border-[#7A1B2F] bg-[#7A1B2F] text-white"
                              : "border-[#e7dcc9] bg-white text-[#5d4242] hover:border-[#b18a56]"
                          }`}
                        >
                          <span className="mb-3 block text-lg">
                            {selected ? "✓" : "+"}
                          </span>
                          <span className="text-sm font-semibold">{eventName}</span>
                        </button>
                      );
                    })}
                  </div>

                  {errors.events && (
                    <p className="mt-2 text-xs text-red-600">{errors.events}</p>
                  )}

                  {selectedEvents.length > 0 && (
                    <p className="mt-3 text-xs text-[#806b5a]">
                      Selected: {selectedEvents.join(", ")}
                    </p>
                  )}
                </section>

                <div className="h-px bg-[#eee4d4]" />

                <section>
                  <h3 className="mb-4 font-bold">Participation type</h3>

                  <div className="grid grid-cols-3 gap-3">
                    {["Solo", "Duo", "Team"].map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => updateField("participationType", type)}
                        className={`rounded-xl border px-3 py-4 text-sm font-bold ${
                          formData.participationType === type
                            ? "border-[#7A1B2F] bg-[#f9edf0] text-[#7A1B2F]"
                            : "border-[#e7dcc9] bg-white text-[#6f5b52]"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </section>

                <div className="flex justify-end border-t border-[#eee4d4] pt-6">
                  <button type="button" className={primaryButton} onClick={handleNext}>
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {step === 2 && isTeam && (
              <div className="space-y-7">
                <Field label="Team name" error={errors.teamName}>
                  <input
                    className={inputClass}
                    value={formData.teamName}
                    onChange={(e) => updateField("teamName", e.target.value)}
                    placeholder="Enter your team name"
                  />
                </Field>

                <section>
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold">Other participants</h3>
                      <p className="mt-1 text-xs text-[#907c6b]">
                        Your details are already included as the first participant.
                      </p>
                    </div>
                    <button type="button" className={secondaryButton} onClick={addMember}>
                      + Add member
                    </button>
                  </div>

                  {errors.members && (
                    <p className="mb-4 text-xs text-red-600">{errors.members}</p>
                  )}

                  <div className="space-y-5">
                    {formData.members.map((member, index) => (
                      <div
                        key={index}
                        className="rounded-2xl border border-[#e7dcc9] bg-[#fcf8f0] p-4 sm:p-5"
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <h4 className="font-bold">Participant {index + 2}</h4>
                          <button
                            type="button"
                            className="text-xs font-semibold text-[#a12e40]"
                            onClick={() => removeMember(index)}
                          >
                            Remove
                          </button>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field label="Full name">
                            <input
                              className={inputClass}
                              value={member.name}
                              onChange={(e) =>
                                updateMember(index, "name", e.target.value)
                              }
                              placeholder="Participant name"
                            />
                          </Field>

                          <Field label="Mobile number">
                            <input
                              className={inputClass}
                              type="tel"
                              inputMode="numeric"
                              maxLength={10}
                              value={member.phone}
                              onChange={(e) =>
                                updateMember(
                                  index,
                                  "phone",
                                  e.target.value.replace(/\D/g, "").slice(0, 10)
                                )
                              }
                              placeholder="10-digit mobile number"
                            />
                          </Field>

                          <Field label="Branch / Department">
                            <input
                              className={inputClass}
                              value={member.branch}
                              onChange={(e) =>
                                updateMember(index, "branch", e.target.value)
                              }
                              placeholder="Enter branch"
                            />
                          </Field>

                          <Field label="Academic year">
                            <select
                              className={inputClass}
                              value={member.year}
                              onChange={(e) =>
                                updateMember(index, "year", e.target.value)
                              }
                            >
                              <option value="">Select year</option>
                              {YEARS.map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </select>
                          </Field>

                          <div className="sm:col-span-2">
                            <Field label="Email address (optional)">
                              <input
                                className={inputClass}
                                type="email"
                                value={member.email}
                                onChange={(e) =>
                                  updateMember(index, "email", e.target.value)
                                }
                                placeholder="participant@example.com"
                              />
                            </Field>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="flex flex-col-reverse gap-3 border-t border-[#eee4d4] pt-6 sm:flex-row sm:justify-between">
                  <button type="button" className={secondaryButton} onClick={handleBack}>
                    ← Back
                  </button>
                  <button type="button" className={primaryButton} onClick={handleNext}>
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-7">
                <section>
                  <h3 className="text-lg font-bold">Event requirements</h3>
                  <p className="mb-5 mt-1 text-sm leading-6 text-[#907c6b]">
                    Paste Google Drive links for the selected events. Make sure
                    the files are shared with the required access permissions.
                  </p>

                  {selectedEvents.includes("Dance") && (
                    <div className="mb-5 rounded-2xl border border-[#e7dcc9] p-5">
                      <h4 className="font-bold">Dance audio track</h4>
                      <p className="mt-1 text-xs leading-5 text-[#907c6b]">
                        Paste a Google Drive link to your audio file.
                      </p>

                      <input
                        className={`${inputClass} mt-4`}
                        type="url"
                        value={formData.trackLink}
                        onChange={(e) => updateField("trackLink", e.target.value)}
                        placeholder="https://drive.google.com/file/d/..."
                      />

                      {errors.trackLink && (
                        <p className="mt-2 text-xs text-red-600">
                          {errors.trackLink}
                        </p>
                      )}
                    </div>
                  )}

                  {selectedEvents.includes("Photography") && (
                    <div className="rounded-2xl border border-[#e7dcc9] p-5">
                      <h4 className="font-bold">Photography submissions</h4>
                      <p className="mt-1 text-xs leading-5 text-[#907c6b]">
                        Paste 1–10 Google Drive image links, one per line.
                      </p>

                      <textarea
                        className={`${inputClass} mt-4 min-h-36`}
                        value={formData.imageLinks}
                        onChange={(e) => updateField("imageLinks", e.target.value)}
                        placeholder={
                          "https://drive.google.com/file/d/IMAGE_ID_1/view\nhttps://drive.google.com/file/d/IMAGE_ID_2/view"
                        }
                      />

                      {errors.imageLinks && (
                        <p className="mt-2 text-xs text-red-600">
                          {errors.imageLinks}
                        </p>
                      )}
                    </div>
                  )}

                  {!selectedEvents.includes("Dance") &&
                    !selectedEvents.includes("Photography") && (
                      <div className="rounded-2xl border border-dashed border-[#d8cbb4] bg-[#fcf8f0] p-6 text-center">
                        <p className="font-semibold">No links required</p>
                        <p className="mt-1 text-sm text-[#907c6b]">
                          Your selected categories do not require media links at this stage.
                        </p>
                      </div>
                    )}
                </section>

                <div className="h-px bg-[#eee4d4]" />

                <section>
                  <h3 className="text-lg font-bold">Review your details</h3>
                  <div className="mt-4 overflow-hidden rounded-2xl border border-[#e7dcc9]">
                    <SummaryRow label="Name" value={formData.name} />
                    <SummaryRow label="Branch" value={formData.branch} />
                    <SummaryRow label="Year" value={formData.year} />
                    <SummaryRow label="Phone" value={formData.phone} />
                    <SummaryRow label="Email" value={formData.email} />
                    <SummaryRow label="Events" value={formData.events.join(", ")} />
                    <SummaryRow label="Participation" value={formData.participationType} />

                    {isTeam && (
                      <>
                        <SummaryRow label="Team name" value={formData.teamName} />
                        <SummaryRow
                          label="Other members"
                          value={String(formData.members.length)}
                        />
                      </>
                    )}

                    {selectedEvents.includes("Dance") && (
                      <SummaryRow label="Audio link" value={formData.trackLink} />
                    )}

                    {selectedEvents.includes("Photography") && (
                      <SummaryRow
                        label="Image links"
                        value={`${formData.imageLinks
                          .split(/\n/)
                          .filter((link) => link.trim()).length} link(s) provided`}
                      />
                    )}
                  </div>
                </section>

                <section>
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#e7dcc9] bg-[#fcf8f0] p-4">
                    <input
                      type="checkbox"
                      className="mt-1 accent-[#7A1B2F]"
                      checked={formData.confirmed}
                      onChange={(e) => updateField("confirmed", e.target.checked)}
                    />
                    <span className="text-sm leading-6 text-[#5d4242]">
                      I confirm that the information provided is accurate and
                      that I have checked the event requirements.
                    </span>
                  </label>

                  {errors.confirmed && (
                    <p className="mt-2 text-xs text-red-600">{errors.confirmed}</p>
                  )}
                </section>

                {errors.submit && (
                  <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
                    {errors.submit}
                  </div>
                )}

                <div className="flex flex-col-reverse gap-3 border-t border-[#eee4d4] pt-6 sm:flex-row sm:justify-between">
                  <button
                    type="button"
                    className={secondaryButton}
                    onClick={handleBack}
                    disabled={submitting}
                  >
                    ← Back
                  </button>

                  <button
                    type="submit"
                    className={primaryButton}
                    disabled={submitting}
                  >
                    {submitting ? "Saving registration..." : "Complete registration"}
                    {!submitting && <span aria-hidden="true">→</span>}
                  </button>
                </div>

                <p className="text-center text-xs leading-5 text-[#907c6b]">
                  Your registration will be saved to the database when the server
                  accepts it.
                </p>
              </div>
            )}
          </form>

          <p className="mt-6 text-center text-xs text-[#907c6b]">
            Need help? Contact your Cultural Council registration team.
          </p>
        </section>
      </main>
    </div>
  );
}