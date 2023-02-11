import React, { useContext, useState } from "react";
import { useInput } from "../hooks/useInput";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const LoginPage = (props) => {
  const username = useInput("");
  const password = useInput("");
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      response.json().then((data) => {
        console.log(data);
        setUser(data);
        navigate("/");
      });
    } else {
      setError(true);
    }
  };

  return (
    <div className="login">
      <div className="login__container container">
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form__input"
            placeholder="username"
            {...username}
          />
          <input
            type="password"
            className="form__input"
            placeholder="password"
            {...password}
          />
          {error && <label style={{ color: "red" }}>Try again!</label>}
          <button className="form__button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
