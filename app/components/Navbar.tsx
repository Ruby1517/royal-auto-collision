"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`px-3 py-2 rounded-lg transition text-sm md:text-sm lg:text-base ${
        active
          ? "text-brand-500 font-semibold"
          : "text-white/90 hover:text-white hover:bg-white/10"
      }`}
    >
      {children}
    </Link>
  );
};

export default function Navbar(){
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-[200] backdrop-blur bg-ink/90 border-b border-white/10 shadow-lg">
      <div className="container-xl flex items-center justify-between py-3">
        <Logo />
        <nav className="hidden md:flex items-center gap-2">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About Us</NavLink>
          <NavLink href="/services">Services</NavLink>
          <NavLink href="/gallery">Gallery</NavLink>
          <NavLink href="/cars">Cars for Sale</NavLink>
          <NavLink href="/testimonials">Testimonials</NavLink>
          <NavLink href="/estimate">Free Estimate</NavLink>
        </nav>
        <button
          className="md:hidden inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          Menu
        </button>
      </div>
      {open && (
        <div id="mobile-menu" className="md:hidden fixed top-16 inset-x-0 border-t border-white/10 bg-ink/90 z-40">
          <div className="container-xl py-3 grid gap-2">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About Us</NavLink>
            <NavLink href="/services">Services</NavLink>
            <NavLink href="/gallery">Gallery</NavLink>
            <NavLink href="/cars">Cars for Sale</NavLink>
            <NavLink href="/testimonials">Testimonials</NavLink>
            <NavLink href="/estimate">Free Estimate</NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
