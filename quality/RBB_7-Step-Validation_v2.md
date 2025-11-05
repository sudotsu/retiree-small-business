# RBB — 7‑Step Validation Checklist (v2)

> **Single source of truth for module QA.** Transclude or reference this file in _every_ module skeleton. If any item here changes again, bump to `v3` and update the include lines in each module’s skeleton.
>
> skeletons/RBB_Module-00_Welcome-And-Setup_v2.md

**What changed vs. v1 (high‑level):**

- Folded **andragogy & senior‑friendly** requirements directly into accessibility and design checks (large‑print, high‑contrast, low‑tech paths, tech‑concierge tasks).
  10-business-ideas
  Module_0_Skeleton_v2

- Tightened **learning outcome alignment** with the working module skeleton (Bloom levels, assessment types).
  Module_0_Skeleton_v2

- Added **funnel hooks & instrumentation** requirements (lead magnets, quizzes, tracking tags, emails) so each module plugs into marketing and retention.
  marketing-assets-1
  quizzes_and_emails

- Required **cross‑mapping** to Essentials/Mastery exercises to keep parity across both tiers.
  Korb weeks 1-4
  Korb weeks 5-8

- Clarified **export/ops readiness** (printables + fillable forms; slides; instructor guide).
  Full_Course_Draft_v2

---

1. Outcome & Scope (must be observable and testable)

---

- **Outcome statement present at the top** of each module (COs/MOs), observable with Bloom‑level verbs; mapped to course outcomes.
  Module_0_Skeleton_v2

- **Scope parity across tiers**: the module clearly indicates its Essentials analog (exercise or activity) and Mastery expansion so learners in either track land on the same core competencies.
  Korb weeks 1-4
  Korb weeks 5-8

- **Assessment alignment**: at least one formative (quiz or practice) and one summative deliverable tie directly to the outcomes.
  Module_0_Skeleton_v2

**Pass when:** Every promise in the outcome has a matching activity and an assessment rubric line. (If any promise lacks proof, it’s a fail.)

---

2. Accuracy & Specificity (no hand‑waving)

---

- Claims are **concrete/falsifiable** and supported by examples, calculators, or worksheets (e.g., RAW marketing test; cash‑flow sheets).
  Korb weeks 5-8
  Korb weeks 1-4

- “How‑to” is explicit (no “just do X” without steps, screenshots, or a template). Where the slides or workbooks are referenced, the **actual file path** exists.
  Full_Course_Draft_v2

**Pass when:** Every concept has a “show me” artifact (worksheet, template, example, or clip).

---

3. Accessibility, Andragogy & Cognitive Load (RBB audience realities)

---

- **WCAG basics**: proper heading order; alt‑text placeholders; link text is descriptive. **Export notes include color/contrast, 16–18pt fonts** for printables.
  Module_0_Skeleton_v2
  10-business-ideas

- **Senior‑friendly defaults**: large‑print and high‑contrast versions offered for worksheets; avoid UI jargon; no “tiny click‑targets.”
  10-business-ideas

- **Andragogy baked in**: problem‑centered tasks; draw on learners’ prior experience; autonomy (options/paths); immediate application. (_Each lesson must say why it matters now._)
  Korb weeks 1-4

- **Tech‑concierge tasks** exist (account setup, install, verification), with a troubleshooting matrix; lower‑tech alternative where possible.
  Module_0_Skeleton_v2

- **Pacing & load**: lesson times declared; break points noted in live run‑of‑show; Essentials “short path” identified.
  Module_0_Skeleton_v2
  Korb weeks 1-4

**Pass when:** The module can be completed comfortably by a 60–75+ learner _without_ external help, and all printables are legible in large‑print.

---

4. Structure, Slugs & Cross‑Links (no drift)

---

- File carries the **module tag** `[TAG:ModuleXX]`, and prev/next links resolve to the correct slugs (`/rbb/module-XX-<kebab-title>`).
  RBB_Module-00_TBD-Title_v1
  skeletons/RBB_Module-00_Welcome-And-Setup_v2.md

- The module skeleton includes the **7‑Step transclusion** (this file).
  RBB_Module-00_TBD-Title_v1
  skeletons/RBB_Module-00_Welcome-And-Setup_v2.md

- **Index parity:** the artifacts (lesson scripts, workbook, slides, instructor guide, hooks) listed in the Master Index have matching files or “Missing” status updated.
  Master_Index_v2.md

**Pass when:** No broken links, slugs, or tag mismatches; Master Index line turns to **Draft/Ready** only when the asset exists.

---

5. Consistency, Brand & Voice (what learners see and feel)

---

- Terminology and tone are consistent with **Retiree Business Blueprint** copy and hooks. (Avoid hustle‑culture clichés; emphasize low‑risk, purpose, practicality.)
  marketing-assets-1

- **Hooks in module** reflect the program’s positioning and are coherent with the module’s outcome (tie back to the hooks masterlist once populated).
  RBB_Marketing-Hooks_Master_v1

- Cross‑references match the **instructor guide** and **slides** language (no label or step drift).
  Full_Course_Draft_v2

**Pass when:** The same promise is worded the same way across lesson → workbook → slides → hooks.

---

6. Hooks, Proof & Funnel Integration (marketing meets learning)

---

- **Three+ module‑level hooks** present (short social, one email swipe, and 30–60s clip timecodes), aligned to module outcome and course promise.
  Module_0_Skeleton_v2

- **Lead magnet tie‑in** is identified where relevant (e.g., _5‑Day Starter Plan_, _10 Business Ideas_ PDF) with CTA placement in slides/workbook.
  marketing-assets-1
  10-business-ideas

- **Quiz/Email integration**: if the module drives a quiz, the **instrumentation tags** and follow‑up email IDs are specified (e.g., `quiz1_ready_to_launch` etc.).
  quizzes_and_emails

**Pass when:** A learner can move from learning → quick win → opt‑in → next step without friction, and the CRM receives the right tags.

---

7. Export & Ops Readiness (zero “where’s that file?” moments)

---

- **Workbook/Slides/Instructor Guide** headings exist (even if empty stubs) and are linked from the skeleton; printables + **fillable online forms** indicated.
  Full_Course_Draft_v2
  Module_0_Skeleton_v2

- **Assessment artifacts** exist (quiz JSON, rubrics, grading guide) with file paths and submission instructions; SLA for reviews noted.
  Module_0_Skeleton_v2

- **Analytics events** (e.g., `quiz_submitted`, `artifact_uploaded`) are listed for the module.
  Module_0_Skeleton_v2

- **Compliance**: disclaimers present where applicable (finance, legal, privacy); expert review slots (CPA/Attorney) identified if needed.
  Module_0_Skeleton_v2

- **Parity with Essentials/Mastery**: if this module maps to an Essentials exercise, the workbook/slide references explicitly call out the Essentials version name.
  Korb weeks 1-4

**Pass when:** The module can be exported to PDF/Docx and published without chasing assets, and the learner’s submissions can actually be received and graded.

---

### _Appendix A — Required Parity Map (Essentials ↔ Mastery)_

For each module, include a one‑row mapping in the skeleton that points to its Essentials equivalent (e.g., **Module 4 ↔ Essentials Exercise Four: Marketing & Promotion**), so both tiers remain in lock‑step on core competencies.

Korb weeks 1-4

Korb weeks 5-8

### _Appendix B — Minimum Artifact Set per Module_

- Lesson scripts; Workbook (printable large‑print + fillable); Slides; Instructor Guide; Assessment (quiz + rubric); Hooks (3+); Lead‑magnet tie‑in (where relevant).
  Full_Course_Draft_v2
  marketing-assets-1

---

## How to apply this checklist (quick run‑of‑show for editors)

1. Open the module skeleton (YAML top‑matter → outcomes, time, assessment).
   Module_0_Skeleton_v2

2. Confirm **index lines** exist for this module and update status in **Master‑Index_Running_v1.md**.
   Master-Index_Running_v1

3. Validate **Essentials/Mastery mapping** using the KORB source text to ensure conceptual parity.
   Korb weeks 1-4
   Korb weeks 5-8

4. Attach **hooks, lead magnets, quizzes/emails** and confirm instrumentation tags.
   marketing-assets-1
   quizzes_and_emails

5. Run the **accessibility pass** (large‑print / contrast) and confirm tech‑concierge steps exist.
   10-business-ideas
   Module_0_Skeleton_v2

---

### Notes for future v3

If/when the **Marketing Hooks Masterlist** is populated per module, add an automated lint that checks every module’s hooks against that source to prevent drift.

RBB_Marketing-Hooks_Master_v1
