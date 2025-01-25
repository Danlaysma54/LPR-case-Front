import { GetOneLevelDataResponseType } from "src/types/UnitsType";

enum OpenedSuiteType {
  SAVE_OPENED_SUITE_REJECT = "GET_OPENED_SUITE_REJECT",
  SAVE_OPENED_SUITE_SUCCESS = "GET_OPENED_SUITE_SUCCESS",
  SAVE_OPENED_SUITE_PENDING = "GET_OPENED_SUITE_PENDING",
}

enum OpenedSuitesType {
  SAVE_OPENED_SUITES_REJECT = "GET_OPENED_SUITES_REJECT",
  SAVE_OPENED_SUITES_SUCCESS = "GET_OPENED_SUITES_SUCCESS",
  SAVE_OPENED_SUITES_PENDING = "GET_OPENED_SUITES_PENDING",
}

export type SaveOpenedSuiteType = {
  type: OpenedSuiteType;
  openedSuite: GetOneLevelDataResponseType;
  suiteId: string;
  suiteName: string;
};

export type SaveOpenedSuitesType = {
  type: OpenedSuitesType;
  openedSuite: GetOneLevelDataResponseType;
  suiteId: string;
  suiteName: string;
};

export function saveOpenedSuite(
  suite: GetOneLevelDataResponseType,
): SaveOpenedSuiteType {
  return {
    type: OpenedSuiteType.SAVE_OPENED_SUITE_SUCCESS,
    openedSuite: suite,
    suiteId: suite.suiteId,
    suiteName: suite.suiteName,
  };
}

export function saveOpenedSuites(
  suite: GetOneLevelDataResponseType,
): SaveOpenedSuitesType {
  return {
    type: OpenedSuitesType.SAVE_OPENED_SUITES_SUCCESS,
    openedSuite: suite,
    suiteId: suite.suiteId,
    suiteName: suite.suiteName,
  };
}
