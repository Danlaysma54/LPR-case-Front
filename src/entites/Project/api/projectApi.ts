import { get } from "src/shared/api/fetcher";
import { GetProjectByIdRequestType, GetProjectByIdResponseType } from "src/types/UnitsType";

export async function getProjectById( { projectId }: GetProjectByIdRequestType): Promise<GetProjectByIdResponseType> {
  const url = `/${projectId}/getProject`;
  return await get(url);
}
