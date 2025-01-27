import { GetProjectByIdResponseType } from "src/types/UnitsType";

enum ProjectDataType {
  GET_PROJECT_DATA_REJECT = "GET_PROJECT_DATA_REJECT",
  GET_PROJECT_DATA_SUCCESS = "GET_PROJECT_DATA_SUCCESS",
  GET_PROJECT_DATA_PENDING = "GET_PROJECT_DATA_PENDING",
}

export type GetProjectDataType = {
  type: ProjectDataType;
  projectById: GetProjectByIdResponseType;
};

export function getProjectByAction(
  project: GetProjectByIdResponseType,
): GetProjectDataType {
  return {
    type: ProjectDataType.GET_PROJECT_DATA_SUCCESS,
    projectById: project,
  };
}
