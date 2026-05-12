import { NextRequest, NextResponse } from 'next/server';

const USER_URI = 'https://api.calendly.com/users/98140014-4787-43a2-b808-246450c2aa4d';

export async function POST(req: NextRequest) {
  const token = process.env.CALENDLY_API_TOKEN;
  if (!token) return NextResponse.json({ error: 'CALENDLY_API_TOKEN not set' }, { status: 500 });

  const { siteUrl } = await req.json();
  if (!siteUrl) return NextResponse.json({ error: 'siteUrl is required' }, { status: 400 });

  const webhookUrl = `${siteUrl.replace(/\/$/, '')}/api/webhooks/calendly`;

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  // Get organization URI from user info
  const userRes = await fetch(USER_URI, { headers });
  if (!userRes.ok) {
    const err = await userRes.json();
    return NextResponse.json({ error: `Cannot fetch user info: ${err.message}` }, { status: 400 });
  }
  const userData = await userRes.json();
  const orgUri = userData.resource?.current_organization;

  // Check if webhook already exists
  const listRes = await fetch(
    `https://api.calendly.com/webhook_subscriptions?organization=${orgUri}&scope=user&user=${USER_URI}`,
    { headers }
  );
  const listData = listRes.ok ? await listRes.json() : { collection: [] };
  const existing = (listData.collection || []).find((w: any) => w.callback_url === webhookUrl);
  if (existing) {
    return NextResponse.json({ success: true, message: 'Webhook already registered', webhookUrl });
  }

  // Register webhook
  const registerRes = await fetch('https://api.calendly.com/webhook_subscriptions', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      url: webhookUrl,
      events: ['invitee.created', 'invitee.canceled'],
      organization: orgUri,
      scope: 'user',
      user: USER_URI,
    }),
  });

  if (!registerRes.ok) {
    const err = await registerRes.json();
    return NextResponse.json({ error: err.message || 'Failed to register webhook' }, { status: 400 });
  }

  return NextResponse.json({ success: true, message: 'Webhook registered successfully!', webhookUrl });
}
