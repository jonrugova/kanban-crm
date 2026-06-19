import { Client } from './types';

const SAMPLE_CLIENTS: Client[] = [
  {
    id: '1', name: 'Anna Schmidt', email: 'anna.schmidt@gmail.com', phone: '+49 30 1234567',
    mandateType: 'GmbH', assignedTo: 'Sabine Müller', dateAdded: new Date().toISOString(),
    columnId: 'new-inquiry', notes: 'New GmbH formation, advice needed on corporate income tax.',
    stageInfo: { source: 'Referral' },
  },
  {
    id: '2', name: 'Thomas Weber', email: 't.weber@firma.de', phone: '+49 89 9876543',
    mandateType: 'Income Tax', assignedTo: 'Klaus Hoffmann', dateAdded: new Date().toISOString(),
    columnId: 'new-inquiry', notes: 'Independent consultant with a complex income situation.',
    stageInfo: { source: 'Website' },
  },
  {
    id: '3', name: 'Julia Fischer', email: 'julia.fischer@web.de', phone: '+49 40 5551234',
    mandateType: 'Freelancer', assignedTo: 'Sabine Müller', dateAdded: new Date().toISOString(),
    columnId: 'consultation-scheduled', notes: 'IT freelancer filing first tax return as self-employed.',
    stageInfo: { consultationDate: '25 Jun 2026', consultationTime: '10:00' },
  },
  {
    id: '4', name: 'Max Müller', email: 'max.mueller@outlook.com', phone: '+49 711 3334567',
    mandateType: 'Payroll', assignedTo: 'Klaus Hoffmann', dateAdded: new Date().toISOString(),
    columnId: 'consultation-scheduled', notes: 'Payroll administration for 8 employees.',
    stageInfo: { consultationDate: '27 Jun 2026', consultationTime: '14:30' },
  },
  {
    id: '5', name: 'Laura Becker', email: 'l.becker@studio.de', phone: '+49 69 7778899',
    mandateType: 'Bookkeeping', assignedTo: 'Anna Braun', dateAdded: new Date().toISOString(),
    columnId: 'documents-requested', notes: 'Monthly bookkeeping for a small design studio.',
    stageInfo: { waitingDocs: 4 },
  },
  {
    id: '6', name: 'Stefan Krämer', email: 's.kraemer@kanzlei.de', phone: '+49 30 2223344',
    mandateType: 'UG', assignedTo: 'Klaus Hoffmann', dateAdded: new Date().toISOString(),
    columnId: 'documents-requested', notes: 'UG formation in progress, high advisory requirements.',
    stageInfo: { waitingDocs: 7 },
  },
  {
    id: '7', name: 'Sophie Richter', email: 's.richter@privat.de', phone: '+49 89 4445566',
    mandateType: 'Income Tax', assignedTo: 'Sabine Müller', dateAdded: new Date().toISOString(),
    columnId: 'documents-received', notes: 'Rental income and capital gains to be declared.',
    stageInfo: { receivedDocs: 3, totalDocs: 3 },
  },
  {
    id: '8', name: 'Markus Braun', email: 'm.braun@braun-bau.de', phone: '+49 40 6667788',
    mandateType: 'GmbH', assignedTo: 'Anna Braun', dateAdded: new Date().toISOString(),
    columnId: 'documents-received', notes: 'Construction company, Q3 annual financial statements.',
    stageInfo: { receivedDocs: 5, totalDocs: 6 },
  },
  {
    id: '9', name: 'Emma Wagner', email: 'emma.w@consulting.de', phone: '+49 711 8889900',
    mandateType: 'Freelancer', assignedTo: 'Klaus Hoffmann', dateAdded: new Date().toISOString(),
    columnId: 'engagement-letter-sent', notes: 'Strategy consultant with international clients.',
    stageInfo: { letterSentDate: '16 Jun 2026' },
  },
  {
    id: '10', name: 'Felix Hartmann', email: 'f.hartmann@tech.de', phone: '+49 69 1112233',
    mandateType: 'UG', assignedTo: 'Sabine Müller', dateAdded: new Date().toISOString(),
    columnId: 'engagement-letter-sent', notes: 'Tech startup, first steps with UG accounting.',
    stageInfo: { letterSentDate: '14 Jun 2026' },
  },
  {
    id: '11', name: 'Lena Schulz', email: 'lena.schulz@arztpraxis.de', phone: '+49 30 5556677',
    mandateType: 'Payroll', assignedTo: 'Anna Braun', dateAdded: new Date().toISOString(),
    columnId: 'signed-active', notes: 'Medical practice with 3 employees.',
    stageInfo: { activeSince: '1 Mar 2026' },
  },
  {
    id: '12', name: 'Tobias Neumann', email: 't.neumann@export.de', phone: '+49 89 3334455',
    mandateType: 'GmbH', assignedTo: 'Klaus Hoffmann', dateAdded: new Date().toISOString(),
    columnId: 'signed-active', notes: 'Import/export GmbH, multiple bank accounts.',
    stageInfo: { activeSince: '15 Jan 2026' },
  },
  {
    id: '13', name: 'Claudia Klein', email: 'c.klein@klein-mode.de', phone: '+49 40 9990011',
    mandateType: 'Bookkeeping', assignedTo: 'Sabine Müller', dateAdded: new Date().toISOString(),
    columnId: 'on-hold', notes: 'Online fashion business, high transaction volume.',
    stageInfo: { holdReason: 'Awaiting client response' },
  },
  {
    id: '14', name: 'David Hoffmann', email: 'd.hoffmann@hotel.de', phone: '+49 711 2223344',
    mandateType: 'Income Tax', assignedTo: 'Anna Braun', dateAdded: new Date().toISOString(),
    columnId: 'on-hold', notes: 'Hotel owner with income from multiple sources.',
    stageInfo: { holdReason: 'Incomplete documentation' },
  },
];

const STORAGE_KEY = 'guhr_crm_clients_v2';

export function getClients(): Client[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Failed to parse clients from local storage', error);
  }
  saveClients(SAMPLE_CLIENTS);
  return SAMPLE_CLIENTS;
}

export function saveClients(clients: Client[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
  } catch (error) {
    console.error('Failed to save clients to local storage', error);
  }
}
