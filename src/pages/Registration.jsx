import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

const EVENT_CATEGORIES = [
  "Dance",
  "Music",
  "Dramatics",
  "Fine Arts",
  "Photography",
  "Technical",
  "Other",
];

const YEARS = [
  "First Year",
  "Second Year",
  "Third Year",
  "Final Year",
];

const initialMember = () => ({
  name: "",
  phone: "",
  branch: "",
  year: "",
  email: "",
});

const inputClass =
  "w-full rounded-xl border border-[#ded5c1] bg-white px-4 py-3 text-sm text-[#2B0A12] outline-none transition placeholder:text-[#a69b89] focus:border-[#7A1B2F] focus:ring-2 focus:ring-[#7A1B2F]/10";

const labelClass =
  "mb-2 block text-sm font-semibold text-[#40252a]";

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-[#7A1B2F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5c1221] disabled:cursor-not-allowed disabled:opacity-50";

const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-[#d8cbb4] bg-white px-6 py-3 text-sm font-semibold text-[#51212a] transition hover:bg-[#f8f0e4]";

export default function Registration() {
  const [step, setStep] = useState(1);

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
    track: null,
    images: [],
    confirmed: false,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const audioInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const isTeam = formData.participationType !== "Solo";
  const selectedEvents = formData.events;

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
      submit: "",
    }));
  };

  const toggleMultipleEvents = (checked) => {
    setFormData((prev) => ({
      ...prev,
      multipleEvents: checked,
      events: checked ? prev.events : prev.events.slice(0, 1),
    }));

    setErrors((prev) => ({
      ...prev,
      events: "",
    }));
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

      return {
        ...prev,
        events,
      };
    });

    setErrors((prev) => ({
      ...prev,
      events: "",
    }));
  };

  const updateMember = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.map((member, i) =>
        i === index
          ? {
              ...member,
              [field]: value,
            }
          : member
      ),
    }));

    setErrors((prev) => ({
      ...prev,
      members: "",
      submit: "",
    }));
  };

  const addMember = () => {
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

    setErrors((prev) => ({
      ...prev,
      members: "",
    }));
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
      newErrors.year = "Please select your year.";
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
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

    const allMembers = [
      {
        name: formData.name,
        phone: formData.phone,
        branch: formData.branch,
        year: formData.year,
        email: formData.email,
      },
      ...formData.members,
    ];

    const memberPhones = allMembers
      .map((member) => member.phone.trim())
      .filter(Boolean);

    const duplicatePhone = memberPhones.some(
      (phone, index) => memberPhones.indexOf(phone) !== index
    );

    if (duplicatePhone) {
      newErrors.members =
        "Each participant must have a different phone number.";
    }

    formData.members.forEach((member, index) => {
      if (!member.name.trim()) {
        newErrors.members =
          `Please enter the name of participant ${index + 2}.`;
      } else if (!member.branch.trim()) {
        newErrors.members =
          `Please enter the branch of participant ${index + 2}.`;
      } else if (!member.year) {
        newErrors.members =
          `Please select the year of participant ${index + 2}.`;
      } else if (!/^[6-9]\d{9}$/.test(member.phone.trim())) {
        newErrors.members =
          `Enter a valid 10-digit phone number for participant ${index + 2}.`;
      } else if (
        member.email.trim() &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email.trim())
      ) {
        newErrors.members =
          `Enter a valid email address for participant ${index + 2}.`;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (!validateStepOne()) return;

      setStep(isTeam ? 2 : 3);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (step === 2) {
      if (!validateStepTwo()) return;

      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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

  const handleTrackChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        track: "The audio file must be under 20 MB.",
      }));

      event.target.value = "";
      return;
    }

    const allowedExtensions = /\.(mp3|wav|m4a|aac|ogg|webm)$/i;

    if (!allowedExtensions.test(file.name)) {
      setErrors((prev) => ({
        ...prev,
        track: "Upload an MP3, WAV, M4A, AAC, OGG, or WEBM audio file.",
      }));

      event.target.value = "";
      return;
    }

    const audio = new Audio();
    const objectUrl = URL.createObjectURL(file);

    audio.preload = "metadata";
    audio.src = objectUrl;

    audio.onloadedmetadata = () => {
      URL.revokeObjectURL(objectUrl);

      if (
        !Number.isFinite(audio.duration) ||
        audio.duration <= 0
      ) {
        setErrors((prev) => ({
          ...prev,
          track: "Could not read the audio duration.",
        }));

        updateField("track", null);

        if (audioInputRef.current) {
          audioInputRef.current.value = "";
        }

        return;
      }

      if (audio.duration > 120) {
        setErrors((prev) => ({
          ...prev,
          track: "The audio track must not exceed 2 minutes.",
        }));

        updateField("track", null);

        if (audioInputRef.current) {
          audioInputRef.current.value = "";
        }

        return;
      }

      updateField("track", {
        file,
        duration: audio.duration,
      });

      setErrors((prev) => ({
        ...prev,
        track: "",
      }));
    };

    audio.onerror = () => {
      URL.revokeObjectURL(objectUrl);

      setErrors((prev) => ({
        ...prev,
        track: "Unable to read this audio file. Try another file.",
      }));

      updateField("track", null);

      if (audioInputRef.current) {
        audioInputRef.current.value = "";
      }
    };
  };

  const handleImagesChange = (event) => {
    const files = Array.from(event.target.files || []);

    if (files.length > 10) {
      setErrors((prev) => ({
        ...prev,
        images: "You can upload a maximum of 10 images.",
      }));

      event.target.value = "";
      return;
    }

    const allowedExtensions = /\.(jpe?g|png|webp)$/i;

    const invalidFile = files.find(
      (file) =>
        !allowedExtensions.test(file.name) ||
        file.size > 10 * 1024 * 1024
    );

    if (invalidFile) {
      setErrors((prev) => ({
        ...prev,
        images: !allowedExtensions.test(invalidFile.name)
          ? "Only JPG, JPEG, PNG, and WEBP images are allowed."
          : "Each image must be under 10 MB.",
      }));

      event.target.value = "";
      return;
    }

    updateField("images", files);

    setErrors((prev) => ({
      ...prev,
      images: "",
    }));
  };

  const validateFinalStep = () => {
    const newErrors = {};

    if (selectedEvents.includes("Dance") && !formData.track) {
      newErrors.track = "Please upload your dance audio track.";
    }

    if (
      selectedEvents.includes("Photography") &&
      formData.images.length === 0
    ) {
      newErrors.images = "Please upload at least one photograph.";
    }

    if (!formData.confirmed) {
      newErrors.confirmed =
        "Please confirm that the information provided is correct.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateFinalStep()) return;

    setSubmitting(true);

    try {
      const payload = new FormData();

      payload.append("name", formData.name);
      payload.append("branch", formData.branch);
      payload.append("year", formData.year);
      payload.append("phone", formData.phone);
      payload.append("email", formData.email);
      payload.append("events", JSON.stringify(formData.events));
      payload.append(
        "multipleEvents",
        String(formData.multipleEvents)
      );
      payload.append(
        "participationType",
        formData.participationType
      );
      payload.append("teamName", formData.teamName);
      payload.append("members", JSON.stringify(formData.members));

      if (formData.track) {
        payload.append("track", formData.track.file);
      }

      formData.images.forEach((image) => {
        payload.append("images", image);
      });

      // FRONTEND DEMO:
      // This prepares the registration payload but does not save it.
      //
      // When your backend is ready, replace this demo with:
      //
      // const response = await fetch("/api/registrations", {
      //   method: "POST",
      //   body: payload,
      // });
      //
      // if (!response.ok) {
      //   throw new Error("Registration failed. Please try again.");
      // }

      console.log("Registration payload prepared:", {
        ...formData,
        track: formData.track?.file ?? null,
      });

      console.log("FormData prepared:", payload);

      alert(
        "Your form has been validated successfully. Registration is not saved yet because the backend API is not connected."
      );
    } catch (error) {
      console.error(error);

      setErrors({
        submit:
          "Something went wrong. Please check your details and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const progress = step === 1 ? 33 : step === 2 ? 66 : 100;

  const stepTitles = [
    { number: 1, title: "Your details" },
    { number: 2, title: "Your team" },
    { number: 3, title: "Final review" },
  ];

  return (
    <div className="min-h-screen bg-[#F7EBD0] text-[#2B0A12]">
      {/* Top navigation */}
      <header className="border-b border-[#d7c8a9] bg-[#F7EBD0]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            to="/"
            className="flex items-center gap-3"
            aria-label="Go to home"
          >
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
            className="text-sm font-semibold text-[#7A1B2F] transition hover:text-[#2B0A12]"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main layout */}
      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-8 lg:grid-cols-[0.85fr_1.35fr] lg:gap-12 lg:py-12">
        {/* Left information panel */}
        <aside className="relative overflow-hidden rounded-[2rem] bg-[#2B0A12] p-7 text-[#F7EBD0] sm:p-10 lg:flex lg:min-h-[760px] lg:flex-col lg:justify-between">
          {/* Decorative circles */}
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
              Bring your talent to the spotlight. Register for cultural
              events, find your team, and get ready to create something
              unforgettable.
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
              {stepTitles.map((item) => {
                const active = step === item.number;
                const completed = step > item.number;

                return (
                  <div
                    key={item.number}
                    className={`flex items-center gap-4 ${
                      active
                        ? "text-[#F7EBD0]"
                        : "text-[#F7EBD0]/45"
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

                    <div>
                      <p className="text-sm font-semibold">
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs text-[#F7EBD0]/45">
                        {item.number === 1
                          ? "Personal and event information"
                          : item.number === 2
                          ? "Add your fellow participants"
                          : "Uploads and confirmation"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 rounded-2xl border border-[#D9B86C]/20 bg-white/[0.04] p-5">
              <p className="text-sm font-bold text-[#D9B86C]">
                Before you begin
              </p>

              <ul className="mt-3 space-y-2 text-sm leading-6 text-[#F7EBD0]/75">
                <li>• Keep your contact details ready.</li>
                <li>• Choose your events carefully.</li>
                <li>• Prepare any required media files.</li>
              </ul>
            </div>
          </div>

          <p className="relative z-10 mt-8 text-xs text-[#F7EBD0]/40">
            Celebrate creativity. Celebrate culture.
          </p>
        </aside>

        {/* Right registration panel */}
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
                : "Review your details, upload any required files, and confirm your information."}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[1.75rem] border border-[#e5d9c3] bg-white p-5 shadow-[0_20px_70px_rgba(43,10,18,0.07)] sm:p-8"
            noValidate
          >
            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-8">
                <section>
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f6e8d1] font-bold text-[#7A1B2F]">
                      01
                    </span>

                    <div>
                      <h3 className="font-bold">Personal information</h3>
                      <p className="text-xs text-[#907c6b]">
                        Tell us a little about yourself.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" error={errors.name}>
                      <input
                        className={inputClass}
                        type="text"
                        placeholder="Enter your full name"
                        autoComplete="name"
                        value={formData.name}
                        onChange={(e) =>
                          updateField("name", e.target.value)
                        }
                      />
                    </Field>

                    <Field label="Branch / Department" error={errors.branch}>
                      <input
                        className={inputClass}
                        type="text"
                        placeholder="e.g. Computer Science"
                        value={formData.branch}
                        onChange={(e) =>
                          updateField("branch", e.target.value)
                        }
                      />
                    </Field>

                    <Field label="Academic year" error={errors.year}>
                      <select
                        className={inputClass}
                        value={formData.year}
                        onChange={(e) =>
                          updateField("year", e.target.value)
                        }
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
                        autoComplete="tel"
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        value={formData.phone}
                        onChange={(e) =>
                          updateField(
                            "phone",
                            e.target.value.replace(/\D/g, "").slice(0, 10)
                          )
                        }
                      />
                    </Field>

                    <div className="sm:col-span-2">
                      <Field label="Email address" error={errors.email}>
                        <input
                          className={inputClass}
                          type="email"
                          autoComplete="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            updateField("email", e.target.value)
                          }
                        />
                      </Field>
                    </div>
                  </div>
                </section>

                <div className="h-px bg-[#eee4d4]" />

                <section>
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f6e8d1] font-bold text-[#7A1B2F]">
                      02
                    </span>

                    <div>
                      <h3 className="font-bold">Choose your events</h3>
                      <p className="text-xs text-[#907c6b]">
                        Select one or more categories.
                      </p>
                    </div>
                  </div>

                  <label className="mb-4 flex cursor-pointer items-start gap-3 rounded-xl border border-[#e8ddc9] bg-[#fcf8f0] p-4">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 accent-[#7A1B2F]"
                      checked={formData.multipleEvents}
                      onChange={(e) =>
                        toggleMultipleEvents(e.target.checked)
                      }
                    />

                    <span>
                      <span className="block text-sm font-semibold">
                        I want to participate in multiple events
                      </span>

                      <span className="mt-1 block text-xs leading-5 text-[#907c6b]">
                        Enable this option to select more than one category.
                      </span>
                    </span>
                  </label>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {EVENT_CATEGORIES.map((eventName) => {
                      const selected =
                        formData.events.includes(eventName);

                      return (
                        <button
                          key={eventName}
                          type="button"
                          onClick={() => toggleEvent(eventName)}
                          className={`rounded-xl border p-4 text-left transition ${
                            selected
                              ? "border-[#7A1B2F] bg-[#7A1B2F] text-white shadow-md shadow-[#7A1B2F]/10"
                              : "border-[#e7dcc9] bg-white text-[#5d4242] hover:border-[#b18a56] hover:bg-[#fcf8f0]"
                          }`}
                        >
                          <span
                            className={`mb-3 flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold ${
                              selected
                                ? "bg-white/15 text-[#D9B86C]"
                                : "bg-[#f6e8d1] text-[#7A1B2F]"
                            }`}
                          >
                            {selected ? "✓" : "+"}
                          </span>

                          <span className="text-sm font-semibold">
                            {eventName}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {errors.events && (
                    <ErrorText>{errors.events}</ErrorText>
                  )}

                  {selectedEvents.length > 0 && (
                    <p className="mt-3 text-xs text-[#806b5a]">
                      Selected: {selectedEvents.join(", ")}
                    </p>
                  )}
                </section>

                <div className="h-px bg-[#eee4d4]" />

                <section>
                  <h3 className="font-bold">Participation type</h3>

                  <p className="mb-4 mt-1 text-xs text-[#907c6b]">
                    Are you performing alone or with others?
                  </p>

                  <div className="grid grid-cols-3 gap-3">
                    {["Solo", "Duo", "Team"].map((type) => {
                      const selected =
                        formData.participationType === type;

                      return (
                        <button
                          type="button"
                          key={type}
                          onClick={() =>
                            updateField("participationType", type)
                          }
                          className={`rounded-xl border px-3 py-4 text-sm font-bold transition ${
                            selected
                              ? "border-[#7A1B2F] bg-[#f9edf0] text-[#7A1B2F] ring-1 ring-[#7A1B2F]"
                              : "border-[#e7dcc9] bg-white text-[#6f5b52] hover:bg-[#fcf8f0]"
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </section>

                <div className="flex justify-end border-t border-[#eee4d4] pt-6">
                  <button
                    type="button"
                    className={primaryButton}
                    onClick={handleNext}
                  >
                    Continue
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: TEAM DETAILS */}
            {step === 2 && isTeam && (
              <div className="space-y-7">
                <section>
                  <h3 className="text-lg font-bold">Team information</h3>

                  <p className="mb-5 mt-1 text-sm text-[#907c6b]">
                    Enter your team name and participant details.
                  </p>

                  <Field label="Team name" error={errors.teamName}>
                    <input
                      className={inputClass}
                      type="text"
                      placeholder="Enter your team name"
                      value={formData.teamName}
                      onChange={(e) =>
                        updateField("teamName", e.target.value)
                      }
                    />
                  </Field>
                </section>

                <div className="h-px bg-[#eee4d4]" />

                <section>
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold">Other participants</h3>
                      <p className="mt-1 text-xs text-[#907c6b]">
                        You are already included as the first participant.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={addMember}
                      className={secondaryButton}
                    >
                      + Add member
                    </button>
                  </div>

                  {errors.members && (
                    <div className="mb-4">
                      <ErrorText>{errors.members}</ErrorText>
                    </div>
                  )}

                  <div className="space-y-5">
                    {formData.members.map((member, index) => (
                      <div
                        key={index}
                        className="rounded-2xl border border-[#e7dcc9] bg-[#fcf8f0] p-4 sm:p-5"
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7A1B2F] text-sm font-bold text-white">
                              {index + 2}
                            </span>

                            <h4 className="font-bold">
                              Participant {index + 2}
                            </h4>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeMember(index)}
                            className="text-xs font-semibold text-[#a12e40] hover:underline"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field label="Full name">
                            <input
                              className={inputClass}
                              type="text"
                              placeholder="Participant name"
                              value={member.name}
                              onChange={(e) =>
                                updateMember(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                            />
                          </Field>

                          <Field label="Mobile number">
                            <input
                              className={inputClass}
                              type="tel"
                              inputMode="numeric"
                              maxLength={10}
                              placeholder="10-digit mobile number"
                              value={member.phone}
                              onChange={(e) =>
                                updateMember(
                                  index,
                                  "phone",
                                  e.target.value
                                    .replace(/\D/g, "")
                                    .slice(0, 10)
                                )
                              }
                            />
                          </Field>

                          <Field label="Branch / Department">
                            <input
                              className={inputClass}
                              type="text"
                              placeholder="Enter branch"
                              value={member.branch}
                              onChange={(e) =>
                                updateMember(
                                  index,
                                  "branch",
                                  e.target.value
                                )
                              }
                            />
                          </Field>

                          <Field label="Academic year">
                            <select
                              className={inputClass}
                              value={member.year}
                              onChange={(e) =>
                                updateMember(
                                  index,
                                  "year",
                                  e.target.value
                                )
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
                                placeholder="participant@example.com"
                                value={member.email}
                                onChange={(e) =>
                                  updateMember(
                                    index,
                                    "email",
                                    e.target.value
                                  )
                                }
                              />
                            </Field>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="flex flex-col-reverse gap-3 border-t border-[#eee4d4] pt-6 sm:flex-row sm:justify-between">
                  <button
                    type="button"
                    className={secondaryButton}
                    onClick={handleBack}
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    className={primaryButton}
                    onClick={handleNext}
                  >
                    Continue
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: UPLOADS AND CONFIRMATION */}
            {step === 3 && (
              <div className="space-y-7">
                <section>
                  <h3 className="text-lg font-bold">Event requirements</h3>

                  <p className="mb-5 mt-1 text-sm leading-6 text-[#907c6b]">
                    Upload the required files for the event categories
                    you selected.
                  </p>

                  {selectedEvents.includes("Dance") && (
                    <div className="mb-5 rounded-2xl border border-[#e7dcc9] p-5">
                      <div className="flex items-start gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f6e8d1] text-lg">
                          ♪
                        </span>

                        <div>
                          <h4 className="font-bold">Dance audio track</h4>
                          <p className="mt-1 text-xs leading-5 text-[#907c6b]">
                            MP3, WAV, M4A, AAC, OGG, or WEBM. Maximum
                            duration: 2 minutes. Maximum size: 20 MB.
                          </p>
                        </div>
                      </div>

                      <input
                        ref={audioInputRef}
                        className="mt-5 block w-full cursor-pointer rounded-xl border border-[#ded5c1] bg-[#fcf8f0] text-sm file:mr-4 file:border-0 file:bg-[#7A1B2F] file:px-4 file:py-3 file:font-semibold file:text-white hover:file:bg-[#5c1221]"
                        type="file"
                        accept=".mp3,.wav,.m4a,.aac,.ogg,.webm,audio/*"
                        onChange={handleTrackChange}
                      />

                      {formData.track && (
                        <div className="mt-3 rounded-xl bg-[#edf5e9] p-3 text-sm text-[#315a31]">
                          <p className="font-semibold">
                            ✓ {formData.track.file.name}
                          </p>

                          <p className="mt-1 text-xs">
                            Duration:{" "}
                            {Math.floor(formData.track.duration / 60)}:
                            {String(
                              Math.floor(formData.track.duration % 60)
                            ).padStart(2, "0")}{" "}
                            min ·{" "}
                            {(
                              formData.track.file.size /
                              (1024 * 1024)
                            ).toFixed(2)}{" "}
                            MB
                          </p>
                        </div>
                      )}

                      {errors.track && (
                        <ErrorText>{errors.track}</ErrorText>
                      )}
                    </div>
                  )}

                  {selectedEvents.includes("Photography") && (
                    <div className="rounded-2xl border border-[#e7dcc9] p-5">
                      <div className="flex items-start gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f6e8d1] text-lg">
                          ▧
                        </span>

                        <div>
                          <h4 className="font-bold">
                            Photography submissions
                          </h4>

                          <p className="mt-1 text-xs leading-5 text-[#907c6b]">
                            Upload 1–10 JPG, JPEG, PNG, or WEBP images.
                            Maximum size: 10 MB per image.
                          </p>
                        </div>
                      </div>

                      <input
                        ref={imageInputRef}
                        className="mt-5 block w-full cursor-pointer rounded-xl border border-[#ded5c1] bg-[#fcf8f0] text-sm file:mr-4 file:border-0 file:bg-[#7A1B2F] file:px-4 file:py-3 file:font-semibold file:text-white hover:file:bg-[#5c1221]"
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                        multiple
                        onChange={handleImagesChange}
                      />

                      {formData.images.length > 0 && (
                        <div className="mt-3 rounded-xl bg-[#edf5e9] p-3 text-sm text-[#315a31]">
                          <p className="font-semibold">
                            ✓ {formData.images.length} image(s) selected
                          </p>

                          <ul className="mt-2 space-y-1 text-xs">
                            {formData.images.map((image, index) => (
                              <li key={`${image.name}-${index}`}>
                                {image.name} (
                                {(image.size / (1024 * 1024)).toFixed(2)}{" "}
                                MB)
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {errors.images && (
                        <ErrorText>{errors.images}</ErrorText>
                      )}
                    </div>
                  )}

                  {!selectedEvents.includes("Dance") &&
                    !selectedEvents.includes("Photography") && (
                      <div className="rounded-2xl border border-dashed border-[#d8cbb4] bg-[#fcf8f0] p-6 text-center">
                        <span className="text-2xl">✦</span>

                        <p className="mt-2 font-semibold">
                          No uploads required
                        </p>

                        <p className="mt-1 text-sm text-[#907c6b]">
                          Your selected categories do not require files
                          at this stage.
                        </p>
                      </div>
                    )}
                </section>

                <div className="h-px bg-[#eee4d4]" />

                <section>
                  <h3 className="text-lg font-bold">Review your details</h3>

                  <p className="mb-4 mt-1 text-sm text-[#907c6b]">
                    Check the information below before continuing.
                  </p>

                  <div className="overflow-hidden rounded-2xl border border-[#e7dcc9]">
                    <SummaryRow label="Name" value={formData.name} />
                    <SummaryRow label="Branch" value={formData.branch} />
                    <SummaryRow label="Year" value={formData.year} />
                    <SummaryRow label="Phone" value={formData.phone} />
                    <SummaryRow label="Email" value={formData.email} />

                    <SummaryRow
                      label="Events"
                      value={formData.events.join(", ")}
                    />

                    <SummaryRow
                      label="Participation"
                      value={formData.participationType}
                    />

                    {isTeam && (
                      <>
                        <SummaryRow
                          label="Team name"
                          value={formData.teamName}
                        />

                        <SummaryRow
                          label="Other members"
                          value={String(formData.members.length)}
                        />
                      </>
                    )}

                    {selectedEvents.includes("Dance") && (
                      <SummaryRow
                        label="Audio"
                        value={
                          formData.track
                            ? formData.track.file.name
                            : "Not uploaded"
                        }
                      />
                    )}

                    {selectedEvents.includes("Photography") && (
                      <SummaryRow
                        label="Photos"
                        value={`${formData.images.length} selected`}
                      />
                    )}
                  </div>
                </section>

                <section>
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#e7dcc9] bg-[#fcf8f0] p-4">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 accent-[#7A1B2F]"
                      checked={formData.confirmed}
                      onChange={(e) =>
                        updateField("confirmed", e.target.checked)
                      }
                    />

                    <span className="text-sm leading-6 text-[#5d4242]">
                      I confirm that the information provided is
                      accurate and that I have checked the event
                      requirements.
                    </span>
                  </label>

                  {errors.confirmed && (
                    <ErrorText>{errors.confirmed}</ErrorText>
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
                    {submitting ? "Please wait..." : "Complete registration"}
                    {!submitting && <span aria-hidden="true">→</span>}
                  </button>
                </div>

                <p className="text-center text-xs leading-5 text-[#907c6b]">
                  Your details will only be permanently saved once the
                  registration backend has been connected.
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

function Field({ label, error, children }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ children }) {
  return (
    <p className="mt-2 text-xs font-medium leading-5 text-red-600">
      {children}
    </p>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="grid grid-cols-[105px_1fr] gap-3 border-b border-[#eee4d4] px-4 py-3 last:border-b-0 sm:grid-cols-[140px_1fr]">
      <span className="text-xs font-semibold text-[#907c6b]">
        {label}
      </span>

      <span className="break-words text-sm font-medium text-[#40252a]">
        {value || "—"}
      </span>
    </div>
  );
}