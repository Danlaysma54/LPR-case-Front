import { combineReducers } from "redux";
import { PROJECT_DATA_REDUCER, projectDataReducer } from "src/entites/Project/model/ProjectReducer";

export const rootReducer = combineReducers({
  [PROJECT_DATA_REDUCER]: projectDataReducer
});
