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
    slug: 'jayrajroy',
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

export const EVENT_JUDGES: JudgeProfile[] = [];

export const LEADERSHIP_AND_MENTORS = TEAM_PROFILES;
