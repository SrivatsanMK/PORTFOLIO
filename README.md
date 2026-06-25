# Srivatsan M.K. — AI & ML Developer Portfolio

A world-class, production-ready 3D portfolio website built with modern web technologies.

## 🚀 Tech Stack

- **React 18** + **Vite** + **TypeScript**
- **Three.js** + **React Three Fiber** + **@react-three/drei** — 3D neural network, particle system, skill sphere
- **Framer Motion** — scroll-triggered animations, page transitions, hover effects
- **Tailwind CSS** — custom neon theme, glassmorphism utilities
- **React Icons** — icon library
- **React Type Animation** — typing effect in Hero
- **React CountUp** — animated statistics
- **EmailJS** — contact form submissions

## 📂 Project Structure

```
src/
├── assets/           # Images, icons
├── components/
│   ├── Navbar/       # Glassmorphism navbar with scroll spy
│   ├── Hero/         # Full-screen hero with 3D background
│   ├── About/        # Bio, education, stats
│   ├── Skills/       # 3D sphere + proficiency bars
│   ├── Experience/   # Animated timeline
│   ├── Projects/     # 3D tilt cards
│   ├── Certifications/ # Premium cert cards
│   ├── Achievements/ # Stats + milestone cards
│   ├── Contact/      # Validated form with EmailJS
│   ├── Footer/       # Links + back-to-top
│   └── Loader/       # Loading animation
├── three/
│   ├── NeuralNetwork.tsx  # 3D neural network
│   ├── Particles.tsx      # Interactive particle field
│   ├── SkillSphere.tsx    # Rotating 3D text sphere
│   └── Scene.tsx          # R3F Canvas orchestrator
├── data/             # Portfolio content (projects, skills, experience, etc.)
├── hooks/            # useScrollSpy, useMouseParallax
├── types/            # TypeScript type definitions
├── App.tsx
├── main.tsx
└── index.css
```

## 🛠️ Getting Started

### Install Dependencies
```bash
npm install
```

### Run Dev Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173)

### Build for Production
```bash
npm run build
```

## 📧 EmailJS Setup

To enable the contact form, create a `.env` file:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Then update `src/components/Contact/index.tsx` to use these values in `emailjs.sendForm(...)`.

## 🌐 Deploy to Vercel

1. Push to GitHub
2. Connect repo on [vercel.com](https://vercel.com)
3. **Framework**: Vite
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. Add environment variables in Vercel dashboard

Or use Vercel CLI:
```bash
npx vercel --prod
```

## 🎨 Customization

### Colors — `tailwind.config.js`
```js
'neon-blue': '#00D4FF',    // Primary accent
'neon-purple': '#7C3AED',  // Secondary accent
'background': '#0A0A0A',   // Page background
'surface': '#111827',      // Card/section background
```

### Content — `src/data/`
- `projects.ts` — Add/edit projects
- `skills.ts` — Add skills & proficiency levels
- `experience.ts` — Work experience
- `certifications.ts` — Certifications
- `achievements.ts` — Stats & milestones

## ⚡ Performance Features

- Lazy-loaded sections below the fold
- Manual chunk splitting (Three.js separate bundle)
- Instanced mesh for 3D nodes
- Passive scroll event listeners
- `dpr={[1, 1.5]}` for R3F canvas
