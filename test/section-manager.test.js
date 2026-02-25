const assert = require("node:assert/strict");
const { describe, it, beforeEach, afterEach } = require("node:test");
const fs = require("fs");
const path = require("path");
const SectionManager = require("../src/section-manager");

const TMP_DIR = path.join(__dirname, ".tmp-test-content");
const FIXTURE_FILE = "test-section.json";

function seedFixture() {
  const data = {
    id: "root",
    title: "Root Section",
    children: [
      {
        id: "child-1",
        title: "Child One",
        children: [
          { id: "grandchild-1", title: "Grandchild One", children: [] },
        ],
      },
      { id: "child-2", title: "Child Two", children: [] },
    ],
  };
  fs.mkdirSync(TMP_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(TMP_DIR, FIXTURE_FILE),
    JSON.stringify(data, null, 2),
    "utf-8"
  );
  return data;
}

function cleanup() {
  fs.rmSync(TMP_DIR, { recursive: true, force: true });
}

/* ------------------------------------------------------------------ */
/*  Tests                                                              */
/* ------------------------------------------------------------------ */

describe("SectionManager", () => {
  let manager;

  beforeEach(() => {
    seedFixture();
    manager = new SectionManager(TMP_DIR);
  });

  afterEach(() => {
    cleanup();
  });

  /* ---------- loadSection / saveSection ---------- */

  it("loads a section file", () => {
    const section = manager.loadSection(FIXTURE_FILE);
    assert.equal(section.id, "root");
    assert.equal(section.children.length, 2);
  });

  it("throws when loading a non-existent file", () => {
    assert.throws(() => manager.loadSection("nope.json"), /not found/);
  });

  /* ---------- addChildSection ---------- */

  it("adds a child to the top-level children array", () => {
    const child = manager.addChildSection(FIXTURE_FILE, {
      title: "New Child",
    });
    assert.ok(child.id);
    assert.equal(child.title, "New Child");

    const section = manager.loadSection(FIXTURE_FILE);
    assert.equal(section.children.length, 3);
    assert.equal(section.children[2].title, "New Child");
  });

  it("adds a child to a specific parent by id", () => {
    const child = manager.addChildSection(
      FIXTURE_FILE,
      { title: "Nested Child" },
      "child-2"
    );
    assert.ok(child.id);

    const section = manager.loadSection(FIXTURE_FILE);
    const parent = section.children.find((c) => c.id === "child-2");
    assert.equal(parent.children.length, 1);
    assert.equal(parent.children[0].title, "Nested Child");
  });

  it("throws when parent id is not found", () => {
    assert.throws(
      () =>
        manager.addChildSection(
          FIXTURE_FILE,
          { title: "X" },
          "does-not-exist"
        ),
      /not found/
    );
  });

  it("throws when childData has no title", () => {
    assert.throws(
      () => manager.addChildSection(FIXTURE_FILE, {}),
      /title/
    );
  });

  /* ---------- duplicateChildSection ---------- */

  it("duplicates a top-level child and inserts it after the original", () => {
    const dup = manager.duplicateChildSection(FIXTURE_FILE, "child-1");
    assert.ok(dup.id);
    assert.notEqual(dup.id, "child-1");
    assert.equal(dup.title, "Child One (Copy)");

    const section = manager.loadSection(FIXTURE_FILE);
    assert.equal(section.children.length, 3);
    assert.equal(section.children[0].id, "child-1");
    assert.equal(section.children[1].id, dup.id);
  });

  it("deep-clones children with new ids when duplicating", () => {
    const dup = manager.duplicateChildSection(FIXTURE_FILE, "child-1");
    assert.equal(dup.children.length, 1);
    assert.notEqual(dup.children[0].id, "grandchild-1");
  });

  it("throws when duplicating a non-existent child", () => {
    assert.throws(
      () => manager.duplicateChildSection(FIXTURE_FILE, "ghost"),
      /not found/
    );
  });

  /* ---------- removeChildSection ---------- */

  it("removes a child by id", () => {
    const removed = manager.removeChildSection(FIXTURE_FILE, "child-2");
    assert.equal(removed.title, "Child Two");

    const section = manager.loadSection(FIXTURE_FILE);
    assert.equal(section.children.length, 1);
  });

  it("throws when removing a non-existent child", () => {
    assert.throws(
      () => manager.removeChildSection(FIXTURE_FILE, "nope"),
      /not found/
    );
  });

  /* ---------- listChildSections ---------- */

  it("lists top-level children", () => {
    const children = manager.listChildSections(FIXTURE_FILE);
    assert.equal(children.length, 2);
  });

  it("lists children of a specific parent", () => {
    const children = manager.listChildSections(FIXTURE_FILE, "child-1");
    assert.equal(children.length, 1);
    assert.equal(children[0].title, "Grandchild One");
  });

  it("throws when listing children of a non-existent parent", () => {
    assert.throws(
      () => manager.listChildSections(FIXTURE_FILE, "ghost"),
      /not found/
    );
  });
});

/* ------------------------------------------------------------------ */
/*  Web Pages content validation                                       */
/* ------------------------------------------------------------------ */

describe("Web Pages content", () => {
  const WEB_PAGES_DIR = path.join(
    __dirname,
    "..",
    "content",
    "web-pages"
  );
  let manager;
  let webPages;

  beforeEach(() => {
    manager = new SectionManager(WEB_PAGES_DIR);
    webPages = manager.loadSection("web-pages.json");
  });

  it("has top-level children (pages)", () => {
    assert.ok(webPages.children.length > 0);
  });

  it("every page has a title and slug", () => {
    for (const page of webPages.children) {
      assert.ok(page.title, `Missing title for page id: ${page.id}`);
      assert.ok(page.slug, `Missing slug for page id: ${page.id}`);
    }
  });

  it("every page has an SEO object with title and description", () => {
    for (const page of webPages.children) {
      assert.ok(page.seo, `Missing seo for page: ${page.title}`);
      assert.ok(page.seo.title, `Missing seo.title for page: ${page.title}`);
      assert.ok(
        page.seo.description,
        `Missing seo.description for page: ${page.title}`
      );
    }
  });

  it("every page has at least one section", () => {
    for (const page of webPages.children) {
      assert.ok(
        page.sections && page.sections.length > 0,
        `No sections for page: ${page.title}`
      );
    }
  });

  it("Services page has child service sub-pages", () => {
    const services = webPages.children.find((p) => p.id === "page-services");
    assert.ok(services);
    assert.ok(services.children.length >= 3);
  });

  it("Industries page has child industry sub-pages", () => {
    const industries = webPages.children.find(
      (p) => p.id === "page-industries"
    );
    assert.ok(industries);
    assert.ok(industries.children.length >= 4);
  });

  it("can add a new page via addChildSection", () => {
    // Use a temp copy to avoid mutating the real content
    const tmpDir = path.join(__dirname, ".tmp-webpages-test");
    fs.mkdirSync(tmpDir, { recursive: true });
    fs.copyFileSync(
      path.join(WEB_PAGES_DIR, "web-pages.json"),
      path.join(tmpDir, "web-pages.json")
    );
    const tmpManager = new SectionManager(tmpDir);

    const originalCount = webPages.children.length;
    tmpManager.addChildSection("web-pages.json", {
      title: "Blog",
      slug: "/blog",
      seo: {
        title: "Blog | Space Vault Dubai",
        description: "Latest news and articles from Space Vault.",
      },
      sections: [],
    });

    const updated = tmpManager.loadSection("web-pages.json");
    assert.equal(updated.children.length, originalCount + 1);

    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("can duplicate a page via duplicateChildSection", () => {
    const tmpDir = path.join(__dirname, ".tmp-webpages-dup");
    fs.mkdirSync(tmpDir, { recursive: true });
    fs.copyFileSync(
      path.join(WEB_PAGES_DIR, "web-pages.json"),
      path.join(tmpDir, "web-pages.json")
    );
    const tmpManager = new SectionManager(tmpDir);

    const originalCount = webPages.children.length;
    const dup = tmpManager.duplicateChildSection("web-pages.json", "page-faq");
    assert.ok(dup.title.includes("(Copy)"));

    const updated = tmpManager.loadSection("web-pages.json");
    assert.equal(updated.children.length, originalCount + 1);

    fs.rmSync(tmpDir, { recursive: true, force: true });
  });
});
