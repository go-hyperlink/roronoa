# 🎨 Pre-Prompt Guide: How to Collect Resources & Inspiration

Before filling out the prompt below, follow these quick steps to gather your assets, references, and inspiration:

### 1. Visual Inspiration & References
- **Where to look**:
  - **Pinterest**: Search for character aesthetics, Japanese poster design, brutalist/minimalist anime layouts, moodboards, or sumi-e art styles.
  - **Google Images / ArtStation / Behance**: Search for character concept art, high-resolution key visuals, and editorial typography layouts.
  - **Awwwards / Siteinspire**: Take screenshots of website transitions, layouts, and micro-interactions you want to replicate.
- **Save them**: Collect URLs or save screenshots to your project folder (or describe them in detail in the *Visual References* section below).

### 2. Video Clips & Frame Extraction (For the Canvas Scrubber)
- **Find a high-quality video clip**:
  - Search **YouTube** or motion archives for a 4–10 second smooth video (e.g., character transformation, 360° camera rotation, fighting stance, or sword slash).
- **Extract individual frames with Ezgif**:
  1. Open [ezgif.com/video-to-jpg](https://ezgif.com/video-to-jpg) (or [ezgif.com/video-to-webp](https://ezgif.com/video-to-webp)).
  2. Upload your downloaded video clip.
  3. Set frame rate to **20 to 30 fps** (a 10-second clip will generate ~150 to 300 frames).
  4. Click **Convert to JPG/WebP**, download the ZIP archive of extracted frames, and extract them.
  5. Rename frames sequentially (e.g. `frame-001.webp` through `frame-300.webp`) and place them inside `/public/frames/`.
  *(Tip: WebP format is recommended for smaller file sizes and instant browser decoding).*

### 3. Fonts & Typography
- **Google Fonts / DaFont / Adobe Fonts**:
  - **Display / Title Font**: Choose a bold, stylized font matching your theme (e.g., Japanese brush style, gothic serif, cyberpunk sci-fi, or elegant roman).
  - **Body Font**: A readable serif (e.g., *Cinzel*, *Noto Serif*, *Playfair Display*) or modern sans-serif (*Inter*, *Geist*).
  - **Tech / Meta Font**: A clean monospace font for chapter indexes, coordinates, and statistics (*JetBrains Mono*, *Geist Mono*).
- Put font names or local font links into the configuration below.

### 4. Background Audio & Sound FX
- Find an atmospheric background soundtrack (looping `.mp3`) on YouTube Audio Library, Freesound, or anime OST archives.
- Save it to `/public/audio/audio.mp3`.
- Mention any specific sound effects you want the procedural Web Audio engine to synthesize (e.g., katana rings, futuristic laser hums, thunderclaps, or water drops).

---

# 🚀 The Master Prompt
*(Copy everything below and paste it into your AI assistant. You can customize the fields under **USER CONFIGURATION & INPUT VALUES**, or leave them as [DEFAULT] to generate the Roronoa Zoro website.)*

```markdown
# Role & Mission
You are an elite creative technologist and principal frontend architect specializing in award-winning, interactive digital experiences (Awwwards / FWA of the Day standard).

Build a full-stack, responsive, cinematic storytelling website in Next.js (App Router), TypeScript, and Tailwind CSS. The experience is divided into two seamless phases:
1. **Phase 1: Cinematic Frame-Scrubber Hero** — A canvas-based interactive sequence with velocity physics, WebGL heat/fire distortion shaders, floating ambient particles, custom cursor, and procedural Web Audio sound effects.
2. **Phase 2: Tactile Storybook Chronicles** — An illustrated scroll experience featuring organic paper textures, red seal stamps (Hanko), sumi-e ink splatters, interactive weapon/anatomy breakdown diagrams, timeline milestones, and interactive narrative cards.

---

## 🎛️ USER CONFIGURATION & INPUT VALUES
*(Edit the fields below with your own gathered links, screenshots, and ideas. Any field left blank or marked [DEFAULT] will automatically use the default theme values below.)*

- **Subject / Character / Concept**: [DEFAULT: Roronoa Zoro — "The King of Hell" / Pirate Hunter from One Piece]
- **Core Aesthetic & Mood**: [DEFAULT: Traditional Japanese Sumi-e Ink meets Dark Modern Anime Minimalist; deep obsidian canvas transitioning to weathered warm washi paper]
- **Color Palette**:
  - Background Dark: [DEFAULT: #070b09 (Obsidian ink)]
  - Background Paper: [DEFAULT: #f5efe2 (Washi rice paper)]
  - Primary Accent: [DEFAULT: #10b981 / #2bf8a0 (Enma Emerald Haki flame)]
  - Secondary Accent: [DEFAULT: #dc2626 (Curse red / blood ink)]
  - Paper Text: [DEFAULT: #1a1714 (Sumi charcoal ink)]
- **Typography & Fonts**:
  - Display / Title Font: [DEFAULT: "Avatar Airbender" / Stylized Brush Serif]
  - Body Font: [DEFAULT: Serif italic / Noto Serif JP]
  - Meta / Accents: [DEFAULT: Geist Mono / JetBrains Mono]
- **Image Sequence / Frame Scrubbing (from Ezgif / Video)**:
  - Total Frames: [DEFAULT: 300 frames]
  - Aspect Ratio: [DEFAULT: 16:9 cinematic]
  - Sequence Path Pattern: [DEFAULT: /frames/frame-[001-300].webp (with graceful canvas fallback if frames are missing)]
  - Source Video Link / Reference: [Paste your YouTube or video link here]
- **Visual References / Screenshots / Moodboards**:
  - Pinterest / Behance Moodboard Link: [Paste link here]
  - Screenshots / Image URLs: [Paste image URLs or describe specific scenes/shots here]
- **Narrative Chapters (Scrubber & Story)**:
  - Chapter I: [DEFAULT: "The Swordsman" — A solitary vow carved into steel]
  - Chapter II: [DEFAULT: "Three Swords. One Path." — Wado Ichimonji · Sandai Kitetsu · Enma]
  - Chapter III: [DEFAULT: "Breath of All Things" — Awakening the conqueror's spirit]
  - Chapter IV: [DEFAULT: "King of Hell" — Dragon Damnation & En-Ō Santoryu]
  - Chapter V: [DEFAULT: "Roronoa Zoro" — Master of Three Swords]
- **Audio Ambience**:
  - BGM Track: [DEFAULT: Looping atmospheric track (/audio/audio.mp3)]
  - Interactive SFX: [DEFAULT: Procedural Web Audio API blade rings, metallic chimes, and whoosh sweeps]

---

## 🏗️ SYSTEM ARCHITECTURE & REQUIREMENTS

### 1. Dual-Phase Scroll Experience


┌────────────────────────────────────────────────────────┐
│ PHASE 1: IMMERSIVE HERO FRAME-SCRUBBER                 │
│ • Fixed 100vh viewport pinned over a tall scroll track │
│ • Canvas 2D frame animation driven by scroll progress  │
│ • WebGL Flame / Heat Distortion Overlay (Blaze FX)     │
│ • Floating Haki particle physics (mouse-responsive)    │
│ • Floating Scrubber Bar, Chapter jump chips & Mute BTN │
└───────────────────────────┬────────────────────────────┘
                            │ (Washi paper cut-edge transition)
┌───────────────────────────▼────────────────────────────┐
│ PHASE 2: TACTILE STORYBOOK "THE CHRONICLES"            │
│ • Organic washi paper background with fiber grain & SVG│
│ • Chapter Cards with polaroid tilt, washi tape & notes │
│ • Interactive Anatomy / Weapon Selector                │
│ • Saga Timeline with interactive milestone details     │
│ • Climax vignette ("Nothing Happened" blood-stain FX) │
│ • Character Evolution Stepper (Humility before strength)│
│ • Epilogue with "Return to Top" smooth trigger         │
└────────────────────────────────────────────────────────┘


---

### 2. Phase 1: Canvas Frame-Scrubber & WebGL Fire/Particle Engine

1. **Canvas Frame Engine (`WatercolorCanvas.tsx`)**:
   - Maintains an off-screen preloader cache for all frames (`SequencePreloader`).
   - Uses `requestAnimationFrame` and linear interpolation (`lerp`) for smooth scrubbing even during fast wheel or touch flick gestures.
   - Calculates scroll velocity (`normalized px/frame`) to dynamically drive:
     - Motion blur or particle velocity boost.
     - Audio triggering (fast scroll triggers whoosh/blade audio).
     - Heat distortion intensity in the WebGL shader.
   - Fallback rendering: If frame assets are missing, draw a procedurally generated sumi-e ink aura with dynamic kanji watermarks on the canvas.

2. **WebGL Shaders (`Blaze.tsx` or `FlameWrap.tsx`)**:
   - Lightweight custom WebGL fragment shader creating realistic fire, embers, smoke, and heat-wave refractions.
   - Configurable options: spark density, distortion scale, flame height, ember color, glow intensity.
   - Responsive to scroll progress (e.g., intensifies to peak heat during the climax chapter).

3. **Floating Ambient Particles**:
   - Canvas-based particle pool (60+ particles) that float upward, gently reacting to cursor movement with slight spring physics.
   - Particle colors match the primary accent (e.g., emerald green haki + charcoal dust).

4. **HUD & Navigation Controls**:
   - Fixed top header: Character logo with pulsing aura dot, chapter shortcut chips, sound toggle (Mute/Unmute), and reduced-motion toggle.
   - Bottom scrubber timeline: Shows current chapter name, roman numerals, active frame number, and an interactive draggable scrub handle.
   - Full keyboard accessibility: Arrow keys, Page Up/Down, and Spacebar scrub through chapters.

---

### 3. Audio Engine (`lib/audio.ts`)

- Implement a standalone `SoundEngine` class utilizing the browser's native **Web Audio API**:
  - **Procedural Blade Ring**: Dual-frequency bandpass-filtered oscillators (`sine` + `triangle` with fast attack and exponential decay) replicating sharp katana steel impact.
  - **Swish / Air Slice**: White noise generator shaped by a modulated bandpass filter for fast scroll sweeps.
  - **Atmospheric Looping BGM**: Background audio track with soft fade-in on first user interaction, respecting the global mute state.
  - No external audio libraries required—pure Web Audio API.

---

### 4. Phase 2: Tactile Storybook Chronicles

1. **Washi Paper Background (`PaperBackground.tsx`)**:
   - Warm rice paper gradient (`#f5efe2` to `#e8ddca`) with SVG fractal noise filter for tactile fiber tooth.
   - Ambient watercolor tea-wash stains and faded sumi-e bleeds in corners.
   - Seamless, organic torn-paper SVG boundary (`PaintedCutEdge`) separating the dark hero from the storybook.

2. **Hand-Drawn Editorial Components (`HandDrawnElements.tsx`)**:
   - **Hanko Stamps**: Crimson square seal stamps with Japanese kanji or emblem, faint ink bleed, and distressed stamp texture.
   - **Washi Tape**: Translucent masking tape strips holding down cards at slight random angles (`tiltAngle: -2deg to 2deg`).
   - **Sumi-e Splatters**: Procedural or vector ink splatters accentuating quotes and milestones.
   - **Jittered Annotation Arrows**: Hand-drawn SVG arrows pointing to key visual details on character cards.

3. **Interactive Editorial Features**:
   - **Weapon / Item Anatomy (`SantoryuDiagram.tsx`)**: Interactive selector switching between items (e.g., Wado Ichimonji, Kitetsu, Enma) with stats, lore, smith provenance, and blade color auras.
   - **Saga Milestone Timeline (`GrandLineTimeline.tsx`)**: Horizontal or vertical chronicle map with clickable waypoints showing pivotal story quotes and techniques.
   - **Climax Moment (`NothingHappenedSection.tsx`)**: Monumental typographic section featuring giant faint background kanji, interactive blood splatter accents, and sound-triggered impact.
   - **Growth Evolution Stepper (`MihawkHumilitySection.tsx`)**: Interactive 5-stage transformation diagram displaying character progression from arrogance to supreme mastery.
   - **Epilogue & Return to Top**: Climax illustration with a smooth-scroll "Return to Top" action and audio chime.

---

### 5. Technical Specifications & File Structure


├── app/
│   ├── globals.css          # Tailwind imports, custom font faces, keyframe animations
│   ├── layout.tsx           # SEO metadata, font definitions, dark body wrapper
│   └── page.tsx             # Mounts ScrollExperience
├── components/
│   ├── ScrollExperience.tsx # Master container managing scroll progress & audio triggers
│   ├── WatercolorCanvas.tsx # 2D Canvas rendering frame sequence + particle system
│   ├── Blaze.tsx            # WebGL shader for heat shimmer & fire sparks
│   ├── Navigation.tsx       # Top bar, chapter chips, audio toggle
│   ├── ScrubberTimeline.tsx # Bottom progress bar & chapter scrub slider
│   ├── CustomCursor.tsx     # Custom blade cursor with trailing slash effect
│   └── story/
│       ├── StoryExperience.tsx        # Phase 2 container with torn paper top transition
│       ├── PaperBackground.tsx        # Textured washi paper background with SVG grain
│       ├── StorySection.tsx           # Standard chapter card with polaroid tilt & notes
│       ├── SantoryuDiagram.tsx        # Interactive 3-weapon anatomy showcase
│       ├── GrandLineTimeline.tsx      # Journey milestone timeline
│       ├── NothingHappenedSection.tsx # Climax vignette section
│       ├── MihawkHumilitySection.tsx  # Character evolution stepper
│       ├── WanoEnmaSection.tsx        # Awakening flame interactive section
│       ├── HandDrawnElements.tsx      # Hanko stamps, washi tape, arrows, splatters
│       └── StoryClosing.tsx           # Epilogue and back-to-top trigger
└── lib/
    ├── audio.ts             # Web Audio API synthesizer (blade ring, swish, BGM controller)
    ├── constants.ts         # Chapter metadata, timeline steps, frame counts
    └── imageSequence.ts     # Sequential frame preloader with LRU cache


---

### 6. Polish & Accessibility
- Support `prefers-reduced-motion`: When active, disable WebGL heat distortion, reduce particle count by 75%, and provide instant scrolling transitions.
- Fully responsive across desktop, tablet, and mobile (touch drag supported for scrubbing).
- Zero console errors, clean TypeScript types throughout, no heavy 3D engine bloat (use pure WebGL + Canvas2D for 60fps performance).
```
