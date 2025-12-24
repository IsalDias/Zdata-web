"use client";

import Image from "next/image";
import Link from "next/link";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import CompanyLogo from "@/public/images/ZdataCompanyLogo.png"; // 🔁 replace with your logo

export default function Footer() {
    return (
        <footer className="w-full bg-white  ">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                {/* White frame */}
                <div >
                    {/* Black inner card */}
                    <div className="rounded-[18px] bg-white px-6 py-8 lg:py-18 sm:px-10 sm:py-10">
                        <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-12 md:gap-8">
                            {/* LEFT */}
                            <div className="md:col-span-5">
                                {/* Logo in white rectangle */}
                                <div className="inline-flex rounded-lg bg-white">
                                    <h2 className="text-2xl font-bold text-black/70">ZData Innovations</h2>
                                    {/* <Image
                                        src={CompanyLogo}
                                        alt="ZDataI Logo"
                                        width={120}
                                        height={40}
                                        className="object-contain"
                                    /> */}
                                </div>

                                <p className="mt-4 text-sm text-black/70 leading-6 max-w-sm">
                                    We offer a wide range of technology and digital solutions to
                                    meet your needs.
                                </p>

                                {/* Social icons */}
                                <div className="mt-6 flex items-center gap-3 text-black/70">
                                    <SocialIcon href="https://www.linkedin.com/company/zdata-innovations/?originalSubdomain=lk">
                                        <LinkedInIcon fontSize="small" />
                                    </SocialIcon>
                                    <SocialIcon href="#">
                                        <FacebookIcon fontSize="small" />
                                    </SocialIcon>
                                    <SocialIcon href="#">
                                        <InstagramIcon fontSize="small" />
                                    </SocialIcon>
                                    <SocialIcon href="#">
                                        <YouTubeIcon fontSize="small" />
                                    </SocialIcon>
                                </div>
                            </div>

                            {/* MIDDLE */}
                            <div className="md:col-span-3 md:justify-self-center">
                                <h4 className="text-black/70 text-sm font-semibold">
                                    Quick Links
                                </h4>

                                <ul className="mt-4 space-y-3 text-sm text-black/70">
                                    {[
                                        { label: "Home", href: "/" },
                                        { label: "Services", href: "/services" },
                                        { label: "Products", href: "/products" },
                                        { label: "About Us", href: "/aboutus" },
                                        { label: "Contact Us", href: "/contactus" },
                                    ].map((item) => (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                className="text-black hover:text-black/50 transition"
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>


                            {/* RIGHT */}
                            <div className="md:col-span-4 md:justify-self-end">
                                <h4 className="text-black/70 text-sm font-semibold">Contact</h4>
                                <div className="mt-4 space-y-3 text-sm text-black/70">
                                    <p>
                                        +94 112 986 526
                                    </p>
                                    <p>
                                        
                                            info@zdatai.com
                                        
                                    </p>
                                    <p>
                                        160/5/A, Methsiri Mawatha, Malabe, <br></br>Sri Lanka
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="mt-10 border-t border-black/10 pt-5 text-center">
                            <p className="text-xs text-black/60">
                                © 2026 <span className="font-semibold">ZDataI</span>. All rights
                                reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

/* Social Icon Button */
function SocialIcon({ href, children }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition hover:bg-gray-200"
        >
            {children}
        </a>
    );
}
