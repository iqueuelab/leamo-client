import { GET_PROFILE, LOGIN, LOGOUT, PROFILE_LOADING } from "../actions/actionType";

const initialState = {
  loggedInUser: null,
  loading: false
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedInUser: action.payload
      };
    case GET_PROFILE:  
      return {
        ...state,
        loggedInUser: action.payload,
        loading: false,
      };
    case PROFILE_LOADING: 
      return {
        ...state,
        loading: true
      };
    case LOGOUT:
      return {
        ...state,
        loggedInUser: null
      };
    default:
      return state;
  }
};

export default loginReducer;