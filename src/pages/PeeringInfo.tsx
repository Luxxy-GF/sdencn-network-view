
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getPeeringInfo } from '@/lib/networkUtils';

const PeeringInfo = () => {
  const peeringPartners = getPeeringInfo();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-network-blue text-white py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                Peering Information
              </h1>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Connect directly with AS214199 to exchange traffic efficiently
              </p>
            </div>
          </div>
        </section>
        
        {/* Peering Policy */}
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="network-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link className="h-5 w-5 text-network-lightBlue" />
                  Peering Policy
                </CardTitle>
                <CardDescription>Our approach to network interconnection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">General Policy</h3>
                  <p>SDENCN Network (AS214199) maintains an open peering policy and welcomes new peering relationships. We prefer to establish BGP sessions over direct physical connections or at Internet Exchanges where we both maintain a presence.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Requirements</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Maintain a publicly routable ASN</li>
                    <li>Operate a 24x7 NOC capable of addressing operational issues</li>
                    <li>Maintain a presence on PeeringDB with up-to-date contact information</li>
                    <li>Implement and maintain proper routing security practices</li>
                    <li>Exchange traffic ratios should generally remain balanced (within 2:1 ratio)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Contact Information</h3>
                  <p>To request peering with AS214199, please contact us at <span className="text-network-lightBlue">peering@sdencn.net</span> or via our <a href="https://www.peeringdb.com/net/28818" target="_blank" rel="noopener noreferrer" className="text-network-lightBlue hover:underline">PeeringDB profile</a>.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Technical Requirements</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>BGP4 support with ability to send and receive BGP communities</li>
                    <li>Support for BFD (Bidirectional Forwarding Detection)</li>
                    <li>IPv6 support is preferred but not mandatory</li>
                    <li>Implementation of RPKI ROA validation</li>
                    <li>Properly filtered announcements with IRR records</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Internet Exchanges */}
        <section className="py-8 bg-muted">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Internet Exchange Presence</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="network-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">AMS-IX</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Location</span>
                      <span>Amsterdam, Netherlands</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">IPv4</span>
                      <span className="font-mono text-sm">80.249.208.214</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">IPv6</span>
                      <span className="font-mono text-sm">2001:7f8:1::a501:4199:1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Speed</span>
                      <span>10 Gbps</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="network-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">DE-CIX Frankfurt</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Location</span>
                      <span>Frankfurt, Germany</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">IPv4</span>
                      <span className="font-mono text-sm">80.81.194.214</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">IPv6</span>
                      <span className="font-mono text-sm">2001:7f8:0:1::a501:4199:1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Speed</span>
                      <span>10 Gbps</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Private Peering */}
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
        
        {/* Request Peering */}
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
      </main>
      
      <Footer />
    </div>
  );
};

export default PeeringInfo;
