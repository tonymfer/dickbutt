'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const R2_BASE = 'https://pub-c5bbdf1eaf68478a9783e46a36a3c3b5.r2.dev/v1/gallery';

// Curated IRL dickbutt sightings - graffiti, street art, real-world photos
const IRL_ITEMS = [
  {
    id: 'dickbuttgraffiti',
    title: 'Dickbutt Graffiti',
    description: 'Classic street art',
    thumb: 'thumb/9422616489bb-dickbuttgraffiti.webp',
    full: 'full/9422616489bb-dickbuttgraffiti.jpg',
  },
  {
    id: 'dbnightgraffiti',
    title: 'Night Graffiti',
    description: 'Spotted at night',
    thumb: 'thumb/6117da8bba42-dbnightgraffiti.webp',
    full: 'full/6117da8bba42-dbnightgraffiti.jpg',
  },
  {
    id: 'graffitibrick',
    title: 'Brick Wall',
    description: 'On a brick wall',
    thumb: 'thumb/1ba6acacd544-graffitibrick.webp',
    full: 'full/1ba6acacd544-graffitibrick.webp',
  },
  {
    id: 'graffitidb',
    title: 'Graffiti DB',
    description: 'Urban dickbutt',
    thumb: 'thumb/b107b3a6c7bc-graffitidb.webp',
    full: 'full/b107b3a6c7bc-graffitidb.png',
  },
  {
    id: 'dickbuttgraffiti2',
    title: 'More Graffiti',
    description: 'Another sighting',
    thumb: 'thumb/47dfd784bc85-dickbuttgraffiti2.webp',
    full: 'full/47dfd784bc85-dickbuttgraffiti2.jpeg',
  },
  {
    id: 'dickbuttonstreet',
    title: 'On The Street',
    description: 'Street-level dickbutt',
    thumb: 'thumb/7d28aec988e5-dickbuttonstreet.webp',
    full: 'full/7d28aec988e5-dickbuttonstreet.webp',
  },
  {
    id: 'gmmfersgraffiti',
    title: 'GM Mfers Graffiti',
    description: 'Crossover art',
    thumb: 'thumb/0f874c001317-gmmfersgraffiti.webp',
    full: 'full/0f874c001317-gmmfersgraffiti.png',
  },
  {
    id: 'newsgraffitikids',
    title: 'News Report',
    description: 'Made the news',
    thumb: 'thumb/6a17a146a7ab-newsgraffitikids.webp',
    full: 'full/6a17a146a7ab-newsgraffitikids.webp',
  },
  {
    id: 'protestgirldb',
    title: 'Protest Sign',
    description: 'At a protest',
    thumb: 'thumb/bcf093bc58d3-protestgirldb.webp',
    full: 'full/bcf093bc58d3-protestgirldb.webp',
  },
  {
    id: 'dickbuttartistgirlpose',
    title: 'Artist Photo',
    description: 'With the artist',
    thumb: 'thumb/4526dc56952a-dickbuttartistgirlpose.webp',
    full: 'full/4526dc56952a-dickbuttartistgirlpose.jpg',
  },
  {
    id: 'girlclassdb',
    title: 'In Class',
    description: 'Classroom sighting',
    thumb: 'thumb/7e2fec96c08d-girlclassdb.webp',
    full: 'full/7e2fec96c08d-girlclassdb.jpg',
  },
  {
    id: 'dickbuttrealeyes',
    title: 'Real Eyes',
    description: 'Realistic version',
    thumb: 'thumb/5ae5ad474190-dickbuttrealeyes.webp',
    full: 'full/5ae5ad474190-dickbuttrealeyes.png',
  },
];

export default function IrlPage() {
  const [selectedImage, setSelectedImage] = useState<typeof IRL_ITEMS[0] | null>(null);

  return (
    <main className="min-h-screen bg-[#008080] p-4">
      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-[10000] flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <Image
              src={`${R2_BASE}/${selectedImage.full}`}
              alt={selectedImage.title}
              width={1200}
              height={900}
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3">
              <h3 className="font-bold">{selectedImage.title}</h3>
              <p className="text-sm text-gray-300">{selectedImage.description}</p>
            </div>
            <button
              className="absolute top-2 right-2 win95-button w-8 h-8 text-xl"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Window container */}
      <div className="win95-window win95-border max-w-6xl mx-auto">
        {/* Title bar */}
        <div className="win95-titlebar flex items-center justify-between">
          <span className="text-sm font-bold px-1">Dickbutt IRL - Real World Sightings</span>
          <Link
            href="/"
            className="win95-button w-4 h-4 flex items-center justify-center text-xs leading-none"
          >
            ×
          </Link>
        </div>

        {/* Toolbar */}
        <div className="bg-[#c0c0c0] p-1 flex gap-2 border-b border-[#808080]">
          <Link
            href="/"
            className="win95-button px-3 py-1 text-sm flex items-center gap-1"
          >
            ← Back to Desktop
          </Link>
        </div>

        {/* Content */}
        <div className="p-4 bg-[#c0c0c0]">
          <p className="text-sm mb-4">
            Dickbutt spotted in the wild! Graffiti, street art, protests, and more.
            Click any image to view full size.
          </p>

          {/* Image grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {IRL_ITEMS.map((item) => (
              <button
                key={item.id}
                className="win95-border-inset bg-white p-1 flex flex-col cursor-pointer hover:bg-[#000080] group transition-colors"
                onClick={() => setSelectedImage(item)}
              >
                {/* Thumbnail */}
                <div className="bg-[#008080] aspect-square relative overflow-hidden">
                  <Image
                    src={`${R2_BASE}/${item.thumb}`}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>

                {/* Label */}
                <div className="p-1 text-left">
                  <h3 className="text-xs font-bold truncate group-hover:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 truncate group-hover:text-gray-300">
                    {item.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Status bar */}
        <div className="bg-[#c0c0c0] px-2 py-1 border-t border-[#dfdfdf] flex">
          <div className="win95-border-inset px-2 py-0.5 text-xs flex-1">
            {IRL_ITEMS.length} items | Click to enlarge
          </div>
        </div>
      </div>
    </main>
  );
}
