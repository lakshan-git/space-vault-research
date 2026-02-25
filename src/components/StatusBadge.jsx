import { STATUS_META } from '../data/initialSections';

export default function StatusBadge({ status, onChange }) {
  const meta = STATUS_META[status] || STATUS_META.draft;

  return (
    <span
      className="status-badge"
      style={{ color: meta.color, backgroundColor: meta.bg, borderColor: meta.color }}
    >
      <span className="status-dot" style={{ backgroundColor: meta.color }} />
      {onChange ? (
        <select
          value={status}
          onChange={(e) => onChange(e.target.value)}
          className="status-select"
          style={{ color: meta.color }}
        >
          {Object.entries(STATUS_META).map(([key, m]) => (
            <option key={key} value={key}>
              {m.label}
            </option>
          ))}
        </select>
      ) : (
        meta.label
      )}
    </span>
  );
}
