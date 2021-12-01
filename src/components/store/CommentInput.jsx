import React from "react";
import { commentsContext } from "../../contexts/CommentContext";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import "./comments.css";

const CommentInput = () => {
  const { createAComment } = React.useContext(commentsContext);
  const [comment, setComment] = React.useState("");
  const params = useParams();

  const handleComment = (e) => {
    e.preventDefault();
    if (comment.length > 0) {
      createAComment(comment, params.id);
      setComment("");
    }
  };

  return (
    <div className="CommentInputCont">
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        type="text"
        placeholder="Leave a comment"
      ></input>
      <Button onClick={(e) => handleComment(e)}>Leave a comment</Button>
    </div>
  );
};

export default CommentInput;
