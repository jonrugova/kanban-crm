import { Client, StageInfo } from './types';

/** Formats a Date as "19 Jun 2026" to match the app's date style. */
function fmt(d: Date): string {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

/** Returns a sensible default StageInfo when a card is moved to a new column. */
export function getDefaultStageInfo(columnId: string): StageInfo {
  const today = new Date();
  const inOneWeek = new Date(today);
  inOneWeek.setDate(today.getDate() + 7);

  switch (columnId) {
    case 'new-inquiry':
      return { source: 'Manual entry' };
    case 'consultation-scheduled':
      return { consultationDate: fmt(inOneWeek), consultationTime: '10:00' };
    case 'documents-requested':
      return { waitingDocs: 3 };
    case 'documents-received':
      return { receivedDocs: 0, totalDocs: 3 };
    case 'engagement-letter-sent':
      return { letterSentDate: fmt(today) };
    case 'signed-active':
      return { activeSince: fmt(today) };
    case 'on-hold':
      return { holdReason: 'Waiting for client response' };
    default:
      return {};
  }
}

/** Returns a single compact summary line for the card, or null if no data. */
export function getStageSummary(client: Client): string | null {
  const info = client.stageInfo;
  if (!info) return null;
  switch (client.columnId) {
    case 'new-inquiry':
      return info.source ? `Source: ${info.source}` : null;
    case 'consultation-scheduled':
      return info.consultationDate && info.consultationTime
        ? `Consultation: ${info.consultationDate} · ${info.consultationTime}`
        : null;
    case 'documents-requested':
      return info.waitingDocs !== undefined
        ? `Waiting for: ${info.waitingDocs} document${info.waitingDocs !== 1 ? 's' : ''}`
        : null;
    case 'documents-received':
      return info.receivedDocs !== undefined && info.totalDocs !== undefined
        ? `Received: ${info.receivedDocs}/${info.totalDocs} documents`
        : null;
    case 'engagement-letter-sent':
      return info.letterSentDate ? `Sent: ${info.letterSentDate}` : null;
    case 'signed-active':
      return info.activeSince ? `Active since: ${info.activeSince}` : null;
    case 'on-hold':
      return info.holdReason ? `Reason: ${info.holdReason}` : null;
    default:
      return null;
  }
}

/** Returns all stage-specific detail rows for the modal. */
export function getStageDetails(client: Client): { label: string; value: string }[] {
  const info = client.stageInfo;
  if (!info) return [];
  switch (client.columnId) {
    case 'new-inquiry':
      return info.source ? [{ label: 'Lead Source', value: info.source }] : [];
    case 'consultation-scheduled': {
      const rows: { label: string; value: string }[] = [];
      if (info.consultationDate) rows.push({ label: 'Consultation Date', value: info.consultationDate });
      if (info.consultationTime) rows.push({ label: 'Consultation Time', value: info.consultationTime });
      return rows;
    }
    case 'documents-requested':
      return info.waitingDocs !== undefined
        ? [{ label: 'Documents Pending', value: `${info.waitingDocs} document${info.waitingDocs !== 1 ? 's' : ''}` }]
        : [];
    case 'documents-received':
      return info.receivedDocs !== undefined && info.totalDocs !== undefined
        ? [{ label: 'Documents Received', value: `${info.receivedDocs} of ${info.totalDocs}` }]
        : [];
    case 'engagement-letter-sent':
      return info.letterSentDate ? [{ label: 'Letter Sent', value: info.letterSentDate }] : [];
    case 'signed-active':
      return info.activeSince ? [{ label: 'Active Since', value: info.activeSince }] : [];
    case 'on-hold':
      return info.holdReason ? [{ label: 'Hold Reason', value: info.holdReason }] : [];
    default:
      return [];
  }
}
