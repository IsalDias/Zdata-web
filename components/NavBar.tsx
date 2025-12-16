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
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent border-b border-gray-200" role="banner">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Image
  src={ZdataLogo}
  alt="Zdata logo"
  width={140}
  height={40}
  priority
/>
            
          </Link>
        </div>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex gap-13 text-gray-700 items-center">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/request-demo"
            className="hidden md:inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Request a Demo
          </a>

          <button
            className="md:hidden text-gray-700"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-200">
          <ul className="flex flex-col gap-2 px-4 py-3 text-gray-700">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/request-demo" onClick={() => setOpen(false)} className="block mt-2 px-3 py-2 bg-blue-600 text-white rounded-md text-center">
                Request a Demo
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
