import { createContext, useEffect, useReducer, useContext } from "react";
import { getProducts, saveProduct } from "../../api/productsApi";
import { intialState, productsReducer } from "../reducer/productsReducer";
import { productsActions } from "../actions/productsActions";

export const ProductContext = createContext(intialState);

export const useProducts = () => {
  const context = useContext(ProductContext);
  return context;
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, intialState);

  const loadProducts = async () => {
    dispatch({ type: productsActions.LOAD_PRODUCTS });

    try {
      const res = await getProducts();

      if (res.data) {
        dispatch({
          type: productsActions.LOAD_PRODUCTS_SUCCESS,
          payload: res.data,
        });
      }
    } catch (err) {
      dispatch({
        type: productsActions.LOAD_PRODUCTS_ERROR,
        payload: err.message,
      });
    }
  };

  const addNewProduct = async (newProduct) => {
    dispatch({ type: productsActions.LOAD_SAVE_PRODUCTS });

    try {
      const res = await saveProduct(newProduct);

      if (res.data) {
        dispatch({
          type: productsActions.LOAD_SAVE_PRODUCTS_SUCCESS,
          payload: res.data,
        });
      }
    } catch (err) {
      dispatch({
        type: productsActions.LOAD_SAVE_PRODUCTS_ERROR,
        payload: err.message,
      });
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ ...state, loadProducts, addNewProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
