import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Branding | Dickbutt',
  description: 'Official Dickbutt branding assets and logos for download.',
};

const BRANDING_ASSETS = [
  {
    name: 'Main Dickbutt',
    file: 'maindickbutt.png',
    description: 'The classic dickbutt image',
  },
  {
    name: 'Dickbutt Logo',
    file: 'dickbutt.png',
    description: 'Standard dickbutt logo',
  },
  {
    name: 'Dickbutt with Text',
    file: 'dickbuttwtext.png',
    description: 'Logo with text',
  },
  {
    name: 'Profile Picture',
    file: 'dickbuttpfp.jpg',
    description: 'Square PFP for social media',
  },
  {
    name: 'OG Image',
    file: 'dickbuttog.png',
    description: 'Open Graph / social preview',
  },
  {
    name: 'Banner',
    file: 'dickbuttbanner.png',
    description: 'Header banner image',
  },
  {
    name: 'Based Dickbutt',
    file: 'baseddickbutt.png',
    description: 'Based variant',
  },
  {
    name: 'Dickbutt Flag',
    file: 'dbflag.gif',
    description: 'Animated waving flag',
  },
  {
    name: 'Dickbutt Coin',
    file: 'dickbuttcoin.gif',
    description: 'Animated spinning coin',
  },
  {
    name: 'Coin Static',
    file: 'dickcoin.png',
    description: 'Static coin image',
  },
  {
    name: 'Background',
    file: 'dickbuttbasebg2df.png',
    description: 'Desktop background image',
  },
];

export default function BrandingPage() {
  return (
    <main className="min-h-screen bg-[#008080] p-4">
      {/* Window container */}
      <div className="win95-window win95-border max-w-6xl mx-auto">
        {/* Title bar */}
        <div className="win95-titlebar flex items-center justify-between">
          <span className="text-sm font-bold px-1">Branding Assets</span>
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
            Download official Dickbutt branding assets. Right-click and save, or use the download buttons.
          </p>

          {/* Asset grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BRANDING_ASSETS.map((asset) => (
              <div
                key={asset.file}
                className="win95-border-inset bg-white p-2 flex flex-col"
              >
                {/* Preview */}
                <div className="bg-[#008080] p-2 flex items-center justify-center min-h-[150px] relative">
                  <Image
                    src={`/assets/branding/${asset.file}`}
                    alt={asset.name}
                    width={200}
                    height={150}
                    className="max-w-full max-h-[150px] w-auto h-auto object-contain"
                    unoptimized={asset.file.endsWith('.gif')}
                  />
                </div>

                {/* Info */}
                <div className="mt-2 flex-1">
                  <h3 className="font-bold text-sm">{asset.name}</h3>
                  <p className="text-xs text-gray-600">{asset.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{asset.file}</p>
                </div>

                {/* Download button */}
                <a
                  href={`/assets/branding/${asset.file}`}
                  download={asset.file}
                  className="win95-button mt-2 px-3 py-1 text-sm text-center block"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Status bar */}
        <div className="bg-[#c0c0c0] px-2 py-1 border-t border-[#dfdfdf] flex">
          <div className="win95-border-inset px-2 py-0.5 text-xs flex-1">
            {BRANDING_ASSETS.length} items
          </div>
        </div>
      </div>
    </main>
  );
}
