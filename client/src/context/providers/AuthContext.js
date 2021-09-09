import { createContext, useContext, useReducer } from "react";
import { register, profile } from "../../api/authApi";
import { initialState, authReducer } from "../reducer/authReducer";
import { authActions } from "../actions/authActions";

export const AuthContext = createContext(initialState);

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const signup = async ({ email, password }) => {
    dispatch({ type: authActions.AUTH_SIGNUP });
    try {
      const res = await register({ email, password });
      const { token } = res.data;
      console.log(res)

      const resUser = await profile(token);

      dispatch({
        type: authActions.AUTH_SIGNUP_SUCCESS,
        payload: { token, user: resUser.data },
      });
    } catch (err) {
      const errorData = err.response.data;
      if (errorData) {
        dispatch({
          type: authActions.AUTH_SIGNUP_ERROR,
          payload: errorData.message,
        });
      }
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
