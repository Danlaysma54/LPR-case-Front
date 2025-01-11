import { SaveOpenedSuiteType } from "src/entites/OneLevel/model/OnelLevelActions";
import { GetOneLevelDataResponseType } from "src/types/UnitsType";

export const ONE_LEVEL_REDUCER = "ONE_LEVEL_REDUCER";

export type oneLevelDataState = {
  data: {
    suiteId: string,
    suiteName: string
    suiteContent: GetOneLevelDataResponseType
  } [];
  isError: boolean;
};

const initialStateData: oneLevelDataState = {
  data: [],
  isError: false,
};

export function oneLevelDataReducer(
  state: oneLevelDataState = initialStateData,
  action: SaveOpenedSuiteType,
) {
  switch (action.type) {
    case "GET_OPENED_SUITE_SUCCESS":
      return {
        ...state,
        data: [
          ...state.data,
          {
            suiteId: action.suiteId,
            suiteContent: action.openedSuite,
            suiteName: action.suiteName
          }
        ],
        isError: false,
      };
    case "GET_OPENED_SUITE_REJECT":
      return {
        ...state,
        isError: true,
      };
    case "GET_OPENED_SUITE_PENDING":
      return {
        ...state,
        isError: false,
      };
    default:
      return state;
  }
}
