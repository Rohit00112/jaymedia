import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { SERVICES_DATA } from '@/config/services-data';
import { EVENTS_DATA } from '@/config/events-data';
import { NEWS_DATA } from '@/config/news-data';
import { TEAM_PROFILES, EVENT_JUDGES } from '@/config/team-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const buildDate = '2026-04-19T00:00:00.000Z';

  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/events',
    '/register/nepal-kids-idol',
    '/team',
    '/gallery',
    '/news',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: buildDate,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.85,
  }));

  const serviceRoutes = SERVICES_DATA.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: buildDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const eventRoutes = EVENTS_DATA.map((event) => ({
    url: `${baseUrl}/events/${event.slug}`,
    lastModified: buildDate,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const newsRoutes = NEWS_DATA.map((article) => ({
    url: `${baseUrl}/news/${article.slug}`,
    lastModified: article.date,
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }));

  const teamRoutes = [...TEAM_PROFILES, ...EVENT_JUDGES].map((person) => ({
    url: `${baseUrl}/team/${person.slug}`,
    lastModified: buildDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...eventRoutes,
    ...newsRoutes,
    ...teamRoutes,
  ];
}
