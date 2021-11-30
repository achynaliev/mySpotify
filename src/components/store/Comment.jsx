import React from "react";
import "./comments.css";

const Comment = ({ comment }) => {
  return (
    <div className="singleComment">
      <img src={comment.userImgURL} className="followUserImage" alt="" />
      <h4 className="singleCommentText">{comment.comment}</h4>
    </div>
  );
};

export default Comment;
