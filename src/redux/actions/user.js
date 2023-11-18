import axios from "axios";
import { DELETE_USER, DESELECT_USER, GET_PROFILE, GET_USERS, POST_USER, PROFILE_LOADING, SELECT_USER, UPDATE_USER } from "./actionType";
import { errorOccured, loadingCompleted, loadingStarted } from "./loading";

export const loadUsers = () => async (dispatch, getState) => {
  dispatch(loadingStarted());
  axios.defaults.headers.common['Authorization'] = getState().login.loggedInUser.token;
  return await axios.get(process.env.REACT_APP_API_URL + '/user')
    .then(res => {
      dispatch({ type: GET_USERS, payload: res.data });
      setTimeout(() => dispatch(loadingCompleted(), 500));
    })
    .catch((error) => dispatch(errorOccured(error)));
};

export const createUser = (payload) => async (dispatch) => {
  dispatch(loadingStarted());
  return await axios.post(process.env.REACT_APP_API_URL + '/user', payload)
    .then(res => {
      dispatch({ type: POST_USER, payload: res.data });
      setTimeout(() => dispatch(loadUsers()), 500);
    })
    .catch((error) => dispatch(errorOccured(error?.response?.data)));
}

export const selectUser = (payload) => ({ type: SELECT_USER, payload });
export const deselectUser = (payload) => ({ type: DESELECT_USER, payload });

export const updateUser = (payload) => async (dispatch) => {
  dispatch(loadingStarted());
  return await axios.put(process.env.REACT_APP_API_URL + `/user/${payload._id}`, payload)
    .then(res => {
      dispatch({ type: UPDATE_USER, payload: res.data });
      dispatch(deselectUser([]));
      setTimeout(() => dispatch(loadUsers()), 500);
    })
    .catch((error) => dispatch(errorOccured(error)));
};

export const deleteUser = (payload) => async (dispatch) => {
  dispatch(loadingStarted());
  return await axios.delete(process.env.REACT_APP_API_URL + `/user/${payload._id}`)
    .then(res => {
      dispatch({ type: DELETE_USER, payload: res.data });
      dispatch(deselectUser([]));
      setTimeout(() => dispatch(loadUsers()), 500);
    })
    .catch((error) => dispatch(errorOccured(error)));
}

export const getProfile = (payload) => async (dispatch) => {
  dispatch({ type: PROFILE_LOADING });
  axios.defaults.headers.common['Authorization'] = payload;
  return await axios.get(process.env.REACT_APP_API_URL + '/user/getProfile')
    .then(res => {
      dispatch({ type: GET_PROFILE, payload: {...res.data, token: payload } });
    })
    .catch((error) => dispatch(errorOccured(error?.response?.data)));
}