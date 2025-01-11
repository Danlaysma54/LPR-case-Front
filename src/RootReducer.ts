import { combineReducers } from "redux";
import { ONE_LEVEL_REDUCER, oneLevelDataReducer } from "src/entites/OneLevel/model/OneLevelReducer";
import { PROJECT_DATA_REDUCER, projectDataReducer } from "src/entites/Project/model/ProjectReducer";

export const rootReducer = combineReducers({
  [PROJECT_DATA_REDUCER]: projectDataReducer,
  [ONE_LEVEL_REDUCER]: oneLevelDataReducer
});
