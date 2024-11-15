import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti'; 
import { useWindowSize } from 'react-use'; 
import TaskList from './TaskList';
import TaskInput from './TaskInput';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [sortBy, setSortBy] = useState('date');
  const [showConfetti, setShowConfetti] = useState(false); 
  const { width, height } = useWindowSize(); 

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };


  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };


  const toggleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  
  const sortTasks = (tasks) => {
    switch (sortBy) {
      case 'priority':
        return [...tasks].sort((a, b) => b.priority - a.priority);
      case 'date':
        return [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      case 'completed':
        return [...tasks].sort((a, b) => a.completed - b.completed);
      default:
        return tasks;
    }
  };

  const sortedTasks = sortTasks(tasks);

  useEffect(() => {
    if (tasks.some((task) => task.completed)) {
      setShowConfetti(true); 
      setTimeout(() => {
        setShowConfetti(false);
      }, 4000); 
    }
  }, [tasks]);

  return (
    <div className="bg-gradient-to-r from-indigo-100 via-pink-100 to-yellow-100 min-h-screen flex flex-col items-center py-8">
      {/* Confetti effect */}
      {showConfetti && <Confetti width={width} height={height} />}

      <h1 className="text-4xl font-bold text-indigo-700 mb-8">Task Manager</h1>
      <TaskInput addTask={addTask} />
      
      
      <div className="mb-4 flex justify-center space-x-6">
        <button
          className={`px-6 py-2 text-white bg-indigo-500 rounded-lg shadow-lg transition-all duration-300 transform hover:bg-indigo-600 ${sortBy === 'date' ? 'bg-indigo-600' : ''}`}
          onClick={() => setSortBy('date')}
        >
          Sort by Date
        </button>
        <button
          className={`px-6 py-2 text-white bg-pink-500 rounded-lg shadow-lg transition-all duration-300 transform hover:bg-pink-600 ${sortBy === 'priority' ? 'bg-pink-600' : ''}`}
          onClick={() => setSortBy('priority')}
        >
          Sort by Priority
        </button>
        <button
          className={`px-6 py-2 text-white bg-yellow-500 rounded-lg shadow-lg transition-all duration-300 transform hover:bg-yellow-600 ${sortBy === 'completed' ? 'bg-yellow-600' : ''}`}
          onClick={() => setSortBy('completed')}
        >
          Sort by Completion
        </button>
      </div>

      
      <div className="space-y-4 w-full max-w-2xl">
        {sortedTasks.map((task) => (
          <TaskList
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
