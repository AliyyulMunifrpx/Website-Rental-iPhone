"use client";

import { useState } from "react";
import Link from "next/link.js";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menu = [
    {
      name: "Beranda",
      url: "/",
    },
    {
      name: "iPhone",
      url: "/sewa-iphone",
    },
    {
      name: "Aksesoris",
      url: "/aksesoris",
    },
  ];

  return (
    <div className="relative w-full h-16 bg-white lg:bg-white/60 backdrop-blur-md px-4 md:px-8 lg:px-16">
      <Link
        href="/"
        className="absolute left-4 md:left-8 lg:left-16 top-4 font-bold text-[#101010] text-2xl"
        onClick={() => setIsOpen(false)}
      >
        iRent.This
      </Link>

      {/* Desktop menu — posisi & layout persis seperti semula, cuma disembunyikan di bawah lg */}
      <div className="hidden lg:flex absolute top-4 left-1/2 -translate-x-1/2 gap-16 justify-center">
        {menu.map((item) => {
          return (
            <Link
              key={item.name}
              href={item.url}
              className=" tracking-wide text-[#101010] "
            >
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Hamburger — cuma muncul di bawah lg, gak ganggu layout desktop */}
      <button
        type="button"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="lg:hidden absolute right-4 md:right-8 top-4 w-8 h-8 flex flex-col items-center justify-center gap-[4px]"
      >
        <span
          className={`block w-8 h-[2px] bg-[#101010] transition-transform duration-200 ${
            isOpen ? "translate-y-[6px] rotate-45" : ""
          }`}
        />
        <span
          className={`block w-8 h-[2px] bg-[#101010] transition-opacity duration-200 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block w-8 h-[2px] bg-[#101010] transition-transform duration-200 ${
            isOpen ? "-translate-y-[6px] -rotate-45" : ""
          }`}
        />
      </button>

      {/* Dropdown mobile/tablet */}
      <div
        className={`lg:hidden absolute top-16 left-0 w-full bg-white overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          isOpen ? "max-h-64" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-8 px-4 md:px-8 py-8">
          {menu.map((item) => {
            return (
              <Link
                key={item.name}
                href={item.url}
                onClick={() => setIsOpen(false)}
                className="tracking-wide text-[#101010]"
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
