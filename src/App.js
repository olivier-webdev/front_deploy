import styles from "./App.module.scss";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/Todolist";
import { useState, useEffect } from "react";
import Header from "./components/header/Header";
import Register from "./components/forms/Register";
import Login from "./components/forms/Login";
import Profile from "./components/pages/Profile";

function App() {
  const [todolist, setTodolist] = useState([]);
  const [seeForm, setSeeForm] = useState(1);
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState(null);

  console.log(user);

  useEffect(() => {
    async function getTodoList() {
      try {
        const response = await fetch(
          `https://back-deploy-b9bscoku7-olivier-webdev.vercel.app/getTodos?userId=${user.idUser}`
        );
        if (response.ok) {
          const todos = await response.json();
          console.log(todos);
          setTodolist(todos);
        }
      } catch (error) {
        console.log(error);
      }
    }
    user && getTodoList();
  }, [user]);

  const addTodo = (todo) => {
    console.log(todo);
    setTodolist([...todolist, todo]);
  };

  function updateTodo(newTodo) {
    setTodolist(
      todolist.map((todo) => (todo.idTodo === newTodo.idTodo ? newTodo : todo))
    );
  }

  function deleteTodo(deletedTodo) {
    setTodolist(todolist.filter((todo) => todo.idTodo !== deletedTodo.idTodo));
  }

  function seeRegisterForm() {
    setSeeForm(2);
  }

  function hideRegisterForm() {
    setSeeForm(3);
  }

  function hideRegisterForm2() {
    setSeeForm(1);
  }

  function toggleRegister() {
    setSeeForm(3);
    setLogged(true);
  }

  function toggleRegister2() {
    setSeeForm(1);
  }

  function toggleUnRegister() {
    setSeeForm(1);
    setLogged(false);
    setUser(null);
  }

  function getIdUser(userLogged) {
    setUser(userLogged);
  }

  function showProfile() {
    setSeeForm(4);
  }

  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <div className="card p20">
        <Header
          hideRegisterForm={hideRegisterForm}
          seeRegisterForm={seeRegisterForm}
          toggleUnRegister={toggleUnRegister}
          showProfile={showProfile}
          logged={logged}
          user={user}
          hideRegisterForm2={hideRegisterForm2}
        />
        {seeForm === 2 ? (
          <Register toggleRegister2={toggleRegister2} />
        ) : seeForm === 1 ? (
          <Login toggleRegister={toggleRegister} getIdUser={getIdUser} />
        ) : seeForm === 3 ? (
          <>
            <AddTodo addTodo={addTodo} user={user} />
            <TodoList
              todolist={todolist}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            />
          </>
        ) : (
          <Profile user={user} />
        )}
      </div>
    </div>
  );
}

export default App;
