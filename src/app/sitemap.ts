import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { SERVICES_DATA } from '@/config/services-data';
import { EVENTS_DATA } from '@/config/events-data';
import { NEWS_DATA } from '@/config/news-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/events',
    '/team',
    '/gallery',
    '/news',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Services dynamic routes
  const serviceRoutes = SERVICES_DATA.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Events dynamic routes
  const eventRoutes = EVENTS_DATA.map((event) => ({
    url: `${baseUrl}/events/${event.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // News dynamic routes
  const newsRoutes = NEWS_DATA.map((article) => ({
    url: `${baseUrl}/news/${article.slug}`,
    lastModified: article.date,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...eventRoutes, ...newsRoutes];
}
