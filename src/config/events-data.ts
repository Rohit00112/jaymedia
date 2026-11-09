export interface EventDetailData {
  slug: string;
  title: string;
  category: string;
  seasonOrYear: string;
  location: string;
  tagline: string;
  summary: string;
  overview: string;
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
    slug: 'miss-koshi',
    title: 'Miss Koshi Grand Pageant',
    category: 'Beauty Pageant & Youth Empowerment',
    seasonOrYear: 'Annual Flagship',
    location: 'Biratnagar, Koshi Province',
    tagline: 'Eastern Nepal’s premier beauty, intelligence, and leadership platform.',
    summary:
      'Miss Koshi is the definitive regional pageant celebrating the intelligence, grace, and advocacy of young women from Morang, Sunsari, Jhapa, and across Koshi Province.',
    overview:
      'Organized annually by Jay Media Management Pvt. Ltd. under the leadership of Jay Raj Rai and Nisha Khatiwada Rai, Miss Koshi stands as a beacon of youth empowerment. Contestants from across eastern Nepal participate in rigorous audition rounds, followed by an intensive residential grooming camp covering public speaking, social advocacy, traditional attire presentation, and professional catwalk choreography before competing in front of a live audience and eminent jury panel.',
    highlights: [
      'Multi-District Auditions in Eastern Nepal',
      'Personality & Communication Masterclasses',
      'Social Cause & Cultural Heritage Presentations',
      'Televised & Live Streamed Grand Finale',
      'Substantial Cash Prizes, Crowns & Modeling Contracts',
    ],
    scheduleOrPhases: [
      {
        title: 'Auditions & Talent Screening',
        description:
          'Open call auditions across regional centers where candidates showcase personality, communication poise, and creative talents.',
      },
      {
        title: 'Intensive Grooming Bootcamp',
        description:
          '15+ days of holistic mentorship with industry veterans covering styling, stage presence, speech delivery, and fitness.',
      },
      {
        title: 'Grand Finale Showcase',
        description:
          'A multi-round stage spectacle featuring traditional costume rounds, intellectual Q&A, talent showcases, and official coronation.',
      },
    ],
    hallOfFameOrWinners: [
      {
        title: 'Shuva Laxmi Rai',
        note: 'Miss Koshi 2024 Titleholder — Recognized for community advocacy and exceptional poise.',
      },
      {
        title: 'Distinguished Alumni',
        note: 'Past finalists and runners-up from Sunsari, Dharan, and Biratnagar active in national media and public service.',
      },
    ],
    productionScope: [
      'Full stage design with high-definition LED backdrops',
      'Dynamic spotlight and intelligent wash lighting rigs',
      'Multicam broadcast production with live YouTube telecast',
      'Official red-carpet VIP reception and media scrum',
    ],
  },
  {
    slug: 'mr-and-miss-little-koshi',
    title: 'Mr. & Miss Little Koshi',
    category: "Children's Talent & Personality Showcase",
    seasonOrYear: '7+ Successful Seasons',
    location: 'Biratnagar • Itahari • Dharan',
    tagline: 'Eastern Nepal’s most celebrated children’s talent and confidence platform.',
    summary:
      'Mr. and Miss Little Koshi is an annual youth platform dedicated to identifying, nurturing, and celebrating the budding talents, intelligence, and self-confidence of children across eastern Nepal.',
    overview:
      'Conceived and organized by Jay Media Management, Mr. and Miss Little Koshi has successfully completed over 7 seasons. The pageant provides children with an encouraging, constructive environment where stage fright is transformed into joyful self-expression. Auditions are conducted across Biratnagar, Itahari, and Dharan, bringing together young dreamers who undergo specialized personality grooming, moral education, and creative performance workshops.',
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
          'Talent discovery sessions across key cities of eastern Nepal evaluating singing, dancing, recitation, and natural charm.',
      },
      {
        title: 'Development Workshop',
        description:
          'Fun, supportive workshops focusing on posture, stage movement, teamwork, and communication guided by experienced mentors.',
      },
      {
        title: 'Grand Coronation Gala',
        description:
          'An electric finale celebrating every young participant with title crowns, awards for best talent, best smile, and personality.',
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
      {
        title: 'Generations of Confident Youth',
        note: 'Hundreds of young graduates across eastern Nepal flourishing in academia and public speaking.',
      },
    ],
    productionScope: [
      'Child-safe, state-of-the-art stage setup with vibrant visual themes',
      'Family-friendly audience management and seating arrangements',
      'Live photo and video archives provided to every participating family',
      'Comprehensive media coverage across national and regional press',
    ],
  },
  {
    slug: 'nepal-kids-dancing-champion',
    title: 'Nepal Kids Dancing Champion',
    category: "Youth Dance Championship",
    seasonOrYear: 'Annual Competition',
    location: 'Biratnagar • Eastern Nepal',
    tagline: 'Eastern Nepal’s premier children’s dancing reality talent championship.',
    summary:
      'Nepal Kids Dancing Champion is a dedicated performing arts tournament providing young dancers a televised stage to express cultural and contemporary choreography.',
    overview:
      'Organized by Jay Media Management in Biratnagar, Nepal Kids Dancing Champion invites young performers aged 4–14 to compete across classical, folk, modern, and hip-hop dance categories. The competition fosters artistic discipline, physical fitness, rhythm, and immense stage bravery under the evaluation of renowned choreographers and industry judges.',
    highlights: [
      'Provincial Audition Tours in Biratnagar and Environs',
      'Choreography Mentorship and Professional Stage Rehearsals',
      'Broadcast-Quality Stage Lighting & Multicam Production',
      'Grand Trophy, Cash Awards & Media Accolades',
    ],
    scheduleOrPhases: [
      {
        title: 'Talent Auditions',
        description: 'First-round solo and group dance screenings across eastern Nepal audition hubs.',
      },
      {
        title: 'Masterclass Rounds',
        description: 'Selected candidates work with senior choreographers on routine perfection and camera angles.',
      },
      {
        title: 'Grand Finale Showcase',
        description: 'A dazzling performance night judged by celebrated Nepali artists with live audience voting.',
      },
    ],
    hallOfFameOrWinners: [
      {
        title: 'Championship Finalists',
        note: 'Outstanding child dance champions celebrated across Koshi Province media.',
      },
    ],
    productionScope: [
      'High-impact dance floor staging with specialized anti-slip surfaces',
      'Dynamic moving-head lighting and synchronized stage effects',
      'Multicam recording and live digital broadcasting',
    ],
  },
  {
    slug: 'corporate-cultural-galas',
    title: 'Corporate Launches & Cultural Galas',
    category: 'Corporate & Experiential',
    seasonOrYear: 'Continuous Productions',
    location: 'Biratnagar & Regional Venues',
    tagline: 'High-impact corporate milestone events and grand celebrations.',
    summary:
      'Custom-engineered event productions for leading industrial houses, brands, and public institutions seeking international execution standards.',
    overview:
      'Beyond flagship pageants, Jay Media Management is the first-choice production partner for corporate enterprises in Biratnagar and Koshi Province. From industrial product rollouts and automotive showroom inaugurations to annual awards celebrations and cultural festivals, our technical crew delivers precise scheduling, acoustic excellence, and prestigious hospitality.',
    highlights: [
      'Bespoke Stage Architecture & 3D Spatial Layouts',
      'State-of-the-Art Line Array Audio Systems',
      'VIP Protocol, Red Carpet & Guest Ushering',
      'Executive Teleprompter & Keynote Staging',
      'Comprehensive Post-Event Photo & Video Packages',
    ],
    scheduleOrPhases: [
      {
        title: 'Strategy & Spatial Planning',
        description:
          'Site surveys, acoustic testing, 3D renderings, and safety compliance checks for venues across eastern Nepal.',
      },
      {
        title: 'Technical Installation',
        description:
          'Overnight rigging, lighting focus, microphone sound checks, and fail-safe power generator testing.',
      },
      {
        title: 'Event Operations',
        description:
          'Flawless cue management, presenter stage management, press coordination, and live video broadcast recording.',
      },
    ],
    hallOfFameOrWinners: [
      {
        title: 'Regional Commercial Leaders',
        note: 'Trusted by eastern Nepal’s leading manufacturing, automotive, and banking brands.',
      },
    ],
    productionScope: [
      'Turnkey electrical, acoustic, and lighting infrastructure',
      'Media scrum backdrops and press registration systems',
      'Executive hospitality protocols and security liaison',
    ],
  },
];

