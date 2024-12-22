import z from "zod";

export const ProjectSchema = z.object({
  projectId: z.string().min(1),
  projectName: z.string().min(3),
  projectShortName: z.string().min(1),
  projectDescription: z.string().min(1)
})

export const SuiteSchema = z.object({
  suiteRootId: z.string().min(1),
  suiteId: z.string().min(1),
  suiteName: z.string().min(1),
  numberOfChild: z.number()
})

export const CaseSchema = z.object( {
  name: z.string().min(1)
})
