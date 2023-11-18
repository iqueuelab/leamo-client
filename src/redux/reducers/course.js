import {
  DELETE_COURSE, DESELECT_COURSE, GET_COURSES, SELECT_COURSE, UPDATE_COURSE,
} from "../actions/actionType";

const initialState = {
  courseList: [],
  selectedCourses: []
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COURSES:
      return {
        ...state,
        courseList: action.payload
      };
    case UPDATE_COURSE:
    case DELETE_COURSE:
      return {
        ...state,
        selectedCourses: []
      };
    case SELECT_COURSE:
      return {
        ...state,
        selectedCourses: Array.isArray(action.payload) ? [...action.payload] : [...state.selectedCourses, action.payload]
      };
    case DESELECT_COURSE:
      return {
        ...state,
        selectedCourses: Array.isArray(action.payload) ? [] : [...state.selectedCourses.filter(user => user?._id !== action.payload?._id)]
      };
    default:
      return state;
  }
};

export default courseReducer;