import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl()
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/tasks/', '/auth', '/inscri'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
