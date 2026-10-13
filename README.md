# Full Stack To-Do Application

A full-stack task management application with user authentication, PostgreSQL persistence, and a modern responsive dashboard.

## 🚀 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS / Modern CSS, Clerk Authentication
- **Backend**: Node.js, Express.js, Clerk SDK
- **Database**: Supabase (PostgreSQL with Row Level Security)

## 📁 Project Structure

```text
To-Do full stack/
├── Backend/          # Express API server with Supabase & Clerk auth
│   ├── src/
│   │   ├── config/   # Supabase client setup
│   │   ├── middleware/ # Clerk authentication middleware
│   │   └── routes/   # Todo API routes
│   ├── supabase/     # Database migration scripts
│   ├── .env.example  # Backend environment template
│   └── package.json
└── frontend/         # React + Vite client application
    ├── src/
    │   ├── components/ # Login & Todo Dashboard components
    │   ├── services/   # API client service
    │   └── App.jsx
    ├── .env.example  # Frontend environment template
    └── package.json
```

## 🛠️ Getting Started

### 1. Backend Setup

```bash
cd Backend
npm install
cp .env.example .env
# Fill in your Clerk and Supabase credentials in .env
npm start
```

### 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Fill in your Clerk publishable key and API URL in .env
npm run dev
```

## 🔐 Environment Variables

### Backend (`Backend/.env`)
- `CLERK_PUBLISHABLE_KEY`: Clerk publishable key
- `CLERK_SECRET_KEY`: Clerk secret key
- `SUPABASE_URL`: Supabase project URL
- `SUPABASE_ANON_KEY`: Supabase anon public key
- `DATABASE_URL`: PostgreSQL connection string
- `PORT`: Port number (default `3000`)

### Frontend (`frontend/.env`)
- `VITE_CLERK_PUBLISHABLE_KEY`: Clerk publishable key
- `VITE_API_URL`: Backend API endpoint (e.g. `http://localhost:3000/api`)
