import { api } from "@/shared/api/fetcher";
import {
  AddTestPlanRequestType,
  AddTestPlanResponseType,
  GetAllTestPlansRequestType,
  GetAllTestPlansResponseType,
  GetTestPlanByIdRequestType,
  GetTestPlanByIdResponseType,
} from "@/types/UnitsType";

const addTestPlan = async (
  testPlanRequest: AddTestPlanRequestType,
): Promise<AddTestPlanResponseType> => {
  const url = `/${testPlanRequest.projectId}/addTestPlan`;
  return await api.post(url, {
    testPlanName: testPlanRequest.testPlanName,
    testCases: testPlanRequest.testCases,
  });
};

export function getAllTestPlans(
  req: GetAllTestPlansRequestType,
): Promise<GetAllTestPlansResponseType> {
  const url = `/${req.projectId}/getTestPlans`;
  return api.get(url);
}

export function getTestPlanById(
  req: GetTestPlanByIdRequestType,
): Promise<GetTestPlanByIdResponseType> {
  const url = `/${req.projectId}/testPlans/${req.testPlanId}`;
  return api.get(url);
}
export default addTestPlan;
