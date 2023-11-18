import axios from "axios";
import { LOGIN } from "./actionType";
import { errorOccured, loadingCompleted, loadingStarted } from "./loading";

export const login = (payload) => async (dispatch) => {
  dispatch(loadingStarted());
  return await axios.post(process.env.REACT_APP_API_URL + '/login', payload)
    .then(res => {
      dispatch({ type: LOGIN, payload: res.data });
      dispatch(loadingCompleted());
    })
    .catch((error) => dispatch(errorOccured(error?.response?.data?.errors)));
};

