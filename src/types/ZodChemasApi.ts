import { CaseSchema, ProjectSchema, SuiteSchema } from "src/types/ZodSchemasObjects";
import z from "zod";

export const GetOneLevelDataRequest = z.object({
  projectId : z.string().min(1),
  suiteId : z.string().min(1)
})

export const GetOneLevelDataResponse = z.object({
  suites: z.array(SuiteSchema),
  cases: z.array(CaseSchema),
  suiteName: z.string().min(1),
  suiteId: z.string().min(1)
})

export const GetProjectByIdRequest = z.object({
  projectId : z.string().min(1),
})

export const GetProjectByIdResponse = z.object({
  project: ProjectSchema,
  casesCount: z.number().nonnegative(),
  suitesCount: z.number().nonnegative()
})