
import React from 'react';
import { getPeeringInfo } from '@/lib/networkUtils';

const PeeringPartners = () => {
  const peeringPartners = getPeeringInfo();
  
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Current Peering Partners</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted text-left">
                <th className="p-4 border">Network Name</th>
                <th className="p-4 border">ASN</th>
                <th className="p-4 border">Location</th>
                <th className="p-4 border">IPv4 Address</th>
                <th className="p-4 border">IPv6 Address</th>
                <th className="p-4 border">Connection</th>
              </tr>
            </thead>
            <tbody>
              {peeringPartners.map((peer) => (
                <tr key={peer.id} className="hover:bg-muted/50">
                  <td className="p-4 border">{peer.name}</td>
                  <td className="p-4 border font-mono">{peer.asn}</td>
                  <td className="p-4 border">{peer.location}</td>
                  <td className="p-4 border font-mono text-sm">{peer.ipv4}</td>
                  <td className="p-4 border font-mono text-sm">{peer.ipv6}</td>
                  <td className="p-4 border">{peer.speed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PeeringPartners;
