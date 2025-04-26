
import React from 'react';

const PeeringContact = () => {
  return (
    <section className="py-8 bg-network-blue text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Interested in Peering with AS214199?</h2>
        <p className="mb-6 opacity-90">
          We welcome new peering relationships. Contact us to set up a BGP session.
        </p>
        <div className="flex justify-center gap-4">
          <a 
            href="mailto:peering@sdencn.net"
            className="bg-network-highlight text-network-blue px-6 py-3 rounded-lg font-medium transition-all hover:bg-opacity-90"
          >
            Email Us
          </a>
          <a 
            href="https://www.peeringdb.com/net/28818"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent border border-network-highlight text-network-highlight px-6 py-3 rounded-lg font-medium transition-all hover:bg-network-highlight hover:bg-opacity-10"
          >
            PeeringDB
          </a>
        </div>
      </div>
    </section>
  );
};

export default PeeringContact;
