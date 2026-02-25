import { useState } from 'react';
import StatusBadge from './StatusBadge';
import { STATUS_META } from '../data/initialSections';

function renderFormattedContent(raw) {
  if (!raw) return null;

  const seoMatch = raw.match(/<seo>([\s\S]*?)<\/seo>/);
  let seoBlock = null;
  let body = raw;

  if (seoMatch) {
    body = raw.replace(seoMatch[0], '');
    const titleMatch = seoMatch[1].match(/<meta-title>(.*?)<\/meta-title>/);
    const descMatch = seoMatch[1].match(/<meta-description>(.*?)<\/meta-description>/);
    const kwMatch = seoMatch[1].match(/<primary-keyword>(.*?)<\/primary-keyword>/);
    const secKwMatch = seoMatch[1].match(/<secondary-keywords>(.*?)<\/secondary-keywords>/);

    seoBlock = (
      <div className="seo-meta-block">
        <div className="seo-meta-label">SEO Metadata</div>
        {titleMatch && (
          <div className="seo-meta-row">
            <span className="seo-key">Title:</span>
            <span className="seo-value">{titleMatch[1]}</span>
          </div>
        )}
        {descMatch && (
          <div className="seo-meta-row">
            <span className="seo-key">Description:</span>
            <span className="seo-value">{descMatch[1]}</span>
          </div>
        )}
        {kwMatch && (
          <div className="seo-meta-row">
            <span className="seo-key">Primary Keyword:</span>
            <span className="seo-value seo-kw">{kwMatch[1]}</span>
          </div>
        )}
        {secKwMatch && (
          <div className="seo-meta-row">
            <span className="seo-key">Secondary:</span>
            <span className="seo-value seo-kw">{secKwMatch[1]}</span>
          </div>
        )}
      </div>
    );
  }

  const cleaned = body
    .replace(/<h1>(.*?)<\/h1>/g, '<h1 class="content-h1">$1</h1>')
    .replace(/<h2>(.*?)<\/h2>/g, '<h2 class="content-h2">$1</h2>')
    .replace(/<h3>(.*?)<\/h3>/g, '<h3 class="content-h3">$1</h3>')
    .replace(/<p class="(.*?)">([\s\S]*?)<\/p>/g, '<p class="$1">$2</p>')
    .replace(/<p>([\s\S]*?)<\/p>/g, '<p class="content-p">$1</p>')
    .replace(/<ul>/g, '<ul class="content-ul">')
    .replace(/<li>/g, '<li class="content-li">');

  return (
    <>
      {seoBlock}
      <div className="formatted-content" dangerouslySetInnerHTML={{ __html: cleaned }} />
    </>
  );
}

export default function ContentEditor({ section, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(section?.title ?? '');
  const [content, setContent] = useState(section?.content ?? '');
  const [prevId, setPrevId] = useState(section?.id);

  if (section && section.id !== prevId) {
    setTitle(section.title);
    setContent(section.content);
    setEditing(false);
    setPrevId(section.id);
  }

  if (!section) {
    return (
      <main className="content-editor empty-state">
        <div className="empty-icon">📄</div>
        <h2>Select a section</h2>
        <p>Choose a section from the sidebar to view or edit its content.</p>
      </main>
    );
  }

  const hasHtml = section.content && section.content.includes('<h1>');

  const handleSave = () => {
    onUpdate(section.id, { title, content });
    setEditing(false);
  };

  const handleCancel = () => {
    setTitle(section.title);
    setContent(section.content);
    setEditing(false);
  };

  return (
    <main className="content-editor">
      <div className="editor-toolbar">
        <StatusBadge
          status={section.status}
          onChange={(newStatus) => onUpdate(section.id, { status: newStatus })}
        />
        <div className="toolbar-actions">
          {editing ? (
            <>
              <button className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={() => setEditing(true)}>
              Edit
            </button>
          )}
        </div>
      </div>

      {editing ? (
        <div className="editor-form">
          <label className="editor-label">
            Title
            <input
              className="editor-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="editor-label">
            Content
            <textarea
              className="editor-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={20}
            />
          </label>
        </div>
      ) : (
        <article className="editor-preview">
          <h1 className="preview-title">{section.title}</h1>
          {hasHtml ? (
            renderFormattedContent(section.content)
          ) : (
            <p className="preview-content">{section.content}</p>
          )}
          {section.children && section.children.length > 0 && (
            <div className="child-summary">
              <h3 className="child-summary-heading">Child Sections</h3>
              <div className="child-cards">
                {section.children.map((child) => {
                  const meta = STATUS_META[child.status];
                  return (
                    <div key={child.id} className="child-card" style={{ borderLeftColor: meta.color }}>
                      <div className="child-card-header">
                        <span className="child-card-title">{child.title}</span>
                        <StatusBadge status={child.status} />
                      </div>
                      <p className="child-card-excerpt">
                        {child.content
                          ? child.content.replace(/<[^>]*>/g, '').substring(0, 120) + '…'
                          : 'No content yet.'}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </article>
      )}
    </main>
  );
}
