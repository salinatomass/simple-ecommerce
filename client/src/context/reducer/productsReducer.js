import { productsActions } from "../actions/productsActions";

export const intialState = {
  isLoading: false,
  products: [],
  errorMessage: "",
  cart: [],
};

export const productsReducer = (state, actions) => {
  const { type, payload } = actions;

  switch (type) {
    case productsActions.LOAD_PRODUCTS:
      return {
        ...state,
        isLoading: true,
      };
    case productsActions.LOAD_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: payload,
      };
    case productsActions.LOAD_PRODUCTS_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };

    case productsActions.LOAD_SAVE_PRODUCTS:
      return {
        ...state,
        isLoading: true,
      };
    case productsActions.LOAD_SAVE_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: [...state.products, payload],
      };
    case productsActions.LOAD_SAVE_PRODUCTS_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };

    case productsActions.DELETE_PRODUCT:
      return {
        ...state,
        isLoading: true,
      };
    case productsActions.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: state.products.filter((product) => product._id !== payload),
        errorMessage: "",
      };
    case productsActions.DELETE_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };

    case productsActions.ADD_PRODUCT_TO_CART:
      return {
        ...state,
        cart: [...state.cart, payload],
      };

    default:
      return state;
  }
};
