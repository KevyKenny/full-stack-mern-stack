import { useState } from "react";
import Navbar from "../components/Navbar";
import "./Home.css";

export default function Home() {const [tasks, setTasks] = useState([
    { id: 1, title: 'Finish React homework', due: 'Due tomorrow', completed: false },
    { id: 2, title: 'Study for Calculus midterm', due: 'Due Friday', completed: false },
    { id: 3, title: 'Submit lab report', due: 'Completed Monday', completed: true },
    { id: 4, title: 'Group project outline', due: 'Due next week', completed: false },
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), title: newTask, due: 'Due soon', completed: false }]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

return (
    <div className="home-page">
      <Navbar />
      
      <div className="user-info">
        <span>Jordan Diaz</span>
        <div className="avatar">JD</div>
      </div>

      <div className="home-container">
        <h1>Task Manager</h1>

        <div className="add-task">
          <input 
            type="text" 
            placeholder="e.g. Read chapter 4 of Bio textbook"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <button className="add-btn" onClick={addTask}>Add</button>
        </div>

        <div className="task-list">
          {tasks.map(task => (
            <div className={`task-card ${task.completed ? 'completed' : ''}`} key={task.id}>
              <input 
                type="checkbox" 
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <div className="task-info">
                <h3>{task.title}</h3>
                <p>{task.due}</p>
              </div>
              <div className="task-actions">
                <button className="edit-btn">Edit</button>
                <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}