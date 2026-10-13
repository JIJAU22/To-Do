import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../services/api';
import { Trash2, Plus, Check } from 'lucide-react';

export default function TodoDashboard() {
    const { getToken } = useAuth();
    const [todos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const loadTodos = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await fetchTodos(getToken);
            setTodos(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch todos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTodos();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newTitle.trim()) return;

        try {
            const newTodo = await createTodo(getToken, newTitle, newDescription);
            setTodos([newTodo, ...todos]);
            setNewTitle('');
            setNewDescription('');
        } catch (err) {
            setError(err.message || 'Failed to create todo');
        }
    };

    const handleToggle = async (id, currentStatus) => {
        try {
            // Optimistic update
            setTodos(todos.map(t => t.id === id ? { ...t, completed: !currentStatus } : t));
            await updateTodo(getToken, id, { completed: !currentStatus });
        } catch (err) {
            setError('Failed to update status');
            loadTodos(); // revert if failed
        }
    };

    const handleDelete = async (id) => {
        try {
            setTodos(todos.filter(t => t.id !== id));
            await deleteTodo(getToken, id);
        } catch (err) {
            setError('Failed to delete todo');
            loadTodos(); // revert if failed
        }
    };

    return (
        <div className="glass-panel" style={{ padding: '2rem', marginTop: '2rem' }}>

            {error && (
                <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid var(--color-danger)', borderRadius: '8px', marginBottom: '1.5rem' }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleCreate} className="form-group" style={{ marginBottom: '2rem' }}>
                <input
                    type="text"
                    className="input"
                    placeholder="What needs to be done?"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
                <div className="flex gap-2">
                    <input
                        type="text"
                        className="input"
                        placeholder="Add a description (optional)"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary" disabled={!newTitle.trim()}>
                        <Plus size={18} /> Add
                    </button>
                </div>
            </form>

            {loading ? (
                <div className="text-center" style={{ color: 'var(--color-text-muted)' }}>Loading tasks...</div>
            ) : todos.length === 0 ? (
                <div className="text-center" style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                    No tasks yet. Create one above!
                </div>
            ) : (
                <div className="flex-col gap-2" style={{ gap: '1rem' }}>
                    {todos.map(todo => (
                        <div
                            key={todo.id}
                            className="flex justify-between items-center animate-fade-in"
                            style={{ padding: '1rem', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                        >
                            <div className="flex items-center gap-4 text-left">
                                <label className="checkbox-wrapper">
                                    <input
                                        type="checkbox"
                                        className="checkbox-input"
                                        checked={todo.completed}
                                        onChange={() => handleToggle(todo.id, todo.completed)}
                                    />
                                    <div className="checkbox-custom">
                                        <Check />
                                    </div>
                                </label>
                                <div style={{ opacity: todo.completed ? 0.5 : 1, textDecoration: todo.completed ? 'line-through' : 'none', transition: 'all 0.2s' }}>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{todo.title}</h3>
                                    {todo.description && <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{todo.description}</p>}
                                </div>
                            </div>
                            <button onClick={() => handleDelete(todo.id)} className="btn btn-icon btn-danger" aria-label="Delete todo">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
