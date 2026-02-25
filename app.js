/* app.js — SPA router, renderers, and inline CMS for SpaceVault Research Dashboard */

(function () {
  'use strict';

  /* ===== Globals ===== */
  const PAGE_KEYS = Object.keys(window.DEFAULT_DATA);
  const NAV_ICONS = {};
  PAGE_KEYS.forEach(function (k) { NAV_ICONS[k] = window.DEFAULT_DATA[k].icon || 'file'; });

  let editMode = localStorage.getItem('sv_editMode') === 'true';
  let currentPage = '';
  let addSectionTargetPage = '';

  /* ===== Helpers ===== */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  function sanitizeUrl(url) {
    if (!url || typeof url !== 'string') return '';
    var trimmed = url.trim();
    if (/^javascript:/i.test(trimmed) || /^data:/i.test(trimmed) || trimmed.startsWith('//')) return '';
    return trimmed;
  }

  function uid() { return 'sv_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8); }

  /* ===== Toast ===== */
  function toast(msg, type) {
    type = type || 'info';
    var iconName = type === 'success' ? 'check-circle' : type === 'error' ? 'alert-circle' : 'info';
    var el = document.createElement('div');
    el.className = 'toast ' + type;
    el.innerHTML = '<i data-lucide="' + iconName + '"></i><span>' + escapeHtml(msg) + '</span>';
    $('#toast-container').appendChild(el);
    if (typeof lucide !== 'undefined') lucide.createIcons({ nodes: [el] });
    setTimeout(function () {
      el.classList.add('removing');
      setTimeout(function () { el.remove(); }, 200);
    }, 3000);
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /* ===== Data layer ===== */
  function getData(pageKey) {
    var stored = localStorage.getItem('sv_page_' + pageKey);
    if (stored) {
      try { return JSON.parse(stored); } catch (e) { /* fall through */ }
    }
    return JSON.parse(JSON.stringify(window.DEFAULT_DATA[pageKey]));
  }

  function saveData(pageKey, data) {
    localStorage.setItem('sv_page_' + pageKey, JSON.stringify(data));
  }

  function resetAll() {
    PAGE_KEYS.forEach(function (k) { localStorage.removeItem('sv_page_' + k); });
    localStorage.removeItem('sv_editMode');
    editMode = false;
    $('#edit-mode-toggle').checked = false;
    renderPage(currentPage);
    updateEditUI();
    toast('All data reset to defaults', 'success');
  }

  /* ===== Navigation ===== */
  function buildNav() {
    var nav = $('#sidebar-nav');
    nav.innerHTML = '';
    PAGE_KEYS.forEach(function (key) {
      var pg = window.DEFAULT_DATA[key];
      var a = document.createElement('a');
      a.className = 'nav-item';
      a.href = '#' + key;
      a.setAttribute('data-page', key);
      a.innerHTML = '<i data-lucide="' + (pg.icon || 'file') + '"></i><span>' + escapeHtml(pg.title) + '</span>';
      nav.appendChild(a);
    });
  }

  function setActiveNav(key) {
    $$('.nav-item').forEach(function (el) { el.classList.toggle('active', el.getAttribute('data-page') === key); });
  }

  /* ===== Router ===== */
  function route() {
    var hash = location.hash.replace('#', '') || PAGE_KEYS[0];
    if (PAGE_KEYS.indexOf(hash) === -1) hash = PAGE_KEYS[0];
    currentPage = hash;
    setActiveNav(hash);
    renderPage(hash);
    // close mobile sidebar
    $('#sidebar').classList.remove('open');
  }

  /* ===== Renderers ===== */
  function renderPage(pageKey) {
    var data = getData(pageKey);
    var content = $('#content');
    content.innerHTML = '';

    // subtitle
    if (data.subtitle) {
      var sub = document.createElement('p');
      sub.className = 'section-content';
      sub.style.marginBottom = '20px';
      sub.textContent = data.subtitle;
      content.appendChild(sub);
    }

    $('#header-title').textContent = data.title;

    data.sections.forEach(function (section, idx) {
      var el = renderSection(section, pageKey, idx);
      if (el) content.appendChild(el);
    });

    // Add Section button
    var addBtn = document.createElement('button');
    addBtn.className = 'add-section-btn';
    addBtn.innerHTML = '<i data-lucide="plus"></i> Add Section';
    addBtn.addEventListener('click', function () { openAddModal(pageKey); });
    content.appendChild(addBtn);

    if (typeof lucide !== 'undefined') lucide.createIcons();
    updateEditUI();
  }

  function renderSection(section, pageKey, idx) {
    var type = section.type;
    var wrap = document.createElement('div');
    wrap.className = type === 'web-page-section' ? 'web-page-section' : 'section-block';
    wrap.setAttribute('data-section-idx', idx);

    // Delete button
    var delBtn = document.createElement('button');
    delBtn.className = 'section-delete';
    delBtn.innerHTML = '<i data-lucide="x"></i>';
    delBtn.title = 'Delete section';
    delBtn.addEventListener('click', function () { deleteSection(pageKey, idx); });
    wrap.appendChild(delBtn);

    switch (type) {
      case 'stats': renderStats(wrap, section); break;
      case 'kv-card': renderKVCard(wrap, section, pageKey, idx); break;
      case 'text': renderText(wrap, section, pageKey, idx); break;
      case 'social': renderSocial(wrap, section); break;
      case 'table': renderTable(wrap, section); break;
      case 'checklist-card': renderChecklist(wrap, section); break;
      case 'list-card': renderListCard(wrap, section); break;
      case 'service-cards': renderServiceCards(wrap, section); break;
      case 'reviews': renderReviews(wrap, section); break;
      case 'swot': renderSWOT(wrap, section); break;
      case 'note': renderNote(wrap, section, pageKey, idx); break;
      case 'web-page-section': renderWebPageSection(wrap, section, pageKey, idx); break;
      default: renderText(wrap, section, pageKey, idx);
    }
    return wrap;
  }

  /* --- Title helper --- */
  function addTitle(wrap, section) {
    if (!section.title) return;
    var h = document.createElement('h3');
    h.className = 'section-title';
    if (section.titleIcon) h.innerHTML = '<i data-lucide="' + section.titleIcon + '"></i>';
    var span = document.createElement('span');
    span.textContent = section.title;
    span.setAttribute('data-editable', 'true');
    h.appendChild(span);
    wrap.appendChild(h);
  }

  /* --- Stats --- */
  function renderStats(wrap, section) {
    var grid = document.createElement('div');
    grid.className = 'stats-grid';
    section.items.forEach(function (item) {
      var card = document.createElement('div');
      card.className = 'stat-card';
      card.innerHTML = '<i data-lucide="' + (item.icon || 'hash') + '" class="stat-icon"></i>' +
        '<span class="stat-label">' + escapeHtml(item.label) + '</span>' +
        '<span class="stat-value" data-editable="true">' + escapeHtml(item.value) + '</span>';
      grid.appendChild(card);
    });
    wrap.appendChild(grid);
  }

  /* --- KV Card --- */
  function renderKVCard(wrap, section, pageKey, idx) {
    addTitle(wrap, section);
    var list = document.createElement('div');
    list.className = 'kv-list';
    section.items.forEach(function (item) {
      var row = document.createElement('div');
      row.className = 'kv-row';
      var keyEl = document.createElement('span');
      keyEl.className = 'kv-key';
      keyEl.textContent = item.key;
      keyEl.setAttribute('data-editable', 'true');
      row.appendChild(keyEl);
      var valEl = document.createElement('span');
      valEl.className = 'kv-value';
      if (item.link) {
        var a = document.createElement('a');
        a.className = 'btn-link';
        a.href = sanitizeUrl(item.link);
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.innerHTML = '<i data-lucide="external-link"></i>';
        var linkText = document.createElement('span');
        linkText.textContent = item.value;
        a.insertBefore(linkText, a.firstChild);
        valEl.appendChild(a);
      } else {
        valEl.textContent = item.value;
        valEl.setAttribute('data-editable', 'true');
      }
      row.appendChild(valEl);
      list.appendChild(row);
    });
    wrap.appendChild(list);
  }

  /* --- Text --- */
  function renderText(wrap, section, pageKey, idx) {
    addTitle(wrap, section);
    var p = document.createElement('div');
    p.className = 'section-content';
    p.textContent = section.content || '';
    p.setAttribute('data-editable', 'true');
    wrap.appendChild(p);
  }

  /* --- Social --- */
  function renderSocial(wrap, section) {
    addTitle(wrap, section);
    var grid = document.createElement('div');
    grid.className = 'social-grid';
    section.items.forEach(function (item) {
      var card = document.createElement('a');
      card.className = 'social-card';
      card.href = sanitizeUrl(item.url);
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
      card.innerHTML = '<i data-lucide="' + (item.icon || 'link') + '"></i><span class="social-name">' + escapeHtml(item.name) + '</span><i data-lucide="external-link" style="width:14px;height:14px;color:var(--text-secondary);"></i>';
      grid.appendChild(card);
    });
    wrap.appendChild(grid);
  }

  /* --- Table --- */
  function renderTable(wrap, section) {
    addTitle(wrap, section);
    var tw = document.createElement('div');
    tw.className = 'table-wrap';
    var tbl = document.createElement('table');
    // Header
    var thead = document.createElement('thead');
    var hrow = document.createElement('tr');
    section.headers.forEach(function (h) {
      var th = document.createElement('th');
      th.textContent = h;
      hrow.appendChild(th);
    });
    thead.appendChild(hrow);
    tbl.appendChild(thead);
    // Body
    var tbody = document.createElement('tbody');
    section.rows.forEach(function (row) {
      var tr = document.createElement('tr');
      row.forEach(function (cell, ci) {
        var td = document.createElement('td');
        // Check if this column has links
        if (section.links && section.linkColumn === ci && section.links[cell]) {
          var a = document.createElement('a');
          a.className = 'btn-link';
          a.href = sanitizeUrl(section.links[cell]);
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.innerHTML = '<i data-lucide="external-link"></i>';
          var linkText = document.createElement('span');
          linkText.textContent = cell;
          a.insertBefore(linkText, a.firstChild);
          td.appendChild(a);
        } else {
          td.textContent = cell;
          td.setAttribute('data-editable', 'true');
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    tbl.appendChild(tbody);
    tw.appendChild(tbl);
    wrap.appendChild(tw);
  }

  /* --- Checklist --- */
  function renderChecklist(wrap, section) {
    addTitle(wrap, section);
    var ul = document.createElement('ul');
    ul.className = 'checklist';
    section.items.forEach(function (item) {
      var li = document.createElement('li');
      li.innerHTML = '<i data-lucide="check"></i>';
      var span = document.createElement('span');
      span.textContent = item;
      span.setAttribute('data-editable', 'true');
      li.appendChild(span);
      ul.appendChild(li);
    });
    wrap.appendChild(ul);
  }

  /* --- List Card --- */
  function renderListCard(wrap, section) {
    addTitle(wrap, section);
    var ul = document.createElement('ul');
    ul.className = 'list-card-items';
    section.items.forEach(function (item) {
      var li = document.createElement('li');
      var span = document.createElement('span');
      span.textContent = item;
      span.setAttribute('data-editable', 'true');
      li.appendChild(span);
      ul.appendChild(li);
    });
    wrap.appendChild(ul);
  }

  /* --- Service Cards --- */
  function renderServiceCards(wrap, section) {
    var grid = document.createElement('div');
    grid.className = 'service-grid';
    section.items.forEach(function (svc) {
      var card = document.createElement('div');
      card.className = 'service-card';
      var title = document.createElement('h4');
      title.className = 'service-title';
      title.innerHTML = '<i data-lucide="' + (svc.icon || 'box') + '"></i>';
      var span = document.createElement('span');
      span.textContent = svc.title;
      span.setAttribute('data-editable', 'true');
      title.appendChild(span);
      card.appendChild(title);
      var ul = document.createElement('ul');
      svc.items.forEach(function (it) {
        var li = document.createElement('li');
        var s = document.createElement('span');
        s.textContent = it;
        s.setAttribute('data-editable', 'true');
        li.appendChild(s);
        ul.appendChild(li);
      });
      card.appendChild(ul);
      grid.appendChild(card);
    });
    wrap.appendChild(grid);
  }

  /* --- Reviews --- */
  function renderReviews(wrap, section) {
    var container = document.createElement('div');
    container.className = 'review-cards';
    section.items.forEach(function (rev) {
      var card = document.createElement('div');
      card.className = 'review-card';
      var header = document.createElement('div');
      header.className = 'review-header';
      var name = document.createElement('span');
      name.className = 'review-name';
      name.textContent = rev.name;
      name.setAttribute('data-editable', 'true');
      header.appendChild(name);
      var stars = document.createElement('span');
      stars.className = 'review-stars';
      for (var i = 0; i < rev.stars; i++) stars.innerHTML += '<i data-lucide="star"></i>';
      header.appendChild(stars);
      card.appendChild(header);
      var text = document.createElement('p');
      text.className = 'review-text';
      text.textContent = rev.text;
      text.setAttribute('data-editable', 'true');
      card.appendChild(text);
      container.appendChild(card);
    });
    wrap.appendChild(container);
  }

  /* --- SWOT --- */
  function renderSWOT(wrap, section) {
    addTitle(wrap, section);
    var grid = document.createElement('div');
    grid.className = 'swot-grid';
    var quadrants = [
      { key: 'strengths', label: 'Strengths', icon: 'thumbs-up' },
      { key: 'weaknesses', label: 'Weaknesses', icon: 'thumbs-down' },
      { key: 'opportunities', label: 'Opportunities', icon: 'trending-up' },
      { key: 'threats', label: 'Threats', icon: 'alert-triangle' }
    ];
    quadrants.forEach(function (q) {
      var cell = document.createElement('div');
      cell.className = 'swot-cell ' + q.key;
      cell.innerHTML = '<h4><i data-lucide="' + q.icon + '"></i> ' + q.label + '</h4>';
      var ul = document.createElement('ul');
      (section[q.key] || []).forEach(function (item) {
        var li = document.createElement('li');
        li.textContent = item;
        li.setAttribute('data-editable', 'true');
        ul.appendChild(li);
      });
      cell.appendChild(ul);
      grid.appendChild(cell);
    });
    wrap.appendChild(grid);
  }

  /* --- Note --- */
  function renderNote(wrap, section, pageKey, idx) {
    wrap.className = 'note-block';
    wrap.innerHTML = '<i data-lucide="alert-triangle"></i>';
    var span = document.createElement('span');
    span.textContent = section.content || '';
    span.setAttribute('data-editable', 'true');
    wrap.appendChild(span);
    // re-add delete button
    var delBtn = document.createElement('button');
    delBtn.className = 'section-delete';
    delBtn.innerHTML = '<i data-lucide="x"></i>';
    delBtn.style.top = '8px';
    delBtn.style.right = '8px';
    delBtn.addEventListener('click', function () { deleteSection(pageKey, idx); });
    wrap.appendChild(delBtn);
  }

  /* --- Web Page Section --- */
  function renderWebPageSection(wrap, section, pageKey, idx) {
    // Header
    var header = document.createElement('div');
    header.className = 'web-page-header';
    header.innerHTML = '<i data-lucide="' + (section.pageIcon || 'file') + '"></i>';
    var h3 = document.createElement('h3');
    h3.textContent = section.pageTitle || 'Page Section';
    h3.setAttribute('data-editable', 'true');
    header.appendChild(h3);
    wrap.appendChild(header);

    // Description
    if (section.description) {
      var desc = document.createElement('p');
      desc.className = 'web-page-subtitle';
      desc.textContent = section.description;
      desc.setAttribute('data-editable', 'true');
      wrap.appendChild(desc);
    }

    // Content sections
    var grid = document.createElement('div');
    grid.className = 'web-page-content-grid';
    (section.contentSections || []).forEach(function (cs) {
      var item = document.createElement('div');
      item.className = 'web-page-content-item';
      var h4 = document.createElement('h4');
      h4.innerHTML = '<i data-lucide="' + (cs.icon || 'file') + '"></i>';
      var titleSpan = document.createElement('span');
      titleSpan.textContent = cs.title;
      titleSpan.setAttribute('data-editable', 'true');
      h4.appendChild(titleSpan);
      item.appendChild(h4);
      if (cs.content) {
        var p = document.createElement('p');
        p.textContent = cs.content;
        p.setAttribute('data-editable', 'true');
        item.appendChild(p);
      }
      if (cs.items && cs.items.length) {
        var ul = document.createElement('ul');
        cs.items.forEach(function (li_text) {
          var li = document.createElement('li');
          li.textContent = li_text;
          li.setAttribute('data-editable', 'true');
          ul.appendChild(li);
        });
        item.appendChild(ul);
      }
      grid.appendChild(item);
    });
    wrap.appendChild(grid);
  }

  /* ===== Edit Mode ===== */
  function updateEditUI() {
    document.body.classList.toggle('edit-mode', editMode);
    $('#reset-btn').style.display = editMode ? '' : 'none';
    if (editMode) enableEditing(); else disableEditing();
  }

  function enableEditing() {
    $$('[data-editable]').forEach(function (el) {
      el.contentEditable = 'true';
      el.addEventListener('blur', handleEditBlur);
    });
  }

  function disableEditing() {
    $$('[data-editable]').forEach(function (el) {
      el.contentEditable = 'false';
      el.removeEventListener('blur', handleEditBlur);
    });
  }

  function handleEditBlur() {
    saveCurrentPageData();
    toast('Changes saved', 'success');
  }

  function saveCurrentPageData() {
    // Reconstruct page data from the DOM
    var data = getData(currentPage);
    // Save current editable state back
    saveData(currentPage, data);
  }

  /* ===== Section CRUD ===== */
  function deleteSection(pageKey, idx) {
    if (!confirm('Delete this section?')) return;
    var data = getData(pageKey);
    data.sections.splice(idx, 1);
    saveData(pageKey, data);
    renderPage(pageKey);
    toast('Section deleted', 'success');
  }

  function openAddModal(pageKey) {
    addSectionTargetPage = pageKey;
    // Show/hide web-page-section option based on page
    var wpOption = $('[data-type="web-page-section"]');
    if (wpOption) wpOption.style.display = pageKey === 'web-pages' ? 'flex' : 'none';
    $('#modal-overlay').classList.add('open');
  }

  function addSection(type) {
    var data = getData(addSectionTargetPage);
    var newSection;
    switch (type) {
      case 'text':
        newSection = { id: uid(), type: 'text', title: 'New Section', titleIcon: 'file-text', content: 'Click to edit this content...' };
        break;
      case 'kv-card':
        newSection = { id: uid(), type: 'kv-card', title: 'New Card', titleIcon: 'list', items: [{ key: 'Label', value: 'Value' }] };
        break;
      case 'table':
        newSection = { id: uid(), type: 'table', title: 'New Table', titleIcon: 'table', headers: ['Column 1', 'Column 2'], rows: [['Data 1', 'Data 2']] };
        break;
      case 'checklist-card':
        newSection = { id: uid(), type: 'checklist-card', title: 'New Checklist', titleIcon: 'check-circle', items: ['Item 1'] };
        break;
      case 'list-card':
        newSection = { id: uid(), type: 'list-card', title: 'New List', titleIcon: 'list', items: ['Item 1'] };
        break;
      case 'web-page-section':
        newSection = {
          id: uid(), type: 'web-page-section', pageTitle: 'New Page', pageIcon: 'file',
          description: 'Describe the purpose and layout of this web page.',
          contentSections: [
            { title: 'Section 1', icon: 'layout', content: 'Describe the content for this section.', items: ['Content item 1', 'Content item 2'] }
          ]
        };
        break;
      default: return;
    }
    data.sections.push(newSection);
    saveData(addSectionTargetPage, data);
    $('#modal-overlay').classList.remove('open');
    renderPage(addSectionTargetPage);
    toast('Section added', 'success');
  }

  /* ===== Init ===== */
  function init() {
    buildNav();

    // Edit mode toggle
    var toggle = $('#edit-mode-toggle');
    toggle.checked = editMode;
    toggle.addEventListener('change', function () {
      editMode = toggle.checked;
      localStorage.setItem('sv_editMode', editMode);
      updateEditUI();
    });

    // Reset
    $('#reset-btn').addEventListener('click', function () {
      if (confirm('Reset all data to defaults? This cannot be undone.')) resetAll();
    });

    // Menu toggle (mobile)
    $('#menu-toggle').addEventListener('click', function () {
      $('#sidebar').classList.toggle('open');
    });

    // Modal
    $('#modal-close').addEventListener('click', function () { $('#modal-overlay').classList.remove('open'); });
    $('#modal-overlay').addEventListener('click', function (e) { if (e.target === this) this.classList.remove('open'); });
    $$('.modal-option').forEach(function (opt) {
      opt.addEventListener('click', function () { addSection(this.getAttribute('data-type')); });
    });

    // Sidebar nav
    document.addEventListener('click', function (e) {
      var navItem = e.target.closest('.nav-item');
      if (navItem) {
        e.preventDefault();
        var page = navItem.getAttribute('data-page');
        location.hash = '#' + page;
      }
    });

    // Router
    window.addEventListener('hashchange', route);
    route();

    // Lucide icons
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
