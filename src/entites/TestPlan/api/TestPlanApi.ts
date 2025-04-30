import { api } from "@/shared/api/fetcher";
import { AddTestPlanRequestType } from "@/types/UnitsType";

const addTestPlan = async (testPlanRequest: AddTestPlanRequestType) => {
  const url = `${testPlanRequest.projectId}/addTestPlan`;
  return await api.post(url, {
    testPlanName: testPlanRequest.testPlanName,
    testCases: testPlanRequest.testCases,
  });
};

export default addTestPlan;
