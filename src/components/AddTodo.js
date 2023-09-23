import { useState } from "react";

export default function AddTodo({ addTodo, user }) {
  const [contentInput, setContentInput] = useState("");

  function handleChange(e) {
    const value = e.target.value;
    console.log(value);
    setContentInput(value);
  }

  async function handleClick() {
    if (contentInput.length) {
      try {
        const response = await fetch(
          "https://back-deploy-b9bscoku7-olivier-webdev.vercel.app/addTodo",
          {
            method: "POST",
            body: JSON.stringify({
              content: contentInput,
              edit: false,
              done: false,
              idUser: user.idUser,
            }),
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        if (response.ok) {
          const todo = await response.json();
          console.log("todo", todo);
          addTodo(todo);
        }
      } catch (error) {
        console.error(error);
      }

      setContentInput("");
    }
  }

  const handleKeyDown = (e) => {
    if (e.code === "Enter" && contentInput.length) {
      addTodo(contentInput);
      setContentInput("");
    }
  };

  // rendu du composant (un input et un bouton de validation)
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
      <button onClick={handleClick} className="btn btn-primary">
        Add
      </button>
    </div>
  );
}
