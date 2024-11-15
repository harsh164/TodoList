import React, { useState } from 'react';

const TaskInput = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState(1); 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) return;
    
    const taskDueDate = dueDate || new Date().toISOString();

    const newTask = {
      id: Date.now(),
      title,
      dueDate: taskDueDate,
      priority,
      completed: false,
    };

    addTask(newTask);
    setTitle('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex flex-col items-center">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
        className="mb-3 px-4 py-2 rounded-lg w-80 border border-gray-300"
      />
      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="mb-3 px-4 py-2 rounded-lg w-80 border border-gray-300"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(Number(e.target.value))}
        className="mb-3 px-4 py-2 rounded-lg w-80 border border-gray-300"
      >
        <option value={1}>Low</option>
        <option value={2}>Medium</option>
        <option value={3}>High</option>
      </select>
      <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg">
        Add Task
      </button>
    </form>
  );
};

export default TaskInput;
