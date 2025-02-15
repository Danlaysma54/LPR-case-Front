import { del, get, patch, post } from "@/shared/api/fetcher";
import {
  AddSuiteRequestType,
  AddSuiteResponseType,
  EditSuiteRequestType,
  EditSuiteResponseType,
  GetSuitesByProjectIdRequestType,
  GetSuitesByProjectIdResponseType,
  RemoveSuiteRequestType,
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
export async function removeSuite({
  projectId,
  suiteId,
}: RemoveSuiteRequestType) {
  const url = `/${projectId}/${suiteId}/deleteSuite`;
  await del(url, suiteId);
}
