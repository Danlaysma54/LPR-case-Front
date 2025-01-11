import { GetProjectDataType } from "src/entites/Project/model/ProjectActions";

import { GetProjectByIdResponseType } from "@/types/UnitsType";

export const PROJECT_DATA_REDUCER = "PROJECT_DATA_REDUCER";

export type projectDataState = {
  data: GetProjectByIdResponseType;
  isError: boolean;
};

const initialStateData: projectDataState = {
  data: {
    project: {
      projectId: "",
      projectName: "",
      projectShortName: "",
      projectDescription: ""
    },
    casesCount: 0,
    suitesCount: 0
  },
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
        data: action.projectById,
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
