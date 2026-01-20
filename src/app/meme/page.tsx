import { fetchGalleryIndex } from '@/lib/assets';
import { GalleryClient } from '@/components/gallery/GalleryClient';

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
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Failed to load gallery</h1>
          <p className="text-gray-400">{error || 'Unknown error'}</p>
          <p className="text-gray-500 mt-4 text-sm">
            Make sure the R2 bucket is configured and assets are uploaded.
          </p>
        </div>
      </main>
    );
  }

  return (
    <GalleryClient
      initialItems={galleryIndex.items}
      totalCount={galleryIndex.count}
    />
  );
}
