# SOS Ansiedade — Quiz "Qual é o seu padrão nas crises?"

Implementação da spec v1.0 (6/jul/2026), Etapa 5 do MAPA MAESTRO.

Este diretório é um app **independente** (Vite + React + TS + Tailwind + 2 funções
serverless). Não depende de nada do restante do repositório — a ideia é apontar um
projeto Vercel **novo** para este subdiretório como *Root Directory*.

## Deploy — passos manuais (Maxi)

1. **Criar projeto Vercel novo** chamado `sos-ansiedade-quiz`, importando este
   repositório e configurando **Root Directory = `quiz`**.
   - **Nunca** reaproveitar os projetos `sos-ansiedade-lp` ou `app-s-o-s-ansiedad-pt-app`.
2. No projeto novo, instalar a integração **Upstash Redis** pelo Marketplace da
   Vercel (Vercel KV foi descontinuado). Ela injeta sozinha `KV_REST_API_URL` e
   `KV_REST_API_TOKEN`.
3. Configurar as env vars do projeto:
   - `LEADS_EXPORT_KEY` — string aleatória longa (ex.: `openssl rand -hex 32`).
   - `VITE_META_PIXEL_ID=1054129317181548` (**nunca** `641071370521487`).
4. **Pendente:** URL real da política de privacidade. Por enquanto o footer e o
   email-gate linkam para `/privacidade.html` (página simples já incluída neste
   diretório em `public/privacidade.html`) — troque o link em `src/quiz.config.ts`
   (`emailGate.privacyUrl` e `footer.privacyUrl`) se/quando existir uma página oficial.
5. **Pendente:** valor real da parcela 12x do checkout Hotmart. Enquanto isso, a
   oferta mostra apenas "Cartão em até 12x" (sem valor estimado) — ver
   `COPY.offer.paymentLine` em `src/quiz.config.ts`.
6. Rodar o QA da seção 8 da spec e depois a compra de teste ponta a ponta.

## Desenvolvimento local

```bash
cd quiz
npm install
cp .env.example .env.local   # preencher com os valores de dev/staging
npm run dev
```

`npm run build` roda `tsc --noEmit` e depois `vite build`.

## Estrutura

- `src/quiz.config.ts` — única fonte de verdade: perguntas, pontuação, perfis,
  copy e oferta. Editar só este arquivo para mudar conteúdo.
- `src/lib/scoring.ts` — cálculo de perfil (A/B/C) e score de sobrecarga.
- `src/lib/track.ts` — wrapper do Meta Pixel (com guard).
- `src/lib/storage.ts` — persistência em `sessionStorage`.
- `api/lead.ts` — `POST /api/lead` (honeypot, validação, rate limit, Upstash).
- `api/leads.ts` — `GET /api/leads?key=...` (export CSV).

## O que NUNCA sai do navegador

Respostas do quiz, perfil calculado e score ficam só em `sessionStorage`. Ao
backend só vai `{ email, consent, src, ts }`. Ao Meta Pixel só vão eventos de
passo (`QuizStep` com `{ step }`), nunca respostas/perfil/score.
