
import React from 'react';
import { Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ASNInfo = () => {
  return (
    <Card className="network-card">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-network-lightBlue" />
          AS214199 Information
        </CardTitle>
        <CardDescription>Luxxysystems Network Autonomous System</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">ASN</span>
              <span className="font-medium">AS214199</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Name</span>
              <span className="font-medium">Luxxysystems</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Registry</span>
              <span className="font-medium">RIPE NCC</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Website</span>
              <a href="https://as214199.net" className="font-medium text-network-lightBlue hover:underline">
                https://as214199.net
              </a>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Primary IPv4 Range</span>
              <span className="font-medium">5.231.32.0/24</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">IPv6 Ranges</span>
              <span className="font-medium">2a0f:85c1:897::/48</span>
              <span className="font-medium">2a0f:9400:7e16::/48</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Looking Glass</span>
              <a href="/looking-glass" className="font-medium text-network-lightBlue hover:underline">
                https://as214199.net/looking-glass
              </a>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">BGP Information</span>
              <a 
                href="https://bgp.tools/as/214199" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-medium text-network-lightBlue hover:underline"
              >
                View on BGP.tools
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="font-semibold mb-2">PeeringDB Information</h4>
          <p className="text-sm text-muted-foreground">
            View our complete peering information and request peering on 
            <a 
              href="https://www.peeringdb.com/net/214199" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="ml-1 text-network-lightBlue hover:underline"
            >
              PeeringDB
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ASNInfo;
