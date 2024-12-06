export type SuiteType = {
  suiteRootId: string;
  suiteId: string;
  name: string;
  childCount: number;
}

export type CaseType = {
  name: string;
}
export type OneLevelSuites = {
  suiteList: suite[];
}
export type suite ={
  numberOfChild: number
  suiteId: string
  suiteRootId: string
  suiteName: string
 }