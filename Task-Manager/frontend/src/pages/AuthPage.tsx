import { useState } from 'react';
import { authService } from '../services/authService';

interface AuthPageProps {
  onLoginSuccess: (user: { name: string }) => void;
}

export default function AuthPage({ onLoginSuccess }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const data = await authService.signin({ 
          email: formData.email, 
          password: formData.password 
        });
        onLoginSuccess({ name: data.name });
      } else {
        await authService.signup(formData);
        alert('Account created! Please sign in.');
        setIsLogin(true); // Switch to login mode after signup
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h1 className="text-3xl font-black text-indigo-600 mb-2">Task Master</h1>
        <p className="text-gray-500 mb-8">
          {isLogin ? 'Sign In to your account' : 'Create a new account'}
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-bold mb-1">Name</label>
              <input
                required
                className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="Your name"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-bold mb-1">Email</label>
            <input
              required
              type="email"
              className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="you@example.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Password</label>
            <input
              required
              type="password"
              className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Min 6 characters"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-6 text-sm text-gray-500 hover:text-indigo-600 transition"
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
        </button>
      </div>
    </div>
  );
}