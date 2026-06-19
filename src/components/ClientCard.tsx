import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Mail, User, Calendar } from 'lucide-react';
import { Client } from '../types';
import { getStageSummary } from '../stageUtils';
import './ClientCard.css';

interface ClientCardProps {
  client: Client;
  onClick: (client: Client) => void;
}

export default function ClientCard({ client, onClick }: ClientCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: client.id,
    data: { type: 'Client', client },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const formattedDate = new Date(client.dateAdded).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: '2-digit',
  });

  const stageSummary = getStageSummary(client);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`client-card ${isDragging ? 'is-dragging' : ''}`}
      {...attributes}
      {...listeners}
      onClick={() => onClick(client)}
    >
      <div className="card-header">
        <h3 className="card-name">{client.name}</h3>
        <span className="card-mandate-badge">{client.mandateType}</span>
      </div>

      <div className="card-meta">
        <span className="card-meta-item">
          <Mail size={11} className="card-meta-icon" />
          {client.email}
        </span>
        <span className="card-meta-separator">·</span>
        <span className="card-meta-item card-meta-assignee">
          <User size={11} className="card-meta-icon" />
          {client.assignedTo}
        </span>
        <span className="card-meta-separator">·</span>
        <span className="card-meta-item card-meta-date">
          <Calendar size={11} className="card-meta-icon" />
          {formattedDate}
        </span>
      </div>

      {stageSummary && (
        <div className="card-stage">
          <div className="card-stage-divider" />
          <span className="card-stage-text">{stageSummary}</span>
        </div>
      )}
    </div>
  );
}
