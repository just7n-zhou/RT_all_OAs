interface NavbarProps {
  user: { name: string };
  onLogout: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
             {/* Simple Icon placeholder */}
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-xl font-black text-gray-800 tracking-tight">Task Master</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Current User</p>
            <p className="text-sm font-bold text-gray-700">{user.name}</p>
          </div>
          
          <button 
            onClick={onLogout}
            className="text-sm font-bold text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl transition border border-transparent hover:border-red-100"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}