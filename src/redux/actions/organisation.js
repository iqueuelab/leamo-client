import axios from 'axios';
import {
  ADD_ORGANISATION, DELETE_ORGANISATION, DESELECT_ORGANISATION,
  GET_ORGANISATIONS,
  SELECT_ORGANISATION,
  UPDATE_ORGANISATION
} from "./actionType";
import { errorOccured, loadingCompleted, loadingStarted } from "./loading";

export const loadOrgnisations = () => async (dispatch) => {
  dispatch(loadingStarted());
  return await axios.get(process.env.REACT_APP_API_URL + '/organisation')
    .then(res => {
      dispatch({ type: GET_ORGANISATIONS, payload: res.data });
      dispatch(loadingCompleted());
    })
    .catch((error) => dispatch(errorOccured(error)));
};

export const createOrgnisation = (payload) => async (dispatch) => {
  dispatch(loadingStarted());
  return await axios.post(process.env.REACT_APP_API_URL + `/organisation`, payload)
    .then(res => {
      dispatch({ type: ADD_ORGANISATION, payload: res.data });
      setTimeout(() => dispatch(loadOrgnisations()), 500);
    })
    .catch((error) => {
      dispatch(errorOccured(error?.response?.data))
    });
};

export const selectTenancy = (payload) => ({ type: SELECT_ORGANISATION, payload });
export const deselectTenancy = () => ({ type: DESELECT_ORGANISATION });

export const updateOrgnisation = (payload) => async (dispatch) => {
  dispatch(loadingStarted());
  return await axios.put(process.env.REACT_APP_API_URL + `/organisation/${payload._id}`, payload)
    .then(res => {
      dispatch({ type: UPDATE_ORGANISATION, payload: res.data });
      dispatch(deselectTenancy());
      setTimeout(() => dispatch(loadOrgnisations()), 500);
    })
    .catch((error) => dispatch(errorOccured(error)));
};

export const deleteOrganisation = (payload) => async (dispatch) => {
  dispatch(loadingStarted());
  return await axios.delete(process.env.REACT_APP_API_URL + `/organisation/${payload._id}`)
    .then(res => {
      dispatch({ type: DELETE_ORGANISATION, payload: res.data });
      dispatch(deselectTenancy());
      setTimeout(() => dispatch(loadOrgnisations()), 500);
    })
    .catch((error) => dispatch(errorOccured(error)));
}