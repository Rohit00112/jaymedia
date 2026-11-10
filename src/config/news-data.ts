export interface NewsItemData {
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string[];
  tags: string[];
  featured: boolean;
}

export const NEWS_DATA: NewsItemData[] = [
  {
    slug: 'atif-aslam-live-in-nepal-subah-aye-na-tour-itahari-stadium',
    title:
      'Jay Media Management Presents "Eastern Echoes" Featuring Atif Aslam at Itahari Stadium on December 19',
    category: 'Concert Announcement',
    date: '2026-10-27',
    author: 'Jay Media Editorial Board',
    readTime: '4 min read',
    image: '/images/official/atif-aslam-poster.jpg',
    excerpt:
      'Legendary vocalist Atif Aslam headlines "Eastern Echoes" at Itahari Rangasala on Poush 4 (December 19, 2026), organized by Jay Media Management with Khalti as official ticketing partner.',
    content: [
      'ITAHARI / BIRATNAGAR — Jay Media Management Pvt. Ltd. has officially announced one of the largest live musical spectacles in Eastern Nepal’s history: "Eastern Echoes," featuring legendary vocalist Atif Aslam live on Saturday, December 19, 2026 (Poush 4, 2083) from 6:00 PM onwards at Itahari Stadium (Itahari Rangasala).',
      'Globally celebrated for timeless anthems including "Tajdar-e-Haram," "Tere Bin," "Dil Diyan Gallan," and "Jeena Jeena," Atif Aslam will perform live with his full touring ensemble before thousands of fans from across Nepal and neighboring South Asian regions.',
      'Popular digital wallet platform Khalti by IME has partnered as the official digital ticketing partner for the stadium concert. Official digital passes are available on Khalti across General, Fanpit, VIP, and VVIP enclosures.',
      'Chairperson Jay Raj Roy noted that staging an international touring production of this scale at Itahari Rangasala reflects Jay Media Management’s decade-long mission to position Koshi Province as a premier cultural and live entertainment hub in South Asia.',
    ],
    tags: [
      'Eastern Echoes',
      'Atif Aslam',
      'Itahari Stadium',
      'Khalti',
      'Jay Media',
    ],
    featured: true,
  },
  {
    slug: 'miss-koshi-2024-grand-finale-shuva-laxmi-rai',
    title: 'Subha Laxmi Rai Crowned Miss Koshi Season #8 at Spectacular Biratnagar Grand Finale',
    category: 'Pageant Chronicles',
    date: '2024-10-14',
    author: 'Jay Media Editorial Board',
    readTime: '4 min read',
    image: '/images/official/koshi-2024-cover.png',
    excerpt:
      'Representing Itahari (Contestant #16), Subha Laxmi Rai was crowned Miss Koshi Season #8 before an electrifying live audience in Biratnagar.',
    content: [
      'BIRATNAGAR — The grand auditorium in Biratnagar erupted in applause as Subha Laxmi Rai (Contestant No. 16, Itahari) was officially crowned Miss Koshi 2024 Season #8 at the grand finale organized by Jay Media Management Pvt. Ltd.',
      'The finale was the culmination of an intensive multi-week grooming camp where contestants from Morang, Sunsari, Jhapa, and across Koshi Province underwent personality development, stage performance training, and community advocacy workshops led by CEO Neesha Khatiwada and seasoned artistic mentors.',
      'Addressing the gathering, Jay Media Chairperson Jay Raj Roy reiterated the agency’s commitment to providing young women in eastern Nepal with credible, transformative leadership platforms that celebrate intellect alongside grace.',
      'Runners-up and category titleholders—including Organizers Choice, Miss Photogenic, Miss Talent, and Miss Smile—were honored alongside the grand winner, marking another historic milestone for Koshi Province pageantry.',
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
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'From 4K multicam live streaming to intelligent DMX beam choreography, a look inside Jay Media’s technological investments in Koshi Province.',
    content: [
      'BIRATNAGAR — Historically, major corporate unveilings and televised entertainment productions in Nepal relied on technical crews mobilized exclusively from Kathmandu. Over recent years, Biratnagar-based Jay Media Management Pvt. Ltd. has fundamentally altered that dynamic.',
      'Investing in advanced line array acoustic arrays, 4K digital broadcast switchers, and modular aluminium trussing, the agency now delivers turnkey productions for regional banks, industrial conglomerates, and provincial celebrations.',
      '“Our goal is to ensure that an event organized in Biratnagar or Itahari matches the visual and acoustic caliber of any metropolitan broadcast across South Asia,” stated Chairperson Jay Raj Roy.',
      'As the demand for high-stakes experiential marketing surges across Koshi Province, Jay Media continues to train local technicians and choreographers, building a robust regional entertainment ecosystem.',
    ],
    tags: ['Stagecraft', 'Technology', 'Broadcasting', 'Event Management'],
    featured: false,
  },
];

