import { z } from "zod";

export const checkoutStepSchema = z.enum(["criacao", "carimbo", "sincronizacao"]);

export type CheckoutStep = z.infer<typeof checkoutStepSchema>;

export const stepLabels: Record<CheckoutStep, string> = {
  criacao: "Criação do check-out",
  carimbo: "Carimbo do passaporte",
  sincronizacao: "Sincronização do passaporte",
};

const logInputSchema = z.object({
  step: checkoutStepSchema,
  chapter: z.string().trim().max(160).optional(),
  details: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional(),
});

const listInputSchema = z.object({
  step: checkoutStepSchema.optional(),
  limit: z.number().int().min(1).max(50).optional(),
});

export const parseLogInput = (input: unknown) => logInputSchema.parse(input);
export const parseListInput = (input: unknown) => listInputSchema.parse(input ?? {});

export type CheckoutEvent = {
  id: string;
  step: CheckoutStep;
  chapter: string | null;
  details: unknown;
  created_at: string;
};
