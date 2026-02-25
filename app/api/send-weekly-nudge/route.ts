import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { TRACK_CONFIGS } from '@/lib/trackData';

const resend = new Resend(process.env.RESEND_API_KEY);

// ── Helper: build HTML email ────────────────────────────────────────────────

function buildEmailHtml(name: string, trackName: string, streak: number, lastActiveDate: string | null): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://stepup.netlify.app';
  const today = new Date();
  const lastActive = lastActiveDate ? new Date(lastActiveDate) : null;
  const daysSinceActive = lastActive
    ? Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  let statusLine = '';
  if (streak > 0 && daysSinceActive !== null && daysSinceActive <= 1) {
    statusLine = `You're on a <strong>${streak}-day streak</strong> 🔥 Keep it going!`;
  } else if (daysSinceActive !== null && daysSinceActive > 1) {
    statusLine = `You haven't checked in for <strong>${daysSinceActive} days</strong>. Your streak is waiting to be rebuilt — jump back in!`;
  } else {
    statusLine = `Your track: <strong>${trackName}</strong>. Pick up where you left off!`;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your weekly StepUp nudge</title>
</head>
<body style="margin:0;padding:0;background:#F8F9FA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F9FA;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

          <!-- Logo -->
          <tr>
            <td style="padding-bottom:24px;text-align:center;">
              <span style="font-size:20px;font-weight:700;color:#111827;letter-spacing:-0.5px;">⬛ StepUp</span>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#ffffff;border-radius:16px;border:1px solid #E5E7EB;padding:36px 32px;">

              <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#9CA3AF;text-transform:uppercase;letter-spacing:0.06em;">Weekly check-in</p>
              <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;color:#111827;line-height:1.3;">
                Hey ${name} 👋
              </h1>

              <p style="margin:0 0 24px;font-size:15px;color:#6B7280;line-height:1.6;">
                ${statusLine}
              </p>

              <hr style="border:none;border-top:1px solid #F3F4F6;margin:0 0 24px;" />

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background:#F9FAFB;border-radius:10px;padding:14px 18px;">
                    <p style="margin:0;font-size:12px;font-weight:600;color:#9CA3AF;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Your track</p>
                    <p style="margin:0;font-size:15px;font-weight:700;color:#111827;">${trackName}</p>
                  </td>
                  <td width="12"></td>
                  <td style="background:#F9FAFB;border-radius:10px;padding:14px 18px;">
                    <p style="margin:0;font-size:12px;font-weight:600;color:#9CA3AF;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Streak</p>
                    <p style="margin:0;font-size:15px;font-weight:700;color:#111827;">🔥 ${streak} day${streak !== 1 ? 's' : ''}</p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 24px;font-size:14px;color:#6B7280;line-height:1.6;">
                Consistent builders ship consistently. Even 20 minutes today keeps the momentum alive.
              </p>

              <a
                href="${appUrl}/tracks"
                style="display:inline-block;background:#111827;color:#ffffff;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;text-decoration:none;"
              >
                Continue on StepUp →
              </a>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:20px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#9CA3AF;">
                You're receiving this because you're a StepUp learner.<br />
                <!-- TODO: Add unsubscribe link once you set up preference management -->
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── Shared send logic ───────────────────────────────────────────────────────

async function sendNudges() {
  // Service-role Supabase client (bypasses RLS, can read auth.users)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Fetch all auth users (for their email addresses)
  const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers({ perPage: 1000 });
  if (usersError) {
    return NextResponse.json({ error: usersError.message }, { status: 500 });
  }

  // Fetch all profiles
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('id, name, selected_track, streak_count, last_active_date');
  if (profilesError) {
    return NextResponse.json({ error: profilesError.message }, { status: 500 });
  }

  const profileMap = new Map((profiles ?? []).map((p) => [p.id, p]));

  const results: { email: string; success: boolean; error?: string }[] = [];

  for (const user of users) {
    if (!user.email) continue;
    const profile = profileMap.get(user.id);
    if (!profile) continue; // User hasn't completed onboarding yet

    const trackName = TRACK_CONFIGS[profile.selected_track]?.trackName ?? profile.selected_track;
    const html = buildEmailHtml(profile.name, trackName, profile.streak_count ?? 0, profile.last_active_date ?? null);

    const { error } = await resend.emails.send({
      // TODO: Replace with your verified Resend domain, e.g. 'StepUp <noreply@yourdomain.com>'
      // During testing you can use 'onboarding@resend.dev' (sends only to your own Resend account email)
      from: 'StepUp <onboarding@resend.dev>',
      to: user.email,
      subject: `Your weekly StepUp nudge, ${profile.name} 🔥`,
      html,
    });

    results.push({ email: user.email, success: !error, error: error?.message });
  }

  const successCount = results.filter((r) => r.success).length;
  console.log(`[send-weekly-nudge] Sent ${successCount}/${results.length} emails`);

  return NextResponse.json({ total: results.length, sent: successCount, results });
}

// ── POST — manual trigger / Netlify cron ───────────────────────────────────
// Protected by SEND_WEEKLY_SECRET

export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || authHeader !== `Bearer ${process.env.SEND_WEEKLY_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return sendNudges();
}

// ── GET — Vercel Cron trigger ───────────────────────────────────────────────
// Vercel auto-injects Authorization: Bearer <CRON_SECRET> on every scheduled run

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return sendNudges();
}
