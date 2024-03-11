import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskCount, setTaskCount] = useState({});

  const addTask = (task) => {
    const matches = task.match(/(.+)(\d+)$/);
  
    if (matches) {
      const taskName = matches[1].trim();
      const taskQuantity = parseInt(matches[2]) || 1;
  
      setTasks((prevTasks) => [...prevTasks, ...Array(taskQuantity).fill(taskName)]);
      setTaskCount((prevCount) => ({
        ...prevCount,
        [taskName]: (prevCount[taskName] || 0) + taskQuantity,
      }));
    }
  };
  

  const deleteTask = (index, taskName) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);

    setTasks(updatedTasks);

    setTaskCount((prevCount) => ({
      ...prevCount,
      [taskName]: (prevCount[taskName] || 0) - 1,
    }));
  };

  return (
    <div className="App">
      <h1>Day Goals!</h1>
      <div>
        <input
          type="text"
          placeholder="Add a task"
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              addTask(e.target.value);
              e.target.value = '';
            }
          }}
        />
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task} (Updated {taskCount[task.split(' ')[0]] || 0} times){' '}
            <span onClick={() => deleteTask(index, task.split(' ')[0])} className="delete-icon">
              &#x2715;
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

