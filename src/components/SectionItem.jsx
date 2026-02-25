import { useState } from 'react';
import StatusBadge from './StatusBadge';

export default function SectionItem({
  section,
  depth = 0,
  selectedId,
  onSelect,
  onUpdate,
  onAddChild,
  onDelete,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const hasChildren = section.children && section.children.length > 0;
  const isSelected = selectedId === section.id;

  return (
    <div className="section-item-wrapper" style={{ '--depth': depth }}>
      <div
        className={`section-item ${isSelected ? 'selected' : ''}`}
        style={{ paddingLeft: `${12 + depth * 16}px` }}
        onClick={() => onSelect(section.id)}
      >
        <button
          className="collapse-btn"
          onClick={(e) => {
            e.stopPropagation();
            setCollapsed(!collapsed);
          }}
          aria-label={collapsed ? 'Expand' : 'Collapse'}
        >
          {hasChildren ? (collapsed ? '▸' : '▾') : '·'}
        </button>
        <span className="section-title">{section.title}</span>
        <StatusBadge status={section.status} />
        <div className="section-actions">
          <button
            className="action-btn add"
            title="Add child section"
            onClick={(e) => {
              e.stopPropagation();
              onAddChild(section.id);
            }}
          >
            +
          </button>
          {depth > 0 && (
            <button
              className="action-btn delete"
              title="Delete section"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(section.id);
              }}
            >
              ×
            </button>
          )}
        </div>
      </div>

      {!collapsed && hasChildren && (
        <div className="section-children">
          {section.children.map((child) => (
            <SectionItem
              key={child.id}
              section={child}
              depth={depth + 1}
              selectedId={selectedId}
              onSelect={onSelect}
              onUpdate={onUpdate}
              onAddChild={onAddChild}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
