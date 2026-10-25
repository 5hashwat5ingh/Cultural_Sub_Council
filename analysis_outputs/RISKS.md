# Rigorous Frontend Risk Audit: Cultural Sub Council

This document flags implementation anomalies, architectural weaknesses, security issues, performance bottlenecks, and maintainability concerns discovered in `frontend`.

---

## 1. Critical Functional & Structural Risks

### 1.1 Non-functional Contact Form Dropping Submissions Silently
- **Location:** [`frontend/src/pages/Contact.jsx`](file:///d:/CSC%20Codebases/Cultural_Sub_Council/frontend/src/pages/Contact.jsx#L70-L84)
- **Description:** The form submission handler `handleSubmit` simply calls `event.preventDefault()`, toggles `setSubmitted(true)`, and wipes the form fields to blank. No API endpoint, webhook, or email service is called.
- **Risk:** Students, guests, and dignitaries sending queries or festival sponsorships receive a false-positive success confirmation while their communication is permanently lost.

### 1.2 Overly Restrictive Roll Number Validation Rejecting Other Cohorts
- **Location:** [`frontend/src/pages/Registration.jsx`](file:///d:/CSC%20Codebases/Cultural_Sub_Council/frontend/src/pages/Registration.jsx#L66)
- **Code:** `const isValidRollNumber = (value) => /^2026\d{6}$/.test(value.trim());`
- **Risk:** The regex strictly requires roll numbers to start with `2026` followed by exactly 6 digits. Any student or team member admitted in earlier or alternate years (e.g., 2023, 2024, 2025) or lateral entrants is outright blocked from submitting registrations.

### 1.3 Missing 404 / Catch-all Route Leading to Blank Screens
- **Location:** [`frontend/src/App.jsx`](file:///d:/CSC%20Codebases/Cultural_Sub_Council/frontend/src/App.jsx#L31-L82)
- **Risk:** No `<Route path="*" element={<NotFound />} />` exists in the router configuration. If a user mistypes a URL or clicks a broken external link, the app renders a blank screen without error messages or navigation headers.

### 1.4 Unprotected Client-Side Admin Routes
- **Location:** [`frontend/src/App.jsx`](file:///d:/CSC%20Codebases/Cultural_Sub_Council/frontend/src/App.jsx#L42-L44)
- **Risk:** `/admin/dashboard` and `/admin/drive-links` are mounted without route-guard protection (`ProtectedRoute`). When an unauthenticated visitor navigates to `/admin/dashboard`, the dashboard UI layout mounts and flashes briefly before an internal API error (`401 SESSION_EXPIRED`) triggers client redirection.

---

## 2. Data Integrity & Persistence Risks

### 2.1 Unsynchronized LocalStorage for Candidate Review Decisions
- **Location:** [`frontend/src/pages/admin/DriveLinks.jsx`](file:///d:/CSC%20Codebases/Cultural_Sub_Council/frontend/src/pages/admin/DriveLinks.jsx#L48-L54)
- **Code:** `localStorage.getItem("heats-drive-review-status")`
- **Risk:** In `DriveLinks.jsx`, whether a candidate's submitted Drive link has been reviewed is stored only in the reviewer's personal browser `localStorage`. Review statuses are not synchronized to the backend database. Multiple reviewers will overwrite or miss each other's status, and clearing browser history erases all review progress.

### 2.2 Hardcoded 100-Candidate Limit Without Pagination
- **Location:** [`frontend/src/pages/admin/DriveLinks.jsx`](file:///d:/CSC%20Codebases/Cultural_Sub_Council/frontend/src/pages/admin/DriveLinks.jsx#L78)
- **Code:** `new URLSearchParams({ limit: "100", page: "1" })`
- **Risk:** `DriveLinks.jsx` only queries the first page of 100 candidates. If more than 100 submissions are recorded, any candidate beyond candidate #100 is completely invisible and cannot be reviewed through this panel.

### 2.3 Ephemeral Free Image Hosting Dependency
- **Location:** [`frontend/src/data/galleryData.js`](file:///d:/CSC%20Codebases/Cultural_Sub_Council/frontend/src/data/galleryData.js), [`frontend/src/data/teamData.js`](file:///d:/CSC%20Codebases/Cultural_Sub_Council/frontend/src/data/teamData.js)
- **Risk:** All 53 photos in `galleryData.js` are hosted directly on `i.postimg.cc`, and several team photos are hosted on `i.ibb.co`. Free third-party hosts frequently expire links, rate-limit college network traffic, or trigger adblocker/browser heuristic blocks, threatening website media availability.

---

## 3. Performance & Asset Bloat Risks

### 3.1 Massive Unused Dependencies Bloating Build & Install Size
- **Location:** [`frontend/package.json`](file:///d:/CSC%20Codebases/Cultural_Sub_Council/frontend/package.json#L13-L25)
- **Details:**
  - `three` (`^0.186.1`)
  - `@react-three/fiber` (`^9.8.1`)
  - `@react-three/drei` (`^10.7.9`)
  - `@bible-strong/avatar-react` (`^0.1.0`)
- **Risk:** None of these packages are imported anywhere in `src/`. Including Three.js and React Three Fiber adds tens of megabytes of unused dependencies, increasing install times and cold build pipelines without purpose.

### 3.2 Unreferenced Heavy Media in the Repository (~35 MB)
- **Details:**
  - `frontend/gallery/videos/video-01.mp4` (**32.7 MB**) — completely unreferenced in code.
  - `frontend/public/hero-festival.png` (**2.45 MB**) — unreferenced in code.
  - `frontend/gallery/photos/photo-01.jpeg` (**211 KB**) — unreferenced in code.
  - `frontend/src/assets/hat.jpeg` (**211 KB**) — unreferenced in code.
  - `frontend/src/assets/hero.png` (**13 KB**) — unreferenced in code.
- **Risk:** 35.5 MB of dead media files are resident in the workspace. Crucially, `frontend/gallery/` is not in `.gitignore`, risking accidental git bloat.

### 3.3 Repeat Video Preloader Triggering on Every Navigation to Home
- **Location:** [`frontend/src/layouts/AppLayout.jsx`](file:///d:/CSC%20Codebases/Cultural_Sub_Council/frontend/src/layouts/AppLayout.jsx#L13-L20)
- **Risk:** `useEffect` triggers `setIsLoading(true)` whenever `isHomePage` is true. If a user clicks "Home" from any other page, the entire Cloudinary video preloader mounts and replays. There is no session check (`sessionStorage`) and no "Skip" button.

---

## 4. Design, Theming & Styling Inconsistencies

### 4.1 Four Clashing Color Systems Operating Simultaneously
- **Theme 1:** `index.html` sets pure dark monochrome: `class="bg-[#0A0A0A] text-[#EDEDED]"`.
- **Theme 2:** `tailwind.config.js` configures `#0A0A0A`, `#EDEDED`, `#8A8A8A`, `#141414`.
- **Theme 3:** `index.css` overrides body to Royal Blue/Navy: `background: #081a33; color: #f8f1df`.
- **Theme 4:** Pages and components use arbitrary inline hex values in Maroon (`#2B0A12`, `#1D070D`, `#7A1B2F`) and Khaki/Beige (`#DCD3A4`, `#F7EBD0`, `#F5EFD0`).
- **Consequence:** Visual inconsistency when moving between sections. For instance, in `Home.jsx`, dark maroon sections embed children (`LineTextReveal`, `FacultyMessages`, `ScrollStory`) that render solid bright beige backgrounds (`#DCD3A4`), abruptly shifting tone.

### 4.2 Route-Conditioned Navbar Text Color Fragility
- **Location:** [`frontend/src/components/Navbar.jsx`](file:///d:/CSC%20Codebases/Cultural_Sub_Council/frontend/src/components/Navbar.jsx#L27-L38)
- **Code:** `const hasGlassEffect = isHome || isClubs || isEvents || isTeam;` `textColor = hasGlassEffect ? "text-white" : "text-black";`
- **Risk:** Any newly added route or admin route defaults to `text-black`. Furthermore, Navbar position is `fixed` on `/events` but `absolute` everywhere else, meaning the header disappears immediately upon scrolling down on other pages.

---

## 5. Dead Code & Maintenance Debt

1. **`src/components/GalleryVideo.jsx`:** Dead file (never imported). Uses `<video src>` on YouTube URLs, which would fail if invoked.
2. **`src/components/TypingText.jsx`:** Dead file (never imported). `Home.jsx` reimplements its own typing effect.
3. **`src/components/ScrollTextReveal.jsx`:** Dead proxy file (only re-exports `LineTextReveal`).
4. **`src/Color`:** Extensionless scratchpad text file in `src/`.
5. **`src/data/notes`:** Extensionless notes file with raw Postimg links in `src/data/`.
6. **Data Duplication:**
   - `Clubs.jsx` maintains its own inline array of clubs instead of consuming `clubsData.js`.
   - `Events.jsx` duplicates event metadata from `eventsData.js`.
   - `FacultyMessages.jsx` duplicates identical quote text for the Vice-Chancellor and CSA Chairman.
   - `teamData.js` contains minor role typos (e.g., `"Soical Media Head"` and leading whitespace `" Music Club Head"`).
