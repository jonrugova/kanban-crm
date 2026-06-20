# Kanban CRM – Client Onboarding Prototype

## Overview

This project is a Kanban-style CRM prototype built for Guhr Steuerberatung to streamline the client onboarding process. The goal was to create a clean, intuitive interface that allows staff to track prospective clients from the initial inquiry through becoming active clients while keeping the workflow simple and efficient.

---

## Features

* Drag-and-drop client cards between onboarding stages
* Create new clients directly within any stage
* View, edit, and delete client records
* Stage-specific onboarding details and summaries
* Search clients by name or email
* Client details modal with editable information
* Data persistence using localStorage
* Clean and responsive interface

---

## Tech Stack

* React
* Vite
* TypeScript
* CSS
* dnd-kit
* localStorage

### Why This Stack

I chose React and Vite because they provide a fast development experience and make it easy to build reusable UI components. TypeScript adds maintainability and type safety, which becomes increasingly valuable as the application grows. For this prototype, localStorage was sufficient to simulate persistent client data without introducing unnecessary backend complexity.

---

## Design & Branding

Rather than creating a generic CRM dashboard, I wanted the application to feel like an internal product built specifically for Guhr Steuerberatung.

To achieve this, I took inspiration from the company's website by using:

* A warm gold accent color matching the brand identity
* Dark headers and subtle contrast for a professional appearance
* A clean white interface with generous spacing
* Minimal visual noise to keep attention on client management
* A trustworthy, conservative design rather than a flashy SaaS template

The goal was to create an interface that feels consistent with the company's existing visual identity while remaining practical for daily use.

---

## Development Approach

I approached the assignment incrementally by breaking it into smaller milestones.

My workflow was:

1. Review the assignment requirements and Guhr's website.
2. Design the onboarding workflow and Kanban structure.
3. Implement drag-and-drop functionality.
4. Build client management features (create, edit, delete).
5. Add stage-specific onboarding information.
6. Implement client search.
7. Persist application data using localStorage.
8. Refine the interface to better match Guhr's branding.
9. Test the project from a fresh Git clone to ensure it runs locally.

Throughout development I focused on building a solution that is straightforward, maintainable, and easy for non-technical staff to use.

---

## AI Usage

AI was used as a development assistant throughout the project for brainstorming ideas, debugging, reviewing implementation approaches, and accelerating repetitive coding tasks.

The overall architecture, feature selection, implementation decisions, testing, refinement, and final solution were completed manually.

---

## Running Locally

1. Clone the repository:

```bash
git clone https://github.com/jonrugova/kanban-crm.git
```

2. Navigate to the project folder:

```bash
cd kanban-crm
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the URL displayed in the terminal (typically **http://localhost:5173**) in your web browser.

---

## Future Improvements

With more time, I would add:

* Backend and database integration
* Authentication and user roles
* Document upload and management
* Activity history and audit logs
* Advanced filtering and reporting
* Calendar integration
* Email integration and notifications
* Dashboard analytics and onboarding metrics

---

## Development Time

Approximately **4–5 hours**, including planning, implementation, debugging, testing, UI refinement, and preparing the project for local execution.
