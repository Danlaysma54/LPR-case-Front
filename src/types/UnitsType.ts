import z from "zod";

import {
  AddCaseRequest,
  AddCaseResponse,
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
  RemoveSuiteRequest,
} from "src/types/ZodChemasApi";
import {
  AutomationStatusSchema,
  CaseSchema,
  LayerSchema,
  ProjectSchema,
  SuiteContentSchema,
  SuiteSchema,
} from "src/types/ZodSchemasObjects";

export type SuiteType = z.infer<typeof SuiteSchema>;
export type CaseType = z.infer<typeof CaseSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type LayerType = z.infer<typeof LayerSchema>;
export type AutomationStatusType = z.infer<typeof AutomationStatusSchema>;

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

export type RemoveSuiteRequestType = z.infer<typeof RemoveSuiteRequest>;

export type AddCaseRequestType = z.infer<typeof AddCaseRequest>;
export type AddCaseResponseType = z.infer<typeof AddCaseResponse>;
