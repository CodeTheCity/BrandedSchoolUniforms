"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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
          className="HAMBURGER-ICON space-y-2 cursor-pointer"
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
    </nav>
  );
};

export default Nav;