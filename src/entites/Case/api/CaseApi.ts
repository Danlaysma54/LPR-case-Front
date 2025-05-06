import { api } from "@/shared/api/fetcher";
import {
  AddCaseRequestType,
  AddCaseResponseType,
  EditCaseRequestType,
  EditCaseResponseType,
  GetTestCaseByIdResponseType,
} from "@/types/UnitsType";

export async function addCase(
  args: AddCaseRequestType,
): Promise<AddCaseResponseType> {
  const url = `/${args.projectId}/addTestCase`;
  return await api.post(url, args.case);
}

export async function editCase(
  args: EditCaseRequestType,
): Promise<EditCaseResponseType> {
  const url = `/${args.projectId}/editTestCase`;
  return await api.patch(url, args.case);
}

export async function deleteCase(projectId: string, caseId: string) {
  const url = `/${projectId}/${caseId}/deleteTestCase`;
  await api.delete(url);
}

export async function getCaseById(
  projectId: string,
  caseId: string,
): Promise<GetTestCaseByIdResponseType> {
  const url = `/${projectId}/${caseId}/getTestCase`;
  return await api.get(url);
}
