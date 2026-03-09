// userActions.js
import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
} from "../constants/UserConstants";

const baseURL = import.meta.env.VITE_BACKEND_URL;

export const login = (username, password) => async (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  });
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/user/login`,
      {
        username,
        password,
      },
    );
    localStorage.setItem("token", response.data.access);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error, "error");
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response.data,
    });
  }
};

// userActions.js
export const signUpAction = (userData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "SIGN_UP_REQUEST",
      });
      const response = await axios.post(
        `http://127.0.0.1:8000/api/user/register/`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );   
      dispatch({
        type: "SIGN_UP_SUCCESS",
        payload: response.data.message,
      });
      console.log(response.data,'signup')
    } catch (error) {
      dispatch({
        type: "SIGN_UP_ERROR",
        payload: error.response?.data?.detail,
      });
    }
  };
};