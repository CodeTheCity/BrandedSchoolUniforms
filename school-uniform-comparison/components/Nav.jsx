"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <nav className='relative flex items-center justify-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 items-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>BSU</p>
      </Link>
      <section className="MOBILE-MENU flex lg:hidden">
        <div
          className="HAMBURGER-ICON space-y-2"
          onClick={() => setIsNavOpen((prev) => !prev)}
        >
          <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
        </div>

        <div className={`${isNavOpen ? "showMenuNav" : "hideMenuNav"} absolute top-full left-0 w-full bg-white shadow-md z-20`}>
          <ul className='flex flex-col items-center justify-between min-h-[250px] p-8'>
            <Link href='/' className='nav_link'>Home</Link>
            <Link href='/contact' className='nav_link'>Schools</Link>
            <Link href='/contact' className='nav_link'>Suppliers</Link>
            <Link href='/about' className='nav_link'>About</Link>
            <Link href='/contact' className='black_btn'>Contact Us</Link>
          </ul>
        </div>
      </section>

      <ul className="DESKTOP-MENU hidden space-x-8 lg:flex flex-row items-center">
        <Link href='/' className='nav_link'>Home</Link>
        <Link href='/contact' className='nav_link'>Schools</Link>
        <Link href='/contact' className='nav_link'>Suppliers</Link>
        <Link href='/about' className='nav_link'>About</Link>
        <Link href='/contact' className='black_btn'>Contact Us</Link>
      </ul>
      <style jsx>{`
        .hideMenuNav {
          display: none;
        }
        .showMenuNav {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 100%; /* Dropdown starts right below the navbar */
          left: 0; /* Aligns to the left edge of the viewport */
          width: 100%; /* Ensures it spans the full width of the screen */
          background: white;
          border: 1px solid #e5e7eb; /* A slight border */
          border-radius: 8px; /* Rounded corners */
          overflow: hidden; /* Ensures content fits within the borders */
          box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Subtle shadow for depth */
        }
      `}</style>
    </nav>
  );
};

export default Nav;