import { api } from "@/shared/api/fetcher";
import {
  GetOneLevelDataRequestType,
  GetOneLevelDataResponseType,
} from "src/types/UnitsType";

export async function getOneLevelSuite({
  projectId,
  suiteId,
  offset,
  limit,
}: GetOneLevelDataRequestType): Promise<GetOneLevelDataResponseType> {
  const url = `/${projectId}/${suiteId}/getOneLevel?offset=${offset}&limit=${limit}`;
  return api.get(url);
}
