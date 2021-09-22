import { createContext, useContext, useReducer, useEffect } from "react";
import { initialState, initializer, cartReducer } from "../reducer/cartReducer";
import { cartActions } from "../actions/cartActions";

const CartContext = createContext(initialState);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, initializer);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const addProductToCart = (item, increment = 1) =>
    dispatch({
      type: cartActions.ADD_ITEM,
      payload: { item, increment: parseInt(increment) },
    });

  const removeItemFromCart = (item) =>
    dispatch({ type: cartActions.REMOVE_ITEM, payload: item });

  const clearCart = () => dispatch({ type: cartActions.CLEAR_CART });

  const decrementItem = (item, decrement = 1) =>
    dispatch({
      type: cartActions.DECREMENT_ITEM,
      payload: { item, decrement: parseInt(decrement) },
    });

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        removeItemFromCart,
        clearCart,
        decrementItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
