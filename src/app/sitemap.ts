import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://qbfconsulting.com';

  const staticRoutes = [
    '',
    '/about/company',
    '/about/founder',
    '/services',
    '/solutions',
    '/products',
    '/hub',
    '/blog',
    '/events',
    '/case-studies',
    '/careers',
    '/media',
    '/contact',
    '/partners',
  ];

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
