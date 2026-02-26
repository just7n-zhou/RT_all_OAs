const API_URL = import.meta.env.VITE_API_URL;

export const authService = {
  // Register a new user
  async signup(userData: any) {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Signup failed');
    }
    return res.json();
  },

  // Login existing user
  async signin(credentials: any) {
    const res = await fetch(`${API_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Invalid credentials');
    }

    const data = await res.json();
    
    // Save to localStorage for persistence
    if (data.token) {
      localStorage.setItem('tm_token', data.token);
      localStorage.setItem('tm_user', JSON.stringify({ name: data.name }));
    }
    
    return data;
  },

  // Logout
  logout() {
    localStorage.removeItem('tm_token');
    localStorage.removeItem('tm_user');
  },

  // Check if user is logged in (for App.tsx initialization)
  getCurrentUser() {
    const user = localStorage.getItem('tm_user');
    return user ? JSON.parse(user) : null;
  }
};