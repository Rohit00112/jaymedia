export interface PrizeTier {
  rank: string;
  amount: string;
  tier: 'gold' | 'silver' | 'bronze' | 'ruby';
}

export interface EventDetailData {
  slug: string;
  title: string;
  shortLabel?: string;
  category: string;
  seasonOrYear: string;
  location: string;
  tagline: string;
  summary: string;
  overview: string;
  image: string;
  heroStageImage?: string;
  coverBanner?: string;
  logoImage?: string;
  posterImage?: string;
  registrationOpen: boolean;
  ticketUrl?: string;
  ticketPartner?: string;
  ledgerTitle?: string;
  status: 'published' | 'draft';
  eligibility: string;
  coverageLabel: string;
  prizePoolLabel: string;
  codePrefix: string;
  ageRange?: {
    min: number;
    max: number;
    placeholder: string;
  };
  prizes?: PrizeTier[];
  highlights: string[];
  scheduleOrPhases: {
    title: string;
    description: string;
  }[];
  hallOfFameOrWinners: {
    title: string;
    note: string;
  }[];
  productionScope: string[];
}

export const EVENTS_DATA: EventDetailData[] = [
  {
    slug: 'atif-aslam-live-in-nepal',
    title: 'Atif Aslam Live in Nepal',
    shortLabel: 'Atif Aslam Live',
    category: 'International Live Concert • Subah Aye Na Tour',
    seasonOrYear: '19 Dec 2026 (Poush 4) • 6:00 PM',
    location: 'Itahari Stadium (Itahari Rangasala), Koshi Province',
    tagline:
      'Jay Media Management presents legendary global vocalist Atif Aslam live in Itahari for the Subah Aye Na Tour — Eastern Echoes.',
    image: '/images/official/atif-aslam-poster.jpg',
    heroStageImage: '/images/official/atif-aslam-stage.jpg',
    coverBanner: '/images/official/atif-aslam-banner.jpg',
    logoImage: '/images/official/main-logo.png',
    posterImage: '/images/official/atif-aslam-poster.jpg',
    registrationOpen: false,
    ticketUrl: 'https://events.khalti.com/events/ET26BJD3F93W',
    ticketPartner: 'Khalti by IME',
    ledgerTitle: 'Atif Aslam Live in Nepal — Official Khalti Ticket Tiers',
    status: 'published',
    eligibility: 'Dec 19, 2026 • 6:00 PM',
    coverageLabel: 'Itahari Stadium, Nepal',
    prizePoolLabel: 'NPR 4,000 – 15,000',
    codePrefix: 'AAL',
    prizes: [
      { rank: 'Early Bird VVIP', amount: 'NPR 15,000', tier: 'gold' },
      { rank: 'Early Bird VIP', amount: 'NPR 10,000', tier: 'silver' },
      { rank: 'Early Bird Fanpit', amount: 'NPR 7,000', tier: 'bronze' },
      { rank: 'Early Bird General', amount: 'NPR 4,000', tier: 'ruby' },
    ],
    summary:
      'Jay Media Management Pvt. Ltd. proudly presents Atif Aslam Live in Nepal: Subah Aye Na Tour (Eastern Echoes) on Saturday, December 19, 2026 (Poush 4) from 6:00 PM onwards at Itahari Stadium (Itahari Rangasala) — with Khalti by IME as the official digital ticketing partner.',
    overview:
      'Bringing one of South Asia’s most celebrated voices to Eastern Nepal for a landmark stadium spectacle, Jay Media Management Pvt. Ltd. presents Atif Aslam Live in Nepal as part of his international "Subah Aye Na Tour — Eastern Echoes." Scheduled for December 19, 2026 (Poush 4, 2083) at Itahari Stadium (Itahari Rangasala), the concert features live full-band renditions of iconic hits including "Tajdar-e-Haram," "Tere Bin," "Dil Diyan Gallan," and "Jeena Jeena," drawing fans from across Nepal and neighboring cross-border hubs. Official digital tickets are available seamlessly via Khalti by IME across General, Fanpit, VIP, and VVIP enclosures.',
    highlights: [
      'Headliner: Global Icon Atif Aslam — Subah Aye Na Tour (Eastern Echoes)',
      'Date & Time: Saturday, December 19, 2026 (Poush 4) • 6:00 PM Onwards',
      'Venue: Itahari Stadium (Itahari Rangasala), Itahari, Koshi Province',
      'Official Digital Ticketing Partner: Khalti by IME (Early Bird NPR 4,000 – 15,000)',
      'Full Stadium Line-Array Sound, Intelligent DMX Lighting & VVIP Hospitality',
    ],
    scheduleOrPhases: [
      {
        title: 'Digital Ticketing via Khalti by IME',
        description:
          'Limited Early Bird digital passes live on Khalti across General (NPR 4,000), Fanpit (NPR 7,000), VIP (NPR 10,000), VVIP (NPR 15,000), and Foreigner tiers (NPR 9,600 – 32,000).',
      },
      {
        title: 'Stadium Gates & Eastern Echoes Pre-Show',
        description:
          'Multi-lane digital QR entry at Itahari Rangasala with dedicated VVIP/VIP hospitality lounges, fanpit barricades, and curated opening sets.',
      },
      {
        title: 'Atif Aslam Live Stadium Concert (6:00 PM Onwards)',
        description:
          'A four-hour live arena concert experience as Atif Aslam and his full touring band perform his greatest romantic and Sufi anthems under the Itahari sky.',
      },
    ],
    hallOfFameOrWinners: [
      {
        title: 'Subah Aye Na Tour • Eastern Echoes',
        note: 'Historic Koshi Province stadium concert headlined by Atif Aslam performing "Tajdar-e-Haram," "Tere Bin," "Dil Diyan Gallan," and his 2026 album live at Itahari Stadium.',
      },
      {
        title: 'Official Ticketing Partner — Khalti by IME',
        note: '100% digital paperless stadium entry across General, Fanpit, VIP, and VVIP zones via Khalti Events (Code: ET26BJD3F93W).',
      },
    ],
    productionScope: [
      'Stadium-scale concert trussing, widescreen LED backdrops & DMX beam choreography',
      'Tour-grade line-array acoustic engineering calibrated for Itahari Rangasala',
      'Multi-zone crowd barricading (VVIP, VIP, Fanpit & General) with comprehensive security',
      'Seamless digital QR gate verification in partnership with Khalti by IME & eTicketNepal',
    ],
  },
  {
    slug: 'nepal-kids-idol',
    title: 'Nepal Kids Idol',
    shortLabel: 'Nepal Kids Idol',
    category: 'National Television Singing Reality Show',
    seasonOrYear: 'Season One • 2025',
    location: 'All 77 Districts of Nepal • India • USA • Canada • Australia',
    tagline:
      'The ultimate national television singing competition celebrating the voice, passion, and dreams of children aged 5 to 15.',
    image: '/images/official/nki-poster.png',
    heroStageImage: '/images/official/nki-banner.jpg',
    coverBanner: '/images/official/nki-banner.jpg',
    logoImage: '/images/official/nki-logo.png',
    posterImage: '/images/official/nki-poster.png',
    registrationOpen: true,
    status: 'published',
    eligibility: 'Ages 5–15',
    coverageLabel: '77 Districts + Intl',
    prizePoolLabel: 'Rs. 2,000,000',
    codePrefix: 'NKI',
    ageRange: { min: 4, max: 18, placeholder: '5 – 15' },
    prizes: [
      { rank: '1st Prize', amount: 'Rs 1,000,000.00', tier: 'gold' },
      { rank: '2nd Prize', amount: 'Rs 500,000.00', tier: 'silver' },
      { rank: '3rd Prize', amount: 'Rs 300,000.00', tier: 'bronze' },
      { rank: '4th Prize', amount: 'Rs 200,000.00', tier: 'ruby' },
    ],
    summary:
      'Jay Media Management proudly presents Nepal Kids Idol 2025 — a 30-episode national television singing competition spanning all 77 districts of Nepal and international hubs across India, the USA, Canada, and Australia.',
    overview:
      'Searching for young superstars aged 5 to 15 across every district of Nepal and extending to Sikkim, Darjeeling, Assam, Dehradun, Siliguri, USA, Canada, and Australia. Over 30 electrifying episodes airing on national television, contestants perform in front of celebrity jury legends Lochan Bhattarai and Ananda Karki with a total cash prize pool of Rs. 2,000,000.00.',
    highlights: [
      'Rs. 2,000,000 Total Cash Prize Pool (Rs. 10 Lakhs First Prize)',
      'Auditions Across All 77 Districts of Nepal',
      'International Hubs: Sikkim, Darjeeling, Assam, Dehradun, Siliguri, USA, Canada & Australia',
      '30 Electrifying National Television Episodes',
      'Live Online Audition Access From Anywhere',
    ],
    scheduleOrPhases: [
      {
        title: 'Online & District Auditions',
        description:
          'Auditions spanning all 77 districts of Nepal plus regional diaspora centers in India and Western hubs — plus direct online entry.',
      },
      {
        title: 'Mega Jury Selection & Grooming',
        description:
          'Shortlisted singers train with celebrity vocalists and Jay Media directors prior to televised studio rounds.',
      },
      {
        title: '30-Episode National Television Finale',
        description:
          'Grand studio arena elimination rounds leading to the crowning of the very first Nepal Kids Idol.',
      },
    ],
    hallOfFameOrWinners: [
      {
        title: 'Rs. 1,000,000 Grand Champion',
        note: 'Top titleholder earns Rs. 1,000,000 cash award, trophy, and recording contract opportunities.',
      },
      {
        title: '2nd, 3rd & 4th Place Laureates',
        note: 'Cash prizes of Rs. 500,000, Rs. 300,000, and Rs. 200,000 alongside national television recognition.',
      },
    ],
    productionScope: [
      '30-episode multicam broadcast production pipeline',
      'Live orchestra and studio acoustic stage engineering',
      'Nationwide & international audition software & User Code tracking',
      'Celebrity judge hospitality & televised red carpet coverage',
    ],
  },
  {
    slug: 'miss-koshi',
    title: 'Miss Koshi Grand Pageant',
    shortLabel: 'Miss Koshi',
    category: 'Beauty Pageant & Youth Empowerment',
    seasonOrYear: 'Seasons 1–8 • Annual Flagship',
    location: 'Biratnagar, Koshi Province',
    tagline: 'Eastern Nepal’s premier beauty, intelligence, and leadership platform.',
    image: '/images/official/koshi-2024-cover.png',
    heroStageImage: '/images/official/koshi-2024-banner.jpg',
    coverBanner: '/images/official/koshi-2024-banner.jpg',
    registrationOpen: true,
    status: 'published',
    eligibility: 'Young Women (17–26)',
    coverageLabel: 'Koshi Province',
    prizePoolLabel: 'Crowns, Cash & Titles',
    codePrefix: 'MK',
    ageRange: { min: 16, max: 30, placeholder: '17 – 26' },
    summary:
      'Owned and produced across eight landmark seasons by Jay Media Management, Miss Koshi celebrates the intelligence, grace, and advocacy of young women across Morang, Sunsari, Jhapa, and Koshi Province.',
    overview:
      'Organized annually by Jay Media Management Pvt. Ltd. under the leadership of Chairperson Jay Raj Roy and CEO Neesha Khatiwada, Miss Koshi stands as a beacon of youth empowerment. Contestants participate in rigorous audition rounds, followed by a residential grooming camp covering public speaking, social advocacy, cultural heritage, and runway choreography.',
    highlights: [
      '8 Landmark Seasons Produced in Koshi Province',
      'Personality & Communication Masterclasses',
      'Social Cause & Cultural Heritage Presentations',
      'Televised & Live Streamed Grand Finale',
      'Substantial Cash Prizes, Crowns & Brand Ambassadorships',
    ],
    scheduleOrPhases: [
      {
        title: 'Multi-City Auditions',
        description:
          'Open call auditions across Biratnagar, Itahari, and Dharan evaluating poise, communication, and creative talents.',
      },
      {
        title: 'Intensive Grooming Bootcamp',
        description:
          '15+ days of holistic mentorship covering runway choreography, styling, public speaking, and social advocacy.',
      },
      {
        title: 'Grand Coronation Finale',
        description:
          'Evening gown, cultural attire, intellectual Q&A rounds, and live crowning before an arena audience.',
      },
    ],
    hallOfFameOrWinners: [
      {
        title: 'Subha Laxmi Rai (Contestant #16, Itahari)',
        note: 'Miss Koshi 2024 Season #8 Winner — Crowned on the grand Biratnagar stage.',
      },
      {
        title: 'Prashika Shrestha',
        note: 'Miss Koshi Season #6 Winner — Honored for stage poise and leadership.',
      },
    ],
    productionScope: [
      'Full stage design with high-definition LED backdrops',
      'Dynamic spotlight and intelligent DMX wash lighting rigs',
      'Multicam broadcast production with YouTube telecast',
      'Official red-carpet VIP reception and media scrum',
    ],
  },
  {
    slug: 'mr-and-miss-little-koshi',
    title: 'Mr. & Miss Little Koshi',
    shortLabel: 'Little Koshi',
    category: "Children's Talent & Personality Showcase",
    seasonOrYear: '7+ Successful Seasons',
    location: 'Biratnagar • Itahari • Dharan',
    tagline: 'Eastern Nepal’s most celebrated children’s talent and confidence platform.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    heroStageImage:
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=85',
    registrationOpen: true,
    status: 'published',
    eligibility: 'Ages 5–13',
    coverageLabel: 'Biratnagar • Itahari • Dharan',
    prizePoolLabel: 'Crowns & Scholarships',
    codePrefix: 'LKS',
    ageRange: { min: 4, max: 15, placeholder: '5 – 13' },
    summary:
      'An annual youth platform dedicated to nurturing the budding talents, intelligence, and self-confidence of children across eastern Nepal.',
    overview:
      'Conceived and organized by Jay Media Management across 7+ seasons, Mr. and Miss Little Koshi transforms stage fright into joyful self-expression through personality grooming, moral education, and creative showcases across Biratnagar, Itahari, and Dharan.',
    highlights: [
      'Audition Hubs in Biratnagar, Itahari & Dharan',
      'Confidence-Building & Public Speaking Clinics',
      'Parent-Child Cooperative Orientation',
      'Grand Arena Finale with High Dignitary Attendance',
      'Academic Scholarships & Creative Accolades',
    ],
    scheduleOrPhases: [
      {
        title: 'Regional Audition Caravan',
        description:
          'Talent discovery sessions across eastern Nepal celebrating singing, dancing, recitation, and charm.',
      },
      {
        title: 'Development Workshop',
        description:
          'Supportive workshops focusing on posture, stage movement, teamwork, and articulation.',
      },
      {
        title: 'Grand Coronation Gala',
        description:
          'An electric finale honoring young dreamers with title crowns and specialty awards.',
      },
    ],
    hallOfFameOrWinners: [
      {
        title: 'Ocean Jung Thapa',
        note: 'Mr. Little Koshi Titleholder (7th Season)',
      },
      {
        title: 'Upasana Ramdam',
        note: 'Miss Little Koshi Titleholder (7th Season)',
      },
    ],
    productionScope: [
      'Child-safe arena stage design with vibrant visual themes',
      'Family-friendly audience management and VIP hospitality',
      'Complete digital photo & video archives for every family',
      'Regional and national broadcast press coverage',
    ],
  },
  {
    slug: 'nepal-kids-dancing-champion',
    title: 'Nepal Kids Dancing Champion',
    shortLabel: 'Kids Dancing',
    category: 'Youth Dance Championship',
    seasonOrYear: 'Annual Competition',
    location: 'Biratnagar • Eastern Nepal',
    tagline: 'Eastern Nepal’s premier children’s dancing reality talent championship.',
    image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=80',
    heroStageImage:
      'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=85',
    registrationOpen: true,
    status: 'published',
    eligibility: 'Ages 4–14 (Solo & Duo)',
    coverageLabel: 'Eastern Nepal',
    prizePoolLabel: 'Trophies & Cash Awards',
    codePrefix: 'NKDC',
    ageRange: { min: 4, max: 16, placeholder: '4 – 14' },
    summary:
      'A televised performing arts tournament providing young dancers aged 4–14 a flagship stage to showcase folk, classical, and contemporary choreography.',
    overview:
      'Alongside flagship franchises like Mr. & Miss SEE and Mr. & Miss Purwanchal, Nepal Kids Dancing Champion celebrates movement, discipline, and rhythm under expert choreographer evaluation in Biratnagar.',
    highlights: [
      'Provincial Audition Tours in Biratnagar and Environs',
      'Choreography Mentorship and Professional Stage Rehearsals',
      'Broadcast-Quality Stage Lighting & Multicam Production',
      'Grand Trophy, Cash Awards & Media Accolades',
    ],
    scheduleOrPhases: [
      {
        title: 'Regional Auditions',
        description: 'Audition showcases evaluating rhythm, musicality, and expressive choreography.',
      },
      {
        title: 'Choreography Intensive',
        description: 'Rehearsal academies mentoring soloists and duos on spatial lighting and costume storytelling.',
      },
      {
        title: 'Grand Dance Finale',
        description: 'High-voltage grand finale featuring solo championship rounds and synchronized group acts.',
      },
    ],
    hallOfFameOrWinners: [
      {
        title: 'Regional Champions',
        note: 'Recognizing standout classical, Nepali folk, and urban hip-hop prodigies across Koshi Province.',
      },
    ],
    productionScope: [
      'High-shock sprung stage flooring for safe choreography',
      'Concert-grade line-array sound clarity & bass impact',
      'Synchronized moving beam light shows tailored per song cue',
      'Full backstage rehearsal scheduling & safety stewards',
    ],
  },
];
