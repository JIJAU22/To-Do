/*
  # Create todos table

  1. New Tables
    - `todos`
      - `id` (uuid, primary key) - Unique identifier for each todo
      - `user_id` (text, not null) - Clerk user ID of the todo owner
      - `title` (text, not null) - Title of the todo
      - `description` (text, nullable) - Optional description
      - `completed` (boolean, default false) - Completion status
      - `created_at` (timestamptz) - Timestamp when todo was created
      - `updated_at` (timestamptz) - Timestamp when todo was last updated

  2. Security
    - Enable RLS on `todos` table
    - Add policy for users to read their own todos
    - Add policy for users to insert their own todos
    - Add policy for users to update their own todos
    - Add policy for users to delete their own todos

  3. Indexes
    - Create index on user_id for faster queries
*/

CREATE TABLE IF NOT EXISTS todos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  title text NOT NULL,
  description text,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create index for faster queries by user_id
CREATE INDEX IF NOT EXISTS idx_todos_user_id ON todos(user_id);

-- Enable Row Level Security
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Policy for users to select their own todos
CREATE POLICY "Users can view own todos"
  ON todos
  FOR SELECT
  USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Policy for users to insert their own todos
CREATE POLICY "Users can insert own todos"
  ON todos
  FOR INSERT
  WITH CHECK (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Policy for users to update their own todos
CREATE POLICY "Users can update own todos"
  ON todos
  FOR UPDATE
  USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub')
  WITH CHECK (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Policy for users to delete their own todos
CREATE POLICY "Users can delete own todos"
  ON todos
  FOR DELETE
  USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');