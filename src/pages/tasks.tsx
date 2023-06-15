import React, { ChangeEvent, useRef, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useTaskManager } from "@/store/useTaskManager";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const createTaskRef = useRef<HTMLInputElement>(null);
  const [searchTask, setSearchTask] = useState("");
  // const {
  //   tasks,
  //   searchTask,
  //   addTask,
  //   updateTask,
  //   deleteTask,
  // } = useTaskManager();

  const handleAddTask = () => {
    const title = createTaskRef.current?.value || ""; // Replace with the value in the createTaskRef
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    // addTask(newTask);
    setTasks((prevTasks: any) => [...prevTasks, newTask]);
  };

  const handleUpdateTask = (taskId: number, updatedTask: Task) => {
    setTasks((prevTasks: any[]) =>
      prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
    );
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks((prevTasks: any[]) =>
      prevTasks.filter((task) => task.id !== taskId)
    );
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTask(e.target.value);
  };

  // See! I already give you everything!
  const filteredTasks =
    tasks &&
    tasks.filter((task: { title: string }) =>
      task.title.toLowerCase().includes(searchTask.toLowerCase())
    );

  return (
    <div>
      <h1>Task Manager</h1>

      <input type="text" /*ref={}*/ />

      <button onClick={handleAddTask}>Add Task</button>

      <input type="text" onChange={handleSearch} placeholder="Search Task" />

      <ul>
        {filteredTasks &&
          filteredTasks.map((task: Task) => (
            <li key={task.id}>
              <input
                type="text"
                value={task.title}
                onChange={(e) =>
                  handleUpdateTask(task.id, {
                    ...task,
                    title: e.target.value,
                  })
                }
              />
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TaskManager;
