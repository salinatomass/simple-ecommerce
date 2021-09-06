import { productsActions } from "../actions/productsActions";

export const intialState = {
  isLoading: false,
  products: [],
  errorMessage: "",
};

export const productsReducer = (state, actions) => {
  switch (actions.type) {
    case productsActions.LOAD_PRODUCTS:
      return {
        ...state,
        isLoading: true,
      };

    case productsActions.LOAD_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: actions.payload,
      };

    default:
      return state;
  }
};