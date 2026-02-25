import SectionItem from './SectionItem';

export default function Sidebar({
  sections,
  selectedId,
  onSelect,
  onUpdate,
  onAddChild,
  onDelete,
  onAddRoot,
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <span className="brand-icon">◆</span>
          <span className="brand-text">Space Vault</span>
        </div>
        <span className="brand-sub">Research Report</span>
      </div>

      <div className="sidebar-section-label">
        <span>Sections</span>
        <button className="action-btn add root-add" title="Add root section" onClick={onAddRoot}>
          +
        </button>
      </div>

      <nav className="sidebar-nav">
        {sections.map((section) => (
          <SectionItem
            key={section.id}
            section={section}
            depth={0}
            selectedId={selectedId}
            onSelect={onSelect}
            onUpdate={onUpdate}
            onAddChild={onAddChild}
            onDelete={onDelete}
          />
        ))}
      </nav>

      <div className="sidebar-footer">
        <span className="sidebar-footer-text">Space Vault Storage Cargo Packaging L.L.C</span>
      </div>
    </aside>
  );
}
