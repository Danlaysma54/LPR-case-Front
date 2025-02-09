import { SuiteContentType } from "src/types/UnitsType";
import z from "zod";

export const ProjectSchema = z.object({
  projectId: z.string().min(1),
  projectName: z.string().min(3),
  projectShortName: z.string().min(1),
  projectDescription: z.string().min(1),
});
export type SuiteType = {
  suiteRootId: string;
  suiteId: string;
  suiteName: string;
  numberOfChild: number;
  isOpened?: boolean | null;
  hasChildSuites?: boolean;
  children?: SuiteContentType;
};

export const SuiteSchema: z.ZodType<SuiteType> = z.lazy(() =>
  z.object({
    suiteRootId: z.string().min(1),
    suiteId: z.string().min(1),
    suiteName: z.string().min(1),
    numberOfChild: z.number(),
    isOpened: z.boolean().nullish(),
    children: SuiteContentSchema.optional(),
    hasChildSuites: z.boolean().optional(),
  }),
);

export const CaseSchema = z.object({
  caseName: z.string().min(1),
  caseId: z.string().min(1),
  automationStatusId: z.string().min(1).optional(),
  layerId: z.string().min(1).optional(),
});

export const SuiteContentSchema = z.object({
  suites: z.array(z.lazy(() => SuiteSchema)),
  cases: z.array(CaseSchema),
});

export const SuiteDTOSchema: z.ZodSchema = z.lazy(() =>
  z.object({
    suiteName: z.string().min(1),
    suiteId: z.string().min(1),
    children: z.array(SuiteDTOSchema).optional(),
  }),
);

export const AddSuiteSchema = z.object({
  suiteName: z.string().min(1),
  suiteRootId: z.string().min(1),
});

export const AddCaseSchema = z.object({
  testCaseName: z.string().min(1),
  layerId: z.string().min(1),
  suiteId: z.string().min(1),
  isAutomatedId: z.string().min(1),
});
export const EditCaseSchema = z.object({
  testCaseId: z.string().min(1),
  testCaseName: z.string().min(1),
  layer: z.string().min(1),
  suiteId: z.string().min(1),
  isAutomated: z.string().min(1),
});

export const LayerSchema = z.object({
  layerName: z.string().min(1),
  layerId: z.string().min(1),
});

export const AutomationStatusSchema = z.object({
  automationStatusId: z.string().min(1),
  name: z.string().min(1),
});
