import React from "react";

export default function TodoItem({ task, onToggle, onDelete }) {
  return (
    <div>
      <input type="checkbox" checked={task.completed} onChange={() => onToggle(task)} />
      <strong>{task.title}</strong>: {task.description}
      <button onClick={() => onDelete(task._id)}>Delete</button>
    </div>
  );
}
