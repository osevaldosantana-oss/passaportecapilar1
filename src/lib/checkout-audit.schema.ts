import { z } from "zod";

export const checkoutStepSchema = z.enum(["criacao", "carimbo", "sincronizacao"]);

export type CheckoutStep = z.infer<typeof checkoutStepSchema>;

export const stepLabels: Record<CheckoutStep, string> = {
  criacao: "Criação",
  carimbo: "Carimbo",
  sincronizacao: "Sincronização",
};

export const stepColors: Record<CheckoutStep, string> = {
  criacao: "#C5A059",
  carimbo: "#4A0E0E",
  sincronizacao: "#877270",
};

export const stepIcons: Record<CheckoutStep, string> = {
  criacao: "add_circle",
  carimbo: "verified",
  sincronizacao: "sync",
};

export const checkoutStatusSchema = z.enum(["concluido", "pendente", "cancelado"]);

export type CheckoutStatus = z.infer<typeof checkoutStatusSchema>;

export const statusLabels: Record<CheckoutStatus, string> = {
  concluido: "Concluído",
  pendente: "Pendente",
  cancelado: "Cancelado",
};

const logInputSchema = z.object({
  step: checkoutStepSchema,
  chapter: z.string().trim().max(160).optional(),
  clientId: z.string().uuid().optional(),
  clientName: z.string().trim().max(160).optional(),
  professionalName: z.string().trim().max(160).optional(),
  status: checkoutStatusSchema.optional(),
  details: z.record(z.string().max(80), z.union([z.string().max(500), z.number(), z.boolean()]))
    .refine((details) => Object.keys(details).length <= 30, "Detalhes demais")
    .optional(),
});

const listInputSchema = z.object({
  step: checkoutStepSchema.optional(),
  limit: z.number().int().min(1).max(500).optional(),
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

export type CheckoutReportRow = CheckoutEvent & {
  client_id: string | null;
  client_name: string | null;
  professional_name: string | null;
  status: CheckoutStatus;
};
