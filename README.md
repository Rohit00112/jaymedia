# Jay Media Management Pvt. Ltd.

> **Premium Cinematic Website & Content Management System**  
> Location: Near Traffic Chowk, Main Road, Biratnagar, Koshi Province, Nepal  
> Official Domain: [jaymediamanagement.com](https://www.jaymediamanagement.com/)  
> GitHub Repository: [Rohit00112/jaymedia](https://github.com/Rohit00112/jaymedia)

---

## 🌟 Executive Overview

**Jay Media Management Pvt. Ltd.** is an event management and media production house based in Biratnagar, Nepal, led by Chairperson **Jay Raj Rai** and Chief Executive Officer **Nisha Khatiwada Rai**.

This platform delivers an immersive, cinematic, editorial digital experience built for clients, corporate sponsors, and pageant contestants across eastern Nepal.

### Signature Productions Showcased:
- **Miss Koshi**: Premier regional beauty pageant and youth leadership platform for Koshi Province (titleholder: *Shuva Laxmi Rai*).
- **Mr. and Miss Little Koshi**: Celebrated annual children's talent, confidence, and personality competition across Biratnagar, Itahari, and Dharan (titleholders: *Ocean Jung Thapa* & *Upasana Ramdam*).
- **Corporate Launches & Brand Galas**: Custom stagecraft, theatrical reveals, and VIP hospitality for leading commercial entities.

---

## 🎨 Visual Identity & Design Tokens

- **Design Style**: Premium Cinematic + Editorial + Immersive Creative Studio
- **Palette**:
  - **Ink**: `#101014` (Deep background & typography)
  - **Dark Surface**: `#1B1B21` (Card canvas & control centers)
  - **Warm Ivory**: `#F5F2EC` (Editorial contrast sections)
  - **Coral Accent**: `#FF594F` (Reserved for key interactive elements & CTAs)
  - **Muted Grey**: `#99979A` (Secondary metadata & labels)
  - **White**: `#FFFFFF`
- **Typography**:
  - **Display Headline**: Space Grotesk
  - **Body Typography**: DM Sans

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router with Partial Prerendering)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4
- **Animation**: Anime.js v3.2.2 (Coordinated DOM timelines & scroll reveals)
- **3D Graphics**: Three.js & React Three Fiber (Ambient particle field)
- **Smooth Scrolling**: Lenis
- **Backend & Cloud Infrastructure**: Firebase (Firestore, Storage, Authentication, Admin SDK)
- **Icons**: Lucide React
- **Validation**: Zod + React Hook Form

---

## 🗺️ Complete Site Structure

### Public Routes
- `/`: Cinematic Homepage (10 coordinated editorial sections)
- `/about`: Company story, verified leadership, mission, and chronological milestones
- `/services`: Production capabilities catalog
- `/services/[slug]`: Deep dive into specific capabilities, phased methodology, and deliverables
- `/events`: Flagship productions portfolio
- `/events/[slug]`: In-depth event archives (Miss Koshi, Little Koshi, Corporate Galas)
- `/team`: Verified leadership roster (Jay Raj Rai, Nisha Khatiwada Rai) and mentors
- `/gallery`: Interactive photo archive with category filtering and keyboard-accessible lightbox
- `/news`: Press releases and coronation dispatches
- `/news/[slug]`: Full articles with Schema.org `Article` structured data
- `/contact`: Client inquiry form with Zod validation and direct API submission
- `/sitemap.xml` & `/robots.txt`: Search engine optimization files

### Studio Admin CMS
- `/admin/login`: Secure administrator login portal
- `/admin`: Control center with production metrics, live stats, and quick actions
- `/admin/events`: Full CRUD event catalog management
- `/admin/events/new`: Event composer with cover upload and stagecraft metadata
- `/admin/events/[id]`: Event editor
- `/admin/services`: Services overview and status management
- `/admin/team`: Leadership and advisory board profiles
- `/admin/gallery`: Image vault management with category tags
- `/admin/news`: Press release drafting and publication
- `/admin/inquiries`: Lead review queue with status management (New, Contacted, In Progress, Completed)
- `/admin/settings`: Official entity address, phone, and social broadcast links

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Rohit00112/jaymedia.git
cd jaymedia
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy `.env.example` to `.env.local` and add your Firebase credentials:
```bash
cp .env.example .env.local
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### 5. Build for production
```bash
npm run build
```

---

## 🔒 Security & Firestore Rules

Production Firestore and Storage rules are configured in `firestore.rules` and `storage.rules`:
- Public read access is strictly limited to published content.
- Inquiries can be written by the public but read/updated only by authenticated admins.
- Storage uploads are restricted to admin users and validated image MIME types (<10MB).
