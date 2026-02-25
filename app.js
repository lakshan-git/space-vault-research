/**
 * SpaceVault Storage — app.js
 * Pure Vanilla JS SPA with:
 *  - Client-side routing (hash-based)
 *  - Edit Mode (contenteditable + localStorage)
 *  - Section delete (with animation + localStorage)
 *  - Add Section/Item modal
 *  - Toast notifications
 *  - Reset to defaults
 *  - Mobile hamburger menu
 */

(function () {
  'use strict';

  /* ============================================================
     CONSTANTS
     ============================================================ */
  const STORAGE_KEY   = 'spacevault_content';
  const DELETED_KEY   = 'spacevault_deleted';
  const CUSTOM_KEY    = 'spacevault_custom';
  const EDIT_MODE_KEY = 'spacevault_editmode';

  /* ============================================================
     STATE
     ============================================================ */
  let isEditMode = false;
  let currentPage = 'home';
  let modalContext = null; // { type: 'section' | 'table' | 'card' | 'feature', target }

  /* ============================================================
     DOM REFERENCES
     ============================================================ */
  const navbar        = document.getElementById('navbar');
  const navLinks      = document.getElementById('navLinks');
  const hamburger     = document.getElementById('hamburger');
  const editToggle    = document.getElementById('editToggle');
  const btnReset      = document.getElementById('btnReset');
  const mainContent   = document.getElementById('mainContent');
  const modalOverlay  = document.getElementById('modalOverlay');
  const modalClose    = document.getElementById('modalClose');
  const modalCancel   = document.getElementById('modalCancel');
  const modalConfirm  = document.getElementById('modalConfirm');
  const contentType   = document.getElementById('contentType');
  const contentTitle  = document.getElementById('contentTitle');
  const contentBody   = document.getElementById('contentBody');
  const toastContainer = document.getElementById('toastContainer');

  /* ============================================================
     INITIALIZATION
     ============================================================ */
  function init() {
    setupRouter();
    setupHamburger();
    setupEditMode();
    setupResetButton();
    setupModalListeners();
    restoreDeletedSections();
    restoreCustomContent();
    loadSavedContent();

    // Restore edit mode state
    if (localStorage.getItem(EDIT_MODE_KEY) === 'true') {
      enableEditMode();
    }

    // Navigate to initial page
    const hash = window.location.hash.replace('#', '') || 'home';
    navigateTo(hash, false);
  }

  /* ============================================================
     ROUTING
     ============================================================ */
  function setupRouter() {
    // Nav link clicks
    document.querySelectorAll('.nav-link, .nav-logo').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const page = this.getAttribute('data-page');
        if (page) navigateTo(page);
        // Close mobile menu
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
      });
    });

    // Browser back/forward
    window.addEventListener('popstate', function () {
      const hash = window.location.hash.replace('#', '') || 'home';
      navigateTo(hash, false);
    });
  }

  function navigateTo(pageId, pushState = true) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

    // Show target page
    const targetPage = document.getElementById('page-' + pageId);
    if (targetPage) {
      targetPage.classList.add('active');
      currentPage = pageId;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update active nav link
    const activeLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
    if (activeLink) activeLink.classList.add('active');

    // Update URL hash
    if (pushState) {
      history.pushState(null, '', '#' + pageId);
    } else {
      history.replaceState(null, '', '#' + pageId);
    }

    // Inject add-section button for current page
    injectAddSectionButton(targetPage);
  }

  /* ============================================================
     HAMBURGER MENU
     ============================================================ */
  function setupHamburger() {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
    });
    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
      }
    });
  }

  /* ============================================================
     EDIT MODE
     ============================================================ */
  function setupEditMode() {
    editToggle.addEventListener('click', function () {
      if (isEditMode) {
        disableEditMode();
      } else {
        enableEditMode();
      }
    });
  }

  function enableEditMode() {
    isEditMode = true;
    document.body.classList.add('edit-mode');
    editToggle.classList.add('active');
    editToggle.innerHTML = '<span class="edit-icon">&#10003;</span> Editing';
    btnReset.style.display = 'inline-flex';
    localStorage.setItem(EDIT_MODE_KEY, 'true');

    // Make all [data-editable] elements contenteditable
    document.querySelectorAll('[data-editable]').forEach(el => {
      if (el.tagName !== 'A') { // Don't break anchor tags
        el.setAttribute('contenteditable', 'true');
        el.setAttribute('spellcheck', 'false');
        el.addEventListener('input', handleContentEdit);
        el.addEventListener('blur', saveAllContent);
      }
    });

    // Inject delete buttons on section blocks
    document.querySelectorAll('.section-block').forEach(section => {
      if (!section.querySelector('.section-delete-btn')) {
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'section-delete-btn';
        deleteBtn.setAttribute('title', 'Delete this section');
        deleteBtn.innerHTML = '&times;';
        deleteBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          deleteSection(section);
        });
        section.appendChild(deleteBtn);
      }
    });

    showToast('✏️', 'Edit mode enabled — click any text to edit');
  }

  function disableEditMode() {
    isEditMode = false;
    document.body.classList.remove('edit-mode');
    editToggle.classList.remove('active');
    editToggle.innerHTML = '<span class="edit-icon">&#9998;</span> Edit Mode';
    btnReset.style.display = 'none';
    localStorage.setItem(EDIT_MODE_KEY, 'false');

    // Remove contenteditable
    document.querySelectorAll('[data-editable]').forEach(el => {
      el.removeAttribute('contenteditable');
      el.removeEventListener('input', handleContentEdit);
      el.removeEventListener('blur', saveAllContent);
    });

    saveAllContent();
    showToast('💾', 'Changes saved');
  }

  function handleContentEdit() {
    // Debounced auto-save
    clearTimeout(this._saveTimer);
    this._saveTimer = setTimeout(saveAllContent, 800);
  }

  /* ============================================================
     CONTENT PERSISTENCE (localStorage)
     ============================================================ */
  function saveAllContent() {
    const saved = {};
    document.querySelectorAll('[data-editable]').forEach((el, index) => {
      const key = getElementKey(el, index);
      saved[key] = el.innerHTML;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  }

  function loadSavedContent() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const saved = JSON.parse(raw);
      document.querySelectorAll('[data-editable]').forEach((el, index) => {
        const key = getElementKey(el, index);
        if (saved[key] !== undefined) {
          el.innerHTML = saved[key];
        }
      });
    } catch (e) {
      console.warn('SpaceVault: Could not load saved content from localStorage (data may be corrupted — try Reset All to restore defaults)', e);
    }
  }

  function getElementKey(el, index) {
    // Try to build a stable key from page + section + element type + index
    const page    = el.closest('.page')        ? el.closest('.page').getAttribute('data-page-id') : 'global';
    const section = el.closest('[data-section-id]') ? el.closest('[data-section-id]').getAttribute('data-section-id') : 'nosection';
    return `${page}_${section}_${el.tagName}_${index}`;
  }

  /* ============================================================
     SECTION DELETE
     ============================================================ */
  function deleteSection(section) {
    const sectionId = section.getAttribute('data-section-id');
    const pageId    = section.closest('.page') ? section.closest('.page').getAttribute('data-page-id') : '';

    section.classList.add('section-fade-out');

    section.addEventListener('animationend', function () {
      section.style.display = 'none';

      // Persist deletion
      const deleted = getDeleted();
      deleted.push({ pageId, sectionId });
      localStorage.setItem(DELETED_KEY, JSON.stringify(deleted));

      showToast('🗑️', 'Section deleted');
    }, { once: true });
  }

  function getDeleted() {
    try {
      return JSON.parse(localStorage.getItem(DELETED_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }

  function restoreDeletedSections() {
    const deleted = getDeleted();
    deleted.forEach(({ pageId, sectionId }) => {
      const selector = `#page-${pageId} [data-section-id="${sectionId}"]`;
      const section = document.querySelector(selector);
      if (section) {
        section.style.display = 'none';
      }
    });
  }

  /* ============================================================
     ADD SECTION BUTTON (bottom of each page)
     ============================================================ */
  function injectAddSectionButton(page) {
    if (!page) return;
    if (page.querySelector('.add-section-btn')) return;

    const btn = document.createElement('button');
    btn.className = 'add-section-btn';
    btn.textContent = '+ Add Section';
    btn.addEventListener('click', function () {
      openModal({ type: 'section', target: page });
    });
    page.appendChild(btn);
  }

  /* ============================================================
     ADD ITEM BUTTONS
     ============================================================ */
  // Wire up all existing "+ Add Item/Row" buttons
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.btn-add-item');
    if (!btn || !isEditMode) return;

    const tableId  = btn.getAttribute('data-table');
    const targetId = btn.getAttribute('data-target');
    const itemType = btn.getAttribute('data-type');

    if (tableId) {
      openModal({ type: 'table-row', target: document.getElementById(tableId) });
    } else if (targetId && itemType) {
      openModal({ type: itemType, target: document.getElementById(targetId) });
    }
  });

  /* ============================================================
     MODAL
     ============================================================ */
  function openModal(context) {
    modalContext = context;
    contentTitle.value = '';
    contentBody.value = '';
    contentType.value = context.type === 'table-row' ? 'table-row' :
                        context.type === 'review-card' ? 'review-card' :
                        context.type === 'service-card' ? 'card' :
                        context.type === 'feature-item' ? 'list-item' :
                        context.type === 'channel-card' ? 'card' : 'text-block';
    modalOverlay.classList.add('open');
    contentTitle.focus();
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    modalContext = null;
  }

  function setupModalListeners() {
    modalClose.addEventListener('click', closeModal);
    modalCancel.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) closeModal();
    });
    modalConfirm.addEventListener('click', handleModalConfirm);
    // Allow Enter to confirm
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalOverlay.classList.contains('open')) closeModal();
    });
  }

  function handleModalConfirm() {
    const type    = contentType.value;
    const title   = contentTitle.value.trim() || 'New Item';
    const body    = contentBody.value.trim()  || '';

    if (!modalContext) return;

    let newEl = null;

    switch (modalContext.type) {
      case 'section':
        newEl = createTextSection(title, body);
        if (modalContext.target) {
          // Insert before the add-section-btn
          const addBtn = modalContext.target.querySelector('.add-section-btn');
          modalContext.target.insertBefore(newEl, addBtn);
        }
        break;

      case 'table-row': {
        const tbody = modalContext.target.querySelector('tbody');
        const thead = modalContext.target.querySelector('thead');
        const colCount = thead ? thead.querySelectorAll('th').length : 3;
        newEl = createTableRow(title, body, colCount);
        if (tbody) tbody.appendChild(newEl);
        break;
      }

      case 'service-card':
      case 'card': {
        newEl = createServiceCard(title, body);
        if (modalContext.target) modalContext.target.appendChild(newEl);
        break;
      }

      case 'review-card': {
        newEl = createReviewCard(title, body);
        if (modalContext.target) modalContext.target.appendChild(newEl);
        break;
      }

      case 'feature-item':
      case 'list-item': {
        newEl = createFeatureItem(title);
        if (modalContext.target) modalContext.target.appendChild(newEl);
        break;
      }

      case 'channel-card': {
        newEl = createChannelCard(title, body);
        if (modalContext.target) modalContext.target.appendChild(newEl);
        break;
      }
    }

    if (newEl) {
      // Make new element editable if in edit mode
      if (isEditMode) {
        newEl.querySelectorAll('[data-editable]').forEach(el => {
          if (el.tagName !== 'A') {
            el.setAttribute('contenteditable', 'true');
            el.setAttribute('spellcheck', 'false');
            el.addEventListener('input', handleContentEdit);
            el.addEventListener('blur', saveAllContent);
          }
        });
      }
      // Animate in
      newEl.style.opacity = '0';
      newEl.style.transform = 'translateY(8px)';
      requestAnimationFrame(() => {
        newEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        newEl.style.opacity = '1';
        newEl.style.transform = 'translateY(0)';
      });

      saveCustomContent();
      saveAllContent();
      showToast('✅', 'Content added successfully');
    }

    closeModal();
  }

  /* ---- Element Factories ---- */
  function createTextSection(title, body) {
    const div = document.createElement('div');
    div.className = 'section-block';
    div.setAttribute('data-section-id', 'custom-' + Date.now());
    div.innerHTML = `
      <div class="container">
        <h2 class="section-title" data-editable>${escapeHtml(title)}</h2>
        <p class="body-text" data-editable>${escapeHtml(body)}</p>
      </div>
    `;
    // Add delete button
    if (isEditMode) attachDeleteButton(div);
    return div;
  }

  function createTableRow(title, body, colCount) {
    const tr = document.createElement('tr');
    const cells = [title, body];
    for (let i = 0; i < colCount; i++) {
      const td = document.createElement('td');
      td.setAttribute('data-editable', '');
      td.textContent = cells[i] || '';
      tr.appendChild(td);
    }
    return tr;
  }

  function createServiceCard(title, body) {
    const div = document.createElement('div');
    div.className = 'card service-card';
    div.innerHTML = `
      <div class="card-icon">&#128230;</div>
      <h3 class="card-title" data-editable>${escapeHtml(title)}</h3>
      <p class="card-text" data-editable>${escapeHtml(body)}</p>
    `;
    return div;
  }

  function createReviewCard(name, text) {
    const initials = name.split(' ').map(w => w[0] || '').join('').toUpperCase().slice(0, 2);
    const div = document.createElement('div');
    div.className = 'review-card';
    div.innerHTML = `
      <div class="review-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
      <p class="review-text" data-editable>"${escapeHtml(text)}"</p>
      <div class="reviewer-info">
        <div class="reviewer-avatar">${escapeHtml(initials)}</div>
        <div>
          <p class="reviewer-name" data-editable>${escapeHtml(name)}</p>
          <p class="reviewer-platform" data-editable>Customer Review</p>
        </div>
      </div>
    `;
    return div;
  }

  function createFeatureItem(text) {
    const div = document.createElement('div');
    div.className = 'feature-item';
    div.innerHTML = `<span class="check">&#10003;</span><span data-editable>${escapeHtml(text)}</span>`;
    return div;
  }

  function createChannelCard(title, body) {
    const div = document.createElement('div');
    div.className = 'channel-card';
    div.innerHTML = `
      <div class="channel-icon">&#128172;</div>
      <h4 data-editable>${escapeHtml(title)}</h4>
      <p data-editable>${escapeHtml(body)}</p>
    `;
    return div;
  }

  function attachDeleteButton(section) {
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'section-delete-btn';
    deleteBtn.setAttribute('title', 'Delete this section');
    deleteBtn.innerHTML = '&times;';
    deleteBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      deleteSection(section);
    });
    section.appendChild(deleteBtn);
  }

  /* ============================================================
     CUSTOM CONTENT PERSISTENCE
     ============================================================ */
  function saveCustomContent() {
    // Save the innerHTML of dynamic containers for persistence
    const custom = {};
    const dynamicContainers = [
      'serviceCardsGrid', 'featuresGrid', 'reviewsGrid',
      'channelsGrid', 'socialGrid', 'directoryGrid',
      'companyTable', 'pricingTable', 'ratingsTable',
      'competitorTable', 'employmentTable', 'resourcesTable', 'verificationTable'
    ];
    dynamicContainers.forEach(id => {
      const el = document.getElementById(id);
      if (el) custom[id] = el.innerHTML;
    });
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(custom));
  }

  function restoreCustomContent() {
    const raw = localStorage.getItem(CUSTOM_KEY);
    if (!raw) return;
    try {
      const custom = JSON.parse(raw);
      Object.entries(custom).forEach(([id, html]) => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = html;
      });
    } catch (e) {
      console.warn('SpaceVault: Could not restore custom section content from localStorage (data may be corrupted — try Reset All to restore defaults)', e);
    }
  }

  /* ============================================================
     RESET
     ============================================================ */
  function setupResetButton() {
    btnReset.addEventListener('click', function () {
      const confirmed = window.confirm(
        'Reset all content to defaults? This will undo all edits, deletions, and additions.'
      );
      if (!confirmed) return;

      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(DELETED_KEY);
      localStorage.removeItem(CUSTOM_KEY);
      localStorage.removeItem(EDIT_MODE_KEY);

      showToast('🔄', 'Resetting to defaults…');
      setTimeout(() => window.location.reload(), 800);
    });
  }

  /* ============================================================
     TOAST NOTIFICATIONS
     ============================================================ */
  function showToast(icon, message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
    toastContainer.appendChild(toast);

    // Auto-dismiss after 3s
    setTimeout(() => {
      toast.classList.add('toast-fade-out');
      toast.addEventListener('animationend', () => toast.remove(), { once: true });
    }, 3000);
  }

  /* ============================================================
     UTILITY
     ============================================================ */
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  /* ============================================================
     SCROLL — Navbar shadow
     ============================================================ */
  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      navbar.style.boxShadow = '0 2px 16px rgba(0,0,0,.08)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  }, { passive: true });

  /* ============================================================
     START
     ============================================================ */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
