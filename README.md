# Kanban CRM – Client Onboarding Prototype

## Overview

This project is a Kanban-style CRM prototype built for a tax advisory firm's client onboarding process. It provides a simple, intuitive workflow for managing clients from the initial inquiry through becoming an active client.

## Features

- Drag and drop client cards between onboarding stages
- Create new clients directly in any column
- View, edit, and delete client records
- Stage-specific onboarding details
- Search clients by name or email
- Client details modal
- Data persistence using localStorage
- Clean and responsive user interface

## Tech Stack

- React
- Vite
- TypeScript
- CSS
- dnd-kit
- localStorage

## Why This Stack

I chose React and Vite to rapidly build a modern, component-based interface. TypeScript improves maintainability and type safety, while localStorage keeps the application simple without introducing unnecessary backend complexity for this prototype.

## Running Locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Development Approach

I first designed the onboarding workflow and Kanban board structure, then implemented drag-and-drop functionality, client management, local data persistence, search, and stage-specific forms. The focus throughout the project was usability, maintainability, and keeping the implementation aligned with the assignment requirements.

## AI Usage

AI was used to assist with ideation, debugging, and code review. All architectural decisions, implementation, testing, and final refinements were completed manually.

## Future Improvements

- Backend and database integration
- Authentication and user roles
- Full document management
- Activity history and audit logs
- Advanced filtering and reporting
- Calendar and email integrations

## Development Time

Approximately 8–10 hours.
