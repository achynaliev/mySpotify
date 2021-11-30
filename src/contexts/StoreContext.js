import React, { useReducer } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  where,
  query,
} from "firebase/firestore";
import { calcSubPrice, calcTotalPrice } from "../helpers/calcPrice";
import { fireDB } from "../base";

export const storeContext = React.createContext();
const INIT_STATE = {
  merch: [],
  merchCountInCart: JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart")).merch.length
    : 0,
  cart: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_ALL_MERCH":
      return { ...state, merch: action.payload };
    case "EDIT_SPECIFIC_MERCH":
      return { ...state, merch: action.payload };
    case "ADD_AND_DELETE_MERCH_IN_CART":
      return { ...state, merchCountInCart: action.payload };
    case "GET_CART":
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};

const StoreContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const createMerch = async (merch) => {
    console.log(merch);
    try {
      let result = await addDoc(collection(fireDB, "products"), merch);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllMerch = async () => {
    try {
      const musicDocumentRef = collection(fireDB, "products");
      const musicCollection = await getDocs(musicDocumentRef);
      let listOfProducts = musicCollection.docs.map((doc) => {
        return [doc.id, doc.data()];
      });
      let action = {
        type: "GET_ALL_MERCH",
        payload: listOfProducts,
      };
      dispatch(action);
    } catch (e) {
      console.log(e);
    }
  };

  const getItemsByCategory = async (category) => {
    console.log(category);
    try {
      if (category === "all") {
        console.log("here");
        getAllMerch();
      } else {
        const productRef = collection(fireDB, "products");
        const q = query(productRef, where("category", "==", category));
        const musicCollection = await getDocs(q);
        let listOfProducts = musicCollection.docs.map((doc) => {
          return [doc.id, doc.data()];
        });
        let action = {
          type: "GET_ALL_MERCH",
          payload: listOfProducts,
        };
        dispatch(action);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const editSpecificMerch = async (id, merch, category) => {
    try {
      const musicDocumentRef = doc(fireDB, "products", id);
      await updateDoc(musicDocumentRef, merch);
      //getItemsByCategory(category);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteMerch = async (id, category) => {
    try {
      const musicDocumentRef = doc(fireDB, "products", id);
      await deleteDoc(musicDocumentRef);
    } catch (e) {
      console.log(e);
    }
  };

  const addAndDeleteMerchInCart = (merch) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        merch: [],
        totalPrice: 0,
      };
    }
    let product = {
      merch,
      count: 1,
      subPrice: 0,
    };
    product.subPrice = calcSubPrice(product);
    let checkArr = cart.merch.filter((item) => {
      return item.merch.id === merch.id;
    });
    if (checkArr.length === 0) {
      cart.merch.push(product);
    } else {
      cart.merch = cart.merch.filter((item) => {
        return item.merch.id !== merch.id;
      });
    }

    cart.totalPrice = calcTotalPrice(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    let action = {
      type: "ADD_AND_DELETE_MERCH_IN_CART",
      payload: cart.merch.length,
    };
    dispatch(action);
  };

  const addAndDontDeleteMerchInCart = (merch) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        merch: [],
        totalPrice: 0,
      };
    }
    let product = {
      merch,
      count: 1,
      subPrice: 0,
    };
    product.subPrice = calcSubPrice(product);
    let checkArr = cart.merch.filter((item) => {
      return item.merch.id === merch.id;
    });
    if (checkArr.length === 0) {
      cart.merch.push(product);
    }

    cart.totalPrice = calcTotalPrice(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    let action = {
      type: "ADD_AND_DELETE_MERCH_IN_CART",
      payload: cart.merch.length,
    };
    dispatch(action);
  };

  const deleteMerchInCart = (merch) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        merch: [],
        totalPrice: 0,
      };
    }
    let product = {
      merch,
      count: 1,
      subPrice: 0,
    };
    product.subPrice = calcSubPrice(product);
    let checkArr = cart.merch.filter((item) => {
      return item.merch.id === merch.id;
    });
    if (checkArr.length !== 0) {
      cart.merch = cart.merch.filter((item) => {
        return item.merch.id !== merch.id;
      });
    }

    cart.totalPrice = calcTotalPrice(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    let action = {
      type: "ADD_AND_DELETE_MERCH_IN_CART",
      payload: cart.merch.length,
    };
    dispatch(action);
  };

  const checkMerchInCart = (id) => {
    // console.log(id);
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      let checkArr = cart.merch.filter((item) => item.merch.id === id);
      // console.log(checkArr.length === 0);
      if (checkArr.length === 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };
  const getCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        merch: [],
        totalPrice: 0,
      };
    }
    let action = {
      type: "GET_CART",
      payload: cart,
    };
    dispatch(action);
  };

  const changeCountMerch = (count, id) => {
    if (count < 1) {
      return;
    }
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.merch = cart.merch.map((item) => {
      if (item.merch.id === id) {
        item.count = count;
        item.subPrice = calcSubPrice(item);
      }
      return item;
    });
    cart.totalPrice = calcTotalPrice(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    getCart();
  };

  return (
    <storeContext.Provider
      value={{
        createMerch,
        getAllMerch,
        editSpecificMerch,
        deleteMerch,
        addAndDeleteMerchInCart,
        checkMerchInCart,
        getCart: getCart,
        changeCountMerch,
        getItemsByCategory,
        deleteMerchInCart,
        addAndDontDeleteMerchInCart,
        merchCountInCart: state.merchCountInCart,
        merch: state.merch,
        cart: state.cart,
      }}
    >
      {props.children}
    </storeContext.Provider>
  );
};

export default StoreContextProvider;
