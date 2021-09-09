import { authActions } from "../actions/authActions";

const token = localStorage.getItem("token") || null;
const user = JSON.parse(localStorage.getItem("user")) || null;

export const initialState = {
  isLoggedIn: Boolean(token),
  user: user,
  token: token,
  errorMessage: null,
  isLoading: false,
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case authActions.AUTH_SIGNUP:
      return {
        ...state,
        isLoading: true,
      };
    case authActions.AUTH_SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: payload.token,
        user: payload.user,
        errorMessage: null,
      };
    case authActions.AUTH_SIGNUP_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };

    case authActions.AUTH_SIGNIN:
      return {
        ...state,
        isLoading: true,
      };
    case authActions.AUTH_SIGNIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: payload.token,
        user: payload.user,
        errorMessage: null,
        isLoggedIn: true,
      };
    case authActions.AUTH_SIGNIN_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };
    case authActions.AUTH_LOGOUT:
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        isLoggedIn: false,
        user: null,
        token: null,
      };

    default:
      return { ...state };
  }
};
