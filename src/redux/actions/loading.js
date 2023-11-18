import { CLEAN_ERRORS, ERROR_OCCURRED, LOADING_COMPLETED, LOADING_STARTED } from "./actionType";

export const loadingStarted = () => ({
  type: LOADING_STARTED
});

export const loadingCompleted = () => ({
  type: LOADING_COMPLETED
});

export const errorOccured = (error) => ({
  type: ERROR_OCCURRED,
  payload: error
});

export const cleanErrors = () => ({
  type: CLEAN_ERRORS
});