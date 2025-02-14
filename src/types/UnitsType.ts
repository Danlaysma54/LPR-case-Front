import z from "zod";

import {
  AddSuiteRequest,
  AddSuiteResponse,
  EditSuiteRequest,
  EditSuiteResponse,
  GetOneLevelDataRequest,
  GetOneLevelDataResponse,
  GetProjectByIdRequest,
  GetProjectByIdResponse,
  GetSuitesByProjectIdRequest,
  GetSuitesByProjectIdResponse,
} from "src/types/ZodChemasApi";
import {
  CaseSchema,
  ProjectSchema,
  SuiteContentSchema,
  SuiteSchema,
} from "src/types/ZodSchemasObjects";

export type SuiteType = z.infer<typeof SuiteSchema>;
export type CaseType = z.infer<typeof CaseSchema>;
export type Project = z.infer<typeof ProjectSchema>;

export type GetOneLevelDataRequestType = z.infer<typeof GetOneLevelDataRequest>;
export type GetOneLevelDataResponseType = z.infer<
  typeof GetOneLevelDataResponse
>;

export type GetProjectByIdRequestType = z.infer<typeof GetProjectByIdRequest>;
export type GetProjectByIdResponseType = z.infer<typeof GetProjectByIdResponse>;

export type GetSuitesByProjectIdRequestType = z.infer<
  typeof GetSuitesByProjectIdRequest
>;
export type GetSuitesByProjectIdResponseType = z.infer<
  typeof GetSuitesByProjectIdResponse
>;

export type SuiteContentType = z.infer<typeof SuiteContentSchema>;

export type AddSuiteRequestType = z.infer<typeof AddSuiteRequest>;
export type AddSuiteResponseType = z.infer<typeof AddSuiteResponse>;

export type EditSuiteRequestType = z.infer<typeof EditSuiteRequest>;
export type EditSuiteResponseType = z.infer<typeof EditSuiteResponse>;
