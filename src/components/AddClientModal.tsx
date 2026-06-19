import { useState } from 'react';
import { X, Info } from 'lucide-react';
import { Client, COLUMNS, MANDATE_TYPES, StageInfo } from '../types';
import { getDefaultStageInfo } from '../stageUtils';
import './Modal.css';

interface AddClientModalProps {
  columnId: string;
  onClose: () => void;
  onSubmit: (client: Omit<Client, 'id'>) => void;
}

export default function AddClientModal({ columnId, onClose, onSubmit }: AddClientModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    mandateType: MANDATE_TYPES[0],
    assignedTo: '',
    dateAdded: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const [stageInfo, setStageInfo] = useState<StageInfo>(getDefaultStageInfo(columnId));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStageInfoChange = (field: string, value: string | number) => {
    setStageInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      columnId,
      stageInfo,
    });
  };

  const columnLabel = COLUMNS.find(c => c.id === columnId)?.label ?? columnId;

  const renderStageFields = () => {
    const info = stageInfo as Record<string, string | number | undefined>;
    switch (columnId) {
      case 'new-inquiry':
        return (
          <div className="form-group">
            <label htmlFor="si-source">Lead Source</label>
            <select
              id="si-source"
              value={(info.source as string) ?? 'Manual entry'}
              onChange={e => handleStageInfoChange('source', e.target.value)}
            >
              <option>Website</option>
              <option>Phone</option>
              <option>Email</option>
              <option>Referral</option>
              <option>Walk-in</option>
              <option>Manual entry</option>
              <option>Other</option>
            </select>
          </div>
        );

      case 'consultation-scheduled':
        return (
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="si-date">Consultation Date</label>
              <input
                id="si-date"
                type="text"
                placeholder="e.g. 25 Jun 2026"
                value={(info.consultationDate as string) ?? ''}
                onChange={e => handleStageInfoChange('consultationDate', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="si-time">Consultation Time</label>
              <input
                id="si-time"
                type="text"
                placeholder="e.g. 10:00"
                value={(info.consultationTime as string) ?? ''}
                onChange={e => handleStageInfoChange('consultationTime', e.target.value)}
              />
            </div>
          </div>
        );

      case 'documents-requested':
        return (
          <div className="form-group">
            <label htmlFor="si-waiting">Documents Requested</label>
            <input
              id="si-waiting"
              type="number"
              min={0}
              value={(info.waitingDocs as number) ?? 0}
              onChange={e => handleStageInfoChange('waitingDocs', parseInt(e.target.value, 10) || 0)}
            />
          </div>
        );

      case 'documents-received':
        return (
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="si-received">Documents Received</label>
              <input
                id="si-received"
                type="number"
                min={0}
                value={(info.receivedDocs as number) ?? 0}
                onChange={e => handleStageInfoChange('receivedDocs', parseInt(e.target.value, 10) || 0)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="si-total">Total Required</label>
              <input
                id="si-total"
                type="number"
                min={0}
                value={(info.totalDocs as number) ?? 0}
                onChange={e => handleStageInfoChange('totalDocs', parseInt(e.target.value, 10) || 0)}
              />
            </div>
          </div>
        );

      case 'engagement-letter-sent':
        return (
          <div className="form-group">
            <label htmlFor="si-sent">Letter Sent Date</label>
            <input
              id="si-sent"
              type="text"
              placeholder="e.g. 16 Jun 2026"
              value={(info.letterSentDate as string) ?? ''}
              onChange={e => handleStageInfoChange('letterSentDate', e.target.value)}
            />
          </div>
        );

      case 'signed-active':
        return (
          <div className="form-group">
            <label htmlFor="si-since">Active Since</label>
            <input
              id="si-since"
              type="text"
              placeholder="e.g. 1 Mar 2026"
              value={(info.activeSince as string) ?? ''}
              onChange={e => handleStageInfoChange('activeSince', e.target.value)}
            />
          </div>
        );

      case 'on-hold':
        return (
          <div className="form-group">
            <label htmlFor="si-reason">Hold Reason</label>
            <input
              id="si-reason"
              type="text"
              placeholder="e.g. Awaiting client response"
              value={(info.holdReason as string) ?? ''}
              onChange={e => handleStageInfoChange('holdReason', e.target.value)}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Add New Client</h2>
          <button type="button" className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Max Mustermann"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="max@example.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+49 123 456789"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="mandateType">Mandate Type *</label>
                <select
                  id="mandateType"
                  name="mandateType"
                  required
                  value={formData.mandateType}
                  onChange={handleChange}
                >
                  {MANDATE_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="assignedTo">Assigned To</label>
                <input
                  type="text"
                  id="assignedTo"
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleChange}
                  placeholder="Sabine Müller"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="dateAdded">Date Added</label>
              <input
                type="date"
                id="dateAdded"
                name="dateAdded"
                required
                value={formData.dateAdded}
                onChange={handleChange}
              />
            </div>

            <div className="edit-stage-section">
              <div className="edit-stage-label">
                <Info size={13} />
                Stage Details — {columnLabel}
              </div>
              {renderStageFields()}
            </div>

            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                placeholder="Additional information..."
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
