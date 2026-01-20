import { fetchGalleryIndex } from '@/lib/assets';
import { Win95GalleryClient } from '@/components/gallery/Win95GalleryClient';

export const metadata = {
  title: 'Meme Gallery | Dickbutt',
  description: 'Browse the complete collection of Dickbutt memes, images, GIFs, and videos.',
};

export default async function MemePage() {
  let galleryIndex;
  let error = null;

  try {
    galleryIndex = await fetchGalleryIndex();
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load gallery';
  }

  if (error || !galleryIndex) {
    return (
      <main className="min-h-screen bg-[#008080] flex items-center justify-center">
        <div className="text-center p-8 bg-[#c0c0c0] border-2 border-[#dfdfdf] border-r-[#808080] border-b-[#808080]">
          <h1 className="text-lg font-bold mb-2">Error</h1>
          <p className="text-sm">{error || 'Unknown error'}</p>
          <p className="text-xs mt-4 text-gray-600">
            Make sure the R2 bucket is configured and assets are uploaded.
          </p>
        </div>
      </main>
    );
  }

  return (
    <Win95GalleryClient
      initialItems={galleryIndex.items}
      totalCount={galleryIndex.count}
    />
  );
}
