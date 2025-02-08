import { get, patch, post } from "@/shared/api/fetcher";
import {
  AddSuiteRequestType,
  AddSuiteResponseType,
  EditSuiteRequestType,
  EditSuiteResponseType,
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

export async function editSuite({
  projectId,
  suite,
}: EditSuiteRequestType): Promise<EditSuiteResponseType> {
  const url = `/${projectId}/editSuite`;
  return await patch(url, suite);
}
