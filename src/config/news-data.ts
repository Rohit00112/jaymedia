export interface NewsItemData {
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  excerpt: string;
  content: string[];
  tags: string[];
  featured: boolean;
}

export const NEWS_DATA: NewsItemData[] = [
  {
    slug: 'miss-koshi-2024-grand-finale-shuva-laxmi-rai',
    title: 'Shuva Laxmi Rai Crowned Miss Koshi at Spectacular Biratnagar Grand Finale',
    category: 'Pageant Chronicles',
    date: '2024-10-14',
    author: 'Jay Media Editorial Board',
    readTime: '4 min read',
    excerpt:
      'In an evening of high fashion, cultural pride, and intellectual eloquence, Shuva Laxmi Rai was crowned Miss Koshi before an audience of over 1,500 attendees.',
    content: [
      'BIRATNAGAR — The grand auditorium in Biratnagar erupted in applause on Sunday evening as Shuva Laxmi Rai was officially crowned Miss Koshi 2024 at the grand finale organized by Jay Media Management Pvt. Ltd.',
      'The finale was the culmination of an intensive multi-week grooming camp where contestants from Morang, Sunsari, Jhapa, and across Koshi Province underwent personality development, stage performance training, and community advocacy workshops led by CEO Nisha Khatiwada Rai and seasoned artistic mentors.',
      'Addressing the gathering, Jay Media Chairperson Jay Raj Rai reiterated the agency’s commitment to providing young women in eastern Nepal with credible, transformative leadership platforms that celebrate intellect alongside beauty.',
      'Runners-up were recognized with substantial educational scholarships and official brand ambassador ambassadorships, marking another historic chapter for Koshi Province pageantry.',
    ],
    tags: ['Miss Koshi', 'Biratnagar', 'Youth Empowerment', 'Jay Media'],
    featured: true,
  },
  {
    slug: 'mr-and-miss-little-koshi-season-7-grand-success',
    title: 'Ocean Jung Thapa & Upasana Ramdam Crowned Titleholders in Mr. & Miss Little Koshi',
    category: 'Youth & Talent',
    date: '2024-06-20',
    author: 'Jay Media Communications',
    readTime: '3 min read',
    excerpt:
      'The 7th season of Mr. & Miss Little Koshi concluded with extraordinary energy as Ocean Jung Thapa and Upasana Ramdam clinched top honours.',
    content: [
      'BIRATNAGAR — Showcasing the boundless creativity, poise, and intelligence of eastern Nepal’s children, the 7th edition of Mr. & Miss Little Koshi reached its thrilling crescendo this weekend.',
      'Ocean Jung Thapa was named Mr. Little Koshi, while Upasana Ramdam took home the crown of Miss Little Koshi, selected after dynamic talent, traditional costume, and intellectual Q&A rounds.',
      'Auditions for the season traversed Biratnagar, Dharan, and Itahari, screening hundreds of aspiring young participants. Jay Media Management provided supportive workshops ensuring every child left with boosted self-esteem and stage confidence.',
      'Distinguished political and educational dignitaries of Province 1 attended the grand coronation, commending Jay Media for establishing a gold-standard platform for constructive child development.',
    ],
    tags: ['Little Koshi', 'Children Talent', 'Itahari', 'Dharan', 'Biratnagar'],
    featured: false,
  },
  {
    slug: 'jay-media-advances-regional-stagecraft-production',
    title: 'How Jay Media Management is Redefining Live Event Standards in Eastern Nepal',
    category: 'Industry & Stagecraft',
    date: '2024-04-12',
    author: 'Production Desk',
    readTime: '5 min read',
    excerpt:
      'From 4K multicam live streaming to intelligent DMX beam choreography, a look inside Jay Media’s technological investments in Koshi Province.',
    content: [
      'BIRATNAGAR — Historically, major corporate unveilings and televised entertainment productions in Nepal relied on technical crews mobilized exclusively from Kathmandu. Over recent years, Biratnagar-based Jay Media Management Pvt. Ltd. has fundamentally altered that dynamic.',
      'Investing in advanced line array acoustic arrays, 4K digital broadcast switchers, and modular aluminium trussing, the agency now delivers turnkey productions for regional banks, industrial conglomerates, and provincial celebrations.',
      '“Our goal is to ensure that an event organized in Biratnagar or Itahari matches the visual and acoustic caliber of any metropolitan broadcast across South Asia,” stated Chairperson Jay Raj Rai.',
      'As the demand for high-stakes experiential marketing surges across Koshi Province, Jay Media continues to train local technicians and choreographers, building a robust regional entertainment ecosystem.',
    ],
    tags: ['Stagecraft', 'Technology', 'Broadcasting', 'Event Management'],
    featured: false,
  },
];

