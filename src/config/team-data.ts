export interface TeamProfile {
  slug: string;
  name: string;
  role: string;
  category: 'Executive Leadership' | 'Mentorship' | 'Event Judges';
  location: string;
  image: string;
  shortBio: string;
  fullBio: string;
  credits: string[];
}

export const TEAM_PROFILES: TeamProfile[] = [
  {
    slug: 'jay-raj-roy',
    name: 'Jay Raj Roy',
    role: 'Chairman',
    category: 'Executive Leadership',
    location: 'Biratnagar, Nepal',
    image: '/images/official/team-jay.png',
    shortBio:
      'Movie Producer, Director, TV Shows Producer, Entrepreneur, and Event Organizer driving Jay Media Management since 2013.',
    fullBio:
      "Jay Raj Roy is a renowned Movie Producer, Director, TV Shows Producer, Businessman, Entrepreneur, Event Organizer, and Social Worker. He has produced the feature movies The Karma and Tantra under his home production banner, Jay Media Management. He owns the acclaimed TV Show Miss Koshi (Seasons 1–8) and the Cricket League Franchise Women's T20 Cricket League. Also an Actor, Script Writer, Model, Trainer, and Show Presenter, he owns leading franchises including Mrs. Koshi, Mr & Miss Purwanchal, Mr & Miss Little Koshi, Mr. and Miss SEE, and JMM Runway Fashion Show, and is producing and directing the upcoming bilingual movie MEOW.",
    credits: [
      'Producer — The Karma & Tantra',
      'Director — Upcoming Bilingual Film MEOW',
      'Founder — Miss Koshi (Seasons 1–8)',
      "Owner — Women's T20 Cricket League",
      'Creator — Nepal Kids Idol & Little Koshi',
    ],
  },
  {
    slug: 'neesha-khatiwada',
    name: 'Neesha Khatiwada',
    role: 'Chief Executive Officer',
    category: 'Executive Leadership',
    location: 'Biratnagar, Nepal',
    image: '/images/official/team-neesha.png',
    shortBio:
      'Leading executive governance, hospitality, corporate partnerships, and multi-city production logistics across Koshi Province.',
    fullBio:
      'As Chief Executive Officer of Jay Media Management Pvt. Ltd., Neesha Khatiwada oversees strategic operations, sponsor alliances, contestant mentorship standards, and end-to-end event coordination from our Central Mall headquarters in Biratnagar. Her executive stewardship ensures every regional audition, corporate gala, and national televised finale upholds premier professionalism and transparency.',
    credits: [
      'Executive Production Governance',
      'Brand & Sponsor Partnerships',
      'Pageant Grooming Supervision',
      'National Audition Logistics',
    ],
  },
  {
    slug: 'rishav-dev-ghimire',
    name: 'Rishav Dev Ghimire',
    role: 'Mentor',
    category: 'Mentorship',
    location: 'Biratnagar, Nepal',
    image: '/images/official/team-rishav.png',
    shortBio:
      'Dedicated performance mentor coaching emerging artists and pageant contestants in stage confidence, voice, and poise.',
    fullBio:
      'Rishav Dev Ghimire serves as Senior Mentor at Jay Media Management, guiding aspiring youth talents through audition readiness, theatrical stage confidence, and camera discipline across our reality show and pageant franchises.',
    credits: [
      'Stage Poise & Confidence Coaching',
      'Bootcamp Talent Mentorship',
      'Live Broadcast Preparation',
    ],
  },
  {
    slug: 'rajendra-kc',
    name: 'Rajendra KC',
    role: 'Mentor',
    category: 'Mentorship',
    location: 'Biratnagar, Nepal',
    image: '/images/official/team-rajendra.png',
    shortBio:
      'Veteran advisor supporting evaluation protocols, contestant welfare, and multi-district audition execution.',
    fullBio:
      'Rajendra KC brings deep organizational guidance and ethical mentorship to Jay Media Management productions, coordinating multi-district auditions, jury logistics, and family orientation programs throughout Nepal Kids Idol and Little Koshi seasons.',
    credits: [
      'Contestant & Jury Coordination',
      'Multi-City Audition Operations',
      'Youth Guidance & Welfare',
    ],
  },
];

export interface JudgeProfile {
  slug: string;
  id: string;
  name: string;
  title: string;
  eventTitle: string;
  image: string;
  bio: string;
  highlights: string[];
}

export const EVENT_JUDGES: JudgeProfile[] = [
  {
    slug: 'lochan-bhattarai',
    id: '1',
    name: 'Lochan Bhattarai',
    title: 'Eminent Vocalist & Jury Member',
    eventTitle: 'Nepal Kids Idol',
    image: '/images/official/judge-lochan.png',
    bio: 'Respected musical figure and veteran vocal mentor serving on the official jury panel for Nepal Kids Idol, evaluating young singers across classical foundations, pitch clarity, emotive delivery, and stage artistry.',
    highlights: [
      'National Television Reality Jury Panel',
      'Nepali Music & Playback Legend',
      'Youth Vocal & Rhythm Evaluation',
    ],
  },
  {
    slug: 'ananda-karki',
    id: '1',
    name: 'Ananda Karki',
    title: 'Celebrity Playback Singer & Jury Member',
    eventTitle: 'Nepal Kids Idol',
    image: '/images/official/judge-ananda.png',
    bio: 'Iconic Nepali playback and modern song maestro bringing decades of recording studio and international concert mastery to the Nepal Kids Idol jury panel, inspiring young dreamers aged 5 to 15 across Nepal and the global diaspora.',
    highlights: [
      'Celebrity Playback Singer of Nepal',
      'Lead Jury Panelist — Nepal Kids Idol',
      '30-Episode National Broadcast Mentor',
    ],
  },
];

export const LEADERSHIP_AND_MENTORS = TEAM_PROFILES;

