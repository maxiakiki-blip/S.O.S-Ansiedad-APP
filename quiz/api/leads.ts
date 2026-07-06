import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

interface LeadRecord {
  email: string;
  consent: boolean;
  src: string;
  ts: string;
}

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const key = req.query.key;
  const exportKey = process.env.LEADS_EXPORT_KEY;

  if (!exportKey || key !== exportKey) {
    res.status(404).end();
    return;
  }

  const rawList = await redis.lrange<string>('leads:list', 0, -1);
  const rows: LeadRecord[] = rawList
    .map((raw) => {
      try {
        return (typeof raw === 'string' ? JSON.parse(raw) : raw) as LeadRecord;
      } catch {
        return null;
      }
    })
    .filter((r): r is LeadRecord => r !== null);

  const header = 'email,consent,src,ts';
  const lines = rows.map((r) => [csvEscape(r.email), String(r.consent), csvEscape(r.src), csvEscape(r.ts)].join(','));
  const csv = [header, ...lines].join('\n');

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="leads.csv"');
  res.status(200).send(csv);
}
