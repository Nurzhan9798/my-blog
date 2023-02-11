import React from "react";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

const Post = ({ _id, title, cover, summary, createdAt, author }) => {
  return (
    <div className="post">
      <img src={"http://localhost:4000/" + cover} className="post__img" />
      <div className="post__body">
        <h2 className="post__title">
          <Link to={`/post/${_id}`}>{title}</Link>
        </h2>
        <div className="post__info">
          <p className="post__author">{author && author.username}</p>
          <p className="post__date">{formatISO9075(new Date(createdAt))}</p>
        </div>
        <p className="post__summary">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
