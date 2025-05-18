import React, { useState, useEffect } from 'react';
import { CalendarIcon } from '@heroicons/react/24/outline';

export default function App() {
  // Load initial tasks from localStorage
  const savedTasks = localStorage.getItem('tasks');
  const initialTasks = savedTasks ? JSON.parse(savedTasks) : [];
  
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    try {
      console.log('Saving tasks to localStorage:', tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { 
        id: Date.now(), 
        text: newTask, 
        completed: false,
        dueDate: newTaskDate
      }]);
      setNewTask('');
      setNewTaskDate('');
      setShowAddTask(false);
    }
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
    <div style={{
      padding: '40px',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#f0f0f0'
    }}>
      <h1 style={{
        color: '#333',
        fontSize: '28px',
        marginBottom: '30px',
        textAlign: 'center'
      }}>Todo List</h1>

      <button
        onClick={() => setShowAddTask(true)}
        style={{
          display: 'block',
          margin: '0 auto',
          padding: '12px 24px',
          background: '#4F46E5',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          marginBottom: '20px'
        }}
      >
        Add New Task
      </button>

      {showAddTask && (
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
            placeholder="Enter your task"
          />
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px'
          }}>
            <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="date"
              value={newTaskDate}
              onChange={(e) => setNewTaskDate(e.target.value)}
              style={{
                flex: 1,
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
          </div>
          <button
            onClick={addTask}
            style={{
              padding: '10px 20px',
              background: '#312E81',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Add Task
          </button>
        </div>
      )}

      {tasks.length > 0 && (
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {tasks.map(task => (
            <div key={task.id} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 0',
              borderBottom: '1px solid #eee'
            }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                style={{
                  marginRight: '10px',
                  width: '20px',
                  height: '20px'
                }}
              />
              <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  marginRight: '10px'
                }}>
                  {task.text}
                </span>
                {task.dueDate && (
                  <span style={{
                    color: '#666',
                    fontSize: '14px'
                  }}>
                    • {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#dc2626',
                  cursor: 'pointer',
                  padding: '5px 10px'
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
