"use client";

import Link from "next/link";
import Image from "next/image";

import { useEffect, useState } from "react";
const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
<nav className='flex-between w-full mb-16 pt-3'>
<Link href='/' className='flex gap-2 flex-center'>
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

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <div className='flex flex-col items-center justify-between min-h-[250px]'>
        <Link href='/' className='nav_link'>
          Home  
        </Link>
        <Link href='/contact' className='nav_link'> 
          Schools
        </Link>
        <Link href='/contact' className='nav_link'> 
          Suppliers
        </Link>
        <Link href='/about' className='nav_link'>
          About
        </Link>
            <Link href='/contact' className='black_btn'>
              Contact Us
            </Link>
          </div>
          </div>
        </section>

        <ul className="DESKTOP-MENU hidden space-x-8 lg:flex flex-row items-center">
        <Link href='/' className='nav_link'>
          Home  
        </Link>
        <Link href='/contact' className='nav_link'> 
          Schools
        </Link>
        <Link href='/contact' className='nav_link'> 
          Suppliers
        </Link>
        <Link href='/about' className='nav_link'>
          About
        </Link>
            <Link href='/contact' className='black_btn'>
              Contact Us
            </Link>
        </ul>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
    </nav>
  );
};

export default Nav;
