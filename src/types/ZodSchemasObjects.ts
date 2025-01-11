import { SuiteContentType } from "src/types/UnitsType";
import z from "zod";

export const ProjectSchema = z.object({
  projectId: z.string().min(1),
  projectName: z.string().min(3),
  projectShortName: z.string().min(1),
  projectDescription: z.string().min(1)
})
export type SuiteType = {
  suiteRootId: string;
  suiteId: string;
  suiteName: string;
  numberOfChild: number;
  isOpened?: boolean | null;
  children?: SuiteContentType
};
export const SuiteSchema: z.ZodType<SuiteType> = z.lazy(() => z.object({
  suiteRootId: z.string().min(1),
  suiteId: z.string().min(1),
  suiteName: z.string().min(1),
  numberOfChild: z.number(),
  isOpened: z.boolean().nullish(),
  children: SuiteContentSchema.optional()
}))

export const CaseSchema = z.object( {
  name: z.string().min(1),
  serialNumber: z.number().min(1),
  caseId: z.string().min(1)
})

export const SuiteContentSchema = z.object({
  suites: z.array(z.lazy(() => SuiteSchema)),
  cases: z.array(CaseSchema),
})
