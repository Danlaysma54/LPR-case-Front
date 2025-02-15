import { del, patch, post } from "@/shared/api/fetcher";
import {
  AddCaseRequestType,
  AddCaseResponseType,
  EditCaseRequestType,
  EditCaseResponseType,
} from "@/types/UnitsType";

export async function addCase(
  args: AddCaseRequestType,
): Promise<AddCaseResponseType> {
  const url = `/${args.projectId}/addTestCase`; // TODO: в ашишке неправильный путь(
  return await post(url, args.case);
}

export async function editCase(
  args: EditCaseRequestType,
): Promise<EditCaseResponseType> {
  const url = `/${args.projectId}/editTestCase`;
  return await patch(url, args.case);
}

export async function deleteCase(projectId: string, caseId: string) {
  const url = `/${projectId}/${caseId}/deleteTestCase`;
  await del(url);
}
