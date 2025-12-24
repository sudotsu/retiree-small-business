# SAP — Slug Convention (v1)

- Pattern: `/sap/module-XX-<kebab-title>`
- `XX` = zero‑padded module number (00–09)
- `<kebab-title>` = canonical title in lowercase, spaces → hyphens, alphanumerics only
- Examples:
  - `/sap/module-03-pricing-power`
  - `/sap/module-00-foundations-and-mindset`

**Redirect Policy**
- If titles change, keep old slugs and add `301` redirects to the new slug.
- Maintain a **Slug Map** CSV for redirects.

**Slug JSON Schema**
```json
{
  "module": "00",
  "title": "Foundations and Mindset",
  "slug": "/sap/module-00-foundations-and-mindset",
  "aliases": ["/sap/module-0-foundations", "/sap/module-00-mindset"]
}
```
