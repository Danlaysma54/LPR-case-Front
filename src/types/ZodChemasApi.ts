import { SuiteSchema } from "src/types/ZodSchemasObjects";
import z from "zod";

export const GetOneLevelDataRequest = z.object({
  projectId : z.string().min(1),
  suiteId : z.string().min(1)
})

export const GetOneLevelDataResponse = z.object({
  suites: z.array(SuiteSchema),
  cases: z.array(SuiteSchema)
})