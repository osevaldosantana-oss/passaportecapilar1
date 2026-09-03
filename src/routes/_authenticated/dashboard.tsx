import { createFileRoute, Link } from "@tanstack/react-router";

const pageCss = "\n        /* Custom scrollbar to match luxury aesthetic */\n        ::-webkit-scrollbar {\n            width: 8px;\n        }\n        ::-webkit-scrollbar-track {\n            background: #fff8f7; /* background */\n        }\n        ::-webkit-scrollbar-thumb {\n            background: #dac1bf; /* outline-variant */\n            border-radius: 4px;\n        }\n        ::-webkit-scrollbar-thumb:hover {\n            background: #4A0E0E; /* deep-burgundy */\n        }\n        \n        .chapter-border {\n            border-bottom: 1px solid #dac1bf; /* outline-variant */\n        }\n        \n        .recessed-panel {\n            background-color: #F0EDE4; /* Subtle darker cream for recessed look */\n            box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);\n        }\n        \n        .wax-seal-shadow {\n            box-shadow: 0 4px 12px rgba(139, 0, 0, 0.15); /* using stamp-red tint */\n        }\n    ";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard Profissional — Passaporte Capilar™" },
      { name: "description", content: "Painel do profissional com agenda, clientes ativos e desempenho do salão." },
      { property: "og:title", content: "Dashboard Profissional — Passaporte Capilar™" },
      { property: "og:description", content: "Painel do profissional com agenda, clientes ativos e desempenho do salão." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="bg-background text-on-surface font-body-lg text-body-lg min-h-screen selection:bg-antique-gold selection:text-white">
      <style dangerouslySetInnerHTML={{ __html: pageCss }} />
      <nav className="hidden md:flex h-screen w-64 fixed left-0 top-0 border-r border-outline-variant bg-parchment-white flex-col py-8 px-4 z-50 shadow-[1px_0_0_0_rgba(135,114,112,0.1)]">
        <div className="mb-12 px-4">
          <h1 className="font-display-lg text-[32px] text-deep-burgundy tracking-tight leading-tight">
            Passaporte Capilar™
          </h1>
          <p className="font-metadata text-metadata text-antique-gold mt-2 uppercase tracking-widest">
            Consul de Beleza
          </p>
        </div>
                      <div className="mb-8 px-4">
          <Link to="/atendimento" className="btn-press w-full bg-deep-burgundy text-antique-gold font-label-caps text-label-caps py-4 px-6 rounded hover:bg-primary transition-colors flex items-center justify-center gap-2" style={{ boxShadow: "0 4px 12px rgba(139,0,0,0.15)" }}>
            <span className="material-symbols-outlined text-[18px]">add</span>
            NOVO ATENDIMENTO
          </Link>
        </div>
        <ul className="flex flex-col gap-2 flex-grow font-title-md text-title-md font-label-caps text-[14px]">
          <li>
            <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-bold scale-[0.98] transition-transform duration-150 ease-in-out">
              <span className="material-symbols-outlined">dashboard</span>
              Visão Geral
            </Link>
          </li>
          <li>
            <Link to="/cliente" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg">
              <span className="material-symbols-outlined">group</span>
              Clientes
            </Link>
          </li>
          <li>
            <Link to="/passaporte" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg">
              <span className="material-symbols-outlined">style</span>
              Passaportes
            </Link>
          </li>
          <li>
            <Link to="/chapter-loop" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg">
              <span className="material-symbols-outlined">calendar_today</span>
              Programas
            </Link>
          </li>
          <li>
            <Link to="/brand-studio" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg">
              <span className="material-symbols-outlined">auto_awesome</span>
              Brand Studio
            </Link>
          </li>
          <li>
            <Link to="/identidade/perfil" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-deep-burgundy hover:bg-surface-container-high transition-all rounded-lg">
              <span className="material-symbols-outlined">settings</span>
              Configurações
            </Link>
          </li>
        </ul>
        <div className="mt-auto border-t border-outline-variant pt-4">
          <ul className="flex flex-col gap-2 font-label-caps text-label-caps">
            <li>
              <Link to="/suporte" className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-deep-burgundy transition-colors rounded-lg">
                <span className="material-symbols-outlined text-[16px]">help_outline</span>
                SUPORTE
              </Link>
            </li>
            <li>
              <Link to="/auth" className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-deep-burgundy transition-colors rounded-lg">
                <span className="material-symbols-outlined text-[16px]">logout</span>
                SAIR
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="md:ml-64 min-h-screen flex flex-col">
        <header className="fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] z-40 bg-parchment-white/90 backdrop-blur-md h-16 flex justify-between items-center px-4 md:px-margin-desktop border-b border-outline-variant/30">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-deep-burgundy">
              <span className="material-symbols-outlined">
                menu
              </span>
            </button>
            <div className="relative hidden md:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                search
              </span>
              <input className="pl-10 pr-4 py-2 bg-surface-container rounded-none border-b border-outline-variant focus:border-deep-burgundy focus:ring-0 font-label-caps text-label-caps w-64 text-on-surface placeholder:text-outline transition-colors" placeholder="BUSCAR REGISTROS..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a className="hidden md:flex items-center gap-2 border border-deep-burgundy text-deep-burgundy px-4 py-1.5 rounded-none font-label-caps text-label-caps hover:bg-surface-container-low transition-colors" href="/passaporte">
              <span className="material-symbols-outlined text-[16px]">
                visibility
              </span>
              MODO PASSAPORTE
            </a>
            <div className="flex items-center gap-3 text-deep-burgundy">
              <a className="hover:bg-surface-container-low p-2 rounded-full transition-all relative" href="/notificacoes">
                <span className="material-symbols-outlined">
                  notifications
                </span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-stamp-red rounded-full"></span>
              </a>
              <a className="hover:bg-surface-container-low p-2 rounded-full transition-all" href="/historico">
                <span className="material-symbols-outlined">
                  history_edu
                </span>
              </a>
              <a className="h-8 w-8 rounded-full bg-surface-container border border-outline-variant overflow-hidden ml-2" href="/identidade/perfil">
                <img className="w-full h-full object-cover" data-alt="A macro photography shot of a high-end salon workspace featuring elegant brass styling tools and a soft focus background in a bright, modern, light-mode aesthetic using a sophisticated palette of deep burgundies, crisp whites, and antique gold accents. Professional editorial lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCu88xyucAajWuF9_bP_2T1PEyS8oBLrgiICoaQRpnqe0m6ep-uLJqSV2_6eF73mFKS6vdm78Anhap47ASCBfUx4uVPZzNLibxN3skgGZPo6boFDHUfAZegkIWUttPcLOO3Q6YPweJ6dvGWiegyMcxP6qnC9oT5I13ILp6V3TCIADebi_Olm8VldArDUS7Q2LeWqqMiufo-fBkLwzEuxQZ2YjJdhOsbeaeH3BVJht5MLsw9Y0UTuJWN" />
              </a>
            </div>
          </div>
        </header>
        <main className="flex-grow pt-24 px-4 md:px-margin-desktop pb-24">
          <div className="grid grid-cols-2 gap-4 mb-12 hidden">
            <img alt="Context Image 4" className="w-full h-32 object-cover rounded" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQp8gytjxOEizNeyNZ8PjPdRUnOUzVRptpgd-vxlS0YTxXYel3BRRgeUtnlU9EXP4HVRNG3tz_ifDVYoBW1CcfIU0fd07xhG5ABifspSJZZyVARADHlgzjxxccCEzO8hS_69MolPsIHNGGBMe0HtBjb5l4NdPOHlENrQ3K0JP-OVTxhRacOMzbTKc2Lgjc2oS1FdGgV-FlJs0yCGcxorBS89kG16NUmMAWVT83tym5oP_qRMhI-8E_PfthlmAdkrsiLw" />
            <img alt="Context Image 6" className="w-full h-32 object-cover rounded" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV8D708JylSvCDdnzRExOuFutsYFCHWYxgNSRfKh6jMrC3Yn3Umi9SrBRFUln_K1kP69LeBycbAgEPsTttMOvUOVghq_iauz6noHAvfkK8zrRaHDaLfNBi6Yz4ngjF5-1_pklJOVCMd6SQmgqnANq9cm9kRpPC8583j1oTeWEm43gOPE4o9FgNqfGcLBJhxJBs5RICWGmXm_YLl-7JfXJ6FtaTKY6CnMDNDvQU5ovfzWQ5dyCVarZZY6kDeC2OdlL8dA" />
          </div>
          {/* PLACEHOLDER: dados reais do banco — substitua com fetch dos clientes agendados hoje */}
        <div className="mb-12 chapter-border pb-6 flex justify-between items-end">
            <div>
              <h2 className="font-metadata text-metadata text-antique-gold uppercase tracking-widest mb-2">
                Capítulo 01
              </h2>
              <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-deep-burgundy">
                O que precisa da minha atenção hoje?
              </h1>
            </div>
            <div className="text-right hidden md:block">
              <p className="font-label-caps text-label-caps text-outline">
                DATA DE VALIDAÇÃO
              </p>
              <p className="font-metadata text-[14px] text-on-surface mt-1">
                24 DE OUTUBRO, 2026
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-chapter-gap">
            <div className="card-hover md:col-span-8 bg-parchment-white border border-outline-variant p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTIwIDBMMCAyMGgyMEw0MCAwaC0yMHoiIGZpbGw9IiNkYWMxYmYiIGZpbGwtb3BhY2l0eT0iLjEiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')] opacity-20"></div>
              <div className="flex justify-between items-start mb-12 relative z-10">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface-container-low border border-antique-gold/30 text-antique-gold font-label-caps text-[10px] uppercase tracking-wider mb-4">
                    <span className="material-symbols-outlined text-[12px]">
                      trending_up
                    </span>
                    Métrica Chave
                  </span>
                  <h3 className="font-title-md text-[24px] text-deep-burgundy">
                    Receita Potencial
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 max-w-sm">
                    Valor estimado baseado nos retornos agendados e tratamentos recomendados para os próximos 7 dias.
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-display-lg text-[42px] text-deep-burgundy">
                    R$ 4.250
                  </span>
                  <div className="flex items-center justify-end gap-1 text-green-700 font-label-caps text-[11px] mt-1">
                    <span className="material-symbols-outlined text-[14px]">
                      arrow_upward
                    </span>
                    +12% vs última semana
                  </div>
                </div>
              </div>
              <div className="border-t border-outline-variant/30 pt-6 flex justify-between items-center relative z-10">
                <div className="flex -space-x-3">
                  <img className="w-10 h-10 rounded-full border-2 border-parchment-white object-cover" data-alt="Close up portrait of a sophisticated woman with styled hair in a luxury salon setting, bright soft lighting, editorial style, warm tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCltDR8hmVDKnPbcJD7mX9HsC6H-VscoUhCDhsQ22z049K_w-oY2eQ5gayWJ4tCULvDR6__5m8MPUHMVs9KCzwAd4jYhEoREDSMb0ElvIlIwZNG-xbbgND3DeT3xsVei451VN5hdlgDiWafizJIFfB3kQZHI_OD8f98T0HSGW5eZKRbuN3Q4yYbkYcZodCLNxefLrQgzTIR9riC0ks1jUpj5R7ONgTkhHhl_0mAlhMQlLfaGOHpWRks" />
                  <img className="w-10 h-10 rounded-full border-2 border-parchment-white object-cover" data-alt="Close up portrait of an elegant older woman with silver hair in a high-end beauty clinic, natural light, crisp modern aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCOwNgc6LO0sFG0I27inuu4DMnyec0XJIkasYmRCjpoEzhb6w8I_0ywr9RWbLSh1Slmzu5XBo2S0YF8aITlad8XJ0II_ZO0RNjX7tckYcvILW0nxjpa5aNnL6eulCExYjXvU9EVc0Xa-bEKaJ9uue8noFTEiGtnThf_C_Yb8xkp7TzxWYF84HGDf1bicCIrF8ohdoL90BEzpCRaKUi3t-IwtB9iGuJLDbAHD3ThTzl3UvrCV28rpiE" />
                  <img className="w-10 h-10 rounded-full border-2 border-parchment-white object-cover" data-alt="Profile shot of a professional woman with a sleek bob cut, looking away thoughtfully, illuminated by warm studio light, luxury editorial mood." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMgFl7snnvMjHNFaZA5dJlLlhMFs5zsj79-vKGNtpQF_f1MO_xEWNJRLkrapkq_1CgGIlPkgi5WjM9RQ0Qfoltqu45C3-t-idJhv_dmA6SxL7Kp7r9H211uRiRpwIOh_mbU5EfluO1pK4B5GFCdlKaoVkedcoa84GHsQC8hZtYPdav_GFvgJLjV9ZdieIDhQYUdi9Y1LZ1rddJ0EIyRpG1P6Mnnuv5yhpadHZtoa2xCWOYeCYAr3uG" />
                  <div className="w-10 h-10 rounded-full border-2 border-parchment-white bg-surface-container flex items-center justify-center font-label-caps text-[10px] text-deep-burgundy">
                    +5
                  </div>
                </div>
                <button className="text-deep-burgundy font-label-caps text-[12px] flex items-center gap-1 hover:text-antique-gold transition-colors">
                  VER DETALHES
                  <span className="material-symbols-outlined text-[14px]">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
            <div className="md:col-span-4 bg-surface-container-low border border-outline-variant p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-title-md text-title-md text-deep-burgundy">
                    Atenção Necessária
                  </h3>
                  <span className="w-8 h-8 rounded-full bg-error-container text-on-error-container flex items-center justify-center font-label-caps text-[12px]">
                    3
                  </span>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
                    <div className="flex items-center gap-3">
                      <img className="w-8 h-8 rounded-full object-cover" data-alt="Close up detail of a professional beauty service being performed, focus on hands and high quality tools, bright clinical luxury lighting, parchment and burgundy tones in background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcxAoCzTqNq21JKys3C_79N0cCIXrNKOKMubi5ah2uK5BStALDbbiShO4TUGPu9WPIHXby4UKKu8ENGzqLwc_8Ze1Ig9_QrjMjsw-quQGK-7fduM2dhDQVBz8fnoQ4B5ltpRyJ_ymlAJHX8spvZN8w4cskCtIt7BSDlry4HYapKfPOkWuplVd_4go95JBFYanhVU5A1CGUEMwvjwzHW9qy2GIwLzO9eSNmnARD1tMTW-ekZnLNLmPJ" />
                      <div>
                        <p className="font-body-sm text-[13px] font-semibold text-on-surface">
                          Marina S.
                        </p>
                        <p className="font-metadata text-[10px] text-stamp-red uppercase">
                          Atraso no Retorno
                        </p>
                      </div>
                    </div>
                    <button className="text-outline hover:text-deep-burgundy">
                      <span className="material-symbols-outlined text-[18px]">
                        mail
                      </span>
                    </button>
                  </li>
                  <li className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center font-label-caps text-[10px] text-deep-burgundy">
                        CP
                      </div>
                      <div>
                        <p className="font-body-sm text-[13px] font-semibold text-on-surface">
                          Carolina P.
                        </p>
                        <p className="font-metadata text-[10px] text-antique-gold uppercase">
                          Avaliação Pendente
                        </p>
                      </div>
                    </div>
                    <button className="text-outline hover:text-deep-burgundy">
                      <span className="material-symbols-outlined text-[18px]">
                        edit_document
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
              <button className="w-full mt-6 py-2 border border-deep-burgundy text-deep-burgundy font-label-caps text-[11px] text-center hover:bg-surface-container-high transition-colors">
                VER TODOS
              </button>
            </div>
            <div className="md:col-span-6 bg-parchment-white border border-outline-variant p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-antique-gold">
                    event_available
                  </span>
                  <h3 className="font-title-md text-title-md text-deep-burgundy">
                    Próximos Retornos
                  </h3>
                </div>
                <span className="font-label-caps text-[11px] text-outline">
                  HOJE
                </span>
              </div>
              <div className="recessed-panel p-4 rounded-sm border border-outline-variant/30 space-y-3">
                <div className="flex justify-between items-center bg-white p-3 shadow-sm border border-outline-variant/20">
                  <div className="flex items-center gap-4">
                    <span className="font-label-caps text-[14px] text-deep-burgundy w-12">
                      14:00
                    </span>
                    <div className="w-px h-8 bg-outline-variant/50"></div>
                    <div>
                      <p className="font-body-sm font-semibold text-on-surface">
                        Isabella M.
                      </p>
                      <p className="font-metadata text-[10px] text-on-surface-variant uppercase tracking-wider">
                        Reconstrução Profunda
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-outline-variant text-[20px]">
                    chevron_right
                  </span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 shadow-sm border border-outline-variant/20">
                  <div className="flex items-center gap-4">
                    <span className="font-label-caps text-[14px] text-deep-burgundy w-12">
                      16:30
                    </span>
                    <div className="w-px h-8 bg-outline-variant/50"></div>
                    <div>
                      <p className="font-body-sm font-semibold text-on-surface">
                        Fernanda R.
                      </p>
                      <p className="font-metadata text-[10px] text-on-surface-variant uppercase tracking-wider">
                        Avaliação de Couro
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-outline-variant text-[20px]">
                    chevron_right
                  </span>
                </div>
              </div>
            </div>
            <div className="md:col-span-6 bg-parchment-white border border-outline-variant p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-antique-gold">
                    menu_book
                  </span>
                  <h3 className="font-title-md text-title-md text-deep-burgundy">
                    Próximos Capítulos
                  </h3>
                </div>
                <span className="font-label-caps text-[11px] text-outline">
                  ESTA SEMANA
                </span>
              </div>
              <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-antique-gold/30">
                <div className="relative">
                  <span className="absolute -left-[27px] top-1 w-2 h-2 rounded-full bg-antique-gold ring-4 ring-parchment-white"></span>
                  <p className="font-label-caps text-[10px] text-outline mb-1">
                    AMANHÃ
                  </p>
                  <p className="font-body-sm text-on-surface">
                    Início do programa "Recuperação Pós-Verão" para 2 clientes.
                  </p>
                </div>
                <div className="relative">
                  <span className="absolute -left-[27px] top-1 w-2 h-2 rounded-full border border-antique-gold bg-parchment-white ring-4 ring-parchment-white"></span>
                  <p className="font-label-caps text-[10px] text-outline mb-1">
                    QUI, 26 OUT
                  </p>
                  <p className="font-body-sm text-on-surface">
                    Validação de resultados: Tratamento Fortalecedor (Camila).
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16">
            <div className="mb-8 chapter-border pb-4 flex justify-between items-end">
              <div>
                <h2 className="font-metadata text-metadata text-antique-gold uppercase tracking-widest mb-1">
                  Capítulo 02
                </h2>
                <h3 className="font-title-md text-[20px] text-deep-burgundy">
                  Indicadores Financeiros & Saúde da Carteira
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border border-outline-variant bg-surface p-5 hover:bg-surface-container-low transition-colors group cursor-pointer">
                <p className="font-metadata text-[10px] text-on-surface-variant uppercase tracking-widest mb-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] opacity-70 group-hover:text-antique-gold transition-colors">
                    account_balance_wallet
                  </span>
                  Receita Prevista
                </p>
                <p className="font-display-lg text-[24px] text-deep-burgundy">
                  R$ 12.4K
                </p>
                <p className="font-label-caps text-[9px] text-outline mt-1 text-right">
                  OUTUBRO
                </p>
              </div>
              <div className="border border-outline-variant bg-surface p-5 hover:bg-surface-container-low transition-colors group cursor-pointer">
                <p className="font-metadata text-[10px] text-on-surface-variant uppercase tracking-widest mb-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] opacity-70 group-hover:text-antique-gold transition-colors">
                    repeat
                  </span>
                  Receita Recorrente
                </p>
                <p className="font-display-lg text-[24px] text-deep-burgundy">
                  R$ 8.2K
                </p>
                <p className="font-label-caps text-[9px] text-outline mt-1 text-right">
                  65% DO TOTAL
                </p>
              </div>
              <div className="border border-outline-variant bg-surface p-5 hover:bg-surface-container-low transition-colors group cursor-pointer">
                <p className="font-metadata text-[10px] text-on-surface-variant uppercase tracking-widest mb-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] opacity-70 group-hover:text-antique-gold transition-colors">
                    group
                  </span>
                  Clientes Ativas
                </p>
                <p className="font-display-lg text-[24px] text-deep-burgundy">
                  48
                </p>
                <p className="font-label-caps text-[9px] text-outline mt-1 text-right">
                  +3 ESTE MÊS
                </p>
              </div>
              <div className="border border-outline-variant bg-surface p-5 hover:bg-surface-container-low transition-colors group cursor-pointer">
                <p className="font-metadata text-[10px] text-on-surface-variant uppercase tracking-widest mb-2 flex items-center gap-1 text-stamp-red">
                  <span className="material-symbols-outlined text-[14px] opacity-70">
                    warning
                  </span>
                  Clientes em Risco
                </p>
                <p className="font-display-lg text-[24px] text-stamp-red">
                  5
                </p>
                <p className="font-label-caps text-[9px] text-outline mt-1 text-right">
                  {">"}60 DIAS SEM VISITA
                </p>
              </div>
              <div className="border border-outline-variant bg-surface p-5 hover:bg-surface-container-low transition-colors group cursor-pointer">
                <p className="font-metadata text-[10px] text-on-surface-variant uppercase tracking-widest mb-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] opacity-70 group-hover:text-antique-gold transition-colors">
                    favorite
                  </span>
                  Retenção
                </p>
                <p className="font-display-lg text-[24px] text-deep-burgundy">
                  92%
                </p>
                <p className="font-label-caps text-[9px] text-outline mt-1 text-right">
                  YTD
                </p>
              </div>
              <div className="border border-outline-variant bg-surface p-5 hover:bg-surface-container-low transition-colors group cursor-pointer">
                <p className="font-metadata text-[10px] text-on-surface-variant uppercase tracking-widest mb-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] opacity-70 group-hover:text-antique-gold transition-colors">
                    receipt_long
                  </span>
                  Ticket Médio
                </p>
                <p className="font-display-lg text-[24px] text-deep-burgundy">
                  R$ 285
                </p>
                <p className="font-label-caps text-[9px] text-outline mt-1 text-right">
                  POR VISITA
                </p>
              </div>
              <div className="border border-outline-variant bg-surface p-5 hover:bg-surface-container-low transition-colors group cursor-pointer">
                <p className="font-metadata text-[10px] text-on-surface-variant uppercase tracking-widest mb-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] opacity-70 group-hover:text-antique-gold transition-colors">
                    all_inclusive
                  </span>
                  LTV
                </p>
                <p className="font-display-lg text-[24px] text-deep-burgundy">
                  R$ 3.4K
                </p>
                <p className="font-label-caps text-[9px] text-outline mt-1 text-right">
                  MÉDIA GLOBAL
                </p>
              </div>
              <div className="border border-outline-variant bg-surface p-5 hover:bg-surface-container-low transition-colors group cursor-pointer bg-deep-burgundy text-parchment-white">
                <p className="font-metadata text-[10px] text-parchment-white/70 uppercase tracking-widest mb-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    stars
                  </span>
                  Memberships
                </p>
                <p className="font-display-lg text-[24px] text-antique-gold">
                  12
                </p>
                <p className="font-label-caps text-[9px] text-parchment-white/50 mt-1 text-right">
                  ATIVOS
                </p>
              </div>
            </div>
          </div>
          <div className="mt-24 text-center pb-8 opacity-30">
            <span className="material-symbols-outlined text-[32px] text-deep-burgundy">
              verified
            </span>
            <p className="font-label-caps text-[10px] mt-2 tracking-widest text-deep-burgundy">
              REGISTRO OFICIAL • PASSAPORTE CAPILAR™
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
