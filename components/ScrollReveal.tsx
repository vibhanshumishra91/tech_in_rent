"use client";
import { useEffect } from "react";

/**
 * Mounts a single global IntersectionObserver that watches for
 * .reveal / .reveal-left / .reveal-scale elements and adds ".in"
 * once they enter the viewport.  Placed in the root layout so it
 * runs on every page without per-page wiring.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const selectors = ".reveal, .reveal-left, .reveal-scale";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    const attach = () =>
      document.querySelectorAll(selectors).forEach((el) => observer.observe(el));

    // Observe elements already in DOM
    attach();

    // Re-observe if new elements are injected (e.g. route changes in SPA)
    const mutationObserver = new MutationObserver(attach);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
