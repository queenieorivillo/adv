
'use client';

import { useState } from 'react';

export default function TaskTracker() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Add Task
  const handleAddTask = (e) => {
    e.preventDefault();

    if (taskTitle.trim() === '') {
      setErrorMessage('Task title cannot be empty!');
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskTitle.trim(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskTitle('');
    setErrorMessage('');
  };

  // Complete or Uncomplete Task
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Task Counters
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  // Progress Calculation
  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  // Tailwind Progress Width
  const progressWidth =
    progress === 0 ? 'w-0' :
    progress <= 10 ? 'w-[10%]' :
    progress <= 20 ? 'w-[20%]' :
    progress <= 30 ? 'w-[30%]' :
    progress <= 40 ? 'w-[40%]' :
    progress <= 50 ? 'w-1/2' :
    progress <= 60 ? 'w-[60%]' :
    progress <= 70 ? 'w-[70%]' :
    progress <= 80 ? 'w-[80%]' :
    progress <= 90 ? 'w-[90%]' :
    'w-full';

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-12">

      <div className="mx-auto w-full max-w-3xl">

        {/* Header */}
        <div className="mb-8 text-center">

          <span className="inline-block rounded-full bg-indigo-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-indigo-700">
            ADV101 • Prefinal Laboratory
          </span>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-800">
            Interactive Task Tracker
          </h1>

          <p className="mt-3 text-slate-500">
            Organize your tasks and keep track of your progress.
          </p>

        </div>

        {/* Main Dashboard */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">

          {/* Statistics */}
          <div className="mb-8 grid grid-cols-3 gap-3">

            {/* Total Tasks */}
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4 text-center">

              <div className="mb-2 text-3xl">
                📋
              </div>

              <h2 className="text-3xl font-extrabold text-indigo-600">
                {totalTasks}
              </h2>

              <p className="mt-1 text-xs font-semibold text-slate-500 sm:text-sm">
                Total Tasks
              </p>

            </div>

            {/* Completed Tasks */}
            <div className="rounded-2xl border border-green-100 bg-green-50 p-4 text-center">

              <div className="mb-2 text-3xl">
                ✓
              </div>

              <h2 className="text-3xl font-extrabold text-green-600">
                {completedTasks}
              </h2>

              <p className="mt-1 text-xs font-semibold text-slate-500 sm:text-sm">
                Completed
              </p>

            </div>

            {/* Pending Tasks */}
            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4 text-center">

              <div className="mb-2 text-3xl">
                ⏳
              </div>

              <h2 className="text-3xl font-extrabold text-orange-600">
                {pendingTasks}
              </h2>

              <p className="mt-1 text-xs font-semibold text-slate-500 sm:text-sm">
                Pending
              </p>

            </div>

          </div>

          {/* Progress Bar */}
          <div className="mb-8">

            <div className="mb-2 flex justify-between text-sm">

              <span className="font-semibold text-slate-700">
                Overall Progress
              </span>

              <span className="font-bold text-indigo-600">
                {progress}%
              </span>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-100">

              <div
                className={`h-full rounded-full bg-indigo-600 transition-all duration-500 ${progressWidth}`}
              />

            </div>

          </div>

          {/* Add Task Form */}
          <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">

            <h2 className="mb-4 text-lg font-bold text-slate-800">
              + Add a New Task
            </h2>

            <form onSubmit={handleAddTask}>

              <div className="flex flex-col gap-3 sm:flex-row">

                <input
                  type="text"
                  placeholder="What do you need to do?"
                  value={taskTitle}
                  onChange={(e) => {
                    setTaskTitle(e.target.value);
                    setErrorMessage('');
                  }}
                  className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />

                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white shadow-md transition hover:bg-indigo-700 hover:shadow-lg active:scale-95"
                >
                  + Add Task
                </button>

              </div>

              {/* Error Message */}
              {errorMessage && (
                <p className="mt-3 text-sm font-semibold text-red-500">
                  {errorMessage}
                </p>
              )}

            </form>

          </div>

          {/* My Tasks */}
          <div>

            <div className="mb-5 flex items-center justify-between">

              <div>

                <h2 className="text-xl font-extrabold text-slate-800">
                  My Tasks
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Manage your daily activities
                </p>

              </div>

              <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-bold text-indigo-700">
                {totalTasks} Tasks
              </span>

            </div>

            {/* Conditional Rendering */}
            {tasks.length === 0 ? (

              <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-5 py-12 text-center">

                <div className="mb-4 text-5xl">
                  📝
                </div>

                <h3 className="text-lg font-bold text-slate-700">
                  No tasks yet
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  No tasks added yet. Start by creating one above!
                </p>

              </div>

            ) : (

              <ul className="space-y-3">

                {tasks.map((task) => (

                  <li
                    key={task.id}
                    className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-indigo-300 hover:shadow-md sm:flex-row sm:items-center"
                  >

                    {/* Task Title */}
                    <div className="flex min-w-0 items-center gap-3">

                      <button
                        type="button"
                        onClick={() => toggleTask(task.id)}
                        aria-label="Toggle task completion"
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 font-bold transition ${
                          task.completed
                            ? 'border-green-500 bg-green-500 text-white'
                            : 'border-slate-300 text-transparent hover:border-indigo-500'
                        }`}
                      >
                        ✓
                      </button>

                      <span
                        className={`break-words font-semibold ${
                          task.completed
                            ? 'text-slate-400 line-through'
                            : 'text-slate-700'
                        }`}
                      >
                        {task.title}
                      </span>

                    </div>

                    {/* Task Actions */}
                    <div className="flex items-center gap-3">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          task.completed
                            ? 'bg-green-100 text-green-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {task.completed ? 'Completed' : 'Pending'}
                      </span>

                      <button
                        type="button"
                        onClick={() => deleteTask(task.id)}
                        className="rounded-lg bg-red-50 px-3 py-2 text-sm font-bold text-red-500 transition hover:bg-red-100"
                      >
                        Delete
                      </button>

                    </div>

                  </li>

                ))}

              </ul>

            )}

          </div>

          {/* Footer */}
          <div className="mt-8 border-t border-slate-200 pt-5 text-center">

            <p className="text-xs font-medium text-slate-400">
              Interactive Task Tracker | ADV101
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}
