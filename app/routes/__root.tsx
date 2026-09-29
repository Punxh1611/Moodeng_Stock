import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import appCss from '~/styles.css?url';
import React from 'react';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'สต็อกของในห้อง — ฮิปโป' },
      { name: 'description', content: 'แอพจัดการสต็อกของห้องพักน่ารักๆ' },
      { name: 'theme-color', content: '#FFB5B5' }
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Mali:wght@400;500;600;700&family=Sarabun:wght@400;500;700&display=swap' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }
    ]
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="th">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-white font-hand text-ink">
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
