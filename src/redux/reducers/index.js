import { combineReducers } from "redux";
import courseReducer from "./course";
import loader from "./loader";
import loginReducer from "./login";
import organisation from "./organisation";
import user from "./user";

const allReducers = combineReducers({
  organisation: organisation,
  course: courseReducer,
  user: user,
  login: loginReducer,
  loader: loader
});

export default allReducers;