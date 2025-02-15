import { SuiteType } from "src/types/UnitsType";

enum RenderedSuitesType {
  SAVE_OPENED_SUITES_REJECT = "RENDERED_SUITES_REJECT",
  SAVE_OPENED_SUITES_SUCCESS = "RENDERED_SUITES_SUCCESS",
  SAVE_OPENED_SUITES_PENDING = "RENDERED_SUITES_PENDING",
}

export type SaveOpenedSuitesType = {
  type: RenderedSuitesType;
  renderedSuites: SuiteType[];
};

export function saveRenderedSuites(suites: SuiteType[]): SaveOpenedSuitesType {
  return {
    type: RenderedSuitesType.SAVE_OPENED_SUITES_SUCCESS,
    renderedSuites: suites,
  };
}
