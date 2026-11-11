/**
 * Country dial codes for phone inputs.
 * Ordered by relevance to Jay Media's audience: South Asia first,
 * then major Nepali diaspora hubs (Gulf, East Asia, West).
 */

export interface Country {
  /** ISO 3166-1 alpha-2 code (lowercase) — used for the flag image */
  iso: string;
  name: string;
  dial: string;
}

export const DEFAULT_COUNTRY_ISO = 'np';

export const COUNTRIES: Country[] = [
  // South Asia
  { iso: 'np', name: 'Nepal', dial: '+977' },
  { iso: 'in', name: 'India', dial: '+91' },
  { iso: 'bd', name: 'Bangladesh', dial: '+880' },
  { iso: 'bt', name: 'Bhutan', dial: '+975' },
  { iso: 'lk', name: 'Sri Lanka', dial: '+94' },
  { iso: 'pk', name: 'Pakistan', dial: '+92' },
  { iso: 'mv', name: 'Maldives', dial: '+960' },

  // Gulf & Middle East
  { iso: 'ae', name: 'United Arab Emirates', dial: '+971' },
  { iso: 'qa', name: 'Qatar', dial: '+974' },
  { iso: 'sa', name: 'Saudi Arabia', dial: '+966' },
  { iso: 'kw', name: 'Kuwait', dial: '+965' },
  { iso: 'om', name: 'Oman', dial: '+968' },
  { iso: 'bh', name: 'Bahrain', dial: '+973' },
  { iso: 'il', name: 'Israel', dial: '+972' },

  // East & Southeast Asia
  { iso: 'my', name: 'Malaysia', dial: '+60' },
  { iso: 'jp', name: 'Japan', dial: '+81' },
  { iso: 'kr', name: 'South Korea', dial: '+82' },
  { iso: 'cn', name: 'China', dial: '+86' },
  { iso: 'hk', name: 'Hong Kong', dial: '+852' },
  { iso: 'sg', name: 'Singapore', dial: '+65' },
  { iso: 'th', name: 'Thailand', dial: '+66' },
  { iso: 'mm', name: 'Myanmar', dial: '+95' },

  // Oceania
  { iso: 'au', name: 'Australia', dial: '+61' },
  { iso: 'nz', name: 'New Zealand', dial: '+64' },

  // Americas
  { iso: 'us', name: 'United States', dial: '+1' },
  { iso: 'ca', name: 'Canada', dial: '+1' },

  // Europe
  { iso: 'gb', name: 'United Kingdom', dial: '+44' },
  { iso: 'de', name: 'Germany', dial: '+49' },
  { iso: 'fr', name: 'France', dial: '+33' },
  { iso: 'pt', name: 'Portugal', dial: '+351' },
  { iso: 'es', name: 'Spain', dial: '+34' },
  { iso: 'it', name: 'Italy', dial: '+39' },
  { iso: 'nl', name: 'Netherlands', dial: '+31' },
  { iso: 'be', name: 'Belgium', dial: '+32' },
  { iso: 'cy', name: 'Cyprus', dial: '+357' },
  { iso: 'pl', name: 'Poland', dial: '+48' },
  { iso: 'ro', name: 'Romania', dial: '+40' },
  { iso: 'mt', name: 'Malta', dial: '+356' },
];

