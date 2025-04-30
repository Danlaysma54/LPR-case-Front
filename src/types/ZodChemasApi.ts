import z from "zod";

import {
  AddCaseSchema,
  AddSuiteSchema,
  CaseSchema,
  EditCaseSchema,
  EditSuiteSchema,
  ProjectSchema,
  SuiteDTOSchema,
  SuiteSchema,
} from "src/types/ZodSchemasObjects";

export const GetOneLevelDataRequest = z.object({
  projectId: z.string().min(1),
  suiteId: z.string().min(1),
  offset: z.number().min(0),
  limit: z.number().min(1),
});

export const GetOneLevelDataResponse = z.object({
  suites: z.array(SuiteSchema).optional(),
  cases: z.array(CaseSchema).optional(),
  suiteName: z.string().min(2),
  suiteId: z.string().min(2),
});

export const GetProjectByIdRequest = z.object({
  projectId: z.string().min(1),
});

export const GetProjectByIdResponse = z.object({
  project: ProjectSchema,
  casesCount: z.number().nonnegative(),
  suitesCount: z.number().nonnegative(),
});

export const GetSuitesByProjectIdRequest = z.object({
  projectId: z.string().min(1),
});

export const GetSuitesByProjectIdResponse = z.object({
  children: z.array(SuiteDTOSchema),
  suiteName: z.string().min(2),
  suiteId: z.string().min(2),
});

export const AddSuiteRequest = z.object({
  suite: AddSuiteSchema,
  projectId: z.string(),
});

export const AddSuiteResponse = z.object({
  suiteId: z.string().min(32),
});

export const AddCaseRequest = z.object({
  case: AddCaseSchema,
  projectId: z.string(),
});
export const AddCaseResponse = z.object({
  caseId: z.string().min(32),
});

export const EditSuiteRequest = z.object({
  suite: EditSuiteSchema,
  projectId: z.string(),
});
export const EditSuiteResponse = z.object({
  suite: SuiteSchema,
});

export const RemoveSuiteRequest = z.object({
  suiteId: z.string(),
  projectId: z.string(),
});

export const EditCaseRequest = z.object({
  case: EditCaseSchema,
  projectId: z.string(),
});
export const EditCaseResponse = z.object({
  case: CaseSchema,
});

export const AddTestPlanRequest = z.object({
  testPlanName: z.string().min(1),
  projectId: z.string(),
  testCases: z.array(z.string()).optional(),
});
