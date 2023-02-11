import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";

const ViewPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  console.log(postId);

  useEffect(() => {
    if (!postId) navigate("/");
    fetch(`http://localhost:4000/posts/${postId}`, { method: "GET" }).then(
      (resp) => {
        resp.json().then((post) => setPost(post));
      }
    );
  }, []);

  return (
    <div className="view-post">
      <div className="view-post__container container">
        {post ? (
          <>
            <img
              src={"http://localhost:4000/" + post.cover}
              alt=""
              className="post-image"
            />
            <h1 className="post__title">{post.title}</h1>
            <p className="post__author">
              {post.author && post.author.username} :{" "}
              {post.createdAt && formatISO9075(new Date(post.createdAt))}
            </p>
            <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
          </>
        ) : (
          <>
            <p>No content</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewPost;
