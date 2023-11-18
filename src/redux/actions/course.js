import axios from "axios";
import { CREATE_COURSE, DELETE_COURSE, DESELECT_COURSE, GET_COURSES, SELECT_COURSE, UPDATE_COURSE } from "./actionType";
import { errorOccured, loadingCompleted, loadingStarted } from "./loading";

export const loadCourses = () => async (dispatch, getState) => {
  dispatch(loadingStarted());
  axios.defaults.headers.common['Authorization'] = getState().login.loggedInUser.token;
  return await axios.get(process.env.REACT_APP_API_URL + '/course')
    .then(res => {
      dispatch({ type: GET_COURSES, payload: res.data });
      dispatch(loadingCompleted());
    })
    .catch((error) => dispatch(errorOccured(error)));
};

export const createCourse = (payload) => async (dispatch) => {
  dispatch(loadingStarted());
  return await axios.post(process.env.REACT_APP_API_URL + '/course', payload)
    .then(res => {
      dispatch({ type: CREATE_COURSE, payload: res.data });
      setTimeout(() => dispatch(loadCourses()), 500);
    })
    .catch((error) => dispatch(errorOccured(error?.response?.data)));
};

export const selectCourse = (payload) => ({ type: SELECT_COURSE, payload });
export const deselectCourse = (payload) => ({ type: DESELECT_COURSE, payload });

export const updateCourse = (payload) => async (dispatch) => {
  dispatch(loadingStarted());
  return await axios.put(process.env.REACT_APP_API_URL + `/course/${payload._id}`, payload)
    .then(res => {
      dispatch({ type: UPDATE_COURSE, payload: res.data });
      dispatch(deselectCourse([]));
      setTimeout(() => dispatch(loadCourses()), 500);
    })
    .catch((error) => dispatch(errorOccured(error)));
};

export const deleteCourse = (payload) => async (dispatch) => {
  dispatch(loadingStarted());
  return await axios.delete(process.env.REACT_APP_API_URL + `/course/${payload._id}`)
    .then(res => {
      dispatch({ type: DELETE_COURSE, payload: res.data });
      dispatch(deselectCourse([]));
      setTimeout(() => dispatch(loadCourses()), 500);
    })
    .catch((error) => dispatch(errorOccured(error)));
}
