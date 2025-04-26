
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Network } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-network-blue text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
              <Network className="h-8 w-8 text-network-highlight" />
              <span className="font-bold text-xl tracking-tight">SDENCN AS214199</span>
            </Link>
          </div>
          
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-network-lightBlue hover:bg-opacity-20">Home</Link>
            <Link to="/peering" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-network-lightBlue hover:bg-opacity-20">Peering</Link>
            <Link to="/subnets" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-network-lightBlue hover:bg-opacity-20">Subnets</Link>
            <Link to="/looking-glass" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-network-lightBlue hover:bg-opacity-20">Looking Glass</Link>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-network-lightBlue hover:bg-opacity-20 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-network-lightBlue hover:bg-opacity-20">Home</Link>
            <Link to="/peering" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-network-lightBlue hover:bg-opacity-20">Peering</Link>
            <Link to="/subnets" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-network-lightBlue hover:bg-opacity-20">Subnets</Link>
            <Link to="/looking-glass" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-network-lightBlue hover:bg-opacity-20">Looking Glass</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
