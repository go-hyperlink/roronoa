# Roronoa Zoro — Interactive Web Experience

A cinematic, interactive storytelling website featuring dual-phase scrolling, a canvas frame-scrubber, WebGL flame shaders, and an illustrated washi paper chronicle.

---

## 🔰 Beginner-Friendly Setup Guide

Follow these steps to get the website running on your local machine:

### Prerequisites
Make sure you have **Node.js** (v18.18 or higher) and **Git** installed on your computer.
- Download Node.js: [https://nodejs.org/](https://nodejs.org/)
- Download Git: [https://git-scm.com/](https://git-scm.com/)

---

### Step 1: Clone the Repository
Open your terminal (Command Prompt, PowerShell, or Terminal) and run:

```bash
git clone https://github.com/go-hyperlink/roronoa.git
```

---

### Step 2: Navigate to the Project Folder
Move into the project directory:

```bash
cd roronoa
```

---

### Step 3: Install Dependencies
Download and install all required packages:

```bash
npm install
```

---

### Step 4: Start the Development Server
Launch the local web server:

```bash
npm run dev
```

---

### Step 5: View the Website
Open your web browser (Chrome, Edge, Safari, Brave, etc.) and visit:

👉 **[http://localhost:3000](http://localhost:3000)**

You should now see the interactive experience running live!

> **Tip**: To stop the server at any time, press `Ctrl + C` in your terminal.

---

## 📦 Building for Production

When you are ready to test the optimized production build:

```bash
# 1. Build the production package
npm run build

# 2. Run the production server
npm start
```

---

## 📁 Project Structure

- `components/` — Canvas frame scrubber, WebGL blaze shader, timeline, and storybook chapters.
- `public/frames/` — Sequential webp animation frames for the hero scrubber.
- `public/audio/` — Background audio track (`audio.mp3`).
- `public/zoro-pic/` — Storybook illustrations.
- `lib/` — Web Audio API engine, sequence preloader, and chapter constants.
- `promt.md` — Reusable master prompt template for creating similar websites.
