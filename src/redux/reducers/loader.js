import {
  CLEAN_ERRORS,
  ERROR_OCCURRED,
  LOADING_COMPLETED,
  LOADING_STARTED
} from "../actions/actionType";

const initialState = {
  loading: false,
  error: null
};

const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_STARTED:
      return {
        ...state,
        loading: true,
        error: null
      };
    case CLEAN_ERRORS:
      return {
        ...state,
        error: null
      };
    case LOADING_COMPLETED:
      return {
        ...state,
        loading: false
      };
    case ERROR_OCCURRED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default loaderReducer;