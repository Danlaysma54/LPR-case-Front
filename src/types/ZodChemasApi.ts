import {
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
  suites: z.array(SuiteDTOSchema),
});

export const AddSuiteRequest = z.object({
  suite: AddSuiteSchema,
  projectId: z.string(),
});

export const AddSuiteResponse = z.string();
