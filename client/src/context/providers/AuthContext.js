import { createContext, useContext, useReducer } from "react";
import { register, profile, login } from "../../api/authApi";
import { initialState, authReducer } from "../reducer/authReducer";
import { authActions } from "../actions/authActions";

export const AuthContext = createContext(initialState);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("must bre in an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const signup = async ({ email, password }) => {
    dispatch({ type: authActions.AUTH_SIGNUP });
    try {
      const res = await register({ email, password });
      const { token } = res.data;

      const resUser = await profile(token);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(resUser.data));

      dispatch({
        type: authActions.AUTH_SIGNUP_SUCCESS,
        payload: { token, user: resUser.data },
      });

      return resUser.data;
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

  const signin = async ({ email, password }) => {
    dispatch({ type: authActions.AUTH_SIGNIN });
    try {
      const res = await login({ email, password });
      const { token } = res.data;

      const resUser = await profile(token);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(resUser.data));

      dispatch({
        type: authActions.AUTH_SIGNIN_SUCCESS,
        payload: { token, user: resUser.data },
      });

      return resUser.data;
    } catch (err) {
      const errorData = err.response.data;
      if (errorData) {
        dispatch({
          type: authActions.AUTH_SIGNIN_ERROR,
          payload: errorData.message,
        });
      }
    }
  };

  const logout = async () => {
    localStorage.clear();
    dispatch({ type: authActions.AUTH_LOGOUT });
  };

  return (
    <AuthContext.Provider value={{ ...state, signup, signin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
