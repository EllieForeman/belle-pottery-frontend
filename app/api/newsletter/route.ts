import { NextResponse } from 'next/server';

const STRAPI_URL = process.env.STRAPI_URL!;
const STRAPI_TOKEN = process.env.STRAPI_SUBSCRIBER_TOKEN!;

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, _hp } = await req.json();

    if (_hp) return NextResponse.json({ ok: true }); 

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ ok: false, error: 'Email required' }, { status: 400 });
    }

    const res = await fetch(`${STRAPI_URL}/api/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify({
        data: { firstName: firstName || '', lastName: lastName || '', email },
      }),
      cache: 'no-store',
    });

    if (!res.ok) {
    const err = await res.json().catch(() => ({}));

    // Check for duplicate email
    const message = err?.error?.message || '';
    if (
        res.status === 400 &&
        typeof message === 'string' &&
        message.toLowerCase().includes('unique')
    ) {
        return NextResponse.json(
        { ok: false, error: 'This email is already subscribed.' },
        { status: 400 },
        );
    }

    // fallback
    return NextResponse.json(
        { ok: false, error: 'Something went wrong while subscribing.', details: err },
        { status: res.status },
    );
    }

    return NextResponse.json({ ok: true });
    } catch (e: any) {
        return NextResponse.json({ ok: false, error: e?.message || 'Unknown error' }, { status: 500 });
    }
}
