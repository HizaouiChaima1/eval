import type { Metadata } from 'next'

const SITE_NAME = 'TaskFlow'
const DEFAULT_DESCRIPTION =
  'Gérez vos tâches efficacement avec TaskFlow — inscription, authentification et suivi en temps réel.'

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
}

type BuildMetadataOptions = {
  title?: string
  description?: string
  path?: string
  noIndex?: boolean
}

export function buildMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  noIndex = false,
}: BuildMetadataOptions = {}): Metadata {
  const siteUrl = getSiteUrl()
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const url = `${siteUrl}${path}`

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'fr_FR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  }
}

export { SITE_NAME, DEFAULT_DESCRIPTION, getSiteUrl }
