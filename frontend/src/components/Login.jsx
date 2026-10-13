import React from 'react';
import { SignIn } from '@clerk/clerk-react';

export default function Login() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="animate-fade-in" style={{ textAlign: 'center' }}>
                <h1 className="title gradient-text" style={{ marginBottom: '2rem' }}>Node + Clerk + React</h1>
                <SignIn routing="hash" />
            </div>
        </div>
    );
}
