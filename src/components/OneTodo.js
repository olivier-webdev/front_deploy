export default function OneTodo({ todo, deleteTodo, updateTodo }) {
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
        console.log(backTodo);
        updateTodo(backTodo);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteTodo(deletedTodo) {
    try {
      const response = await fetch(
        "https://back-deploy-b9bscoku7-olivier-webdev.vercel.app/deleteTodo",
        {
          method: "DELETE",
          body: JSON.stringify(deletedTodo),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        deleteTodo(deletedTodo);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <li className="d-flex justify-content-center align-items-center p10 mb10">
      <span className="flex-fill mr10">
        {todo.content}
        {todo.done ? "( ✔️ )" : ""}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          modifyTodo({ ...todo, done: !todo.done });
        }}
        className="btn btn-primary mr10"
      >
        {todo.done ? "Cancel" : "Validate"}
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          modifyTodo({ ...todo, edit: !todo.edit });
        }}
        className="btn btn-primary mr10"
      >
        Update
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteTodo(todo);
        }}
        className="btn btn-reverse-primary"
      >
        Delete
      </button>
    </li>
  );
}
