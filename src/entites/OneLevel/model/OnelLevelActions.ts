import { GetOneLevelDataResponseType } from "src/types/UnitsType";

enum OpenedSuiteType {
  SAVE_OPENED_SUITE_REJECT = "GET_OPENED_SUITE_REJECT",
  SAVE_OPENED_SUITE_SUCCESS = "GET_OPENED_SUITE_SUCCESS",
  SAVE_OPENED_SUITE_PENDING = "GET_OPENED_SUITE_PENDING",
}

export type SaveOpenedSuiteType = {
  type: OpenedSuiteType;
  openedSuite: GetOneLevelDataResponseType,
  suiteId: string
  suiteName: string
};

export function saveOpenedSuite(suite: GetOneLevelDataResponseType): SaveOpenedSuiteType {
  return {
    type: OpenedSuiteType.SAVE_OPENED_SUITE_SUCCESS,
    openedSuite: suite,
    suiteId: suite.suiteId,
    suiteName: suite.suiteName
  };
}
