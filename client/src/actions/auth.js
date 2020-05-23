import { registerUser, loginUser, verifyAuth } from "../services/authService";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";
import { setAlert } from "./alert";

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await verifyAuth();

    dispatch({
      type: USER_LOADED,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = (payload) => async (dispatch) => {
  try {
    const res = await registerUser(payload);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res,
    });

    dispatch(loadUser());
  } catch (err) {
    const { errors } = err;

    // console.log(errors);

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
    // console.log(err);
  }
};

// Login User
export const login = (payload) => async (dispatch) => {
  try {
    const res = await loginUser(payload);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res,
    });

    dispatch(loadUser());
  } catch (err) {
    const { errors } = err;

    // console.log(errors);

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
    // console.log(err);
  }
};

// Logout /Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
