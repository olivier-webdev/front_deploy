import { useState } from "react";

export default function EditTodo({ todo, updateTodo }) {
  const [contentInput, setContentInput] = useState(todo.content);

  async function modifyTodo(newTodo) {
    try {
      const response = await fetch(
        "https://back-deploy-b9bscoku7-olivier-webdev.vercel.app/updateTodo",
        {
          method: "PATCH",
          body: JSON.stringify(newTodo),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        const backTodo = await response.json();
        updateTodo(backTodo);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(e) {
    const value = e.target.value;
    setContentInput(value);
  }

  const handleClick = () => {
    if (contentInput.length) {
      modifyTodo({ ...todo, content: contentInput, edit: false });
    }
  };

  const handleKeyDown = (e) => {
    if (e.code === "Enter" && contentInput.length) {
      modifyTodo({ ...todo, content: contentInput, edit: false });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <input
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={contentInput}
        className="mr20 flex-fill"
        placeholder="Ajouter une todo"
      />
      <button
        onClick={() => modifyTodo({ ...todo, edit: false })}
        className="btn btn-primary mr10"
      >
        Annuler
      </button>
      <button onClick={handleClick} className="btn btn-primary">
        Sauvegarder
      </button>
    </div>
  );
}
