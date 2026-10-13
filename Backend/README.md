# Todo API

A RESTful API for managing todos with Clerk authentication and Supabase PostgreSQL.

## Features

- CRUD operations for todos
- Clerk authentication middleware
- Supabase PostgreSQL database
- Row Level Security (RLS) policies
- Comprehensive error handling

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
PORT=3000
```

3. Start the server:
```bash
npm start
```

## API Endpoints

All endpoints require Clerk authentication. Include the Clerk session token in the Authorization header:
```
Authorization: Bearer <clerk_session_token>
```

### Get All Todos
```
GET /api/todos
```
Returns all todos for the authenticated user.

### Get Single Todo
```
GET /api/todos/:id
```
Returns a specific todo by ID.

### Create Todo
```
POST /api/todos
Content-Type: application/json

{
  "title": "My todo",
  "description": "Optional description",
  "completed": false
}
```

### Update Todo
```
PUT /api/todos/:id
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}
```

### Delete Todo
```
DELETE /api/todos/:id
```

## Database Schema

The `todos` table includes:
- `id` (uuid) - Primary key
- `user_id` (text) - Clerk user ID
- `title` (text) - Todo title
- `description` (text) - Optional description
- `completed` (boolean) - Completion status
- `created_at` (timestamptz) - Creation timestamp
- `updated_at` (timestamptz) - Last update timestamp

## Security

- Row Level Security (RLS) is enabled on the todos table
- Users can only access their own todos
- All operations are authenticated via Clerk
- Comprehensive error handling prevents information leakage
