import { post } from "@/shared/api/fetcher";
import { AddCaseRequestType, AddCaseResponseType } from "@/types/UnitsType";

export async function addCase(
  args: AddCaseRequestType,
): Promise<AddCaseResponseType> {
  const url = `/${args.projectId}/addTestCase`;
  return await post(url, args.case);
}
