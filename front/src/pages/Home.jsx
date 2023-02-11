import React, { useContext, useEffect, useState } from "react";
import Post from "../components/Post";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Home = (props) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!user) navigate("/login");
    fetch("http://localhost:4000/posts", {
      method: "GET",
    }).then((resp) => {
      resp.json().then((data) => {
        setPosts(data);
      });
    });
  }, []);

  return (
    <div className="home">
      <div className="home__container container">
        {posts.length > 0 &&
          posts.map((post) => <Post key={post._id} {...post} />)}
      </div>
    </div>
  );
};

export default Home;
