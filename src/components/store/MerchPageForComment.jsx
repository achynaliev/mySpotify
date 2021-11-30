import React from "react";
import { storeContext } from "../../contexts/StoreContext";
import { useParams } from "react-router-dom";
import MerchCard from "./MerchCard";
import CommentInput from "./CommentInput";
import "./store.css";

const MerchPageForComment = () => {
  const { getSingleProduct, singleMerch } = React.useContext(storeContext);
  const params = useParams();
  React.useEffect(() => {
    getSingleProduct(params.id);
  }, []);

  return (
    <div className="CommentsPage">
      {singleMerch ? <MerchCard singleMerch={singleMerch} /> : <div></div>}
      <CommentInput />
    </div>
  );
};

export default MerchPageForComment;
