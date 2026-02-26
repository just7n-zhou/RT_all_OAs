const API_URL = import.meta.env.VITE_API_URL;

// Helper to get the token and build headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('tm_token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const taskService = {
  // GET: Fetch user-specific tasks
  async getTasks() {
    const res = await fetch(`${API_URL}/tasks`, {
      headers: getAuthHeaders(),
    });

    if (!res.ok) throw new Error('Failed to load tasks');
    return res.json();
  },

  // POST: Create a new task
  async createTask(taskData: { title: string; description: string; priority: string }) {
    const res = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(taskData),
    });

    if (!res.ok) throw new Error('Failed to create task');
    return res.json();
  },

  // DELETE: Remove a task by ID
  async deleteTask(id: number) {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!res.ok) throw new Error('Failed to delete task');
    return true;
  }
};