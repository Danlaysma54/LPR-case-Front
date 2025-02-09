import {
  AddCaseSchema,
  AddSuiteSchema,
  CaseSchema,
  ProjectSchema,
  SuiteDTOSchema,
  SuiteSchema,
} from "src/types/ZodSchemasObjects";
import z from "zod";

export const GetOneLevelDataRequest = z.object({
  projectId: z.string().min(1),
  suiteId: z.string().min(1),
  offset: z.number().min(0),
  limit: z.number().min(1),
});

export const GetOneLevelDataResponse = z.object({
  suites: z.array(SuiteSchema),
  cases: z.array(CaseSchema),
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
