import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Administração — Passaporte Capilar™" },
      { name: "description", content: "Painel de administração: gerencie clientes, profissionais e papéis no Passaporte Capilar." },
    ],
  }),
});
