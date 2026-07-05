# Nilou Jay S. Fernandez — Portfolio Website

A modern, responsive, accessible personal portfolio built with plain **HTML, CSS, and JavaScript** — no framework, no build step. Designed for an IT Instructor / Software Developer, but every section is easy to relabel for any role.

> **Sample content notice:** The employers, projects, certifications, and testimonials in this project are still placeholder sample content written to show the layout. The name (Nilou Jay S. Fernandez) and email (niljay.ctrspace@gmail.com) are already set to the real values. Replace the rest before publishing — search for `Sample University` and the project descriptions in each page.

---

## Features

- Fully responsive, mobile-first layout (Flexbox + Grid)
- Light and dark mode with saved preference (`localStorage`)
- Glassmorphism navbar, soft gradients, and pastel color system
- Typing animation, scroll-reveal animation, animated counters
- Sticky navbar with scroll-based active-link highlighting
- Filterable project grid
- Client-side validated contact form (wired for Formspree)
- Scroll progress bar, back-to-top button, preloader
- Semantic HTML5, ARIA labels, Open Graph meta tags, keyboard focus states

---

## Folder Structure

The site is a **multi-page site** — every nav item is its own HTML file, all sharing one stylesheet and one script file:

```
Portfolio/
│
├── index.html            → Home (hero)
├── about.html            → About
├── skills.html           → Skills
├── experience.html       → Experience
├── projects.html         → Projects (with filtering)
├── certifications.html   → Certifications
├── services.html         → Services
├── testimonials.html     → Testimonials
├── contact.html          → Contact form
├── css/
│   └── style.css         → All styling: tokens, layout, components, animations (shared by every page)
├── js/
│   └── script.js         → All interactivity (shared by every page — each function checks whether its element exists before running, so one script safely covers every page)
├── images/
│   └── favicon.svg       → Site icon (replace with your own photo/logo assets here too)
├── assets/
│   └── resume.pdf        → Put your downloadable résumé here (referenced by the hero button)
├── .gitignore
└── README.md
```

**Why this structure?**

- Separating `css/` and `js/` from the HTML files keeps each language's concerns isolated, and lets the browser cache one stylesheet/script across every page instead of re-downloading styles per page.
- Each nav item being its own file gives every section its own URL (e.g. `yoursite.com/projects.html`), its own page title, and its own meta description — better for SEO and for sharing a direct link to one section.
- The active page is marked directly in each file's nav (`class="is-active" aria-current="page"`), so highlighting the current page needs no JavaScript.
- `images/` and `assets/` are split so visual media (photos/icons) is easy to tell apart from downloadable documents (résumé, PDFs).

---

## Running It Locally

No install needed — it's static HTML/CSS/JS.

1. Download or clone the folder.
2. Open `index.html` directly in a browser, **or** for a closer-to-production experience, serve it locally:
   ```bash
   # Python 3
   python -m http.server 5500
   # then visit http://localhost:5500
   ```

---

## Customizing

| What to change        | Where                                                    |
| --------------------- | -------------------------------------------------------- |
| Name, title, hero bio | `index.html`                                             |
| About text            | `about.html`                                             |
| Skills                | `skills.html`                                            |
| Work history          | `experience.html`                                        |
| Projects              | `projects.html` (each `<article class="project-card">`)  |
| Certifications        | `certifications.html`                                    |
| Services              | `services.html`                                          |
| Testimonials          | `testimonials.html`                                      |
| Contact info / form   | `contact.html`                                           |
| Colors / fonts        | `css/style.css` → `:root` variables at the top           |
| Résumé file           | Replace `assets/resume.pdf` with your own, same filename |
| Favicon               | Replace `images/favicon.svg`                             |

**Adding a new page:** copy the closest existing page as a starting point, keep the `<header>`/`<nav>` and `<footer>` blocks identical to the others (just add a new `<li>` in every page's nav so the link shows up everywhere), and swap out the `<main>` content.

---

## Contact Form Setup (Web3Forms → sends to niljay.ctrspace@gmail.com)

The form in `contact.html` posts to **Web3Forms** via `fetch()`, which forwards every submission straight to **niljay.ctrspace@gmail.com** as an email — no backend server, no account dashboard required.

1. Go to **https://web3forms.com**.
2. Enter `niljay.ctrspace@gmail.com` in the "Access Key" generator on the homepage and click **Create Access Key**.
3. Web3Forms emails that address an **Access Key** (a long string) — check that inbox.
4. Open `contact.html`, find this line near the top of the form:
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY" />
   ```
   and replace `YOUR_ACCESS_KEY` with the key you received.
5. Save, then submit the live form once to test — the message should arrive in that Gmail inbox within a few seconds (check Spam the first time).

That's it — no further setup. If you ever want submissions to go to a different email, generate a new access key for that address and swap it in.

**Note on the hidden `botcheck` field:** it's a honeypot — invisible to real visitors, but bots that auto-fill every field will trip it, and the script silently discards those submissions before they ever reach your inbox.

---

## Certification Files

Every certification/training title on `certifications.html` is now a clickable link that opens the certificate file in a new tab. Files go in **`assets/certificates/`**, and each link expects an exact filename:

| Title on the page                                                          | Expected filename                                |
| -------------------------------------------------------------------------- | ------------------------------------------------ |
| Odoo Teacher Academy                                                       | `odoo-teacher-academy.pdf`                       |
| Webinar on Digital Infrastructure Innovations                              | `webinar-digital-infrastructure-innovations.pdf` |
| 10th Ateneo Graduate Research and Innovation Conference (AGRIC 2026)       | `agric-2026.pdf`                                 |
| Microcredentialing in Action: Curriculum Integration Seminar-Workshop      | `microcredentialing-in-action.pdf`               |
| How PMP Elevates Careers                                                   | `how-pmp-elevates-careers.pdf`                   |
| Awareness Raising Campaign on AI Through Hour of Code and AI Class (ASEAN) | `ai-hour-of-code-asean.pdf`                      |
| Software Development and Design Thinking                                   | `software-development-design-thinking.pdf`       |
| CCS Technical Support Manpower                                             | `ccs-technical-support-manpower.pdf`             |
| Computer Programming Proficiency Test 2025                                 | `computer-programming-proficiency-test-2025.pdf` |
| Blockchain Campus Conference                                               | `blockchain-campus-conference.pdf`               |
| Cybersecurity Awareness for Everyone                                       | `cybersecurity-awareness-for-everyone.pdf`       |
| Tech Trends: Artificial Intelligence (Intermediate Session)                | `tech-trends-ai-intermediate.pdf`                |
| DICT Metaverse of Learnings in Education Today                             | `dict-metaverse-learnings-education.pdf`         |
| Cisco — Introduction to Modern AI                                          | `cisco-intro-modern-ai.pdf`                      |
| Cisco — Data Analytics Essentials                                          | `cisco-data-analytics-essentials.pdf`            |
| Cisco — IT Customer Support Basics                                         | `cisco-it-customer-support-basics.pdf`           |
| Google Certified Educator, Level 1                                         | `google-certified-educator-level-1.pdf`          |
| Google Certified Educator, Level 2                                         | `google-certified-educator-level-2.pdf`          |
| Coursera — Foundations: Data, Data, Everywhere                             | `coursera-foundations-data-everywhere.pdf`       |
| EDP Specialist (Computer Programmer) Eligibility                           | `edp-specialist-eligibility.pdf`                 |

**Notes:**

- Files can be PDF, JPG, or PNG — if you use an image instead of a PDF, just change the file extension in `certifications.html` to match (e.g. `.jpg`).
- Until a given file actually exists in `assets/certificates/`, its link will open to a broken/"not found" page — that's expected and harmless; just add the missing files whenever you have them.
- If you'd rather use different filenames, send me the list and I'll update the `href`s in `certifications.html` to match exactly.

## Photo Gallery (about.html)

The About page has a "Photo Albums" section with tabs for 5 albums: Seminars and Trainings, BSIT IT Exhibits 2025, BSIT IT Exhibits 2026, Capstone Defense 2025, and BSIT Graduates.

```
photos/
├── albums-data.js                 → the manifest that drives the gallery
├── seminars-and-trainings/        → put that album's image files here
├── bsit-it-exhibits-2025/
├── bsit-it-exhibits-2026/
├── capstone-defense-2025/
└── bsit-graduates/
```

**To add photos:**

1. Drop the image file into the matching folder, e.g. `photos/seminars-and-trainings/img1.jpg`.
2. Open `photos/albums-data.js` and add that exact filename as a string to that album's `photos` array.
3. Save and refresh — no other file needs to change.

Example — adding two photos to "BSIT Graduates":

```js
{
  id: "bsit-graduates",
  title: "BSIT Graduates",
  folder: "photos/bsit-graduates",
  photos: ["graduation-stage.jpg", "graduates-group.jpg"]
}
```

Clicking any thumbnail opens it full-size in a lightbox (closes via the × button, clicking outside the image, or the Escape key). An album with an empty `photos` array shows a friendly "no photos yet" message instead of a blank grid.

## Git & GitHub

**What Git is:** a version control system that tracks every change to your code so you can undo mistakes, work on features safely, and collaborate without overwriting each other's work.
**What GitHub is:** a website that hosts Git repositories online, so your code has a backup and a shareable URL, and so tools like Vercel can deploy directly from it.

### First-time setup

```bash
git init                        # turns this folder into a Git repository
git add .                       # stages every file for the next commit
git commit -m "Initial portfolio"   # saves a snapshot with a message
git branch -M main              # renames the default branch to "main"
git remote add origin https://github.com/USERNAME/portfolio.git   # links to GitHub
git push -u origin main         # uploads your commit and sets "origin/main" as the default remote
```

- `git init` — creates a hidden `.git` folder that stores your project's history.
- `git add .` — moves changed files into the "staging area", i.e. what will be included in the next commit.
- `git commit -m "..."` — permanently records the staged changes with a message explaining what changed.
- `git branch -M main` — GitHub's default branch name is `main`; this renames your local branch to match.
- `git remote add origin <url>` — tells Git that "origin" refers to your GitHub repository's URL.
- `git push -u origin main` — uploads your commits to GitHub; `-u` remembers this pairing so future pushes can just be `git push`.

### Creating the GitHub repository

1. Sign up at **github.com** if you don't have an account.
2. Click the **+** icon (top right) → **New repository**.
3. Name it (e.g. `portfolio`), leave it public, **do not** initialize with a README (you already have one).
4. Click **Create repository** — GitHub shows you the exact commands above with your username filled in.
5. Run those commands from inside your `Portfolio/` folder.
6. Refresh the GitHub page — your files should now appear.

### Making future updates

```bash
git add .
git commit -m "Describe what you changed"
git push
```

### Common errors

| Error                          | Fix                                                                                 |
| ------------------------------ | ----------------------------------------------------------------------------------- |
| `fatal: not a git repository`  | Run `git init` first, or make sure you're in the right folder                       |
| `Updates were rejected`        | Run `git pull --rebase origin main` first, then push again                          |
| `remote origin already exists` | Run `git remote set-url origin <url>` instead of `add`                              |
| Asked for username/password    | Use a GitHub **Personal Access Token** instead of your password, or set up SSH keys |

---

## Deploying to Vercel

**What Vercel is:** a hosting platform built for front-end sites; it deploys straight from a GitHub repo and gives you a live URL in seconds, with a generous free tier.

1. Sign up at **vercel.com** (choose "Continue with GitHub").
2. Click **Add New… → Project**.
3. Select your `portfolio` repository and click **Import**.
4. Framework preset: choose **Other** (this is a static site, no build step needed).
5. Click **Deploy** — Vercel gives you a live URL like `portfolio-username.vercel.app` within a minute.
6. **Automatic deployments:** every future `git push` to `main` triggers a new deployment automatically.
7. **Rollbacks:** in the Vercel dashboard → your project → **Deployments**, click the ⋯ menu on any past deployment → **Promote to Production**.

### Custom Domain

1. Buy a domain from any registrar (Namecheap, Google Domains, etc.).
2. In Vercel: your project → **Settings → Domains** → add your domain.
3. Vercel shows you DNS records to add at your registrar:
   - **A record** pointing `@` to Vercel's IP, or
   - **CNAME record** pointing `www` to `cname.vercel-dns.com`
4. DNS changes can take a few minutes to 48 hours to propagate.
5. Vercel automatically issues a free SSL certificate once DNS is verified — your site will serve over `https://` with no extra setup.

---

## Optimization Checklist (Lighthouse)

- [ ] Compress any photos you add (use `.webp`, aim under 200KB each)
- [ ] Add `loading="lazy"` to any `<img>` below the fold
- [ ] Run Chrome DevTools → **Lighthouse** and address any flagged issues
- [ ] Validate HTML at [validator.w3.org](https://validator.w3.org)
- [ ] Check color contrast, especially custom accent colors, with DevTools' contrast checker
- [ ] Test keyboard-only navigation (Tab through the whole page)

---

## Technologies

HTML5 · CSS3 (Grid, Flexbox, custom properties) · Vanilla JavaScript (ES6+) · Google Fonts (Fraunces, Manrope, JetBrains Mono) · Lucide Icons

## License

Free to use and adapt for your own portfolio.

## Author

**Nilou Jay S. Fernandez** — niljay.ctrspace@gmail.com
