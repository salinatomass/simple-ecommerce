import { productsActions } from "../actions/productsActions";

export const intialState = {
  isLoading: false,
  products: [],
  edit: {
    name: "",
    price: 0,
    stock: 1,
    description: "",
    images: { url: "/assets/no-image.png" },
  },
  errorMessage: "",
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

    case productsActions.GET_PRODUCT:
      return {
        ...state,
        isLoading: true,
      };
    case productsActions.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        edit: payload,
        errorMessage: "",
      };
    case productsActions.GET_PRODUCT_ERROR:
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

    case productsActions.UPDATE_PRODUCT:
      return {
        ...state,
        isLoading: true,
      };
    case productsActions.UPDATE_PRODUCT_SUCCESS: {
      const updatedProducts = state.products.map((item) =>
        item._id === payload.id ? { ...item, ...payload.product } : { ...item }
      );

      return {
        ...state,
        isLoading: false,
        errorMessage: "",
        products: updatedProducts,
      };
    }
    case productsActions.UPDATE_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };

    default:
      return state;
  }
};
