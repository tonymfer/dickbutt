import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { BrandingPageClient } from './BrandingPageClient';

export const metadata = {
  title: 'Branding Assets | Dickbutt',
  description: 'Download official Dickbutt branding assets.',
};

export default async function BrandingPage() {
  // Redirect desktop users to window-based view
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  const isMobile = /mobile|android|iphone|ipad|tablet/i.test(userAgent);
  if (!isMobile) {
    redirect('/?window=branding');
  }

  return <BrandingPageClient />;
}
