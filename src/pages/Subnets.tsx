
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Server } from 'lucide-react';
import { getSubnets } from '@/lib/networkUtils';
import NetworkStatus from '@/components/NetworkStatus';

const Subnets = () => {
  const allSubnets = getSubnets();
  const [filter, setFilter] = useState<'all' | 'ipv4' | 'ipv6'>('all');
  
  const filteredSubnets = 
    filter === 'all' 
      ? allSubnets 
      : allSubnets.filter(subnet => 
          filter === 'ipv4' ? subnet.type === 'IPv4' : subnet.type === 'IPv6'
        );
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-network-blue text-white py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                Network Subnets
              </h1>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                View our network IP address space and utilization
              </p>
            </div>
          </div>
        </section>
        
        {/* Network Status */}
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <NetworkStatus compact={true} />
          </div>
        </section>
        
        {/* Filter Controls */}
        <section className="pt-4 pb-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Subnet List</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-md ${filter === 'all' 
                    ? 'bg-network-lightBlue text-white' 
                    : 'bg-muted text-foreground'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('ipv4')}
                  className={`px-4 py-2 rounded-md ${filter === 'ipv4' 
                    ? 'bg-network-lightBlue text-white' 
                    : 'bg-muted text-foreground'}`}
                >
                  IPv4
                </button>
                <button
                  onClick={() => setFilter('ipv6')}
                  className={`px-4 py-2 rounded-md ${filter === 'ipv6' 
                    ? 'bg-network-lightBlue text-white' 
                    : 'bg-muted text-foreground'}`}
                >
                  IPv6
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredSubnets.length > 0 ? (
                filteredSubnets.map((subnet) => (
                  <Card key={subnet.id} className="network-card">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <Server className="h-5 w-5 text-network-lightBlue" />
                            <h3 className="text-lg font-semibold">{subnet.subnet}</h3>
                          </div>
                          <p className="text-muted-foreground">{subnet.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            subnet.type === 'IPv4' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                          }`}>
                            {subnet.type}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            subnet.allocated ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {subnet.allocated ? 'Allocated' : 'Available'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Usage</span>
                          <span>{subnet.usage}%</span>
                        </div>
                        <Progress 
                          value={subnet.usage} 
                          className={`h-2 ${
                            subnet.usage > 90 ? 'bg-red-100' : 
                            subnet.usage > 70 ? 'bg-amber-100' : 'bg-green-100'
                          }`} 
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No subnets found with the current filter.</p>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Network Information */}
        <section className="py-8 bg-muted">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="network-card">
              <CardHeader>
                <CardTitle>Network Address Space</CardTitle>
                <CardDescription>Overview of AS214199 address allocations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">IPv4 Allocations</h3>
                  <p className="mb-2">Our network operates with the following IPv4 address blocks:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>5.231.32.0/22 - Primary allocation</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">IPv6 Allocations</h3>
                  <p className="mb-2">Our network operates with the following IPv6 address blocks:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>2a0f:0:0::/48 - Primary allocation</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">RPKI and IRR Records</h3>
                  <p className="mb-2">All our prefixes are secured with RPKI (Resource Public Key Infrastructure):</p>
                  <div className="code-block">
                    <pre className="text-sm">
{`ROA: 5.231.32.0/22, ASN 214199, Max Length /24
ROA: 2a0f:0:0::/48, ASN 214199, Max Length /48`}
                    </pre>
                  </div>
                  <p className="mt-2 mb-2">Our prefixes are also registered in the RIPE IRR database:</p>
                  <div className="code-block">
                    <pre className="text-sm">
{`route:          5.231.32.0/22
descr:          SDENCN Network
origin:         AS214199
mnt-by:         SDENCN-MNT
created:        2023-01-15
last-modified:  2023-01-15
source:         RIPE`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Subnets;
