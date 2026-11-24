import type { Metadata, Viewport } from 'next';
import './globals.css';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import { SiteSettingsProvider } from '@/components/SiteSettingsProvider';
import { LanguageProvider } from '@/lib/i18n';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#2563eb' },
    { media: '(prefers-color-scheme: dark)', color: '#090d16' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'دار المعمار للعقارات | أفخم الفيلات والشقق السكنية الفاخرة',
  description: 'منصة دار المعمار للعقارات والاستثمار العقاري. استعرض أفخم الفيلات، البنتهاوس، والشقق الفندقية مع أنظمة سداد وتسهيلات حصرية وحجز جولات المعاينة الفورية.',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'دار المعمار',
  },
  icons: {
    icon: '/icons/icon-192.png',
    apple: '/icons/icon-192.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white">
        <LanguageProvider>
          <SiteSettingsProvider>
            {children}
            <PWAInstallPrompt />
          </SiteSettingsProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
