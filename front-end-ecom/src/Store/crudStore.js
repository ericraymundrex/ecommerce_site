import { createStore } from "redux";

const initialState = {
    CartItem: [],
    Modal: false
};

const crudReducer = (state = initialState, action) => {
    if (action.type === "CartItem") {
      localStorage.setItem("CartItem",JSON.stringify([...state.CartItem,action.value]))
      return {
        ...state,
        CartItem: [...state.CartItem, action.value],
      };
    }
    if (action.type === "ModalCart") {
      return {
        ...state,
        Modal: action.value,
      };
    }
    if (action.type === "ModalSearch") {
      return {
        ...state,
        Modal: action.value,
      };
    }
    return state;
};  

const curdStore = createStore(crudReducer);

export default curdStore;