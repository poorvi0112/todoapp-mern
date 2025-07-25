import React, { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [form, setForm] = useState({ title: "", description: "", completed: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ title: "", description: "", completed: false });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <label>
        <input type="checkbox" name="completed" checked={form.completed} onChange={handleChange} /> Completed
      </label>
      <button type="submit">Add</button>
    </form>
  );
}
