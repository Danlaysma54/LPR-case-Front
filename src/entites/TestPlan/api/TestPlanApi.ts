import { api } from "@/shared/api/fetcher";
import {
  AddTestPlanRequestType,
  AddTestPlanResponseType,
  EditTestPlanRequestType,
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

export async function editTestPlan(req: EditTestPlanRequestType) {
  const url = `/${req.projectId}/editTestPlan`;
  return api.patch(url, {
    testPlanId: req.testPlanId,
    testPlanName: req.testPlanName,
    testCases: req.testCases,
  });
}

export async function deleteTestPlan(projectId: string, testPlanId: string) {
  const url = `/${projectId}/${testPlanId}/deleteTestPlan`;
  await api.delete(url);
}

export default addTestPlan;
