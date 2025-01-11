import { get } from "src/shared/api/fetcher";
import { GetOneLevelDataRequestType, GetOneLevelDataResponseType } from "src/types/UnitsType";


export async function getOneLevelSuite({ projectId, suiteId } : GetOneLevelDataRequestType): Promise<GetOneLevelDataResponseType> {
    const url = `/${projectId}/${suiteId}/getOneLevel`;
    return get(url);
}