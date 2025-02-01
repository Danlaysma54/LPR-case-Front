import { get, post } from "@/shared/api/fetcher";
import {
  AddSuiteRequestType,
  AddSuiteResponseType,
  GetSuitesByProjectIdRequestType,
  GetSuitesByProjectIdResponseType,
} from "@/types/UnitsType";

export async function getAllSuitesByProjectId({
  projectId,
}: GetSuitesByProjectIdRequestType): Promise<GetSuitesByProjectIdResponseType> {
  const url = `/${projectId}/getAllSuitesInProject`;
  return await get(url);
}

export async function addSuite({
  projectId,
  suite,
}: AddSuiteRequestType): Promise<AddSuiteResponseType> {
  const url = `/${projectId}/addSuite`;
  return await post(url, suite);
}
