export type StageInfo = {
  // new-inquiry
  source?: 'Website' | 'Referral' | 'Phone';
  // consultation-scheduled
  consultationDate?: string;
  consultationTime?: string;
  // documents-requested
  waitingDocs?: number;
  // documents-received
  receivedDocs?: number;
  totalDocs?: number;
  // engagement-letter-sent
  letterSentDate?: string;
  // signed-active
  activeSince?: string;
  // on-hold
  holdReason?: string;
};

export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  mandateType: string;
  assignedTo: string;
  dateAdded: string;
  columnId: string;
  notes: string;
  stageInfo?: StageInfo;
};

export const COLUMNS = [
  { id: 'new-inquiry', label: 'New Inquiry' },
  { id: 'consultation-scheduled', label: 'Initial Consultation Scheduled' },
  { id: 'documents-requested', label: 'Documents Requested' },
  { id: 'documents-received', label: 'Documents Received' },
  { id: 'engagement-letter-sent', label: 'Engagement Letter Sent' },
  { id: 'signed-active', label: 'Signed & Active' },
  { id: 'on-hold', label: 'On Hold' },
];

export const MANDATE_TYPES = [
  'Income Tax',
  'Freelancer',
  'GmbH',
  'UG',
  'Payroll',
  'Bookkeeping',
];
