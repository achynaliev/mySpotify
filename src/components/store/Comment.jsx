import React from "react";
import "./comments.css";

const Comment = ({ comment }) => {
  return (
    <div className="singleComment">
      <h4 className="singleCommentText">{comment[1].comment}</h4>
    </div>
  );
};

export default Comment;
