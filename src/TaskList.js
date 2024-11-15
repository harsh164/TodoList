import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use'; 

const TaskList = ({ task, deleteTask, toggleComplete }) => {
  const [showConfetti, setShowConfetti] = useState(false); 
  const { width, height } = useWindowSize(); 

  useEffect(() => {
    if (task.completed) {
      setShowConfetti(true); 
      setTimeout(() => {
        setShowConfetti(false); 
      }, 3000);
    }
  }, [task.completed]);

  return (
    <div
      className={`p-4 border rounded-lg shadow-md ${task.completed ? 'bg-green-100' : 'bg-white'}`}
    >
      {showConfetti && (
        <Confetti width={width} height={height} /> 
      )}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">{task.title}</h2>
          <p className="text-sm text-gray-500">{new Date(task.dueDate).toLocaleString()}</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => toggleComplete(task.id)}
            className={`px-4 py-2 rounded-md ${task.completed ? 'bg-gray-400' : 'bg-blue-500'} text-white`}
          >
            {task.completed ? 'Undo' : 'Complete'}
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
