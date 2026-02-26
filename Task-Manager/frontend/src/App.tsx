import { useState, useEffect } from 'react';
import { authService } from './services/authService';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Navbar from './components/NavBar';

function App() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = authService.getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setIsInitializing(false);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  // Prevent flicker while checking localStorage
  if (isInitializing) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {user ? (
        <>
          <Navbar user={user} onLogout={handleLogout} />
          <Dashboard />
        </>
      ) : (
        <AuthPage onLoginSuccess={(userData) => setUser(userData)} />
      )}
    </div>
  );
}

export default App;