import { createContext, useEffect, useReducer, useContext } from "react";
import {
  getProducts,
  getProduct,
  saveProduct,
  deleteProduct,
  updateProduct,
} from "../../api/productsApi";
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

  const loadProduct = async (id) => {
    dispatch({ type: productsActions.GET_PRODUCT });

    try {
      const res = await getProduct(id);
      dispatch({
        type: productsActions.GET_PRODUCT_SUCCESS,
        payload: res.data,
      });
      return res.data;
    } catch (err) {
      dispatch({
        type: productsActions.GET_PRODUCT_ERROR,
        payload: err.message,
      });
    }
  };

  const addNewProduct = async (newProduct) => {
    dispatch({ type: productsActions.LOAD_SAVE_PRODUCTS });

    try {
      const res = await saveProduct(newProduct);

      if (res.data)
        dispatch({
          type: productsActions.LOAD_SAVE_PRODUCTS_SUCCESS,
          payload: res.data,
        });

      return res.data;
    } catch (err) {
      const errorData = err.response.data || err;
      if (errorData)
        dispatch({
          type: productsActions.LOAD_SAVE_PRODUCTS_ERROR,
          payload: errorData.message,
        });

      throw errorData.message;
    }
  };

  const changeProduct = async (id, product) => {
    dispatch({ type: productsActions.UPDATE_PRODUCT });
    try {
      let productUpdated = {};
      const res = await updateProduct(id, product);
      if (res.data) {
        product.forEach((value, key) => (productUpdated[key] = value));
        dispatch({
          type: productsActions.UPDATE_PRODUCT_SUCCESS,
          payload: { id, product: productUpdated },
        });
      }

      return res.data;
    } catch (err) {
      console.error(err);
      dispatch({
        type: productsActions.UPDATE_PRODUCT_ERROR,
        payload: err.message,
      });
    }
  };

  const removeProduct = async (id) => {
    dispatch({ type: productsActions.DELETE_PRODUCT });
    try {
      await deleteProduct(id);
      dispatch({ type: productsActions.DELETE_PRODUCT_SUCCESS, payload: id });
      return true;
    } catch (err) {
      console.error(err);
      dispatch({
        type: productsActions.DELETE_PRODUCT_ERROR,
        payload: err.message,
      });
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        ...state,
        loadProducts,
        loadProduct,
        addNewProduct,
        removeProduct,
        changeProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
