import EditTodo from "./EditTodo";
import OneTodo from "./OneTodo";

export default function TodoList({ todolist, deleteTodo, updateTodo }) {
  return todolist.length ? (
    <ul>
      {todolist.map((todo, index) =>
        todo.edit ? (
          <EditTodo key={index} todo={todo} updateTodo={updateTodo} />
        ) : (
          <OneTodo
            key={index}
            todo={todo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        )
      )}
    </ul>
  ) : (
    <p>Aucune todo pour le moment</p>
  );
}
