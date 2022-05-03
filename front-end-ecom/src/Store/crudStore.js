import { createStore } from "redux";

const initialState = {
    CartItem: [],
    ModalCart: false,
    ModalSearch: false,
    SearchTerm: ""
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
        ModalCart: action.value,
      };
    }
    if (action.type === "ModalSearch") {
      return {
        ...state,
        ModalSearch: action.value,
      };
    }
    if (action.type === "SearchTerm") {
      return {
        ...state,
        SearchTerm: action.value,
      };
    }
    return state;
};  

const curdStore = createStore(crudReducer);

export default curdStore;