import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = () => {
    if (!title.trim()) return;

    fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    })
      .then((res) => res.json())
      .then((newTask) => {
        setTasks([...tasks, newTask]);
        setTitle('');
      });
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'DELETE'
    }).then(() => {
      setTasks(tasks.filter((task) => task._id !== id));
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>My Todolist</h1>

      <input
        type="text"
        placeholder="New Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} - {task.status}
            <button onClick={() => deleteTask(task._id)} style={{ marginLeft: '10px' }}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
