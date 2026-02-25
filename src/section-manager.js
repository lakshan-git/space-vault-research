const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

/**
 * SectionManager provides utilities to manage hierarchical sections
 * with the ability to add, duplicate, and manipulate child sections
 * inside any main section.
 */
class SectionManager {
  /**
   * @param {string} contentDir - Absolute path to the content directory.
   */
  constructor(contentDir) {
    this.contentDir = contentDir;
  }

  /* ------------------------------------------------------------------ */
  /*  Core helpers                                                       */
  /* ------------------------------------------------------------------ */

  /**
   * Load a section JSON file and return its parsed contents.
   * @param {string} sectionFile - File name (relative to contentDir).
   * @returns {object} Parsed section data.
   */
  loadSection(sectionFile) {
    const filePath = path.join(this.contentDir, sectionFile);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Section file not found: ${filePath}`);
    }
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }

  /**
   * Save section data to a JSON file.
   * @param {string} sectionFile - File name (relative to contentDir).
   * @param {object} data        - Section data to persist.
   */
  saveSection(sectionFile, data) {
    const filePath = path.join(this.contentDir, sectionFile);
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
  }

  /* ------------------------------------------------------------------ */
  /*  Child-section operations                                           */
  /* ------------------------------------------------------------------ */

  /**
   * Add a new child section to a parent section.
   *
   * @param {string} sectionFile - The section JSON file to modify.
   * @param {object} childData   - The child section object to add.
   *   Must contain at least { title: string }.
   * @param {string} [parentId]  - Optional id of a nested parent.
   *   When omitted the child is appended to the top-level children array.
   * @returns {object} The newly added child (with generated id).
   */
  addChildSection(sectionFile, childData, parentId) {
    if (!childData || !childData.title) {
      throw new Error("childData must include a 'title' property");
    }

    const section = this.loadSection(sectionFile);
    const child = { id: uuidv4(), ...childData, children: childData.children || [] };

    if (parentId) {
      const parent = this._findById(section, parentId);
      if (!parent) {
        throw new Error(`Parent section with id '${parentId}' not found`);
      }
      parent.children = parent.children || [];
      parent.children.push(child);
    } else {
      section.children = section.children || [];
      section.children.push(child);
    }

    this.saveSection(sectionFile, section);
    return child;
  }

  /**
   * Duplicate an existing child section (deep clone) and append the copy
   * next to the original inside its parent's children array.
   *
   * @param {string} sectionFile - The section JSON file to modify.
   * @param {string} childId     - The id of the child section to duplicate.
   * @returns {object} The duplicated child (with a new id).
   */
  duplicateChildSection(sectionFile, childId) {
    const section = this.loadSection(sectionFile);
    const { parent, index } = this._findParentOf(section, childId);

    if (!parent) {
      throw new Error(`Child section with id '${childId}' not found`);
    }

    const original = parent.children[index];
    const duplicate = this._deepCloneWithNewIds(original);
    duplicate.title = `${original.title} (Copy)`;

    parent.children.splice(index + 1, 0, duplicate);
    this.saveSection(sectionFile, section);
    return duplicate;
  }

  /**
   * Remove a child section by id.
   *
   * @param {string} sectionFile - The section JSON file to modify.
   * @param {string} childId     - The id of the child section to remove.
   * @returns {object} The removed child section.
   */
  removeChildSection(sectionFile, childId) {
    const section = this.loadSection(sectionFile);
    const { parent, index } = this._findParentOf(section, childId);

    if (!parent) {
      throw new Error(`Child section with id '${childId}' not found`);
    }

    const [removed] = parent.children.splice(index, 1);
    this.saveSection(sectionFile, section);
    return removed;
  }

  /**
   * List all child sections of a given parent (or top-level children).
   *
   * @param {string} sectionFile - The section JSON file.
   * @param {string} [parentId]  - Optional parent id. Omit for top-level.
   * @returns {Array} Array of child section objects.
   */
  listChildSections(sectionFile, parentId) {
    const section = this.loadSection(sectionFile);

    if (parentId) {
      const parent = this._findById(section, parentId);
      if (!parent) {
        throw new Error(`Parent section with id '${parentId}' not found`);
      }
      return parent.children || [];
    }

    return section.children || [];
  }

  /* ------------------------------------------------------------------ */
  /*  Private helpers                                                    */
  /* ------------------------------------------------------------------ */

  /** Recursively find a node by id. */
  _findById(node, id) {
    if (node.id === id) return node;
    for (const child of node.children || []) {
      const found = this._findById(child, id);
      if (found) return found;
    }
    return null;
  }

  /** Find the parent node that contains a child with the given id. */
  _findParentOf(node, childId) {
    const children = node.children || [];
    for (let i = 0; i < children.length; i++) {
      if (children[i].id === childId) {
        return { parent: node, index: i };
      }
      const result = this._findParentOf(children[i], childId);
      if (result.parent) return result;
    }
    return { parent: null, index: -1 };
  }

  /** Deep-clone a section tree, assigning new ids to every node. */
  _deepCloneWithNewIds(node) {
    const clone = { ...node, id: uuidv4() };
    if (node.children && node.children.length > 0) {
      clone.children = node.children.map((c) => this._deepCloneWithNewIds(c));
    }
    return clone;
  }
}

module.exports = SectionManager;
