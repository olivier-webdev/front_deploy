import styles from "./Register.module.scss";
import { useState } from "react";

export default function Login({ toggleRegister, getIdUser }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [feedback, setFeedback] = useState("");
  const [feedbackGood, setFeedbackGood] = useState("");

  function handleInputEmail(e) {
    const value = e.target.value;
    setUser({
      ...user,
      email: value,
    });
  }

  function handleInputPassword(e) {
    const value = e.target.value;
    setUser({
      ...user,
      password: value,
    });
  }

  async function handleClick(e) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setFeedback("");
    e.preventDefault();
    console.log(user);
    if (!user.email.length || !user.password.length) {
      setFeedback("Tous les champs doivent être remplis");
    } else if (!emailRegex.test(user.email)) {
      setFeedback("Email non valide");
    } else {
      try {
        const response = await fetch(
          "https://back-deploy-b9bscoku7-olivier-webdev.vercel.app/login",
          {
            method: "POST",
            body: JSON.stringify(user),
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.ok) {
          const userBack = await response.json();
          console.log(userBack);
          if (userBack.message) {
            setFeedback("Email et/ou mot de passe incorrects");
          } else {
            setFeedbackGood("Connexion réussie ! Vous allez être rediriger");
            getIdUser(userBack);
            setTimeout(() => {
              toggleRegister();
            }, 3000);
            setUser({
              email: "",
              password: "",
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div
      className={`d-flex flex-column justify-content-center align-items-center mb20 ${styles.appContainer}`}
    >
      <form className="d-flex flex-column card p20 mb20">
        <input
          type="email"
          value={user.email}
          placeholder="Email"
          id="email"
          onInput={handleInputEmail}
        />
        <input
          type="password"
          value={user.password}
          placeholder="Mot de passe"
          id="password"
          onInput={handleInputPassword}
        />
        {feedback && <p className={`${styles.feedback} mb20`}>{feedback}</p>}
        {feedbackGood && (
          <p className={`${styles.feedbackGood} mb20`}>{feedbackGood}</p>
        )}
        <div>
          <button onClick={handleClick} className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
