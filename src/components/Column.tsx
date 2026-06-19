import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import { Client } from '../types';
import ClientCard from './ClientCard';
import './Column.css';

interface ColumnProps {
  id: string;
  title: string;
  clients: Client[];
  onAddClient: (columnId: string) => void;
  onClientClick: (client: Client) => void;
}

export default function Column({ id, title, clients, onAddClient, onClientClick }: ColumnProps) {
  return (
    <div className={`column ${id === 'on-hold' ? 'column-on-hold' : ''}`}>
      <div className="column-header">
        <h2 className="column-title">{title}</h2>
        <span className="column-badge">{clients.length}</span>
      </div>

      <div className="column-content">
        <SortableContext items={clients.map(c => c.id)} strategy={verticalListSortingStrategy}>
          <div className="column-cards-container">
            {clients.map(client => (
              <ClientCard 
                key={client.id} 
                client={client} 
                onClick={onClientClick} 
              />
            ))}
          </div>
        </SortableContext>
      </div>

      <div className="column-footer">
        <button 
          className="add-client-button"
          onClick={() => onAddClient(id)}
        >
          <Plus size={16} />
          Add Client
        </button>
      </div>
    </div>
  );
}
