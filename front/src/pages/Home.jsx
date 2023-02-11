import React, { useContext, useEffect } from "react";
import Post from "../components/Post";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Home = (props) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, []);

  return (
    <div className="home">
      <div className="home__container container">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default Home;
