
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PeeringHero from '@/components/peering/PeeringHero';
import PeeringPolicy from '@/components/peering/PeeringPolicy';
import ExchangePoints from '@/components/peering/ExchangePoints';
import PeeringPartners from '@/components/peering/PeeringPartners';
import PeeringContact from '@/components/peering/PeeringContact';

const PeeringInfo = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <PeeringHero />
        <PeeringPolicy />
        <ExchangePoints />
        <PeeringPartners />
        <PeeringContact />
      </main>
      <Footer />
    </div>
  );
};

export default PeeringInfo;
