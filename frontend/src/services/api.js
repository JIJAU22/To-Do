const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const getHeaders = async (getToken) => {
  const token = await getToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const fetchTodos = async (getToken) => {
  const headers = await getHeaders(getToken);
  const response = await fetch(`${API_BASE_URL}/todos`, { headers });
  if (!response.ok) throw new Error('Failed to fetch todos');
  return response.json();
};

export const createTodo = async (getToken, title, description) => {
  const headers = await getHeaders(getToken);
  const response = await fetch(`${API_BASE_URL}/todos`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ title, description, completed: false })
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create todo');
  }
  return response.json();
};

export const updateTodo = async (getToken, id, updates) => {
  const headers = await getHeaders(getToken);
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(updates)
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to update todo');
  }
  return response.json();
};

export const deleteTodo = async (getToken, id) => {
  const headers = await getHeaders(getToken);
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'DELETE',
    headers
  });
  if (!response.ok) throw new Error('Failed to delete todo');
  return response.json();
};
