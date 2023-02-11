import { useInput } from "../hooks/useInput";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Post from "../components/Post";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const CreatePost = () => {
  const title = useInput("");
  const summary = useInput("");
  const [files, setFiles] = useState();
  const [content, setContent] = useState("");

  const createPost = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title.value);
    data.set("summary", summary.value);
    data.set("cover", files[0]);
    data.set("content", content);
    console.log(data);
    fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
  };

  return (
    <div className="create-post">
      <div className="create-post__container container">
        <form onSubmit={createPost}>
          <div>
            <label htmlFor="title">Title:</label>
            <input type="text" name="title" {...title} />
          </div>
          <div>
            <label htmlFor="summary">Summary:</label>
            <input type="text" name="summary" {...summary} />
          </div>
          <div>
            <label htmlFor="cover">Cover image:</label>
            <input
              type="file"
              name="cover"
              accept="image/png, image/gif, image/jpeg"
              onChange={(e) => setFiles(e.target.files)}
            />
          </div>

          <div>
            <label htmlFor="">Content:</label>
            <ReactQuill
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
