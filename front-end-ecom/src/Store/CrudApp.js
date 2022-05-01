import { createStore } from "redux";

const initialState = {
    CartItem: []
};

const crudReducer = (state = initialState, action) => {
    if (action.type === "CartItem") {
      localStorage.setItem("CartItem",JSON.stringify([...state.CartItem,action.value]))
      return {
        ...state,
        CartItem: [...state.CartItem, action.value],
      };
    }
    return state;
}

const curdStore = createStore(crudReducer);

export default curdStore;