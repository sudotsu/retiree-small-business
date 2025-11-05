# Retiree Business Blueprint — Accessibility Checklist (v1)

**Purpose:** Ensure all course materials, platforms, and marketing assets meet senior-friendly accessibility standards. This checklist consolidates requirements from across the project documentation.

**Version:** v1.0
**Last Updated:** 2025-01-XX

---

## General Principles & Design

- [ ] **Senior-Friendly Defaults:** Design choices prioritize the needs of 60-75+ learners.
- [ ] **Low-Tech Paths/Alternatives:** Provide options for learners who prefer minimal technology (e.g., phone-first options, printable materials).
- [ ] **Avoid UI Jargon:** Use plain language, avoiding technical or industry-specific jargon where possible.
- [ ] **No "Tiny Click-Targets":** Ensure all interactive elements (buttons, links) are large and easy to click/tap.
- [ ] **Simplified Layouts:** Avoid cluttered designs; prioritize clarity and ease of navigation.
- [ ] **Mobile Responsive:** All digital content and platforms must be fully functional and readable on mobile devices.
- [ ] **"Pause & Practice" Segments:** Integrate opportunities for learners to pause, reflect, and practice at their own pace.
- [ ] **"Request a Call" / Phone-in Options:** Offer direct human support via phone for those who struggle with digital channels.
- [ ] **Self-Sufficiency:** The module can be completed comfortably by a 60–75+ learner _without_ external help.

## Visual & Textual Content

- [ ] **Large-Print (16-18pt Minimum):**
  - [ ] All body text in digital content.
  - [ ] All workbooks, guides, checklists, and handouts.
  - [ ] Marketing materials (ads, landing pages, offline flyers).
- [ ] **High-Contrast Colors/Templates:** Ensure sufficient contrast between text and background for all materials (WCAG AA: 4.5:1 ratio for normal text, 3:1 for large text).
- [ ] **1.5 Line Spacing:** Apply for all printable documents to enhance readability.
- [ ] **Dyslexia-Friendly Font Option:** Offer a font choice that supports learners with dyslexia.
- [ ] **Proper Heading Order:** Use semantic heading structures (H1, H2, H3, etc.) for logical content flow.
- [ ] **Descriptive Link Text:** All hyperlinks should clearly indicate their destination (avoid "click here").
- [ ] **Alt-Text for All Images/Visuals:** Provide descriptive alternative text for all non-text content.
- [ ] **Clear, Readable Fonts:** Select fonts that are easy to read for aging eyes.
- [ ] **Clear CTAs (Big Buttons):** Call-to-action buttons should be prominent and easy to interact with.

## Multimedia (Video/Audio)

- [ ] **Captions for All Videos:** Provide accurate captions for all video content.
- [ ] **Transcripts for All Videos/Audio:** Offer downloadable transcripts for all multimedia.
- [ ] **Audio-Only Options:** Where applicable, provide audio-only versions of video content.
- [ ] **Slower-Paced Demos:** Technical demonstrations should be presented at a deliberate, easy-to-follow pace.
- [ ] **Accessible Video Controls:** Video players have accessible playback controls (play, pause, volume, fullscreen) that work with keyboard.
- [ ] **Video Quality Settings:** Provide options to adjust video quality for slower internet connections.

## Printables & Downloads

- [ ] **All Materials Printable:** Worksheets, checklists, slides note-pages, and guides are available for printing.
- [ ] **Large-Print PDFs:** Ensure all downloadable PDFs are available in large-print format.
- [ ] **Fillable Online Forms:** Provide fillable versions of worksheets and forms for digital completion.
- [ ] **"Print Request" Option:** Note an option in Module 0 for learners to request physical printed packets.

## Platform/LMS (Learning Management System)

- [ ] **Keyboard Navigable:** All LMS pages and interactive elements are navigable using only a keyboard.
- [ ] **Visible Focus Indicators:** Keyboard focus is clearly visible (outline/highlight) when navigating with Tab key.
- [ ] **Screen Reader Compatible:** All content is accessible to screen readers (proper ARIA labels, semantic HTML).
- [ ] **Form Labels:** All form inputs (quizzes, contact forms) have clear, associated labels.
- [ ] **Error Messages:** Error messages are clear, accessible, and indicate how to fix the issue.
- [ ] **Tech Concierge Tasks:** Integrate specific tasks for account setup, installation, verification, and troubleshooting assistance.
- [ ] **Troubleshooting Matrix:** Provide a clear, accessible troubleshooting guide for common technical issues.
- [ ] **Support Channels Clearly Published:** Email, call/text, office hours, and 1-click help buttons are prominently displayed.

## Marketing Materials

- [ ] **Clean Landing Pages:** Landing pages are designed with accessibility in mind (large fonts, high contrast, clear CTAs).
- [ ] **Accessible Ad Creative:** Marketing ads and social snippets adhere to accessibility standards (e.g., readable text on images, captions for video ads).

---

## How to Use This Checklist

This checklist should be applied during the QA process for each module and all associated assets. A module passes the accessibility check when all relevant items on this list are confirmed.

**Testing Checklist:**

- [ ] Test with keyboard navigation only (no mouse)
- [ ] Test with screen reader (NVDA/JAWS on Windows, VoiceOver on Mac)
- [ ] Test on mobile device (actual phone/tablet)
- [ ] Test with browser zoom at 200%
- [ ] Print test: Verify all materials print correctly at large size
- [ ] Color contrast check: Use WebAIM Contrast Checker or similar tool

---

## References

- `quality/RBB_7-Step-Validation_v2.md`
- `marketing/RBB_Marketing-Hooks_Master_v1.md`
- `skeletons/RBB_Module-00_Welcome-And-Setup_v2.md`
- `assessments/quizzes_and_emails.md`
- `support/tech-concierge/Tech_Concierge.md`
- `skeletons/RBB_Module-01_Foundation_v2.md`
- `originals/ChatGPT_Pro_Action_Plan.md`
- `originals/WordPress-Quick-Start.md`
- `resources/business-ideas/guide.pdf` (formerly `originals/10-business-ideas.md`)
- `originals/Comprehensive_Analysis_ Perplexity.md`
