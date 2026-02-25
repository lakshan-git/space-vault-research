// SpaceVault Research — Inline Editing & LocalStorage System

const STORAGE_PREFIX = 'sv_';
const DELETED_SUFFIX = '__deleted';

// --- Page Load: Restore State ---
function restoreState() {
  // Restore edited content
  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.getAttribute('data-key');
    const stored = localStorage.getItem(STORAGE_PREFIX + key);
    if (stored !== null) {
      el.innerHTML = stored;
    }
  });

  // Restore deletions — remove section-cards marked as deleted
  document.querySelectorAll('.section-card[data-key]').forEach(card => {
    const key = card.getAttribute('data-key');
    if (localStorage.getItem(STORAGE_PREFIX + key + DELETED_SUFFIX) === 'true') {
      card.remove();
    }
  });
}

// --- Edit Mode State ---
let editModeActive = false;

function setEditMode(active) {
  editModeActive = active;
  document.body.classList.toggle('edit-mode-active', active);

  const btn = document.getElementById('editModeBtn');
  if (btn) {
    btn.textContent = active ? '✅ Edit Mode ON' : '✏️ Edit Mode';
    btn.classList.toggle('active', active);
  }

  // Toggle contenteditable on all [data-editable] elements
  document.querySelectorAll('[data-editable]').forEach(el => {
    el.contentEditable = active ? 'true' : 'false';
  });

  // Also handle table cells with data-key
  document.querySelectorAll('td[data-key], th[data-key]').forEach(el => {
    el.contentEditable = active ? 'true' : 'false';
  });
}

// --- Save Content on Blur ---
function handleContentSave(event) {
  if (!editModeActive) return;
  const el = event.target;
  const key = el.getAttribute('data-key');
  if (!key) return;

  localStorage.setItem(STORAGE_PREFIX + key, el.innerHTML);
  showToast('✏️ Content saved');
  showUnsavedIndicator();
}

// --- Delete Section Card ---
function handleDeleteSection(card) {
  const key = card.getAttribute('data-key');
  card.remove();
  if (key) {
    localStorage.setItem(STORAGE_PREFIX + key + DELETED_SUFFIX, 'true');
  }
  showToast('🗑️ Section deleted');
}

// --- Reset All ---
function resetAll() {
  if (!confirm('Reset all edits and deletions to default content?')) return;
  Object.keys(localStorage).forEach(k => {
    if (k.startsWith(STORAGE_PREFIX)) {
      localStorage.removeItem(k);
    }
  });
  showToast('🔄 Content reset');
  setTimeout(() => location.reload(), 800);
}

// --- Toast Notifications ---
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('toast-show'));
  });

  setTimeout(() => {
    toast.classList.remove('toast-show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// --- Unsaved Indicator ---
function showUnsavedIndicator() {
  const ind = document.getElementById('unsaved-indicator');
  if (!ind) return;
  ind.classList.remove('hidden');
  clearTimeout(ind._timeout);
  ind._timeout = setTimeout(() => ind.classList.add('hidden'), 2500);
}

// --- Hamburger Menu ---
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.querySelector('.main-nav');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', nav.classList.contains('open'));
  });

  // Close nav when a link is clicked
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });

  // Close nav when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('open');
    }
  });
}

// --- Highlight Active Nav Link ---
function highlightActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// --- Init on DOM Ready ---
document.addEventListener('DOMContentLoaded', () => {
  restoreState();

  // Wire edit mode button
  const editBtn = document.getElementById('editModeBtn');
  if (editBtn) {
    editBtn.addEventListener('click', () => setEditMode(!editModeActive));
  }

  // Wire reset button
  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetAll);
  }

  // Save on blur for all editable elements (use capture to catch all)
  document.addEventListener('blur', handleContentSave, true);

  // Wire delete buttons on section cards
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.section-card');
      if (card) handleDeleteSection(card);
    });
  });

  highlightActiveNav();
  initHamburger();
});
