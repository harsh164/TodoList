// src/TaskItem.js
import React from 'react';

function TaskItem({ task, deleteTask, toggleComplete }) {
  if (!task || !('completed' in task) || !('title' in task)) {
    return null;
  }

 
  const emojis = {
    1: '🔰', 
    2: '⚠️',  
    3: '🔥',  
  };

  const priorityColors = {
    1: 'bg-green-100 text-green-800',
    2: 'bg-yellow-100 text-yellow-800',
    3: 'bg-red-100 text-red-800',
  };


  const formattedDueDate = task.dueDate ? new Date(task.dueDate).toLocaleString() : '';

  return (
    <li className="flex items-center justify-between p-4 bg-white rounded shadow-md">
      <div className="flex items-center space-x-2">
        <span
          onClick={() => toggleComplete(task.id)}
          className={`cursor-pointer text-xl ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'} ${priorityColors[task.priority]}`}
        >
          {emojis[task.priority]} {task.title}
        </span>
        <span className="text-sm text-gray-500">{formattedDueDate}</span>
      </div>
      <button
        onClick={() => deleteTask(task.id)}
        className="ml-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 focus:ring-2 focus:ring-red-400"
      >
        ❌
      </button>
    </li>
  );
}

export default TaskItem;
