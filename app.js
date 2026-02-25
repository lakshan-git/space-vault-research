// app.js — Space Vault Research Dashboard
// SPA Router + Edit Mode + localStorage CMS

(function () {
  'use strict';

  // ============================================================
  // STATE
  // ============================================================
  let currentPage = 'overview';
  let editMode = false;
  let pageData = {};
  const STORAGE_KEY = 'sv_dashboard_data';
  const EDIT_MODE_KEY = 'sv_edit_mode';
  let pendingConfirmCallback = null;
  let addSectionTargetPage = null;

  // ============================================================
  // INIT
  // ============================================================
  function init() {
    loadData();
    setupSidebar();
    setupHeader();
    setupModals();
    setupResetBtn();

    // Restore edit mode state
    const savedEditMode = localStorage.getItem(EDIT_MODE_KEY);
    if (savedEditMode === 'true') {
      editMode = true;
      document.getElementById('edit-mode-toggle').checked = true;
      document.body.classList.add('edit-mode');
    }

    // Route to current hash or default
    const hash = window.location.hash.replace('#', '') || 'overview';
    navigateTo(hash);

    window.addEventListener('hashchange', function () {
      const page = window.location.hash.replace('#', '') || 'overview';
      navigateTo(page, false);
    });
  }

  // ============================================================
  // DATA
  // ============================================================
  function loadData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        pageData = JSON.parse(saved);
      } catch (e) {
        pageData = JSON.parse(JSON.stringify(window.DEFAULT_DATA));
      }
    } else {
      pageData = JSON.parse(JSON.stringify(window.DEFAULT_DATA));
      saveData();
    }
  }

  function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pageData));
  }

  function resetData() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(EDIT_MODE_KEY);
    pageData = JSON.parse(JSON.stringify(window.DEFAULT_DATA));
    editMode = false;
    document.getElementById('edit-mode-toggle').checked = false;
    document.body.classList.remove('edit-mode');
    renderPage(currentPage);
    showToast('Reset complete — all content restored');
  }

  // ============================================================
  // ROUTING
  // ============================================================
  function navigateTo(page, updateHash) {
    if (updateHash === undefined) updateHash = true;
    const validPages = Object.keys(window.DEFAULT_DATA);
    if (!validPages.includes(page)) page = 'overview';
    currentPage = page;

    // Update nav
    document.querySelectorAll('.nav-item').forEach(function (item) {
      item.classList.toggle('active', item.dataset.page === page);
    });

    if (updateHash) {
      window.location.hash = page;
    }

    // Close mobile sidebar
    document.getElementById('sidebar').classList.remove('mobile-open');
    document.getElementById('sidebar-overlay').classList.remove('active');

    renderPage(page);
  }

  // ============================================================
  // RENDER PAGE
  // ============================================================
  function renderPage(page) {
    const data = pageData[page];
    if (!data) return;

    const content = document.getElementById('page-content');
    content.innerHTML = '';

    // Page header
    const header = document.createElement('div');
    header.className = 'page-header section';
    const pageTitleEl = document.createElement('h2');
    pageTitleEl.className = 'page-title';
    pageTitleEl.textContent = data.title;
    const pageSubtitleEl = document.createElement('p');
    pageSubtitleEl.className = 'page-subtitle';
    pageSubtitleEl.textContent = data.subtitle;
    if (editMode) {
      pageTitleEl.contentEditable = 'true';
      pageTitleEl.addEventListener('blur', function () {
        data.title = this.textContent;
        saveData();
        showToast('Content updated');
      });
      pageSubtitleEl.contentEditable = 'true';
      pageSubtitleEl.addEventListener('blur', function () {
        data.subtitle = this.textContent;
        saveData();
        showToast('Content updated');
      });
    }
    header.appendChild(pageTitleEl);
    header.appendChild(pageSubtitleEl);
    content.appendChild(header);

    // Render sections
    data.sections.forEach(function (section) {
      const el = renderSection(section, page);
      if (el) content.appendChild(el);
    });

    // Add Section bar
    const addBar = document.createElement('div');
    addBar.className = 'add-section-bar';
    addBar.innerHTML = '<button class="add-section-btn">+ Add Section</button>';
    addBar.querySelector('.add-section-btn').addEventListener('click', function () {
      addSectionTargetPage = page;
      openAddSectionModal();
    });
    content.appendChild(addBar);
  }

  // Ensure a URL uses only http/https protocols to prevent javascript: injection
  function sanitizeUrl(url) {
    if (!url) return '';
    // Block protocol-relative URLs (//example.com) and non-http(s) schemes
    const trimmed = url.trim();
    if (trimmed.startsWith('//')) return '';
    try {
      const parsed = new URL(trimmed);
      if (parsed.protocol === 'http:' || parsed.protocol === 'https:') return trimmed;
    } catch (e) { /* invalid URL */ }
    return '';
  }

  // Helper: create a section-title heading element
  function makeSectionTitle(text, section, field) {
    const h3 = document.createElement('h3');
    h3.className = 'section-title';
    h3.textContent = text;
    if (editMode) {
      h3.contentEditable = 'true';
      h3.addEventListener('blur', function () {
        section[field || 'title'] = this.textContent;
        saveData();
        showToast('Content updated');
      });
    }
    return h3;
  }

  // ============================================================
  // RENDER SECTION
  // ============================================================
  function renderSection(section, page) {
    switch (section.type) {
      case 'stats': return renderStats(section, page);
      case 'kv-card': return renderKVCard(section, page);
      case 'text': return renderTextCard(section, page);
      case 'note': return renderNote(section, page);
      case 'social': return renderSocial(section, page);
      case 'table': return renderTable(section, page);
      case 'checklist-card': return renderChecklistCard(section, page);
      case 'list-card': return renderListCard(section, page);
      case 'reviews': return renderReviews(section, page);
      case 'swot': return renderSwot(section, page);
      case 'service-cards': return renderServiceCards(section, page);
      case 'recommendations': return renderRecommendations(section, page);
      default: return null;
    }
  }

  // ============================================================
  // SECTION RENDERERS
  // ============================================================

  function makeDeleteBtn(section, page, onDelete) {
    if (!editMode) return null;
    const btn = document.createElement('button');
    btn.className = 'delete-btn';
    btn.title = 'Delete section';
    btn.textContent = '✕';
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      showConfirm('Delete Section', 'Are you sure you want to delete this section?', function () {
        onDelete();
        showToast('Section deleted');
      });
    });
    return btn;
  }

  function renderStats(section, page) {
    const wrap = document.createElement('div');
    wrap.className = 'section';

    const row = document.createElement('div');
    row.className = 'stats-row';

    section.items.forEach(function (item, idx) {
      const card = document.createElement('div');
      card.className = 'stat-card';
      card.style.position = 'relative';

      const iconEl = document.createElement('div');
      iconEl.className = 'stat-icon';
      iconEl.textContent = item.icon;

      const labelEl = document.createElement('div');
      labelEl.className = 'stat-label';
      labelEl.textContent = item.label;

      const valueEl = document.createElement('div');
      valueEl.className = 'stat-value';
      valueEl.textContent = item.value;

      if (editMode) {
        iconEl.contentEditable = 'true';
        iconEl.addEventListener('blur', function () {
          item.icon = this.textContent;
          saveData();
          showToast('Content updated');
        });
        labelEl.contentEditable = 'true';
        labelEl.addEventListener('blur', function () {
          item.label = this.textContent;
          saveData();
          showToast('Content updated');
        });
        valueEl.contentEditable = 'true';
        valueEl.addEventListener('blur', function () {
          item.value = this.textContent;
          saveData();
          showToast('Content updated');
        });
        const delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.title = 'Delete stat card';
        delBtn.textContent = '✕';
        delBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          showConfirm('Delete Card', 'Delete this stat card?', function () {
            section.items.splice(idx, 1);
            saveData();
            renderPage(page);
            showToast('Card deleted');
          });
        });
        card.appendChild(delBtn);
      }
      card.appendChild(iconEl);
      card.appendChild(labelEl);
      card.appendChild(valueEl);
      row.appendChild(card);
    });

    // Add Card button
    const addCardBtn = document.createElement('button');
    addCardBtn.className = 'add-card-btn';
    addCardBtn.textContent = '+ Add Stat Card';
    addCardBtn.addEventListener('click', function () {
      section.items.push({ icon: '📌', label: 'New Metric', value: 'Value' });
      saveData();
      renderPage(page);
      showToast('Item added');
    });
    row.appendChild(addCardBtn);

    wrap.appendChild(row);

    // Section delete
    const dBtn = makeDeleteBtn(section, page, function () {
      removeSection(page, section.id);
      renderPage(page);
    });
    if (dBtn) {
      wrap.style.position = 'relative';
      wrap.appendChild(dBtn);
    }
    return wrap;
  }

  function renderKVCard(section, page) {
    const wrap = document.createElement('div');
    wrap.className = 'section card';
    wrap.style.position = 'relative';

    const cardTitleEl = document.createElement('div');
    cardTitleEl.className = 'card-title';
    cardTitleEl.textContent = section.title;
    if (editMode) {
      cardTitleEl.contentEditable = 'true';
      cardTitleEl.addEventListener('blur', function () {
        section.title = this.textContent;
        saveData();
        showToast('Content updated');
      });
    }
    wrap.appendChild(cardTitleEl);

    const list = document.createElement('ul');
    list.className = 'kv-list';

    section.items.forEach(function (item, idx) {
      const li = document.createElement('li');
      li.className = 'kv-item';
      const isUrl = item.value && item.value.startsWith('http');

      const keySpan = document.createElement('span');
      keySpan.className = 'kv-key';
      keySpan.textContent = item.key;

      const valSpanWrap = document.createElement('span');
      valSpanWrap.className = 'kv-value';

      if (editMode) {
        keySpan.contentEditable = 'true';
        keySpan.addEventListener('blur', function () {
          item.key = this.textContent;
          saveData();
          showToast('Content updated');
        });
        const valSpan = document.createElement('span');
        valSpan.contentEditable = 'true';
        valSpan.textContent = item.value;
        valSpan.addEventListener('blur', function () {
          item.value = this.textContent;
          saveData();
          showToast('Content updated');
        });
        valSpanWrap.appendChild(valSpan);
        const delBtn = document.createElement('button');
        delBtn.className = 'item-delete-btn';
        delBtn.textContent = '✕';
        delBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          section.items.splice(idx, 1);
          saveData();
          renderPage(page);
          showToast('Item deleted');
        });
        li.appendChild(keySpan);
        li.appendChild(valSpanWrap);
        li.appendChild(delBtn);
      } else {
        if (isUrl) {
          const a = document.createElement('a');
          const safe = sanitizeUrl(item.value);
          if (safe) { a.href = safe; a.target = '_blank'; }
          a.textContent = item.value;
          valSpanWrap.appendChild(a);
        } else {
          valSpanWrap.textContent = item.value;
        }
        li.appendChild(keySpan);
        li.appendChild(valSpanWrap);
      }
      list.appendChild(li);
    });

    wrap.appendChild(list);

    // Add item
    const addBtn = document.createElement('button');
    addBtn.className = 'add-item-btn';
    addBtn.textContent = '+ Add Row';
    addBtn.addEventListener('click', function () {
      section.items.push({ key: 'New Field', value: 'Value' });
      saveData();
      renderPage(page);
      showToast('Item added');
    });
    wrap.appendChild(addBtn);

    // Section delete
    const dBtn = makeDeleteBtn(section, page, function () {
      removeSection(page, section.id);
      renderPage(page);
    });
    if (dBtn) wrap.appendChild(dBtn);

    return wrap;
  }

  function renderTextCard(section, page) {
    const wrap = document.createElement('div');
    wrap.className = 'section card';
    wrap.style.position = 'relative';
    const titleEl = document.createElement('div');
    titleEl.className = 'card-title';
    titleEl.textContent = section.title;
    if (editMode) {
      titleEl.contentEditable = 'true';
      titleEl.addEventListener('blur', function () {
        section.title = this.textContent;
        saveData();
        showToast('Content updated');
      });
    }
    const contentEl = document.createElement('p');
    contentEl.style.fontSize = '0.9rem';
    contentEl.style.lineHeight = '1.7';
    contentEl.style.color = 'var(--text)';
    contentEl.textContent = section.content;
    if (editMode) {
      contentEl.contentEditable = 'true';
      contentEl.addEventListener('blur', function () {
        section.content = this.textContent;
        saveData();
        showToast('Content updated');
      });
    }
    wrap.appendChild(titleEl);
    wrap.appendChild(contentEl);

    const dBtn = makeDeleteBtn(section, page, function () {
      removeSection(page, section.id);
      renderPage(page);
    });
    if (dBtn) wrap.appendChild(dBtn);
    return wrap;
  }

  function renderNote(section, page) {
    const wrap = document.createElement('div');
    wrap.className = 'section';
    wrap.style.position = 'relative';
    const note = document.createElement('div');
    note.className = 'section-note';
    note.textContent = section.content;
    if (editMode) {
      note.contentEditable = 'true';
      note.addEventListener('blur', function () {
        section.content = this.textContent;
        saveData();
        showToast('Content updated');
      });
    }
    wrap.appendChild(note);
    const dBtn = makeDeleteBtn(section, page, function () {
      removeSection(page, section.id);
      renderPage(page);
    });
    if (dBtn) wrap.appendChild(dBtn);
    return wrap;
  }

  function renderSocial(section, page) {
    const wrap = document.createElement('div');
    wrap.className = 'section';
    wrap.style.position = 'relative';
    const titleHeader = document.createElement('div');
    titleHeader.className = 'section-header';
    titleHeader.appendChild(makeSectionTitle(section.title, section, 'title'));
    wrap.appendChild(titleHeader);

    const grid = document.createElement('div');
    grid.className = 'social-grid';

    section.items.forEach(function (item, idx) {
      const card = document.createElement('div');
      card.className = 'social-card';
      card.style.position = 'relative';

      const iconEl = document.createElement('div');
      iconEl.className = 'social-icon';
      iconEl.textContent = item.icon;

      const nameEl = document.createElement('div');
      nameEl.className = 'social-name';
      nameEl.textContent = item.name;

      const urlDisplay = item.url.replace(/^https?:\/\//, '');
      const linkEl = document.createElement('a');
      linkEl.className = 'social-link';
      const safeSocialUrl = sanitizeUrl(item.url);
      if (safeSocialUrl) { linkEl.href = safeSocialUrl; linkEl.target = '_blank'; }
      linkEl.textContent = urlDisplay;

      if (editMode) {
        iconEl.contentEditable = 'true';
        iconEl.addEventListener('blur', function () {
          item.icon = this.textContent;
          saveData();
          showToast('Content updated');
        });
        nameEl.contentEditable = 'true';
        nameEl.addEventListener('blur', function () {
          item.name = this.textContent;
          saveData();
          showToast('Content updated');
        });
        linkEl.contentEditable = 'true';
        linkEl.addEventListener('blur', function () {
          const raw = this.textContent.trim().replace(/^https?:\/\//, '');
          item.url = 'https://' + raw;
          saveData();
          showToast('Content updated');
        });
        const delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.textContent = '✕';
        delBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          section.items.splice(idx, 1);
          saveData();
          renderPage(page);
          showToast('Item deleted');
        });
        card.appendChild(delBtn);
      }

      card.appendChild(iconEl);
      card.appendChild(nameEl);
      card.appendChild(linkEl);
      grid.appendChild(card);
    });

    // Add card btn
    const addCardBtn = document.createElement('button');
    addCardBtn.className = 'add-card-btn';
    addCardBtn.textContent = '+ Add Social Link';
    addCardBtn.addEventListener('click', function () {
      section.items.push({ icon: '🔗', name: 'New Platform', url: 'https://example.com' });
      saveData();
      renderPage(page);
      showToast('Item added');
    });
    grid.appendChild(addCardBtn);

    wrap.appendChild(grid);

    const dBtn = makeDeleteBtn(section, page, function () {
      removeSection(page, section.id);
      renderPage(page);
    });
    if (dBtn) wrap.appendChild(dBtn);
    return wrap;
  }

  function renderTable(section, page) {
    const wrap = document.createElement('div');
    wrap.className = 'section';
    wrap.style.position = 'relative';

    const titleEl = document.createElement('div');
    titleEl.className = 'section-header';
    titleEl.appendChild(makeSectionTitle(section.title || '', section, 'title'));
    wrap.appendChild(titleEl);

    const tableWrap = document.createElement('div');
    tableWrap.className = 'table-wrapper';

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    section.headers.forEach(function (h, hIdx) {
      const th = document.createElement('th');
      th.textContent = h;
      if (editMode) {
        th.contentEditable = 'true';
        th.addEventListener('blur', function () {
          section.headers[hIdx] = this.textContent;
          saveData();
          showToast('Content updated');
        });
      }
      headerRow.appendChild(th);
    });
    if (editMode) headerRow.appendChild(document.createElement('th'));
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    section.rows.forEach(function (row, rowIdx) {
      const tr = document.createElement('tr');
      row.forEach(function (cell, cellIdx) {
        const td = document.createElement('td');
        const isUrl = cell && cell.startsWith && cell.startsWith('http');
        if (editMode) {
          td.contentEditable = 'true';
          td.textContent = cell;
          td.addEventListener('blur', function () {
            section.rows[rowIdx][cellIdx] = this.textContent;
            saveData();
            showToast('Content updated');
          });
        } else if (isUrl) {
          const a = document.createElement('a');
          const safeCell = sanitizeUrl(cell);
          if (safeCell) { a.href = safeCell; a.target = '_blank'; }
          a.textContent = cell;
          td.appendChild(a);
        } else {
          td.textContent = cell;
        }
        tr.appendChild(td);
      });
      if (editMode) {
        const delTd = document.createElement('td');
        const delBtn = document.createElement('button');
        delBtn.className = 'row-delete-btn';
        delBtn.style.display = 'inline-flex';
        delBtn.textContent = '✕';
        delBtn.addEventListener('click', function () {
          showConfirm('Delete Row', 'Delete this row?', function () {
            section.rows.splice(rowIdx, 1);
            saveData();
            renderPage(page);
            showToast('Row deleted');
          });
        });
        delTd.appendChild(delBtn);
        tr.appendChild(delTd);
      }
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    tableWrap.appendChild(table);
    wrap.appendChild(tableWrap);

    // Add row button
    const addRowBtn = document.createElement('button');
    addRowBtn.className = 'add-row-btn';
    addRowBtn.textContent = '+ Add Row';
    addRowBtn.addEventListener('click', function () {
      section.rows.push(section.headers.map(function () { return 'New value'; }));
      saveData();
      renderPage(page);
      showToast('Item added');
    });
    wrap.appendChild(addRowBtn);

    const dBtn = makeDeleteBtn(section, page, function () {
      removeSection(page, section.id);
      renderPage(page);
    });
    if (dBtn) wrap.appendChild(dBtn);
    return wrap;
  }

  function renderChecklistCard(section, page) {
    const wrap = document.createElement('div');
    wrap.className = 'section card';
    wrap.style.position = 'relative';

    const titleEl = document.createElement('div');
    titleEl.className = 'card-title';
    titleEl.textContent = section.title;
    if (editMode) {
      titleEl.contentEditable = 'true';
      titleEl.addEventListener('blur', function () {
        section.title = this.textContent;
        saveData();
        showToast('Content updated');
      });
    }
    wrap.appendChild(titleEl);

    const list = document.createElement('ul');
    list.className = 'checklist';
    section.items.forEach(function (item, idx) {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = item;
      if (editMode) {
        span.contentEditable = 'true';
        span.addEventListener('blur', function () {
          section.items[idx] = this.textContent;
          saveData();
          showToast('Content updated');
        });
        const delBtn = document.createElement('button');
        delBtn.className = 'item-delete-btn';
        delBtn.textContent = '✕';
        delBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          section.items.splice(idx, 1);
          saveData();
          renderPage(page);
          showToast('Item deleted');
        });
        li.appendChild(span);
        li.appendChild(delBtn);
      } else {
        li.appendChild(span);
      }
      list.appendChild(li);
    });
    wrap.appendChild(list);

    const addBtn = document.createElement('button');
    addBtn.className = 'add-item-btn';
    addBtn.textContent = '+ Add Item';
    addBtn.addEventListener('click', function () {
      section.items.push('New item');
      saveData();
      renderPage(page);
      showToast('Item added');
    });
    wrap.appendChild(addBtn);

    const dBtn = makeDeleteBtn(section, page, function () {
      removeSection(page, section.id);
      renderPage(page);
    });
    if (dBtn) wrap.appendChild(dBtn);
    return wrap;
  }

  function renderListCard(section, page) {
    const wrap = document.createElement('div');
    wrap.className = 'section card';
    wrap.style.position = 'relative';

    const titleEl = document.createElement('div');
    titleEl.className = 'card-title';
    titleEl.textContent = section.title;
    if (editMode) {
      titleEl.contentEditable = 'true';
      titleEl.addEventListener('blur', function () {
        section.title = this.textContent;
        saveData();
        showToast('Content updated');
      });
    }
    wrap.appendChild(titleEl);

    const list = document.createElement('ul');
    list.className = 'bullet-list';
    section.items.forEach(function (item, idx) {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = item;
      if (editMode) {
        span.contentEditable = 'true';
        span.addEventListener('blur', function () {
          section.items[idx] = this.textContent;
          saveData();
          showToast('Content updated');
        });
        const delBtn = document.createElement('button');
        delBtn.className = 'item-delete-btn';
        delBtn.textContent = '✕';
        delBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          section.items.splice(idx, 1);
          saveData();
          renderPage(page);
          showToast('Item deleted');
        });
        li.appendChild(span);
        li.appendChild(delBtn);
      } else {
        li.appendChild(span);
      }
      list.appendChild(li);
    });
    wrap.appendChild(list);

    const addBtn = document.createElement('button');
    addBtn.className = 'add-item-btn';
    addBtn.textContent = '+ Add Item';
    addBtn.addEventListener('click', function () {
      section.items.push('New item');
      saveData();
      renderPage(page);
      showToast('Item added');
    });
    wrap.appendChild(addBtn);

    const dBtn = makeDeleteBtn(section, page, function () {
      removeSection(page, section.id);
      renderPage(page);
    });
    if (dBtn) wrap.appendChild(dBtn);
    return wrap;
  }

  function renderReviews(section, page) {
    const wrap = document.createElement('div');
    wrap.className = 'section';
    wrap.style.position = 'relative';

    const titleHeader = document.createElement('div');
    titleHeader.className = 'section-header';
    titleHeader.innerHTML = '<h3 class="section-title">Customer Reviews</h3>';
    wrap.appendChild(titleHeader);

    const grid = document.createElement('div');
    grid.className = 'card-grid';

    section.items.forEach(function (review, idx) {
      const card = document.createElement('div');
      card.className = 'review-card';
      card.style.position = 'relative';

      const stars = '⭐'.repeat(review.stars);
      const starsEl = document.createElement('div');
      starsEl.className = 'review-stars';
      starsEl.textContent = stars;

      const textEl = document.createElement('p');
      textEl.className = 'review-text';
      textEl.textContent = review.text;

      const authorEl = document.createElement('div');
      authorEl.className = 'review-author';
      authorEl.textContent = '— ' + review.name;

      if (editMode) {
        textEl.contentEditable = 'true';
        textEl.addEventListener('blur', function () {
          review.text = this.textContent;
          saveData();
          showToast('Content updated');
        });
        authorEl.contentEditable = 'true';
        authorEl.addEventListener('blur', function () {
          review.name = this.textContent.replace('— ', '');
          saveData();
          showToast('Content updated');
        });
        const delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.textContent = '✕';
        delBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          showConfirm('Delete Review', 'Delete this review?', function () {
            section.items.splice(idx, 1);
            saveData();
            renderPage(page);
            showToast('Review deleted');
          });
        });
        card.appendChild(delBtn);
      }

      card.appendChild(starsEl);
      card.appendChild(textEl);
      card.appendChild(authorEl);
      grid.appendChild(card);
    });

    // Add review card btn
    const addCardBtn = document.createElement('button');
    addCardBtn.className = 'add-card-btn';
    addCardBtn.textContent = '+ Add Review';
    addCardBtn.addEventListener('click', function () {
      section.items.push({ name: 'Reviewer Name', stars: 5, text: 'Review text here...' });
      saveData();
      renderPage(page);
      showToast('Item added');
    });
    grid.appendChild(addCardBtn);

    wrap.appendChild(grid);

    const dBtn = makeDeleteBtn(section, page, function () {
      removeSection(page, section.id);
      renderPage(page);
    });
    if (dBtn) wrap.appendChild(dBtn);
    return wrap;
  }

  function renderSwot(section, page) {
    const wrap = document.createElement('div');
    wrap.className = 'section';
    wrap.style.position = 'relative';

    const titleHeader = document.createElement('div');
    titleHeader.className = 'section-header';
    titleHeader.appendChild(makeSectionTitle(section.title, section, 'title'));
    wrap.appendChild(titleHeader);

    const grid = document.createElement('div');
    grid.className = 'swot-grid';

    const quadrants = [
      { key: 'strengths', label: '💪 Strengths', cls: 'strengths' },
      { key: 'weaknesses', label: '⚠️ Weaknesses', cls: 'weaknesses' },
      { key: 'opportunities', label: '🚀 Opportunities', cls: 'opportunities' },
      { key: 'threats', label: '⚡ Threats', cls: 'threats' }
    ];

    quadrants.forEach(function (q) {
      const card = document.createElement('div');
      card.className = 'swot-card ' + q.cls;
      card.style.position = 'relative';

      const titleDiv = document.createElement('div');
      titleDiv.className = 'swot-title';
      titleDiv.textContent = q.label;
      card.appendChild(titleDiv);

      const list = document.createElement('ul');
      list.className = 'swot-list';
      (section[q.key] || []).forEach(function (item, idx) {
        const li = document.createElement('li');
        li.textContent = item;
        if (editMode) {
          li.contentEditable = 'true';
          li.addEventListener('blur', function () {
            section[q.key][idx] = this.textContent;
            saveData();
            showToast('Content updated');
          });
          const delBtn = document.createElement('button');
          delBtn.className = 'item-delete-btn';
          delBtn.textContent = '✕';
          delBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            section[q.key].splice(idx, 1);
            saveData();
            renderPage(page);
            showToast('Item deleted');
          });
          li.appendChild(delBtn);
        }
        list.appendChild(li);
      });
      card.appendChild(list);

      if (editMode) {
        const addBtn = document.createElement('button');
        addBtn.className = 'add-item-btn';
        addBtn.textContent = '+ Add';
        addBtn.addEventListener('click', function () {
          if (!section[q.key]) section[q.key] = [];
          section[q.key].push('New item');
          saveData();
          renderPage(page);
          showToast('Item added');
        });
        card.appendChild(addBtn);
      }

      grid.appendChild(card);
    });

    wrap.appendChild(grid);

    const dBtn = makeDeleteBtn(section, page, function () {
      removeSection(page, section.id);
      renderPage(page);
    });
    if (dBtn) wrap.appendChild(dBtn);
    return wrap;
  }

  function renderServiceCards(section, page) {
    const wrap = document.createElement('div');
    wrap.className = 'section';
    wrap.style.position = 'relative';

    const titleHeader = document.createElement('div');
    titleHeader.className = 'section-header';
    titleHeader.innerHTML = '<h3 class="section-title">Service Offerings</h3>';
    wrap.appendChild(titleHeader);

    const grid = document.createElement('div');
    grid.className = 'card-grid-3';

    section.items.forEach(function (service, idx) {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.position = 'relative';

      const iconEl = document.createElement('div');
      iconEl.style.fontSize = '2rem';
      iconEl.style.marginBottom = '10px';
      iconEl.textContent = service.icon;
      if (editMode) {
        iconEl.contentEditable = 'true';
        iconEl.addEventListener('blur', function () {
          service.icon = this.textContent;
          saveData();
          showToast('Content updated');
        });
      }

      const titleEl = document.createElement('div');
      titleEl.className = 'card-title';
      titleEl.textContent = service.title;
      if (editMode) {
        titleEl.contentEditable = 'true';
        titleEl.addEventListener('blur', function () {
          service.title = this.textContent;
          saveData();
          showToast('Content updated');
        });
      }

      const list = document.createElement('ul');
      list.className = 'bullet-list';
      service.items.forEach(function (item, itemIdx) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = item;
        if (editMode) {
          span.contentEditable = 'true';
          span.addEventListener('blur', function () {
            service.items[itemIdx] = this.textContent;
            saveData();
            showToast('Content updated');
          });
          const delBtn = document.createElement('button');
          delBtn.className = 'item-delete-btn';
          delBtn.textContent = '✕';
          delBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            service.items.splice(itemIdx, 1);
            saveData();
            renderPage(page);
            showToast('Item deleted');
          });
          li.appendChild(span);
          li.appendChild(delBtn);
        } else {
          li.appendChild(span);
        }
        list.appendChild(li);
      });

      card.appendChild(iconEl);
      card.appendChild(titleEl);
      card.appendChild(list);

      if (editMode) {
        const addItemBtn = document.createElement('button');
        addItemBtn.className = 'add-item-btn';
        addItemBtn.textContent = '+ Add';
        addItemBtn.addEventListener('click', function () {
          service.items.push('New service item');
          saveData();
          renderPage(page);
          showToast('Item added');
        });
        card.appendChild(addItemBtn);

        const delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.textContent = '✕';
        delBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          showConfirm('Delete Card', 'Delete this service card?', function () {
            section.items.splice(idx, 1);
            saveData();
            renderPage(page);
            showToast('Card deleted');
          });
        });
        card.appendChild(delBtn);
      }

      grid.appendChild(card);
    });

    // Add card btn
    const addCardBtn = document.createElement('button');
    addCardBtn.className = 'add-card-btn';
    addCardBtn.textContent = '+ Add Service';
    addCardBtn.addEventListener('click', function () {
      section.items.push({ icon: '⚙️', title: 'New Service', items: ['Service item'] });
      saveData();
      renderPage(page);
      showToast('Item added');
    });
    grid.appendChild(addCardBtn);

    wrap.appendChild(grid);

    const dBtn = makeDeleteBtn(section, page, function () {
      removeSection(page, section.id);
      renderPage(page);
    });
    if (dBtn) wrap.appendChild(dBtn);
    return wrap;
  }

  function renderRecommendations(section, page) {
    const wrap = document.createElement('div');
    wrap.className = 'section card';
    wrap.style.position = 'relative';

    const titleEl = document.createElement('div');
    titleEl.className = 'card-title';
    titleEl.textContent = section.title;
    if (editMode) {
      titleEl.contentEditable = 'true';
      titleEl.addEventListener('blur', function () {
        section.title = this.textContent;
        saveData();
        showToast('Content updated');
      });
    }
    wrap.appendChild(titleEl);

    const list = document.createElement('ul');
    list.className = 'rec-list';

    section.items.forEach(function (item, idx) {
      const li = document.createElement('li');
      li.className = 'rec-item';
      li.style.position = 'relative';

      const badge = document.createElement('span');
      badge.className = 'rec-priority ' + item.priority;
      badge.textContent = item.priority.charAt(0).toUpperCase() + item.priority.slice(1);
      if (editMode) {
        badge.contentEditable = 'true';
        badge.addEventListener('blur', function () {
          item.priority = this.textContent.toLowerCase();
          saveData();
          showToast('Content updated');
        });
      }

      const text = document.createElement('span');
      text.textContent = item.text;
      if (editMode) {
        text.contentEditable = 'true';
        text.addEventListener('blur', function () {
          item.text = this.textContent;
          saveData();
          showToast('Content updated');
        });
      }

      li.appendChild(badge);
      li.appendChild(text);

      if (editMode) {
        const delBtn = document.createElement('button');
        delBtn.className = 'item-delete-btn';
        delBtn.style.position = 'absolute';
        delBtn.style.right = '8px';
        delBtn.style.top = '50%';
        delBtn.style.transform = 'translateY(-50%)';
        delBtn.textContent = '✕';
        delBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          section.items.splice(idx, 1);
          saveData();
          renderPage(page);
          showToast('Item deleted');
        });
        li.appendChild(delBtn);
      }

      list.appendChild(li);
    });

    wrap.appendChild(list);

    const addBtn = document.createElement('button');
    addBtn.className = 'add-item-btn';
    addBtn.textContent = '+ Add Recommendation';
    addBtn.addEventListener('click', function () {
      section.items.push({ priority: 'medium', text: 'New recommendation' });
      saveData();
      renderPage(page);
      showToast('Item added');
    });
    wrap.appendChild(addBtn);

    const dBtn = makeDeleteBtn(section, page, function () {
      removeSection(page, section.id);
      renderPage(page);
    });
    if (dBtn) wrap.appendChild(dBtn);
    return wrap;
  }

  // ============================================================
  // SECTION MANAGEMENT
  // ============================================================
  function removeSection(page, sectionId) {
    const data = pageData[page];
    if (!data) return;
    data.sections = data.sections.filter(function (s) { return s.id !== sectionId; });
    saveData();
  }

  function addSection(page, type) {
    const data = pageData[page];
    if (!data) return;
    const id = 'section-' + Date.now();

    var newSection;
    switch (type) {
      case 'text':
        newSection = { id: id, type: 'text', title: 'New Section', content: 'Enter your content here...' };
        break;
      case 'card':
        newSection = { id: id, type: 'kv-card', title: '🃏 New Card', items: [{ key: 'Field', value: 'Value' }] };
        break;
      case 'table':
        newSection = { id: id, type: 'table', title: '📋 New Table', headers: ['Column 1', 'Column 2', 'Column 3'], rows: [['Row 1', 'Data', 'Data']] };
        break;
      case 'list':
        newSection = { id: id, type: 'list-card', title: '📌 New List', items: ['Item 1', 'Item 2'] };
        break;
      case 'stats':
        newSection = { id: id, type: 'stats', items: [{ icon: '📊', label: 'Metric', value: 'Value' }] };
        break;
      case 'review':
        newSection = { id: id, type: 'reviews', items: [{ name: 'Reviewer', stars: 5, text: 'Great service!' }] };
        break;
      default:
        newSection = { id: id, type: 'text', title: 'New Section', content: 'Content...' };
    }

    data.sections.push(newSection);
    saveData();
    renderPage(page);
    showToast('Section added');
  }

  // ============================================================
  // SIDEBAR
  // ============================================================
  function setupSidebar() {
    // Nav item clicks
    document.querySelectorAll('.nav-item').forEach(function (item) {
      item.addEventListener('click', function () {
        navigateTo(this.dataset.page);
      });
    });

    // Collapse toggle
    const sidebar = document.getElementById('sidebar');
    const mainWrapper = document.querySelector('.main-wrapper');
    const toggleBtn = document.getElementById('sidebar-toggle');

    toggleBtn.addEventListener('click', function () {
      sidebar.classList.toggle('collapsed');
      mainWrapper.classList.toggle('sidebar-collapsed');
    });

    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');

    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'sidebar-overlay';
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    mobileMenuBtn.addEventListener('click', function () {
      sidebar.classList.toggle('mobile-open');
      overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', function () {
      sidebar.classList.remove('mobile-open');
      overlay.classList.remove('active');
    });
  }

  // ============================================================
  // HEADER
  // ============================================================
  function setupHeader() {
    const toggle = document.getElementById('edit-mode-toggle');
    toggle.addEventListener('change', function () {
      editMode = this.checked;
      document.body.classList.toggle('edit-mode', editMode);
      localStorage.setItem(EDIT_MODE_KEY, editMode);
      renderPage(currentPage);
      showToast(editMode ? 'Edit mode enabled' : 'Edit mode disabled');
    });
  }

  // ============================================================
  // MODALS
  // ============================================================
  function setupModals() {
    // Add Section Modal
    const modal = document.getElementById('add-section-modal');
    document.getElementById('modal-close-btn').addEventListener('click', function () {
      modal.style.display = 'none';
    });
    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.style.display = 'none';
    });
    document.querySelectorAll('.modal-option-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        modal.style.display = 'none';
        if (addSectionTargetPage) {
          addSection(addSectionTargetPage, this.dataset.type);
        }
      });
    });

    // Confirm Modal
    const confirmModal = document.getElementById('confirm-modal');
    document.getElementById('confirm-yes-btn').addEventListener('click', function () {
      confirmModal.style.display = 'none';
      if (pendingConfirmCallback) {
        pendingConfirmCallback();
        pendingConfirmCallback = null;
      }
    });
    document.getElementById('confirm-no-btn').addEventListener('click', function () {
      confirmModal.style.display = 'none';
      pendingConfirmCallback = null;
    });
    confirmModal.addEventListener('click', function (e) {
      if (e.target === confirmModal) {
        confirmModal.style.display = 'none';
        pendingConfirmCallback = null;
      }
    });
  }

  function openAddSectionModal() {
    document.getElementById('add-section-modal').style.display = 'flex';
  }

  function showConfirm(title, message, callback) {
    document.getElementById('confirm-title').textContent = title;
    document.getElementById('confirm-message').textContent = message;
    pendingConfirmCallback = callback;
    document.getElementById('confirm-modal').style.display = 'flex';
  }

  // ============================================================
  // RESET
  // ============================================================
  function setupResetBtn() {
    document.getElementById('reset-btn').addEventListener('click', function () {
      showConfirm(
        'Reset All Data',
        'This will restore all content to the original research data. Are you sure?',
        resetData
      );
    });
  }

  // ============================================================
  // TOAST
  // ============================================================
  function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(function () {
      toast.classList.add('removing');
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3000);
  }

  // ============================================================
  // START
  // ============================================================
  document.addEventListener('DOMContentLoaded', init);

})();
