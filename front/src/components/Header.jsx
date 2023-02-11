import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Header = (props) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = async () => {
    const response = await fetch("http://localhost:4000/logut", {
      method: "POST",
      credentials: "include",
    }).then((data) => {
      console.log(data);
      setUser(null);
      navigate("/login");
    });
  };
  return (
    <header className="header">
      <div className="header__container container">
        <Link to="/" className="haeder__logo">
          BLOG
        </Link>
        <nav className="header__nav">
          {user ? (
            <>
              <Link to="/create">Create new post</Link>
              <button onClick={logout}>Logut</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/registration">Registration</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
