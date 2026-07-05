/* =========================================================
   PORTFOLIO SCRIPT.JS
   Every function below is commented to explain WHAT it does
   and WHY it exists. Functions are grouped by feature.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    /* ----------------------------------------------------
       0. ICONS
       Renders all <i data-lucide="..."> tags into inline SVG.
       Lucide is loaded as a deferred <script> in index.html.
    ---------------------------------------------------- */
    if (window.lucide) lucide.createIcons();

    /* ----------------------------------------------------
       1. PRELOADER
       Hides the full-screen loading overlay once the page
       (including images/fonts) has finished loading, so the
       user never stares at a half-rendered layout.
    ---------------------------------------------------- */
    function initPreloader() {
        const preloader = document.getElementById("preloader");
        if (!preloader) return;
        window.addEventListener("load", () => {
            setTimeout(() => preloader.classList.add("is-hidden"), 300);
        });
    }

    /* ----------------------------------------------------
       2. SCROLL PROGRESS BAR
       Fills a thin bar across the top of the page based on
       how far the user has scrolled through the document.
       Gives a persistent sense of "how much is left".
    ---------------------------------------------------- */
    function initScrollProgress() {
        const bar = document.getElementById("scroll-progress");
        if (!bar) return;
        const update = () => {
            const scrollTop = window.scrollY;
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = percent + "%";
        };
        document.addEventListener("scroll", update, { passive: true });
        update();
    }

    /* ----------------------------------------------------
       3. STICKY NAVBAR + ACTIVE LINK HIGHLIGHTING
       Adds a background/border to the navbar once the user
       scrolls down. Each nav item lives on its own page now,
       so the "active" link is already marked with `is-active`
       and `aria-current="page"` directly in each HTML file —
       this function only needs to handle the scrolled state.
    ---------------------------------------------------- */
    function initNavbarScrollState() {
        const header = document.getElementById("site-header");
        if (!header) return;

        const onScroll = () => {
            header.classList.toggle("is-scrolled", window.scrollY > 40);
        };

        document.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
    }

    /* ----------------------------------------------------
       4. MOBILE NAVIGATION TOGGLE
       Opens/closes the hamburger menu on small screens and
       closes it automatically after a link is tapped, so the
       menu never blocks the content the user just chose.
    ---------------------------------------------------- */
    function initMobileNav() {
        const toggle = document.getElementById("nav-toggle");
        const menu = document.getElementById("navbar-menu");
        if (!toggle || !menu) return;

        const closeMenu = () => {
            menu.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-label", "Open navigation menu");
        };

        toggle.addEventListener("click", () => {
            const isOpen = menu.classList.toggle("is-open");
            toggle.setAttribute("aria-expanded", String(isOpen));
            toggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu",
            );
        });

        menu
            .querySelectorAll("a")
            .forEach((link) => link.addEventListener("click", closeMenu));
    }

    /* ----------------------------------------------------
       5. DARK MODE TOGGLE
       Switches a `data-theme` attribute on <html> between
       "light" and "dark", and remembers the choice in
       localStorage so it persists on the next visit.
    ---------------------------------------------------- */
    function initThemeToggle() {
        const toggleBtn = document.getElementById("theme-toggle");
        const root = document.documentElement;
        const stored = localStorage.getItem("theme");
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)",
        ).matches;
        const initial = stored || (prefersDark ? "dark" : "light");

        root.setAttribute("data-theme", initial);
        if (toggleBtn)
            toggleBtn.setAttribute("aria-pressed", String(initial === "dark"));

        if (!toggleBtn) return;
        toggleBtn.addEventListener("click", () => {
            const next =
                root.getAttribute("data-theme") === "dark" ? "light" : "dark";
            root.setAttribute("data-theme", next);
            localStorage.setItem("theme", next);
            toggleBtn.setAttribute("aria-pressed", String(next === "dark"));
        });
    }

    /* ----------------------------------------------------
       6. TYPING ANIMATION
       Cycles through a list of short status strings inside
       the hero's "IDE window", typing and deleting each one,
       to make the mock code block feel alive without video.
    ---------------------------------------------------- */
    function initTypingEffect() {
        const target = document.getElementById("typing-target");
        if (!target) return;

        const phrases = [
            '"Teaching BSIT"',
            '"Shipping code"',
            '"Reviewing pull requests"',
            '"Mentoring capstones"',
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function tick() {
            const current = phrases[phraseIndex];
            charIndex += isDeleting ? -1 : 1;
            target.textContent = current.slice(0, charIndex);

            let delay = isDeleting ? 40 : 70;

            if (!isDeleting && charIndex === current.length) {
                delay = 1400; // pause at full phrase
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                delay = 300;
            }
            setTimeout(tick, delay);
        }
        tick();
    }

    /* ----------------------------------------------------
       7. SCROLL REVEAL ANIMATION
       Uses IntersectionObserver (far cheaper than a scroll
       listener) to fade + slide elements with the `.reveal`
       class into view the first time they enter the viewport.
    ---------------------------------------------------- */
    function initScrollReveal() {
        const items = document.querySelectorAll(".reveal");
        if (!items.length) return;

        if (!("IntersectionObserver" in window)) {
            items.forEach((el) => el.classList.add("is-visible"));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target); // animate once, then stop watching
                    }
                });
            }, { threshold: 0.15 },
        );

        items.forEach((el) => observer.observe(el));
    }

    /* ----------------------------------------------------
       8. ANIMATED COUNTERS
       Counts numbers (like "480 students mentored") up from
       zero when the stats block scrolls into view, drawing
       the eye to key achievements.
    ---------------------------------------------------- */
    function initAnimatedCounters() {
        const stats = document.getElementById("stats");
        if (!stats) return;
        const numbers = stats.querySelectorAll(".stat__number");

        const animateNumber = (el) => {
            const target = parseInt(el.dataset.count, 10) || 0;
            const duration = 1400;
            const start = performance.now();

            function step(now) {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
                el.textContent = Math.round(eased * target);
                if (progress < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        numbers.forEach(animateNumber);
                        observer.disconnect(); // only run once
                    }
                });
            }, { threshold: 0.4 },
        );

        observer.observe(stats);
    }

    /* ----------------------------------------------------
       9. PROJECT FILTERING
       Lets the user filter the project grid by category using
       the filter tabs, toggling `.is-hidden` on cards that
       don't match the selected category.
    ---------------------------------------------------- */
    function initProjectFilter() {
        const buttons = document.querySelectorAll(".filter-btn");
        const cards = document.querySelectorAll(".project-card");
        if (!buttons.length || !cards.length) return;

        buttons.forEach((btn) => {
            btn.addEventListener("click", () => {
                buttons.forEach((b) => {
                    b.classList.remove("is-active");
                    b.setAttribute("aria-selected", "false");
                });
                btn.classList.add("is-active");
                btn.setAttribute("aria-selected", "true");

                const filter = btn.dataset.filter;
                cards.forEach((card) => {
                    const match = filter === "all" || card.dataset.category === filter;
                    card.classList.toggle("is-hidden", !match);
                });
            });
        });
    }

    /* ----------------------------------------------------
       10. CONTACT FORM VALIDATION + SUBMISSION
       Validates each field on the client for instant feedback,
       then submits to Web3Forms via fetch(), which forwards
       the message straight to niljay.ctrspace@gmail.com — no
       backend server needed. See README "Contact Form Setup"
       for the one-time access key you need to paste in below.
    ---------------------------------------------------- */
    function initContactForm() {
        const form = document.getElementById("contact-form");
        const status = document.getElementById("form-status");
        if (!form) return;

        const ENDPOINT = "https://api.web3forms.com/submit";

        const rules = {
            name: (v) => v.trim().length >= 2 || "Please enter your name.",
            email: (v) =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ||
                "Please enter a valid email address.",
            subject: (v) => v.trim().length >= 3 || "Please enter a subject.",
            message: (v) =>
                v.trim().length >= 10 || "Message should be at least 10 characters.",
        };

        function validateField(field) {
            const rule = rules[field.name];
            if (!rule) return true;
            const result = rule(field.value);
            const errorEl = form.querySelector(`[data-error-for="${field.name}"]`);
            const group = field.closest(".form-group");
            if (result === true) {
                group.classList.remove("has-error");
                if (errorEl) errorEl.textContent = "";
                return true;
            } else {
                group.classList.add("has-error");
                if (errorEl) errorEl.textContent = result;
                return false;
            }
        }

        // Validate as the user types/leaves a field, not just on submit.
        form.querySelectorAll("input[name], textarea[name]").forEach((field) => {
            if (!rules[field.name]) return; // skip hidden/honeypot fields
            field.addEventListener("blur", () => validateField(field));
            field.addEventListener("input", () => {
                if (field.closest(".form-group").classList.contains("has-error"))
                    validateField(field);
            });
        });

        form.addEventListener("submit", async(e) => {
            e.preventDefault();

            // Honeypot: if this hidden checkbox got checked, it was a bot — silently drop it.
            const honeypot = form.querySelector('input[name="botcheck"]');
            if (honeypot && honeypot.checked) return;

            const fields = Array.from(
                form.querySelectorAll("input[name], textarea[name]"),
            ).filter((field) => rules[field.name]);
            const allValid = fields.map(validateField).every(Boolean);
            if (!allValid) {
                status.textContent = "Please fix the highlighted fields.";
                status.className = "form-status is-error";
                return;
            }

            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            status.textContent = "Sending…";
            status.className = "form-status";

            try {
                const response = await fetch(ENDPOINT, {
                    method: "POST",
                    headers: { Accept: "application/json" },
                    body: new FormData(form),
                });
                const result = await response.json();

                if (response.ok && result.success) {
                    status.textContent =
                        "Message sent — thank you! I\u2019ll reply soon.";
                    status.className = "form-status is-success";
                    form.reset();
                } else {
                    throw new Error(result.message || "Form submission failed");
                }
            } catch (err) {
                status.textContent =
                    "Something went wrong. Please email me directly instead.";
                status.className = "form-status is-error";
            } finally {
                submitBtn.disabled = false;
            }
        });
    }

    /* ----------------------------------------------------
       11. BACK TO TOP BUTTON
       Shows a floating button once the user has scrolled past
       the hero, and smooth-scrolls to the top when clicked.
    ---------------------------------------------------- */
    function initBackToTop() {
        const btn = document.getElementById("back-to-top");
        if (!btn) return;

        document.addEventListener(
            "scroll",
            () => {
                btn.classList.toggle("is-visible", window.scrollY > 600);
            }, { passive: true },
        );

        btn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* ----------------------------------------------------
       12. FOOTER YEAR
       Keeps the copyright year in the footer accurate without
       needing a yearly manual edit.
    ---------------------------------------------------- */
    function initFooterYear() {
        const el = document.getElementById("year");
        if (el) el.textContent = new Date().getFullYear();
    }

    /* ----------------------------------------------------
       13. LAZY LOADING FOR IMAGES
       Any future <img> you add with `loading="lazy"` is
       already deferred by the browser natively. This function
       is a small safety net for browsers that don't support
       it, using IntersectionObserver to swap `data-src`.
    ---------------------------------------------------- */
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll("img[data-src]");
        if (!lazyImages.length) return;

        if (!("IntersectionObserver" in window)) {
            lazyImages.forEach((img) => {
                img.src = img.dataset.src;
            });
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute("data-src");
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach((img) => observer.observe(img));
    }

    /* ----------------------------------------------------
       13b. PHOTO GALLERY (about.html)
       Reads window.PHOTO_ALBUMS (defined in photos/albums-data.js,
       only loaded on about.html) and renders one tab per album
       plus a grid of thumbnails for whichever album is selected.
       Clicking a thumbnail opens it full-size in a lightbox.
    ---------------------------------------------------- */
    function initPhotoGallery() {
        const tabsEl = document.getElementById("album-tabs");
        const gridEl = document.getElementById("gallery-grid");
        const emptyEl = document.getElementById("gallery-empty");
        const albums = window.PHOTO_ALBUMS;
        if (!tabsEl || !gridEl || !albums || !albums.length) return;

        function renderAlbum(album) {
            gridEl.innerHTML = "";
            if (!album.photos.length) {
                emptyEl.hidden = false;
                emptyEl.textContent = `No photos in "${album.title}" yet — add some in photos/albums-data.js.`;
                return;
            }
            emptyEl.hidden = true;
            album.photos.forEach((filename) => {
                const item = document.createElement("div");
                item.className = "gallery-item";
                item.innerHTML = `<img src="${album.folder}/${filename}" alt="${album.title}" loading="lazy">`;
                item.addEventListener("click", () =>
                    openLightbox(`${album.folder}/${filename}`, album.title),
                );
                gridEl.appendChild(item);
            });
        }

        function selectTab(albumId) {
            const buttons = tabsEl.querySelectorAll(".filter-btn");
            buttons.forEach((btn) => {
                const isActive = btn.dataset.album === albumId;
                btn.classList.toggle("is-active", isActive);
                btn.setAttribute("aria-selected", String(isActive));
            });
            const album = albums.find((a) => a.id === albumId);
            if (album) renderAlbum(album);
        }

        albums.forEach((album, index) => {
            const btn = document.createElement("button");
            btn.className = "filter-btn" + (index === 0 ? " is-active" : "");
            btn.type = "button";
            btn.dataset.album = album.id;
            btn.setAttribute("role", "tab");
            btn.setAttribute("aria-selected", String(index === 0));
            btn.textContent = album.title;
            btn.addEventListener("click", () => selectTab(album.id));
            tabsEl.appendChild(btn);
        });

        renderAlbum(albums[0]);
    }

    /* ----------------------------------------------------
       13c. LIGHTBOX
       A minimal full-screen image viewer shared by the photo
       gallery. Opens on thumbnail click, closes on the close
       button, a backdrop click, or the Escape key.
    ---------------------------------------------------- */
    function openLightbox(src, alt) {
        const lightbox = document.getElementById("lightbox");
        const img = document.getElementById("lightbox-img");
        if (!lightbox || !img) return;
        img.src = src;
        img.alt = alt || "";
        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
    }

    function closeLightbox() {
        const lightbox = document.getElementById("lightbox");
        if (!lightbox) return;
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
    }

    function initLightbox() {
        const lightbox = document.getElementById("lightbox");
        const closeBtn = document.getElementById("lightbox-close");
        if (!lightbox) return;

        closeBtn.addEventListener("click", closeLightbox);
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") closeLightbox();
        });
    }

    /* ----------------------------------------------------
       INIT: run every feature once the DOM is ready.
    ---------------------------------------------------- */
    initPreloader();
    initScrollProgress();
    initNavbarScrollState();
    initMobileNav();
    initThemeToggle();
    initTypingEffect();
    initScrollReveal();
    initAnimatedCounters();
    initProjectFilter();
    initContactForm();
    initBackToTop();
    initFooterYear();
    initLazyLoading();
    initPhotoGallery();
    initLightbox();
});