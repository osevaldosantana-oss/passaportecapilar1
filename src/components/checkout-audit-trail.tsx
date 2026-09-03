import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listCheckoutEvents, logCheckoutEvent } from "@/lib/checkout-audit.functions";
import { stepLabels, type CheckoutEvent, type CheckoutStep } from "@/lib/checkout-audit.schema";

export function useCheckoutAudit(step: CheckoutStep) {
  const queryClient = useQueryClient();
  const log = useServerFn(logCheckoutEvent);
  const list = useServerFn(listCheckoutEvents);

  const events = useQuery({
    queryKey: ["checkout-events", step],
    queryFn: () => list({ data: { step, limit: 10 } }) as Promise<CheckoutEvent[]>,
  });

  const record = useMutation({
    mutationFn: (input: { chapter?: string; details?: Record<string, string | number | boolean> }) =>
      log({ data: { step, ...input } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["checkout-events", step] }),
  });

  return { events, record };
}

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function CheckoutAuditTrail({
  step,
  events,
  isLoading,
  error,
}: {
  step: CheckoutStep;
  events: CheckoutEvent[] | undefined;
  isLoading: boolean;
  error?: string | null;
}) {
  return (
    <section className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/50 mt-6">
      <h4 className="font-title-md text-title-md text-deep-burgundy mb-1 flex items-center gap-2">
        <span className="material-symbols-outlined text-antique-gold">history_edu</span>
        Registro de Auditoria
      </h4>
      <p className="font-metadata text-metadata text-on-surface-variant uppercase mb-4">
        {stepLabels[step]}
      </p>

      {error ? (
        <p className="font-body-sm text-body-sm text-stamp-red">{error}</p>
      ) : isLoading ? (
        <p className="font-body-sm text-body-sm text-on-surface-variant">Carregando registros...</p>
      ) : !events || events.length === 0 ? (
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Nenhum evento registrado nesta etapa ainda.
        </p>
      ) : (
        <ol className="space-y-3">
          {events.map((event) => (
            <li key={event.id} className="flex items-start gap-3 border-b border-outline-variant/40 pb-3 last:border-0 last:pb-0">
              <span className="material-symbols-outlined text-antique-gold text-base mt-0.5">check_small</span>
              <div>
                <p className="font-body-sm text-body-sm text-on-surface">
                  {event.chapter ?? stepLabels[event.step]}
                </p>
                <p className="font-metadata text-metadata text-on-surface-variant uppercase">
                  {dateFormatter.format(new Date(event.created_at))}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
