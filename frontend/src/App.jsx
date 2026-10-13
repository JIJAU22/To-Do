import React from 'react';
import { SignedIn, SignedOut, useUser, UserButton } from '@clerk/clerk-react';
import Login from './components/Login';
import TodoDashboard from './components/TodoDashboard';

function App() {
  const { user } = useUser();

  return (
    <div>
      <header style={{ padding: '1rem', display: 'flex', justifyContent: 'flex-end', position: 'absolute', top: 0, right: 0, width: '100%' }}>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </header>

      <main className="container">
        <SignedOut>
          <Login />
        </SignedOut>

        <SignedIn>
          <div className="animate-fade-in">
            <h1 className="title gradient-text">Welcome back, {user?.firstName || 'User'}</h1>
            <p className="subtitle">Manage your tasks creatively</p>
            <TodoDashboard />
          </div>
        </SignedIn>
      </main>
    </div>
  );
}

export default App;
