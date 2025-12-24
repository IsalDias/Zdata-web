"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import ZdataLogo from "../public/images/ZdataWhite.png";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/aboutus", label: "About Us" },
  { href: "/contactus", label: "Contact Us" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  // ✅ show/hide navbar based on scroll direction
  const [show, setShow] = useState(true);

  // ✅ used only for MOBILE menu background switch when scrolled down
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const menuRef = useRef(null);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on outside click + ESC
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // ✅ Scroll: hide on down, show on up (desktop + mobile)
  // Desktop glassmorphism stays ALWAYS the same (no style switching).
  useEffect(() => {
    let lastY = 0;

    const onScroll = () => {
      const y = window.scrollY;

      // for mobile menu background switching
      setScrolled(y > 40);

      const goingDown = y > lastY;
      const distance = Math.abs(y - lastY);

      // avoid jitter
      if (distance > 6) {
        if (goingDown && y > 90) setShow(false);
        else setShow(true);
      }

      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        // ✅ fixed + show/hide on scroll direction
        "fixed top-0 left-0 right-0 z-50",
        "transition-transform duration-300 ease-out",
        show ? "translate-y-0" : "-translate-y-[120%]",
      ].join(" ")}
      role="banner"
    >
      <div className="pt-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* ✅ NAVBAR GLASSMORPHISM ALWAYS (desktop + mobile) */}
          <div
            className={[
              "flex items-center justify-between rounded-2xl px-6 py-3",
              "bg-black/28 backdrop-blur-md border border-white/10",
              "shadow-xl shadow-black/10",
            ].join(" ")}
          >
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2" prefetch>
              <Image
                src={ZdataLogo}
                alt="Zdata logo"
                width={140}
                height={40}
                priority
              />
            </Link>

            {/* DESKTOP NAV (unchanged glass + white text) */}
            <nav aria-label="Primary" className="hidden md:block">
              <ul className="flex items-center gap-10 text-sm font-medium text-white">
                {LINKS.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        prefetch
                        className={[
                          "relative pb-1 transition-colors duration-200",
                          active
                            ? "font-bold text-white after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-white"
                            : "text-white/80 hover:text-white",
                        ].join(" ")}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* ACTIONS */}
            <div className="flex items-center gap-3">
              <Link
                href="/https://calendly.com/zdatai" 
                prefetch
                className="hidden md:inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition-colors duration-200 hover:bg-blue-700"
              >
                Request a Demo
              </Link>

              {/* MOBILE MENU BUTTON */}
              <button
                type="button"
                className="md:hidden text-white select-none text-xl leading-none"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label="Toggle menu"
                onClick={() => setOpen((v) => !v)}
              >
                {open ? "" : "☰"}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE DROPDOWN (RIGHT SIDE SMALL) */}
        <div className="mx-auto mt-3 max-w-7xl px-4 md:hidden">
          <div className="relative flex justify-end">
            <div
              ref={menuRef}
              id="mobile-menu"
              className={[
                "w-[240px] sm:w-[280px]",
                "rounded-2xl overflow-hidden border border-white/10",
                "shadow-xl shadow-black/10",
                "transition-all duration-200 ease-out origin-top-right",

                // ✅ MOBILE MENU BACKGROUND RULE:
                // - When NOT scrolled: keep same glassmorphism
                // - When scrolled down: use BLACK glassmorphism so it’s visible on white sections
                scrolled ? "bg-black/55 backdrop-blur-md" : "bg-black/40 backdrop-blur-md",

                open
                  ? "opacity-100 translate-y-0 scale-100 max-h-[520px]"
                  : "opacity-0 -translate-y-2 scale-[0.98] max-h-0 pointer-events-none",
              ].join(" ")}
            >
              <ul className="flex flex-col gap-1 px-5 py-4 text-white">
                {LINKS.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        prefetch
                        onClick={() => setOpen(false)}
                        className={[
                          "block rounded-lg px-3 py-2 transition-colors duration-150",
                          active
                            ? "font-semibold bg-white/10 text-white"
                            : "text-white/85 hover:bg-white/10 hover:text-white",
                        ].join(" ")}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}

                <li className="pt-2">
                  <Link
                    href="https://calendly.com/zdatai"
                    prefetch
                    onClick={() => setOpen(false)}
                    className="block rounded-lg bg-blue-500 px-4 py-2 text-center text-white transition-colors duration-200 hover:bg-blue-700"
                  >
                    Request a Demo
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
