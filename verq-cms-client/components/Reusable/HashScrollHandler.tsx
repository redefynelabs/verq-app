"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const HashScrollHandler = () => {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    // Poll until element exists (GSAP/async components may not be mounted yet)
    let attempts = 0;
    const interval = setInterval(() => {
      const el = document.getElementById(hash);
      if (el) {
        clearInterval(interval);
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        // Clear hash from URL without re-triggering navigation
        history.replaceState(null, "", window.location.pathname);
      }
      if (++attempts > 20) clearInterval(interval);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default HashScrollHandler;
