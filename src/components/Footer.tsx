
import React from 'react';
import { Network } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-network-blue text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Network className="h-6 w-6 text-network-highlight mr-2" />
              <span className="font-bold text-lg">SDENCN</span>
            </div>
            <p className="text-sm opacity-80">
              AS214199 Network Information Portal
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-network-highlight">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-network-highlight transition-colors">Home</a></li>
              <li><a href="/peering" className="hover:text-network-highlight transition-colors">Peering Information</a></li>
              <li><a href="/subnets" className="hover:text-network-highlight transition-colors">Network Subnets</a></li>
              <li><a href="/looking-glass" className="hover:text-network-highlight transition-colors">Looking Glass</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-network-highlight">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>NOC: noc@sdencn.net</li>
              <li>Peering: peering@sdencn.net</li>
              <li>Abuse: abuse@sdencn.net</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-700">
          <p className="text-sm text-center opacity-80">
            &copy; {new Date().getFullYear()} SDENCN Network | AS214199
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
