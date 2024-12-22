import { Project } from "src/types/UnitsType";

enum ProjectDataType {
  GET_PROJECT_DATA_REJECT = "GET_PROJECT_DATA_REJECT",
  GET_PROJECT_DATA_SUCCESS = "GET_PROJECT_DATA_SUCCESS",
  GET_PROJECT_DATA_PENDING = "GET_PROJECT_DATA_PENDING",
}

export type GetProjectDataType = {
  type: ProjectDataType;
  project: Project;
};

export function getProjectByAction(project: Project): GetProjectDataType {
  return {
    type: ProjectDataType.GET_PROJECT_DATA_SUCCESS,
    project: project
  };
}
