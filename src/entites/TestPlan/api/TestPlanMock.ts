import { TestPlanType } from "@/types/UnitsType";

export const getTestPlansMock = async (): Promise<TestPlanType[]> => {
  return fetch("/src/entites/TestPlan/api/mock/plans.json").then((res) =>
    res.json(),
  );
};
