import {
  DELETE_ORGANISATION, DESELECT_ORGANISATION, GET_ORGANISATIONS, SELECT_ORGANISATION, UPDATE_ORGANISATION
} from "../actions/actionType";

const initialState = {
  orgList: [],
  selectedTenancy: null
};

const organisation = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORGANISATIONS:
      return {
        ...state,
        orgList: action.payload
      };
    case UPDATE_ORGANISATION:
    case DELETE_ORGANISATION:
      return {
        ...state,
        selectedTenancy: null
      }
    case SELECT_ORGANISATION:
      return {
        ...state,
        selectedTenancy: action.payload
      }
    case DESELECT_ORGANISATION:
      return {
        ...state,
        selectedTenancy: null
      }
    default:
      return state;
  }
};

export default organisation;