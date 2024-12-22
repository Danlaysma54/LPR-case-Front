import z from "zod";

import { CaseSchema, ProjectSchema, SuiteSchema } from "src/types/ZodSchemasObjects";
import { GetOneLevelDataRequest, GetOneLevelDataResponse } from "@/types/ZodChemasApi";

export type SuiteType = z.infer<typeof SuiteSchema>
export type CaseType = z.infer<typeof CaseSchema>
export type Project = z.infer<typeof ProjectSchema>

export type GetOneLevelDataRequestType = z.infer<typeof GetOneLevelDataRequest>
export type GetOneLevelDataResponseType = z.infer<typeof GetOneLevelDataResponse>;