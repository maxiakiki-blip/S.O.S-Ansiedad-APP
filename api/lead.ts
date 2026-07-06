import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_SECONDS = 60;

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress ?? 'unknown';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body ?? {};
  const { email, consent, src, website } = body as {
    email?: string;
    consent?: boolean;
    src?: string;
    website?: string;
  };

  // Honeypot: bots preenchem este campo invisível.
  if (typeof website === 'string' && website.trim().length > 0) {
    res.status(200).json({ ok: true });
    return;
  }

  if (typeof email !== 'string' || email.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(email)) {
    res.status(400).json({ ok: false, error: 'invalid_email' });
    return;
  }

  const ip = getClientIp(req);
  const rateLimitKey = `ratelimit:lead:${ip}`;
  const count = await redis.incr(rateLimitKey);
  if (count === 1) {
    await redis.expire(rateLimitKey, RATE_LIMIT_WINDOW_SECONDS);
  }
  if (count > RATE_LIMIT_MAX) {
    res.status(429).json({ ok: false, error: 'rate_limited' });
    return;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const added = await redis.sadd('leads:emails', normalizedEmail);
  if (added === 0) {
    res.status(200).json({ ok: true });
    return;
  }

  const record = {
    email: normalizedEmail,
    consent: Boolean(consent),
    src: src === 'quizsos' ? src : 'quizsos',
    ts: new Date().toISOString(),
  };
  await redis.lpush('leads:list', JSON.stringify(record));

  res.status(200).json({ ok: true });
}
