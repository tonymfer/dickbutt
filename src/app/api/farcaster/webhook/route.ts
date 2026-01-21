import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log('[Farcaster Webhook]', body);
  return NextResponse.json({ success: true });
}
