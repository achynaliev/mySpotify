import React from "react";
import { commentsContext } from "../../contexts/CommentContext";

const CommentInput = () => {
  const {} = React.useContext(commentsContext);

  const handleComment = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <input type="text"></input>
      <button onClick={(e) => handleComment(e)}>Leave a comment</button>
    </div>
  );
};

export default CommentInput;
