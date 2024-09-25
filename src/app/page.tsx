import HomePage from "@/components/HomePage";
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
        url: 'https://static.vecteezy.com/system/resources/thumbnails/022/283/216/small_2x/3d-render-phone-icon-3d-render-call-center-icon-cartoon-minimal-style-support-customer-service-help-communication-concept-3d-render-call-center-icon-png.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'https://static.vecteezy.com/system/resources/thumbnails/022/283/216/small_2x/3d-render-phone-icon-3d-render-call-center-icon-cartoon-minimal-style-support-customer-service-help-communication-concept-3d-render-call-center-icon-png.png', // Must be an absolute URL
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
    <div className="w-[100svw] h-[100svh] overflow-hidden">
      <HomePage />
    </div>
  );
}
