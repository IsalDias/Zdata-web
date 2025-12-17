"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ZdataLogo from "../public/images/ZdataLogo.png";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/contactus", label: "Contact Us" },
  { href: "/aboutus", label: "About Us" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="absolute top-6 left-0 right-0 z-50"
      role="banner"
    >
      {/* WHITE RECTANGLE */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between rounded-2xl bg-white/100 px-6 py-3 shadow-lg backdrop-blur-5">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={ZdataLogo}
              alt="Zdata logo"
              width={140}
              height={40}
              priority
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex gap-10 text-sm font-medium text-slate-700 items-center">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-slate-900 transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            <Link
              href="/request-demo"
              className="hidden md:inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 transition"
            >
              Request a Demo
            </Link>

            {/* MOBILE MENU */}
            <button
              className="md:hidden text-slate-700"
              aria-expanded={open}
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="mx-auto mt-3 max-w-7xl px-4 md:hidden">
          <div className="rounded-2xl bg-white shadow-lg">
            <ul className="flex flex-col gap-2 px-6 py-4 text-slate-700">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/request-demo"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg bg-blue-600 px-4 py-2 text-center text-white"
                >
                  Request a Demo
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
