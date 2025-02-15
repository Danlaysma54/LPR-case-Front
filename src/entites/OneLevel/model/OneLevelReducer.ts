import {
  SaveOpenedSuitesType,
  SaveOpenedSuiteType,
} from "src/entites/OneLevel/model/OnelLevelActions";
import {
  CaseType,
  GetOneLevelDataResponseType,
  SuiteType,
} from "src/types/UnitsType";

export const ONE_LEVEL_REDUCER = "ONE_LEVEL_REDUCER";
export const SUITE_REDUCER = "SUITE_REDUCER";

export type oneLevelDataState = {
  data: {
    suiteId: string;
    suiteName: string;
    suiteContent: GetOneLevelDataResponseType;
  };
  isError: boolean;
};

export type openedSuitesState = {
  data: {
    suiteId: string;
    suiteName: string;
    cases: CaseType[];
    suites: SuiteType[];
  }[];
  isError: boolean;
};

const initialStateData: oneLevelDataState = {
  data: {
    suiteId: "",
    suiteName: "Я хз че сюда писать",
    suiteContent: {
      suites: [],
      cases: [],
      suiteName: "",
      suiteId: "",
    },
  },
  isError: false,
};

const initialOpenedSuitesState: openedSuitesState = {
  data: [],
  isError: false,
};

export function oneLevelDataReducer(
  state: oneLevelDataState = initialStateData,
  action: SaveOpenedSuiteType,
) {
  console.log(action);
  switch (action.type) {
    case "GET_OPENED_SUITE_SUCCESS":
      return {
        ...state,
        data: {
          suiteId: action.suiteId,
          suiteContent: action.openedSuite,
          suiteName: action.suiteName,
        },
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

export function openedSuitesReducer(
  state: openedSuitesState = initialOpenedSuitesState,
  action: SaveOpenedSuitesType,
) {
  switch (action.type) {
    case "GET_OPENED_SUITES_SUCCESS":
      return {
        ...state,
        data: [...state.data, action.openedSuite],
        isError: false,
      };
    case "GET_OPENED_SUITES_REJECT":
      return {
        ...state,
        isError: true,
      };
    case "GET_OPENED_SUITES_PENDING":
      return {
        ...state,
        isError: false,
      };
    default:
      return state;
  }
}
