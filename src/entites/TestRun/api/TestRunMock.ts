import {
  GetAllTestRunsResponseType,
  GetTestRunByIdResponseType,
} from "@/types/UnitsType";

export function getAllTestRunsMock(): Promise<GetAllTestRunsResponseType[]> {
  return fetch("src/entites/TestRun/api/mock/allTestRuns.json").then((res) =>
    res.json(),
  );
}

export function getTestRunByIdMock(): Promise<GetTestRunByIdResponseType> {
  return fetch("../src/entites/TestRun/api/mock/runById.json").then((res) =>
    res.json(),
  );
}
