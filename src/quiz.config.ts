// Única fuente de verdad del quiz: preguntas, puntajes, perfiles, copy y oferta.
// Editar solo este archivo para cambiar contenido — no tocar los componentes.

export type ProfileCode = 'A' | 'B' | 'C';

export interface QuizOption {
  id: string;
  label: string;
  pA: number;
  pB: number;
  pC: number;
  i: number;
}

export interface QuizQuestion {
  id: string;
  title: string;
  options: QuizOption[];
}

export const QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    title: 'Quando a crise chega, onde ela bate primeiro?',
    options: [
      { id: 'a', label: 'No corpo: coração acelerado, falta de ar, aperto no peito', pA: 3, pB: 0, pC: 0, i: 3 },
      { id: 'b', label: 'Na cabeça: pensamentos disparados, medo de perder o controle', pA: 0, pB: 3, pC: 0, i: 3 },
      { id: 'c', label: 'Nos dois ao mesmo tempo — é uma avalanche', pA: 2, pB: 2, pC: 0, i: 3 },
      { id: 'd', label: 'Não é bem uma explosão: é um alerta ligado o tempo todo', pA: 0, pB: 0, pC: 3, i: 2 },
    ],
  },
  {
    id: 'q2',
    title: 'No pico da crise, o que mais passa pela sua cabeça?',
    options: [
      { id: 'a', label: 'Estou infartando / vou desmaiar / vou morrer', pA: 3, pB: 0, pC: 0, i: 3 },
      { id: 'b', label: 'Vou enlouquecer / vou perder o controle aqui', pA: 0, pB: 3, pC: 0, i: 3 },
      { id: 'c', label: 'Eu preciso sair daqui AGORA', pA: 0, pB: 1, pC: 2, i: 2 },
      { id: 'd', label: 'De novo não… quando isso vai acabar?', pA: 0, pB: 0, pC: 2, i: 2 },
    ],
  },
  {
    id: 'q3',
    title: 'E quando a crise passa, como você fica?',
    options: [
      { id: 'a', label: 'Exausto(a), como se o corpo tivesse corrido uma maratona', pA: 2, pB: 0, pC: 0, i: 2 },
      { id: 'b', label: 'Revivendo tudo na cabeça, me julgando', pA: 0, pB: 3, pC: 0, i: 2 },
      { id: 'c', label: 'Com medo da próxima', pA: 0, pB: 0, pC: 3, i: 2 },
      { id: 'd', label: 'Sigo o dia, mas fico no "modo alerta"', pA: 0, pB: 0, pC: 1, i: 1 },
    ],
  },
  {
    id: 'q4',
    title: 'Com que frequência isso aparece na sua vida hoje?',
    options: [
      { id: 'a', label: 'Quase todo dia', pA: 0, pB: 0, pC: 0, i: 3 },
      { id: 'b', label: 'Algumas vezes por semana', pA: 0, pB: 0, pC: 0, i: 2 },
      { id: 'c', label: 'Algumas vezes por mês', pA: 0, pB: 0, pC: 0, i: 1 },
      { id: 'd', label: 'De vez em quando — mas quando vem, é forte', pA: 0, pB: 0, pC: 0, i: 2 },
    ],
  },
  {
    id: 'q5',
    title: 'O que você já tentou na hora da crise?',
    options: [
      { id: 'a', label: 'Vídeos de respiração no YouTube', pA: 0, pB: 0, pC: 0, i: 0 },
      { id: 'b', label: 'Apps de meditação', pA: 0, pB: 0, pC: 0, i: 0 },
      { id: 'c', label: 'Nada — só espero passar', pA: 0, pB: 0, pC: 0, i: 0 },
      { id: 'd', label: 'Terapia ou acompanhamento profissional', pA: 0, pB: 0, pC: 0, i: 0 },
    ],
  },
  {
    id: 'q6',
    title: 'Entre uma crise e outra, como é a sua vida?',
    options: [
      { id: 'a', label: 'Normal — até a próxima chegar do nada', pA: 2, pB: 0, pC: 0, i: 1 },
      { id: 'b', label: 'Tenso(a), esperando a próxima', pA: 0, pB: 0, pC: 3, i: 2 },
      { id: 'c', label: 'Evito lugares ou situações que podem disparar', pA: 0, pB: 0, pC: 3, i: 3 },
      { id: 'd', label: 'Minha cabeça não desliga nunca', pA: 0, pB: 3, pC: 0, i: 2 },
    ],
  },
  {
    id: 'q7',
    title: 'Última: se existisse um passo a passo simples pra usar NA HORA da crise, você toparia testar na próxima?',
    options: [
      { id: 'a', label: 'Sim — eu preciso disso', pA: 0, pB: 0, pC: 0, i: 1 },
      { id: 'b', label: 'Sim, se for simples de verdade', pA: 0, pB: 0, pC: 0, i: 0 },
      { id: 'c', label: 'Não sei… já tentei de tudo', pA: 0, pB: 0, pC: 0, i: 0 },
    ],
  },
];

// Q5 no puntúa: solo define la variante del interstitial.
export const INTERSTITIAL_QUESTION_ID = 'q5';

export const MAX_INTENSITY = 15;

export type OverloadBand = 'leve' | 'moderada' | 'intensa';

export function getOverloadBand(score: number): OverloadBand {
  if (score <= 40) return 'leve';
  if (score <= 70) return 'moderada';
  return 'intensa';
}

export const OVERLOAD_BAND_LABEL: Record<OverloadBand, string> = {
  leve: 'Leve',
  moderada: 'Moderada',
  intensa: 'Intensa',
};

export const OVERLOAD_BAND_LINE: Record<OverloadBand, string> = {
  leve: 'Suas crises hoje são mais leves — e esse é o melhor momento pra aprender a desligá-las antes que cresçam.',
  moderada: 'Suas crises já estão pesando na sua rotina — e dá pra mudar isso com método.',
  intensa: 'Intensa não significa perigosa. Significa que o seu corpo está pedindo um método — não mais força de vontade.',
};

export const INTERSTITIAL_LINE_1: Record<string, string> = {
  a: 'Se vídeo de respiração nunca segurou uma crise sua no pico, o problema não é você.',
  b: 'Meditação é ótima pra prevenir. Mas no pico da crise, um cérebro em alarme não medita.',
  c: '"Esperar passar" até funciona — mas a um custo alto: cada crise sem resposta ensina o cérebro a temer a próxima.',
  d: 'Terapia constrói a base. Mas na hora H, entre uma sessão e outra, você precisa de uma ferramenta no bolso.',
};

export const INTERSTITIAL_LINE_2 =
  'No pico, instrução solta não entra. O cérebro em alarme precisa de um caminho guiado — um passo puxando o outro, na ordem certa. É exatamente isso que você vai ver no seu resultado.';

export interface ProtocolStep {
  order: 1 | 2 | 3;
  title: string;
}

export const PROTOCOL_STEPS: ProtocolStep[] = [
  { order: 1, title: 'Respiração guiada' },
  { order: 2, title: 'Aterramento (grounding)' },
  { order: 3, title: 'Abraço da borboleta' },
];

export const PROTOCOL_FIXED_LINE =
  'A ordem é sempre a mesma — é ela que faz o protocolo funcionar. Respiração prepara o corpo, aterramento traz a mente de volta, e a borboleta consolida a calma.';

export interface ProfileContent {
  code: ProfileCode;
  name: string;
  anchorStep: 1 | 2 | 3;
  whatItMeans: string;
  bridgeLine: string;
}

export const PROFILES: Record<ProfileCode, ProfileContent> = {
  A: {
    code: 'A',
    name: 'Tempestade no Corpo',
    anchorStep: 1,
    whatItMeans:
      'Sua crise fala a língua do corpo: coração disparado, falta de ar, aperto no peito. E aí vem o pensamento mais assustador de todos — "tem algo errado comigo". Esse medo acelera ainda mais o corpo, que assusta ainda mais a mente. É um ciclo. A boa notícia: todo ciclo tem um ponto de entrada. No seu caso, é a respiração — o único "botão" do sistema nervoso que você controla direto.',
    bridgeLine:
      'O SOS Ansiedade te guia nessa respiração com ritmo visual na tela, na hora do pico — sem depender de você lembrar de nada de cabeça.',
  },
  B: {
    code: 'B',
    name: 'Mente em Espiral',
    anchorStep: 2,
    whatItMeans:
      'Sua crise começa como um pensamento que puxa outro, que puxa outro — até você estar num lugar escuro que a realidade não confirma. Brigar com o pensamento não funciona: quanto mais você discute com ele, mais ele cresce. O que funciona é tirar o cérebro da espiral e trazer ele de volta pro AGORA, pelos cinco sentidos. Isso tem nome: aterramento.',
    bridgeLine:
      'No SOS Ansiedade, a respiração abre caminho e o aterramento vem guiado passo a passo — você só segue a tela.',
  },
  C: {
    code: 'C',
    name: 'Alerta Ligado',
    anchorStep: 3,
    whatItMeans:
      'Pra você, o pior nem sempre é a crise — é viver esperando ela. O corpo fica de sentinela, você evita lugares, e a vida vai ficando menor. Esse alerta constante é o sistema nervoso "armado". E ele não desarma com pensamento positivo: desarma com regulação — sinais físicos repetidos de segurança. É isso que o abraço da borboleta faz (técnica de estabilização usada em EMDR): estimulação bilateral que ajuda o corpo a sair do modo alerta.',
    bridgeLine:
      'No SOS Ansiedade, a borboleta vem guiada no ritmo certo — e o protocolo completo treina seu corpo a desarmar mais rápido a cada uso.',
  },
};

// Desempate: gana el perfil de la opción elegida en Q1; si Q1 fue "nos dois" (c) o persiste el empate → A > B > C.
export const TIEBREAK_ORDER: ProfileCode[] = ['A', 'B', 'C'];

export const COPY = {
  intro: {
    eyebrow: 'TESTE GRATUITO · 2 MINUTOS',
    title: 'Qual é o seu padrão nas crises de ansiedade?',
    subtitle:
      'Responda 7 perguntas e descubra onde a sua crise começa — e qual passo do protocolo SOS desliga ela primeiro.',
    cta: 'Começar o teste →',
    microcopy: 'Sem cadastro pra começar. Suas respostas não saem do seu aparelho.',
  },
  interstitial: {
    title: 'Antes do seu resultado, uma coisa importante 👇',
    cta: 'Entendi, continuar →',
  },
  loading: {
    messages: ['Analisando suas respostas…', 'Identificando seu padrão nas crises…', 'Preparando seu resultado…'],
    durationMs: 2500,
  },
  emailGate: {
    title: 'Seu resultado está pronto ✅',
    text: 'Deixe seu e-mail pra desbloquear o seu perfil de crise:',
    placeholder: 'seu@email.com',
    consentLabel: 'Quero receber dicas do SOS Ansiedade por e-mail (opcional)',
    cta: 'Ver meu resultado →',
    lgpdMicrocopy: 'Usamos seu e-mail só pra isso que está escrito aqui. Sem spam, sem venda de dados.',
    privacyLinkLabel: 'Política de privacidade',
    privacyUrl: '/privacidade.html',
    errorInvalidEmail: 'Ops — confere o e-mail? 🙂',
  },
  result: {
    eyebrow: 'SEU RESULTADO',
    scoreMicrocopy: 'Isso reflete o que você contou — não é um diagnóstico.',
    whatItMeansTitle: 'O que isso significa',
    protocolTitle: 'O caminho: o Protocolo SOS de 3 passos',
    anchorBadge: '⭐ É AQUI QUE VOCÊ SENTE O ALÍVIO PRIMEIRO',
  },
  offer: {
    title: 'O app que te guia NA hora da crise',
    text:
      'O SOS Ansiedade não é curso, não é conteúdo pra "assistir depois". É uma ferramenta: você abre no pico e ela te conduz pelos 3 passos, na ordem, até o corpo baixar.',
    stack: [
      { label: 'App SOS Ansiedade — acesso vitalício', value: 'R$297' },
      { label: 'Bônus 1 · Vídeo-guia exclusivo', value: 'R$67' },
      { label: 'Bônus 2 · Podcast de acompanhamento', value: 'R$47' },
      { label: 'Bônus 3 · Guia interativo em PDF (12 páginas, 97 campos)', value: 'R$86' },
    ],
    totalCrossedOut: 'R$497',
    totalHighlighted: 'Hoje: R$247',
    // PENDENTE DE MAXI: valor real da parcela 12x tirado do checkout Hotmart. Não estimar.
    paymentLine: 'Pix · Cartão em até 12x · Boleto',
    guarantee: '7 dias de garantia incondicional pela Hotmart. Testou e não é pra você? Reembolso integral, sem perguntas.',
    ctaLabel: 'Quero o SOS Ansiedade por R$247 →',
    ctaUrl: 'https://pay.hotmart.com/L106226605F?src=quizsos',
    secondaryLinkLabel: 'Prefere ver todos os detalhes antes? Conheça a página completa do app →',
    secondaryLinkUrl: 'https://sos-ansiedade-lp.vercel.app/',
    urgencyLine: 'R$247 é o preço promocional de lançamento.',
  },
  footer: {
    lines: [
      'O SOS Ansiedade é uma ferramenta de bem-estar baseada em técnicas de TCC e EMDR.',
      'Ele não substitui diagnóstico, terapia ou tratamento médico — e este teste não é um instrumento clínico.',
      '',
      'Se você está em sofrimento intenso ou pensando em se machucar, ligue agora para o CVV: 188 (24 horas, gratuito) ou acesse cvv.org.br.',
    ],
    supportEmail: 'maxiakiki@hotmail.com',
    privacyLinkLabel: 'Política de privacidade',
    privacyUrl: '/privacidade.html',
  },
  backLabel: '← Voltar',
};
