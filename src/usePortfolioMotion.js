import { useEffect } from "react";

const motionTitleSelector = [
  ".hero-title",
  ".section-heading h2",
  ".experience-content > h2",
  ".contact-layout h2",
  ".timeline-group-header h3",
  ".work-section-heading h3",
  ".project-detail h2",
].join(",");

const motionGroups = [
  [".contact-stack", ".compact-glow"],
  [".profile-meta", ".compact-glow"],
  [".stats-grid", ".stat-glow"],
  [".timeline-list", ".timeline-glow"],
  [".project-grid", ".project-glow"],
  [".detail-grid", ".detail-copy-glow"],
  [".skill-tags", ".compact-glow"],
  [".strength-grid", ".strength-glow"],
  [".footer-contact-grid", ".footer-contact-glow"],
  [".poster-gallery", ".poster-card"],
  [".packaging-gallery", ".packaging-card"],
  [".cultural-ip-gallery", ".cultural-ip-card"],
  [".character-illustration-gallery", ".character-illustration-card"],
  [".game-board-gallery", ".game-board-card"],
  [".game-concept-gallery", ".game-concept-page"],
  [".board-gallery", ".board-card"],
  [".manual-featured-gallery", ".manual-page"],
  [".manual-compact-gallery", ".manual-page"],
];

const imageSelector = [
  ".portrait-frame img",
  ".project-card img",
  ".poster-card img",
  ".packaging-card img",
  ".cultural-ip-card img",
  ".character-illustration-card img",
  ".game-board-card img",
  ".game-concept-page img",
  ".board-card img",
  ".manual-page img",
].join(",");

const parallaxImageSelector = [".portrait-frame img", ".project-card img"].join(",");

function selectWithin(root, selector) {
  if (!(root instanceof Element) && root !== document) return [];
  const matches = [];
  if (root instanceof Element && root.matches(selector)) matches.push(root);
  matches.push(...root.querySelectorAll(selector));
  return matches;
}

export default function usePortfolioMotion() {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return undefined;

    const prepared = new WeakSet();
    const observed = new WeakSet();
    const visibleParallaxImages = new Set();
    let raf = 0;

    document.documentElement.classList.add("motion-enhanced");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in-view");
          revealObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.06,
        rootMargin: "0px 0px 18% 0px",
      },
    );

    const updateParallax = () => {
      raf = 0;
      if (!visibleParallaxImages.size) return;
      const viewportHeight = window.innerHeight || 1;
      visibleParallaxImages.forEach((image) => {
        const rect = image.getBoundingClientRect();
        const progress = (rect.top + rect.height * 0.5 - viewportHeight * 0.5) / viewportHeight;
        const y = Math.max(-26, Math.min(26, progress * -34));
        image.style.setProperty("--parallax-y", `${y.toFixed(2)}px`);
      });
    };

    const scheduleParallax = () => {
      if (!visibleParallaxImages.size) return;
      if (!raf) raf = requestAnimationFrame(updateParallax);
    };

    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in-view");
            if (entry.target.matches(parallaxImageSelector)) {
              visibleParallaxImages.add(entry.target);
            }
          } else {
            visibleParallaxImages.delete(entry.target);
          }
        });
        scheduleParallax();
      },
      {
        threshold: 0.01,
        rootMargin: "42% 0px",
      },
    );

    const observeReveal = (element) => {
      if (observed.has(element)) return;
      observed.add(element);
      revealObserver.observe(element);
    };

    const prepare = (root = document) => {
      selectWithin(root, motionTitleSelector).forEach((element) => {
        if (prepared.has(element)) return;
        prepared.add(element);
        element.classList.add("motion-title");
        observeReveal(element);
      });

      motionGroups.forEach(([groupSelector, itemSelector]) => {
        selectWithin(root, groupSelector).forEach((group) => {
          const items = [...group.querySelectorAll(itemSelector)];
          items.forEach((item, index) => {
            if (prepared.has(item)) return;
            prepared.add(item);
            item.classList.add("motion-card");
            item.style.setProperty("--motion-delay", `${Math.min(index * 0.105, 0.74).toFixed(3)}s`);
            observeReveal(item);
          });
        });
      });

      selectWithin(root, imageSelector).forEach((image) => {
        if (prepared.has(image)) return;
        prepared.add(image);
        image.classList.add("motion-image");
        imageObserver.observe(image);
      });
    };

    prepare();

    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => prepare(node));
      });
      scheduleParallax();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", scheduleParallax, { passive: true });
    window.addEventListener("resize", scheduleParallax);
    scheduleParallax();

    return () => {
      document.documentElement.classList.remove("motion-enhanced");
      mutationObserver.disconnect();
      revealObserver.disconnect();
      imageObserver.disconnect();
      visibleParallaxImages.clear();
      window.removeEventListener("scroll", scheduleParallax);
      window.removeEventListener("resize", scheduleParallax);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}
