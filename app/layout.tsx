import type { Metadata, Viewport } from 'next';
import './globals.css';
import './figma-home.css';
import './icebreaker.css';
import './figma-pages.css';
export const metadata: Metadata = { title: 'Shared Moment', description: 'A playful in-person conversation prompt tool for social events.', applicationName: 'Shared Moment', manifest: '/manifest.webmanifest', icons: { icon: '/icon.svg', apple: '/icon-180.png' } };
export const viewport: Viewport = { themeColor: '#fff5f7', width: 'device-width', initialScale: 1, maximumScale: 5 };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
