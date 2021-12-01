import React from "react";
import { commentsContext } from "../../contexts/CommentContext";
import { useParams } from "react-router-dom";
import Comment from "./Comment";

const CommentList = () => {
  const { getCommentsForItem, commentsForItem } =
    React.useContext(commentsContext);
  const params = useParams();

  React.useEffect(() => {
    getCommentsForItem(params.id);
  }, []);

  return (
    <div className="commentListMain">
      {commentsForItem.map((comment) => (
        <Comment key={comment[0]} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
