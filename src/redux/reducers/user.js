import {
  DELETE_USER, DESELECT_USER, GET_USERS, SELECT_USER, UPDATE_USER
} from "../actions/actionType";

const initialState = {
  userList: [],
  selectedUsers: []
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        userList: action.payload
      };
    case UPDATE_USER:
    case DELETE_USER:
      return {
        ...state,
        selectedUsers: []
      };
    case SELECT_USER:
      return {
        ...state,
        selectedUsers: Array.isArray(action.payload) ? [...action.payload] : [...state.selectedUsers, action.payload]
      };
    case DESELECT_USER:
      return {
        ...state,
        selectedUsers: Array.isArray(action.payload) ? [] : [...state.selectedUsers.filter(user => user?._id !== action.payload?._id)]
      };
    default:
      return state;
  }
};

export default user;