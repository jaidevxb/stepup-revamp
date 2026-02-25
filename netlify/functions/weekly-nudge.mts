import type { Config } from '@netlify/functions';

// Runs every Monday at 9:00 AM UTC (2:30 PM IST)
export const config: Config = {
  schedule: '0 9 * * 1',
};

export default async () => {
  const siteUrl = process.env.URL ?? 'http://localhost:3000';
  const secret = process.env.SEND_WEEKLY_SECRET;

  if (!secret) {
    console.error('[weekly-nudge] SEND_WEEKLY_SECRET is not set');
    return;
  }

  const res = await fetch(`${siteUrl}/api/send-weekly-nudge`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secret}`,
    },
  });

  const body = await res.json();
  console.log('[weekly-nudge] Result:', JSON.stringify(body));
};
