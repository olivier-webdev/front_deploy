import styles from "./Header.module.scss";
import logo from "../../assets/images/logo.png";

export default function Header({
  toggleUnRegister,
  hideRegisterForm,
  seeRegisterForm,
  logged,
  user,
  hideRegisterForm2,
  showProfile,
}) {
  return (
    <header className={`d-flex align-items-center ${styles.header}`}>
      <i className="fas fa-bars mr10"></i>
      <div className="flex-fill">
        {user ? (
          <img src={logo} alt="logo du blog" onClick={hideRegisterForm} />
        ) : (
          <img src={logo} alt="logo du blog" />
        )}
      </div>
      <ul>
        {!logged ? (
          <>
            <button
              onClick={seeRegisterForm}
              className={`mr10 btn btn-primary`}
            >
              <span>Register</span>
            </button>
            <button
              onClick={hideRegisterForm2}
              className={`mr10 btn btn-primary-reverse`}
            >
              <span>Login</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={toggleUnRegister}
              className={`mr10 btn btn-primary`}
            >
              <span>Logout</span>
            </button>
            <button
              className={`mr10 btn btn-primary-reverse`}
              onClick={showProfile}
            >
              <span>Profile</span>
            </button>
          </>
        )}
      </ul>
    </header>
  );
}
