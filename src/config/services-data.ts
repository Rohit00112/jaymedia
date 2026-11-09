export interface ServiceData {
  slug: string;
  number: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  image: string;
  capabilities: string[];
  approach: {
    phase: string;
    title: string;
    detail: string;
  }[];
  deliverables: string[];
}

export const SERVICES_DATA: ServiceData[] = [
  {
    slug: 'event-management',
    number: '01',
    title: 'Event Management & Execution',
    category: 'Flagship Stagecraft',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    shortDescription:
      'End-to-end planning, stage engineering, technical AV, lighting, and logistical execution for grand pageants, arena concerts, and gala celebrations.',
    description:
      'As eastern Nepal’s leading event production house, Jay Media Management takes ownership of every logistical variable. From structural stage rigging and intelligent lighting to sound acoustics, artist hospitality, and crowd control, we transform empty auditoriums and open grounds into world-class spectacle environments.',
    capabilities: [
      'Monumental Stage Architecture & Rigging',
      'Intelligent DMX Lighting & Atmospheric FX',
      'Line-Array Sound Engineering & Acoustic Tuning',
      'Artist Hospitality, Green Room & Security Protocol',
      'VIP Seating & Protocol Management',
      'Municipal & Government Liaison Approvals',
    ],
    approach: [
      {
        phase: 'Phase 01',
        title: 'Creative Blueprint & Scenography',
        detail: '3D spatial modeling of stage, lighting plots, and audience sightlines tailored to the venue in Biratnagar or beyond.',
      },
      {
        phase: 'Phase 02',
        title: 'Logistical Synchronization',
        detail: 'Procuring heavy AV infrastructure, coordinating security forces, and scheduling multi-tier backstage protocol.',
      },
      {
        phase: 'Phase 03',
        title: 'Precision Live Execution',
        detail: 'Directing the cue-to-cue run sheet with dedicated stage managers, technical directors, and live communications.',
      },
    ],
    deliverables: [
      'Full Technical Run-Sheet & Schedule',
      'CAD Stage Layout & 3D Renderings',
      'Flawless Live Sound & Lighting Control',
      'Comprehensive Post-Event Debrief Report',
    ],
  },
  {
    slug: 'brand-experiences',
    number: '02',
    title: 'Brand Experiences & Activations',
    category: 'Experiential Marketing',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80',
    shortDescription:
      'Immersive consumer activations and tailored experiential events designed to turn brands into memorable cultural conversations.',
    description:
      'Consumers no longer just buy products; they crave emotional resonance. We bridge the gap between commercial objectives and unforgettable cultural moments through pop-up brand pavilions, mall activations across Biratnagar, Dharan, and Itahari, and interactive consumer experiences that generate massive organic word-of-mouth.',
    capabilities: [
      'Experiential Pop-Up Architecture & Booth Design',
      'Interactive Consumer Engagement Zones',
      'Trained Brand Ambassadors & Emcees',
      'Social Media Live Photo-Ops & AR Installations',
      'Sampling & Data-Capture Mechanization',
    ],
    approach: [
      {
        phase: 'Phase 01',
        title: 'Audience Insight & Concepting',
        detail: 'Identifying key regional consumer demographics and sculpting a central activation hook that resonates locally.',
      },
      {
        phase: 'Phase 02',
        title: 'Custom Fabrication & Testing',
        detail: 'Constructing branded kiosks, interactive displays, and signage that stand out in crowded commercial spaces.',
      },
      {
        phase: 'Phase 03',
        title: 'On-Ground Engagement & Amplification',
        detail: 'Executing the activation with trained facilitators, ensuring high footfall, verified lead capture, and social buzz.',
      },
    ],
    deliverables: [
      'Custom Branded Structure Fabrication',
      'Audience Engagement Metrics & Lead Logs',
      'High-Resolution Photography & Recap Video',
    ],
  },
  {
    slug: 'media-production',
    number: '03',
    title: 'Media & Entertainment Production',
    category: 'Broadcast & Studio',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    shortDescription:
      'Cinematic multicam event broadcasting, commercial video production, photography, and high-impact digital content creation.',
    description:
      'Our dedicated in-house media production division captures live energy with cinematic flair. Equipped with 4K multicam switchers, gimbal rigs, drone telemetry, and high-fidelity audio capture, we live-stream grand pageants and produce high-caliber commercials that captivate millions across YouTube and television.',
    capabilities: [
      'Multicam 4K Live Broadcast & YouTube Streaming',
      'High-End Commercial & Promo Video Production',
      'Stage Photography & Red Carpet Step-and-Repeat',
      'Color Grading & Professional Sound Mixing',
      'Short-Form Social Media Reels & Clip Vaults',
    ],
    approach: [
      {
        phase: 'Phase 01',
        title: 'Shot Listing & Pre-Visualization',
        detail: 'Planning camera placements, switcher cue cards, and lighting temperatures for broadcast continuity.',
      },
      {
        phase: 'Phase 02',
        title: 'Live Telecast & Capture',
        detail: 'Real-time video switching with animated lower-thirds, instant replays, and pristine digital audio recording.',
      },
      {
        phase: 'Phase 03',
        title: 'Editorial Post-Production',
        detail: 'Rapid turnaround of teaser clips, YouTube full broadcasts, and cinematic aftermovies.',
      },
    ],
    deliverables: [
      'Master High-Bitrate Live Stream Recording',
      'Cinematic Official 4K Showreel',
      'Curated High-Resolution Photo Gallery',
      'Social Media Highlight Packages',
    ],
  },
  {
    slug: 'product-launches',
    number: '04',
    title: 'Product & Store Launches',
    category: 'Commercial Milestones',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    shortDescription:
      'Spectacular unveiling ceremonies, architectural lighting, VIP hospitality, and press coordination for high-profile market entrances.',
    description:
      'First impressions define market trajectory. Jay Media Management designs dramatic, high-energy product reveals for automotive brands, retail outlets, tech companies, and regional industry pioneers. We blend theatrical kabuki drops, laser reveals, and curated guest lists to make your debut unforgettable.',
    capabilities: [
      'Theatrical Unveiling Rigging (Kabuki Drop, Cold Pyros)',
      'Architectural Facade Lighting & Projection',
      'Keynote Presentation Stagecraft & Teleprompter',
      'Influencer & Regional Media Coordination',
      'Turnkey VIP Hospitality & Welcome Protocols',
    ],
    approach: [
      {
        phase: 'Phase 01',
        title: 'Reveal Narrative Crafting',
        detail: 'Designing the build-up tension and climactic unveiling sequence that puts the spotlight purely on the product.',
      },
      {
        phase: 'Phase 02',
        title: 'Technical Integration',
        detail: 'Calibrating timing cues between lighting blackouts, audio crescendos, and mechanized drop reveals.',
      },
      {
        phase: 'Phase 03',
        title: 'Celebration & Press Briefing',
        detail: 'Transitioning guests seamlessly from the dramatic reveal to interactive demos and cocktail hospitality.',
      },
    ],
    deliverables: [
      'Turnkey Launch Staging & Visual Architecture',
      'Press Coverage Dossier & Media Mentions',
      'Official Unveiling Video & Image Archive',
    ],
  },
  {
    slug: 'press-events',
    number: '05',
    title: 'Press Events & Conferences',
    category: 'Corporate Communications',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    shortDescription:
      'Professional stage design, audio synchronization, press kit distribution, and executive media management for strategic announcements.',
    description:
      'When your organization has critical news to share, professionalism and audio clarity are paramount. We handle complete media press conferences, stakeholder symposiums, and corporate AGM productions with executive poise, reliable microphone acoustics, and seamless press coordination.',
    capabilities: [
      'Corporate Backdrop & Podiums with Branded Mic Flags',
      'Clean Audio Feeds for Media Broadcast Outlets',
      'Press Registration, Media Kit Distribution & Kit Folders',
      'Q&A Audio Roaming & Panel Stage Setup',
      'Live Stream Recording for Remote Journalists',
    ],
    approach: [
      {
        phase: 'Phase 01',
        title: 'Media Strategy & Setup',
        detail: 'Coordinating venue acoustics, press risers, and branded media backdrops for sharp photographic backgrounds.',
      },
      {
        phase: 'Phase 02',
        title: 'Press Welcoming & Briefing',
        detail: 'Accrediting incoming journalists, handing out dossiers, and briefing spokespeople prior to conference commencement.',
      },
      {
        phase: 'Phase 03',
        title: 'Moderated Execution & Follow-Up',
        detail: 'Managing crisp question-and-answer sessions and providing press with instant high-res digital photo assets.',
      },
    ],
    deliverables: [
      'Broadcast-Quality Media Sound Feed',
      'Photographic Press Pack for Immediate Release',
      'Archival Video Documentation',
    ],
  },
];

