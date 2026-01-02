# Digital Course Accessibility & Legal Standards (Senior Edition)

## 1. Legal Requirements

| Standard | What it is | Why it matters to us |
| :--- | :--- | :--- |
| **WCAG 2.1 / 2.2 AA** | Web Content Accessibility Guidelines. | The global standard. Adhering to this prevents "drive-by" accessibility lawsuits. |
| **ADA Title III** | Americans with Disabilities Act. | Applies to "places of public accommodation." Courts now interpret this to include commercial websites. |
| **Section 508** | Federal IT Accessibility. | Required if we ever partner with government entities (SBA, Public Libraries, etc.). |
| **FTC "Click to Cancel"** | Consumer Protection. | Requires a cancellation process as easy as the signup process. Critical for senior trust. |

---

## 2. Visual & Physical Best Practices

### A. Typography & Contrast
*   **Minimum Base Font:** 18px (we are already doing 112.5% in globals.css).
*   **Contrast Ratio:** 4.5:1 for normal text; 3:1 for large text.
*   **Line Spacing:** Minimum 1.5. Avoid "Blocks of Text."
*   **Color as Meaning:** Never use color *alone* to convey status (e.g., don't just use a red border for an error; add an "X" icon or text label).

### B. Motor Dexterity & Interaction
*   **Touch Targets:** Minimum 44px x 44px for all buttons and links.
*   **Interaction Speed:** No timed tasks. If a session times out, provide a clear warning and a simple way to extend it.
*   **Keyboard Only:** The entire platform must be navigable via the "Tab" key (no mouse required).

---

## 3. Cognitive Accessibility (Learning Science)

### A. The "One Concept" Rule
Older learners often experience higher "cognitive load."
*   **Avoid:** Complex sidebars distracting from the video.
*   **Favor:** scannable headers and bullet points.

### B. Memory Anchoring
*   **The "Summary First" Pattern:** Tell them what they will learn, teach it, then summarize it.
*   **Transcripts:** Always provide a full, scannable transcript below every video. Many seniors use these as "study guides."

---

## 4. Implementation Checklist for Silver Startup

*   [ ] **Theme Toggle:** Create a "Vision Mode" (High Contrast) toggle in the header.
*   [ ] **Video Controls:** Ensure play/pause/volume buttons are large and clearly labeled.
*   [ ] **Aria Labels:** Audit all icons (Lucide) to ensure they have descriptive `aria-label` tags for screen readers.
*   [ ] **Simple Navigation:** Ensure "Back to Dashboard" is always visible and consistent.
