"use client";
import './globals.css';
import React, { useState } from 'react'

const initialTasks = [
  { id: 1, title: 'Buy groceries', completed: false },
  { id: 2, title: 'Read a book', completed: true },
  { id: 3, title: 'Go for Run', completed: false },
  { id: 4, title: 'Clean the House', completed: true }
];

/**
 * The Home component represents a task manager application interface.
 * It allows users to add, toggle, and delete tasks.
 *
 * State:
 * - tasks: an array of task objects, each with an id, title, and completed status.
 * - newTask: a string representing the title of the new task to be added.
 *
 * Functions:
 * - addTask: adds a new task to the tasks array if the input is not empty.
 * - toggleComplete: toggles the completed status of a task based on its id.
 * - deleteTask: removes a task from the tasks array based on its id.
 *
 * The component renders a list of tasks with options to add new tasks
 * and toggle or delete existing tasks. The tasks are displayed in a styled
 * container with input and button elements for user interaction.
 */

export default function Home() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (!newTask.trim()) return;
    const newTaskObj = {
      id: Date.now(),
      title: newTask,
      completed: false
    };
    setTasks((prevTasks) => [newTaskObj, ...prevTasks]);
    setNewTask('');
  };

  const toggleComplete = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">📝 Task Manager</h1>

        <div className="flex mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 border p-2 rounded-l outline-none"
            placeholder="Add a new task..."
          />
          <button
            onClick={addTask}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r"
          >
            + Add Task
          </button>
        </div>

        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center p-2 border rounded"
            >
              <span
                onClick={() => toggleComplete(task.id)}
                className={`flex-1 cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''
                  }`}
              >
                {task.title}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700 font-bold ml-2"
              >
                ✕ delete Task
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}