import { combineReducers } from "redux";

import {
  PENDING_DELETION_REDUCER,
  pendingDeletionReducer,
} from "@/entites/PendingDeletion/model/PendingDeletionReducer";
import {
  RENDERED_SUITES_REDUCER,
  renderedSuitesReducer,
} from "@/entites/Suites/model/SuitesReducer";
import {
  ONE_LEVEL_REDUCER,
  oneLevelDataReducer,
  openedSuitesReducer,
  SUITE_REDUCER,
} from "src/entites/OneLevel/model/OneLevelReducer";
import {
  PROJECT_DATA_REDUCER,
  projectDataReducer,
} from "src/entites/Project/model/ProjectReducer";

export const rootReducer = combineReducers({
  [PROJECT_DATA_REDUCER]: projectDataReducer,
  [ONE_LEVEL_REDUCER]: oneLevelDataReducer,
  [SUITE_REDUCER]: openedSuitesReducer,
  [RENDERED_SUITES_REDUCER]: renderedSuitesReducer,
  [PENDING_DELETION_REDUCER]: pendingDeletionReducer,
});
