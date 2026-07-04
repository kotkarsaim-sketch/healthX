import { doctorStatuses } from '../utils/mockData';

export default function StatusBadge({ status, showLabel = true }) {
  const info = doctorStatuses[status] || doctorStatuses.available;
  const badgeClass = `badge badge-${info.color === 'gray' ? 'blue' : info.color} badge-pulse`;
  return (
    <span className={badgeClass}>
      <span className="badge-dot" />
      {showLabel && info.label}
    </span>
  );
}
