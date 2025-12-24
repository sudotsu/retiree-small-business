# SAP — 7‑Step Validation Checklist (v1)

> **Single source of truth.** Reference or transclude this file in every module.
> If the checklist changes, bump version → `v2` and update references.
> Keep `v1` for backward compatibility to avoid drift.

1) **Outcome & Scope**
   - The module’s **Outcome statement** is explicit and student‑visible at top.
   - Content matches the canonical module scope from the Authoritative Map.

2) **Accuracy & Specificity**
   - Claims are concrete, falsifiable, and supported by examples or data.
   - No hand‑waving: each promise has a how‑to or proof asset.

3) **Accessibility (WCAG)**
   - Proper heading order (H1→H2→H3), alt‑text placeholders present.
   - Adequate line spacing and descriptive link text (no “click here”).
   - Color/contrast notes present for slide and workbook exports.

4) **Structure & Cross‑Links**
   - Internal tags present (`[TAG:Module##]`) and neighbor links (prev/next).
   - Slugs match `/sap/module-XX-<kebab-title>`; no spaces or drift.

5) **Consistency & Voice**
   - Terminology consistent with brand (use “Second Act Profit System”).
   - No contradictions with Master Index or Packaging Manifest.

6) **Marketing Hooks & Proof**
   - At least 3 hooks present and coherent with the module outcome.
   - Proof assets (case, screenshot, checklist, or template) queued or noted.

7) **Export Readiness**
   - Workbook, Slides, Instructor Guide headings exist (even if empty).
   - File passes lint: no heading level skips, placeholders labeled.
   - Ready for PDF/Docx export; filename follows `SAP_Module-XX_<Title>_v1.md`.
