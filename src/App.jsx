import { useState, useEffect } from 'react';
import './index.css'; // Make sure Tailwind or custom CSS is applied

// Navbar component at the top of the app
const Navbar = ({ toggleDarkMode, darkMode }) => (
  <nav className={`p-4 text-center text-xl font-bold shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-blue-600 text-white'}`}>
    ✅ Todo List with React

    {/* Dark Mode Toggle Switch */}
    <button
      onClick={toggleDarkMode}
      className="ml-4 bg-gray-100 text-black px-2 py-1 rounded text-sm hover:bg-gray-300"
    >
      {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  </nav>
);

function App() {
  /**
   * STATE = React's way to track dynamic values in a component
   * useState is a Hook that allows us to add local state to functional components
   */
  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage only once (on component mount)
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState(''); // For task input field
  const [showCompleted, setShowCompleted] = useState(false); // Toggle completed tasks
  const [editTaskId, setEditTaskId] = useState(null); // Track editing task
  const [editText, setEditText] = useState(''); // Track edited task text

  const [darkMode, setDarkMode] = useState(false); // Toggle dark mode

  // Save tasks to localStorage whenever `tasks` change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Toggle the theme
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Add new task to the list
  const handleAddTask = () => {
    if (!newTask.trim()) return;

    const newItem = {
      id: Date.now(), // Unique ID using current time
      text: newTask.trim(),
      completed: false,
    };

    // Add new task to the list
    setTasks([...tasks, newItem]);
    setNewTask(''); // Clear input
  };

  // Delete a task by ID
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Mark task as complete/incomplete
  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Begin editing a task
  const handleEditTask = (id, currentText) => {
    setEditTaskId(id);
    setEditText(currentText);
  };

  // Save edited task text
  const handleSaveEdit = () => {
    setTasks(tasks.map(task =>
      task.id === editTaskId ? { ...task, text: editText.trim() } : task
    ));
    setEditTaskId(null);
    setEditText('');
  };

  // Filter tasks into two lists: incomplete and complete
  const incomplete = tasks.filter(task => !task.completed);
  const completed = tasks.filter(task => task.completed);

  return (
    <>
      {/* Navbar with dark mode toggle */}
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

      {/* Main container */}
      <div className={`max-w-xl mx-auto mt-10 p-6 rounded shadow-md transition duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <h1 className="text-3xl font-bold text-center mb-4">Todo List</h1>

        {/* Task input and add button */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-grow border p-2 rounded text-black"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* Incomplete tasks */}
        <ul className="space-y-3">
          {incomplete.map(task => (
            <li
              key={task.id}
              className={`flex justify-between items-center border p-3 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
            >
              {/* Show input if in edit mode */}
              {editTaskId === task.id ? (
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border rounded p-1 flex-grow mr-2 text-black"
                />
              ) : (
                <span className="flex-grow">{task.text}</span>
              )}

              <div className="flex gap-2">
                {editTaskId === task.id ? (
                  <button
                    onClick={handleSaveEdit}
                    className="text-green-500 font-semibold"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditTask(task.id, task.text)}
                    className="text-yellow-500"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleToggleComplete(task.id)}
                  className="text-green-500"
                >
                  ✅
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-red-500"
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* No pending tasks message */}
        {incomplete.length === 0 && (
          <p className="text-center text-gray-400 mt-4">No pending tasks.</p>
        )}

        {/* Toggle for showing completed tasks */}
        <div className="mt-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={() => setShowCompleted(!showCompleted)}
            />
            <span>Show Completed Tasks</span>
          </label>
        </div>

        {/* Completed tasks */}
        {showCompleted && (
          <ul className="mt-4 space-y-3">
            {completed.map(task => (
              <li
                key={task.id}
                className={`flex justify-between items-center border p-3 rounded line-through opacity-70 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              >
                <span className="flex-grow">{task.text}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleComplete(task.id)}
                    className="text-blue-500"
                  >
                    Undo
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default App;
