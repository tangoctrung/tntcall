import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Trang chủ',
  description: 'Trang chủ của Tntcall, được tạo bởi trungtn',
  generator: 'tntcall',
  applicationName: 'TntCall',
  referrer: 'origin-when-cross-origin',
  keywords: ['tntcall', 'call', 'tnt'],
  authors: [{ name: 'trungtn' }, { name: 'trungtn', url: 'https://tntcall.vercel.app' }],
  creator: 'trungtn',
  publisher: 'VietNam',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Trang chủ',
    description: 'Hãy tạo một cuộc gọi hoặc tham gia cuộc gọi có sẵn',
    url: 'https://tntcall.vercel.app',
    siteName: 'tntcall',
    images: [
      {
        url: 'https://nextjs.org/og.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'https://nextjs.org/og-alt.png', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    videos: [
      {
        url: 'https://nextjs.org/video.mp4', // Must be an absolute URL
        width: 800,
        height: 600,
      },
    ],
    audio: [
      {
        url: 'https://nextjs.org/audio.mp3', // Must be an absolute URL
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

}

export default function Home() {
  return (
    <div>
      HomePage
    </div>
  );
}
