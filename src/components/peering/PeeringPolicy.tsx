
import React from 'react';
import { Link } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const PeeringPolicy = () => {
  return (
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
              <p>To request peering with AS214199, please contact us at <span className="text-network-lightBlue">peering@as214199.net</span> or via our <a href="https://www.peeringdb.com/net/214199" target="_blank" rel="noopener noreferrer" className="text-network-lightBlue hover:underline">PeeringDB profile</a>.</p>
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
  );
};

export default PeeringPolicy;
