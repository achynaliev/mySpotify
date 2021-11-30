import React, { useContext, useEffect, useState } from "react";
import "./store.css";
import MerchCard from "./MerchCard";
import { storeContext } from "../../contexts/StoreContext";
import { useNavigate, useParams } from "react-router-dom";

const MerchCardList = ({ setPageCount, currentPage }) => {
  const { getItemsByCategory, merch } = useContext(storeContext);
  const params = useParams();
  useEffect(() => {
    getItemsByCategory(params.category);
  }, []);

  let page;
  if (merch) {
    let pCount = Math.ceil(merch.length / 3);
    setPageCount(pCount);
    let start;
    if (currentPage === 1) {
      start = currentPage * 3 - 3;
    } else {
      start = currentPage * 3 - 4;
    }
    let end;
    if (currentPage === 1) {
      end = currentPage * 3;
    } else {
      end = currentPage * 3 - 1;
    }
    page = merch.filter((item, index) => {
      if (index >= start && index < end) {
        return [item];
      }
    });
  } else {
    page = <div></div>;
  }
  return (
    <div className="merchCardList">
      {page.map((item) => (
        <MerchCard key={item[0]} item={item} />
      ))}
    </div>
  );
};

export default MerchCardList;
