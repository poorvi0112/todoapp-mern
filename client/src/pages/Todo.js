import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken, removeToken } from "../utils/auth";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import { useNavigate } from "react-router-dom";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setTasks(res.data);
    } catch (err) {
      alert("Unauthorized or expired session");
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    const res = await axios.post("http://localhost:5000/api/tasks", task, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    setTasks([...tasks, res.data]);
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    setTasks(tasks.filter((t) => t._id !== id));
  };

  const toggleTask = async (task) => {
    const updated = await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
      completed: !task.completed
    }, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    setTasks(tasks.map((t) => (t._id === updated.data._id ? updated.data : t)));
  };

  const logout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <div>
      <h2>My Tasks</h2>
      <button onClick={logout}>Logout</button>
      <TodoForm onAdd={addTask} />
      {tasks.map((task) => (
        <TodoItem key={task._id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
      ))}
    </div>
  );
}
