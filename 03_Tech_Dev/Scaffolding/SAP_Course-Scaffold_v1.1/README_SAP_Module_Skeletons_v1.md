# SAP Module Skeletons — v1

This bundle contains:
- `skeletons/` — ten module skeletons (00–09) with accessible structure and placeholders
- `SAP_7-Step-Validation_v1.md` — **single, version-locked** checklist referenced by all modules
- `SAP_Slug-Convention_v1.md` — slug rules
- `SAP_Slug-Map_Template_v1.csv` — fill with titles to generate canonical slugs

## How to Auto-Fill Titles/Summaries from Module Map
- Have your Agent parse `/Module-Map_Authoritative_v1.md` and populate:
  - `<CANONICAL_TITLE>`
  - `[[CANONICAL_SUMMARY_FROM_MAP]]`
  - `[[KEBAB_TITLE_PREV]]` and `[[KEBAB_TITLE_NEXT]]`
- Then rename files from `TBD-Title` → actual canonical titles.

## Auto-Fail Rules for Funnel Draft (recommended)
- **Block funnel draft** if any module has fewer than **3 marketing hooks**.
- Require **≥ 30 total unique hooks** across the course before generating funnel copy.

## Redirects
- When titles change, update `SAP_Slug-Map_Template_v1.csv` and keep `301` redirects for old slugs.

Generated: 2025-10-05T21:44:13.067883Z
