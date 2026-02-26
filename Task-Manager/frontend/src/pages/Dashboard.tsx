import { useState, useEffect, useMemo } from 'react';
import { taskService } from '../services/taskServices';

export default function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  
  // Form State
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('Medium');

  // Load tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      alert("Error loading tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newTask = await taskService.createTask({ title, description: desc, priority });
      setTasks([...tasks, newTask]);
      setTitle(''); setDesc(''); // Reset form
    } catch (err) {
      alert("Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      alert("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  // Client-side search logic
  const filteredTasks = useMemo(() => {
    return tasks.filter(t => 
      t.title.toLowerCase().includes(search.toLowerCase()) || 
      t.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, tasks]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* 1.5s Lag Overlay */}
      {loading && (
        <div className="fixed top-20 right-6 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-xl animate-bounce z-50">
          Syncing...
        </div>
      )}

      {/* Create Task Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <h2 className="text-xl font-bold mb-4">Create New Task</h2>
        <form onSubmit={handleAddTask} className="space-y-3">
          <input 
            required
            className="w-full p-2 border rounded-lg" 
            placeholder="Task title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea 
            className="w-full p-2 border rounded-lg" 
            placeholder="Description (optional)" 
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <div className="flex gap-4 items-center">
            <select 
              className="p-2 border rounded-lg"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <button disabled={loading} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition disabled:opacity-50">
              Add Task
            </button>
          </div>
        </form>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input 
          type="text"
          placeholder="Search tasks..." 
          className="w-full p-3 pl-10 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.map(task => (
          <div key={task.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center group transition hover:border-indigo-200">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-800">{task.title}</h3>
                <span className={`text-[10px] px-2 py-0.5 rounded font-black uppercase ${
                  task.priority === 'High' ? 'bg-red-100 text-red-600' : 
                  task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                }`}>
                  {task.priority}
                </span>
              </div>
              <p className="text-sm text-gray-500">{task.description}</p>
            </div>
            <button 
              onClick={() => handleDelete(task.id)}
              className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition"
            >
              Delete
            </button>
          </div>
        ))}
        {filteredTasks.length === 0 && !loading && (
          <p className="text-center text-gray-400 py-10">No tasks found.</p>
        )}
      </div>
    </div>
  );
}