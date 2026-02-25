# Space Vault Research Dashboard

Research report website for **Space Vault Storage Cargo Packaging L.L.C** — Dubai, UAE.

A single-page application (SPA) that presents deep research data about Space Vault Storage in an interactive, editable dashboard format. It also includes a Node.js **Section Manager** utility for managing hierarchical content sections stored as JSON.

---

## How to View the Website

The research dashboard is a **static website** — no build step or server is required. You can open it in any modern browser.

### Option 1 — Open the file directly

1. Clone or download this repository:
   ```bash
   git clone https://github.com/lakshan-git/space-vault-research.git
   cd space-vault-research
   ```
2. Open **`index.html`** in your browser:
   - **macOS:** `open index.html`
   - **Windows:** `start index.html`
   - **Linux:** `xdg-open index.html`
   - Or simply **double-click** `index.html` in your file manager.

### Option 2 — Use a local development server

A local server avoids potential browser restrictions on `file://` URLs and better simulates a production environment.

**Using Python (built-in):**
```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000 in your browser
```

**Using Node.js:**
```bash
npx serve .

# Then open the URL shown in the terminal (usually http://localhost:3000)
```

**Using VS Code:**
Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension, then right-click `index.html` and select **"Open with Live Server"**.

### Option 3 — GitHub Pages

If GitHub Pages is enabled for this repository, the website is available at:
```
https://lakshan-git.github.io/space-vault-research/
```

---

## Dashboard Features

- **10 navigable pages** via the sidebar: Overview, Services, Pricing, Online Presence, Reviews & Reputation, Employment & Team, Competitive Analysis, SEO Analysis, Resources & Links, Web Pages
- **Inline CMS** — toggle Edit Mode in the header to make all text editable directly in the browser
- **Add / Delete sections** — add new sections via the + button, delete sections with the ✕ button
- **localStorage persistence** — all edits are saved automatically and survive page reloads
- **Reset All** — restore the dashboard to its default data at any time
- **Fully responsive** — works on desktop, tablet, and mobile

---

## Section Manager (Node.js Utility)

The `SectionManager` class lets you programmatically manage hierarchical content sections stored in JSON files (e.g. `content/web-pages/web-pages.json`).

### Quick Start

```bash
npm install
npm test
```

### Usage

```js
const SectionManager = require("./src/section-manager");
const manager = new SectionManager("./content/web-pages");

// Add a new child page
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
manager.listChildSections("web-pages.json");               // top-level pages
manager.listChildSections("web-pages.json", "page-services"); // service sub-pages
```

### API

| Method | Description |
|---|---|
| `addChildSection(file, childData, parentId?)` | Add a new child section. Optionally nest it under a specific parent. |
| `duplicateChildSection(file, childId)` | Deep-clone an existing child and insert the copy right after the original. |
| `removeChildSection(file, childId)` | Remove a child section by id. |
| `listChildSections(file, parentId?)` | List children of the top-level section or a specific parent. |

---

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

---

## Project Structure

```
space-vault-research/
├── index.html                  # Main website entry point (open this to view)
├── styles.css                  # Dashboard styles
├── app.js                      # SPA router, renderers, and inline CMS
├── data.js                     # Default research data for all dashboard pages
├── index.js                    # Node.js entry point for section manager
├── package.json                # Node.js project configuration
├── src/
│   └── section-manager.js      # Section management utility
├── test/
│   └── section-manager.test.js # Tests for section manager
├── content/
│   └── web-pages/
│       └── web-pages.json      # SEO-optimized web page content
└── README.md
```

---

## License

ISC
