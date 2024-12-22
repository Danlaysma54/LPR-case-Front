import { Project } from "@/types/UnitsType";
import { GetProjectDataType } from "@/entites/Project/model/ProjectActions";

export const PROJECT_DATA_REDUCER = "PROJECT_DATA_REDUCER";

export type projectDataState = {
  data: Project;
  isError: boolean;
};

const initialStateData: projectDataState = {
  data: { projectId: "", projectName: "", projectShortName: "", projectDescription: "" },
  isError: false,
};

export function projectDataReducer(
  state: projectDataState = initialStateData,
  action: GetProjectDataType,
) {
  switch (action.type) {
    case "GET_PROJECT_DATA_SUCCESS":
      return {
        ...state,
        data: action.project,
        isError: false,
      };
    case "GET_PROJECT_DATA_REJECT":
      return {
        ...state,
        isError: true,
      };
    case "GET_PROJECT_DATA_PENDING":
      return {
        ...state,
        isError: false,
      };
    default:
      return state;
  }
}
