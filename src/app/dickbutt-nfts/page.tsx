import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { IrlPageClient } from '@/app/irl/IrlPageClient';

export const metadata = {
  title: 'NFT Collection | Dickbutt',
  description: 'Dickbutt spotted in the wild! Graffiti, street art, protests, and more.',
};

export default async function DickbuttNftsPage() {
  // Redirect desktop users to window-based view
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  const isMobile = /mobile|android|iphone|ipad|tablet/i.test(userAgent);
  if (!isMobile) {
    redirect('/?window=irl');
  }

  return <IrlPageClient />;
}

