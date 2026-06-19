import { useState, useMemo, useEffect } from 'react';
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Client, COLUMNS } from '../types';
import { getClients, saveClients } from '../store';
import { getDefaultStageInfo } from '../stageUtils';
import Column from './Column';
import ClientCard from './ClientCard';
import ClientDetailsModal from './ClientDetailsModal';
import AddClientModal from './AddClientModal';
import './KanbanBoard.css';

interface KanbanBoardProps {
  searchQuery: string;
}

export default function KanbanBoard({ searchQuery }: KanbanBoardProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [activeClient, setActiveClient] = useState<Client | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [addingToColumn, setAddingToColumn] = useState<string | null>(null);

  useEffect(() => {
    setClients(getClients());
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredClients = useMemo(() => {
    if (!searchQuery.trim()) return clients;
    const lowerQuery = searchQuery.toLowerCase();
    return clients.filter(c =>
      c.name.toLowerCase().includes(lowerQuery) ||
      c.email.toLowerCase().includes(lowerQuery)
    );
  }, [clients, searchQuery]);

  const clientsByColumn = useMemo(() => {
    const acc: Record<string, Client[]> = {};
    COLUMNS.forEach(col => {
      acc[col.id] = filteredClients.filter(c => c.columnId === col.id);
    });
    return acc;
  }, [filteredClients]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const client = clients.find(c => c.id === active.id);
    if (client) {
      setActiveClient(client);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveClient = active.data.current?.type === 'Client';
    const isOverClient = over.data.current?.type === 'Client';

    if (!isActiveClient) return;

    // Dropping a client over another client
    if (isActiveClient && isOverClient) {
      setClients((prev) => {
        const activeIndex = prev.findIndex(c => c.id === activeId);
        const overIndex = prev.findIndex(c => c.id === overId);

        if (prev[activeIndex].columnId !== prev[overIndex].columnId) {
          const newColumnId = prev[overIndex].columnId;
          const newClients = [...prev.map(c => ({ ...c }))];
          newClients[activeIndex].columnId = newColumnId;
          newClients[activeIndex].stageInfo = getDefaultStageInfo(newColumnId);
          const moved = arrayMove(newClients, activeIndex, overIndex);
          saveClients(moved);
          return moved;
        }

        const moved = arrayMove(prev, activeIndex, overIndex);
        saveClients(moved);
        return moved;
      });
    }

    // Dropping a client over a column
    const isOverColumn = COLUMNS.some(col => col.id === overId);
    if (isActiveClient && isOverColumn) {
      setClients((prev) => {
        const activeIndex = prev.findIndex(c => c.id === activeId);
        const newColumnId = overId as string;
        if (prev[activeIndex].columnId !== newColumnId) {
          const newClients = [...prev.map(c => ({ ...c }))];
          newClients[activeIndex].columnId = newColumnId;
          newClients[activeIndex].stageInfo = getDefaultStageInfo(newColumnId);
          saveClients(newClients);
          return newClients;
        }
        return prev;
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveClient(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    // Final state is handled by dragOver, just save again to be sure
    saveClients(clients);
  };

  const handleUpdateClient = (updated: Client) => {
    const newClients = clients.map(c => c.id === updated.id ? updated : c);
    setClients(newClients);
    saveClients(newClients);
    setSelectedClient(updated);
  };

  const handleDeleteClient = (clientId: string) => {
    const newClients = clients.filter(c => c.id !== clientId);
    setClients(newClients);
    saveClients(newClients);
    setSelectedClient(null);
  };

  const handleAddClient = (clientData: Omit<Client, 'id'>) => {
    const newClient: Client = {
      ...clientData,
      id: Math.random().toString(36).substr(2, 9),
    };
    const newClients = [...clients, newClient];
    setClients(newClients);
    saveClients(newClients);
    setAddingToColumn(null);
  };

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.4',
        },
      },
    }),
  };

  return (
    <>
      <div className="kanban-board">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="kanban-columns">
            {COLUMNS.map(col => (
              <Column
                key={col.id}
                id={col.id}
                title={col.label}
                clients={clientsByColumn[col.id] || []}
                onAddClient={setAddingToColumn}
                onClientClick={setSelectedClient}
              />
            ))}
          </div>

          <DragOverlay dropAnimation={dropAnimation}>
            {activeClient ? (
              <ClientCard client={activeClient} onClick={() => {}} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      {selectedClient && (
        <ClientDetailsModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
          onUpdate={handleUpdateClient}
          onDelete={handleDeleteClient}
        />
      )}

      {addingToColumn && (
        <AddClientModal
          columnId={addingToColumn}
          onClose={() => setAddingToColumn(null)}
          onSubmit={handleAddClient}
        />
      )}
    </>
  );
}
