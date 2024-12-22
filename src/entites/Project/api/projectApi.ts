import { get } from "src/shared/api/fetcher";
import { Project } from "src/types/UnitsType";

export async function getProjectById(projectId: string): Promise<Project> {
  const url = `/${projectId}/getProject`;
  return await get(url);
}
