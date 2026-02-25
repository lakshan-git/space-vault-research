# space-vault-research

Research report website for Space Vault Storage Cargo Packaging L.L.C - Dubai

## Overview

This repository contains a **Section Manager** utility and the SEO-optimized **Web Pages** content that will be used to rebuild the Space Vault Storage Cargo Packaging website.

## Quick Start

```bash
npm install
npm test
```

## Section Manager

`SectionManager` lets you manage hierarchical content sections stored as JSON files. Every section can contain nested child sections to any depth.

### Usage

```js
const SectionManager = require("./src/section-manager");
const manager = new SectionManager("./content/web-pages");

// Add a new child page to the Web Pages section
manager.addChildSection("web-pages.json", {
  title: "Blog",
  slug: "/blog",
  seo: { title: "Blog | Space Vault Dubai", description: "Latest news." },
  sections: [],
});

// Duplicate an existing child (e.g. the FAQ page)
manager.duplicateChildSection("web-pages.json", "page-faq");

// Remove a child section by id
manager.removeChildSection("web-pages.json", "page-faq");

// List children of any section
manager.listChildSections("web-pages.json"); // top-level pages
manager.listChildSections("web-pages.json", "page-services"); // service sub-pages
```

### API

| Method | Description |
|---|---|
| `addChildSection(file, childData, parentId?)` | Add a new child section. Optionally nest it under a specific parent. |
| `duplicateChildSection(file, childId)` | Deep-clone an existing child and insert the copy right after the original. |
| `removeChildSection(file, childId)` | Remove a child section by id. |
| `listChildSections(file, parentId?)` | List children of the top-level section or a specific parent. |

## Web Pages Content

The `content/web-pages/web-pages.json` file contains SEO-optimized content for every page of the website:

| Page | Slug | Child Sections |
|---|---|---|
| Home | `/` | — |
| About Us | `/about` | — |
| Services | `/services` | Warehousing & Storage, Cargo Packaging & Crating, Relocation & Moving Storage, Logistics & Distribution |
| Industries We Serve | `/industries` | Oil & Gas, Construction, Retail & E-Commerce, Art & Antiques, Healthcare, Government & Defence |
| Contact Us | `/contact` | — |
| FAQ | `/faq` | — |

Each page includes:
- **SEO metadata** — title, description, keywords, canonical URL
- **Structured sections** — hero, content blocks, features, CTAs, FAQ items, etc.
- **Children array** — sub-pages or sub-sections that can be added, duplicated, or removed using the Section Manager
