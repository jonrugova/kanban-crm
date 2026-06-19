import { useState } from 'react';
import { X, Mail, Phone, Calendar, User, Briefcase, FileText, Info, Pencil, Trash2 } from 'lucide-react';
import { Client, COLUMNS, MANDATE_TYPES } from '../types';
import { getStageDetails, getDefaultStageInfo } from '../stageUtils';
import './Modal.css';

interface ClientDetailsModalProps {
  client: Client;
  onClose: () => void;
  onUpdate: (updated: Client) => void;
  onDelete: (id: string) => void;
}

export default function ClientDetailsModal({ client, onClose, onUpdate, onDelete }: ClientDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [editData, setEditData] = useState<Client>({ ...client });

  const formattedDate = new Date(client.dateAdded).toLocaleDateString('en-GB', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  const columnLabel = COLUMNS.find(c => c.id === client.columnId)?.label || client.columnId;
  const stageDetails = getStageDetails(client);

  /* ── Handlers ── */
  const handleEnterEdit = () => {
    setEditData({ ...client });
    setIsEditing(true);
    setIsConfirmingDelete(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({ ...client });
  };

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleFieldChange = (field: keyof Client, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleStatusChange = (newColumnId: string) => {
    setEditData(prev => ({
      ...prev,
      columnId: newColumnId,
      stageInfo: getDefaultStageInfo(newColumnId),
    }));
  };

  const handleStageInfoChange = (field: string, value: string | number) => {
    setEditData(prev => ({
      ...prev,
      stageInfo: { ...prev.stageInfo, [field]: value },
    }));
  };

  const handleConfirmDelete = () => {
    onDelete(client.id);
    onClose();
  };

  /* ── Stage-specific edit fields ── */
  const renderStageEditFields = () => {
    const info = editData.stageInfo ?? {};
    switch (editData.columnId) {
      case 'new-inquiry':
        return (
          <div className="form-group">
            <label htmlFor="si-source">Lead Source</label>
            <select
              id="si-source"
              value={(info as { source?: string }).source ?? ''}
              onChange={e => handleStageInfoChange('source', e.target.value)}
            >
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Phone">Phone</option>
              <option value="Manual entry">Manual entry</option>
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
                value={(info as { consultationDate?: string }).consultationDate ?? ''}
                onChange={e => handleStageInfoChange('consultationDate', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="si-time">Consultation Time</label>
              <input
                id="si-time"
                type="text"
                placeholder="e.g. 10:00"
                value={(info as { consultationTime?: string }).consultationTime ?? ''}
                onChange={e => handleStageInfoChange('consultationTime', e.target.value)}
              />
            </div>
          </div>
        );
      case 'documents-requested':
        return (
          <div className="form-group">
            <label htmlFor="si-waiting">Documents Pending</label>
            <input
              id="si-waiting"
              type="number"
              min={0}
              value={(info as { waitingDocs?: number }).waitingDocs ?? ''}
              onChange={e => handleStageInfoChange('waitingDocs', parseInt(e.target.value, 10) || 0)}
            />
          </div>
        );
      case 'documents-received':
        return (
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="si-received">Received</label>
              <input
                id="si-received"
                type="number"
                min={0}
                value={(info as { receivedDocs?: number }).receivedDocs ?? ''}
                onChange={e => handleStageInfoChange('receivedDocs', parseInt(e.target.value, 10) || 0)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="si-total">Total Expected</label>
              <input
                id="si-total"
                type="number"
                min={0}
                value={(info as { totalDocs?: number }).totalDocs ?? ''}
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
              value={(info as { letterSentDate?: string }).letterSentDate ?? ''}
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
              value={(info as { activeSince?: string }).activeSince ?? ''}
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
              value={(info as { holdReason?: string }).holdReason ?? ''}
              onChange={e => handleStageInfoChange('holdReason', e.target.value)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  /* ── Render ── */
  return (
    <div className="modal-backdrop" onClick={isEditing ? undefined : onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">
            {isEditing ? 'Edit Client' : client.name}
          </h2>
          <button className="modal-close" onClick={isEditing ? handleCancelEdit : onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body — VIEW MODE */}
        {!isEditing && (
          <div className="modal-body">
            <div className="detail-status">
              <span className="detail-label">Status</span>
              <span className="status-badge">{columnLabel}</span>
            </div>

            <div className="detail-grid">
              <div className="detail-item">
                <div className="detail-label"><Briefcase size={14} />Mandate Type</div>
                <div className="detail-value">{client.mandateType}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label"><User size={14} />Assigned To</div>
                <div className="detail-value">{client.assignedTo}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label"><Mail size={14} />Email</div>
                <div className="detail-value">
                  <a href={`mailto:${client.email}`}>{client.email}</a>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-label"><Phone size={14} />Phone</div>
                <div className="detail-value">
                  <a href={`tel:${client.phone}`}>{client.phone}</a>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-label"><Calendar size={14} />Date Added</div>
                <div className="detail-value">{formattedDate}</div>
              </div>
            </div>

            {stageDetails.length > 0 && (
              <div className="detail-stage-section">
                <div className="detail-label"><Info size={14} />Stage Details</div>
                <div className="detail-stage-grid">
                  {stageDetails.map(({ label, value }) => (
                    <div key={label} className="detail-stage-item">
                      <span className="detail-stage-label">{label}</span>
                      <span className="detail-stage-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="detail-notes-section">
              <div className="detail-label"><FileText size={14} />Notes</div>
              <div className="detail-notes-content">
                {client.notes
                  ? client.notes
                  : <span className="empty-notes">No notes available.</span>}
              </div>
            </div>
          </div>
        )}

        {/* Body — EDIT MODE */}
        {isEditing && (
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="edit-name">Name *</label>
              <input
                id="edit-name"
                type="text"
                required
                value={editData.name}
                onChange={e => handleFieldChange('name', e.target.value)}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="edit-email">Email</label>
                <input
                  id="edit-email"
                  type="email"
                  value={editData.email}
                  onChange={e => handleFieldChange('email', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-phone">Phone</label>
                <input
                  id="edit-phone"
                  type="text"
                  value={editData.phone}
                  onChange={e => handleFieldChange('phone', e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="edit-mandate">Mandate Type</label>
                <select
                  id="edit-mandate"
                  value={editData.mandateType}
                  onChange={e => handleFieldChange('mandateType', e.target.value)}
                >
                  {MANDATE_TYPES.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="edit-assigned">Assigned To</label>
                <input
                  id="edit-assigned"
                  type="text"
                  value={editData.assignedTo}
                  onChange={e => handleFieldChange('assignedTo', e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="edit-date">Date Added</label>
                <input
                  id="edit-date"
                  type="date"
                  value={editData.dateAdded.split('T')[0]}
                  onChange={e => handleFieldChange('dateAdded', new Date(e.target.value).toISOString())}
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-status">Status</label>
                <select
                  id="edit-status"
                  value={editData.columnId}
                  onChange={e => handleStatusChange(e.target.value)}
                >
                  {COLUMNS.map(col => (
                    <option key={col.id} value={col.id}>{col.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Stage-specific fields */}
            <div className="edit-stage-section">
              <div className="edit-stage-label">
                <Info size={13} />
                Stage Details — {COLUMNS.find(c => c.id === editData.columnId)?.label}
              </div>
              {renderStageEditFields()}
            </div>

            <div className="form-group">
              <label htmlFor="edit-notes">Notes</label>
              <textarea
                id="edit-notes"
                rows={3}
                value={editData.notes}
                onChange={e => handleFieldChange('notes', e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Footer — VIEW MODE */}
        {!isEditing && !isConfirmingDelete && (
          <div className="modal-footer modal-footer-view">
            <button className="btn-danger" onClick={() => setIsConfirmingDelete(true)}>
              <Trash2 size={14} />
              Delete
            </button>
            <div className="modal-footer-right">
              <button className="btn-secondary" onClick={onClose}>Close</button>
              <button className="btn-primary" onClick={handleEnterEdit}>
                <Pencil size={14} />
                Edit
              </button>
            </div>
          </div>
        )}

        {/* Footer — DELETE CONFIRM */}
        {!isEditing && isConfirmingDelete && (
          <div className="modal-footer modal-footer-confirm">
            <span className="delete-confirm-text">
              Delete <strong>{client.name}</strong>? This cannot be undone.
            </span>
            <div className="modal-footer-right">
              <button className="btn-secondary" onClick={() => setIsConfirmingDelete(false)}>
                Cancel
              </button>
              <button className="btn-danger" onClick={handleConfirmDelete}>
                Yes, Delete
              </button>
            </div>
          </div>
        )}

        {/* Footer — EDIT MODE */}
        {isEditing && (
          <div className="modal-footer modal-footer-view">
            <div />
            <div className="modal-footer-right">
              <button className="btn-secondary" onClick={handleCancelEdit}>Cancel</button>
              <button className="btn-primary" onClick={handleSave}>Save Changes</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
