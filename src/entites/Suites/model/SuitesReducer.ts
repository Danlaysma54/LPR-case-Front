import { SaveOpenedSuitesType } from "@/entites/Suites/model/SuitesActions";
import { SuiteType } from "@/types/UnitsType";

export const RENDERED_SUITES_REDUCER = "RENDERED_SUITES_REDUCER";

export type openedSuitesState = {
  renderedSuites: SuiteType[];
  isError: boolean;
};

const initialStateData: openedSuitesState = {
  renderedSuites: [],
  isError: false,
};

export function renderedSuitesReducer(
  state: openedSuitesState = initialStateData,
  action: SaveOpenedSuitesType,
) {
  switch (action.type) {
    case "RENDERED_SUITES_SUCCESS":
      return {
        ...state,
        renderedSuites: action.renderedSuites,
        isError: false,
      };
    case "RENDERED_SUITES_REJECT":
      return {
        ...state,
        isError: true,
      };
    case "RENDERED_SUITES_PENDING":
      return {
        ...state,
        isError: false,
      };
    default:
      return state;
  }
}
