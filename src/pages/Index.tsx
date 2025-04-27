import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Network, Globe, Server, Link as LinkIcon } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ASNInfo from '@/components/ASNInfo';
import NetworkStatus from '@/components/NetworkStatus';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-network-blue text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="lg:w-1/2">
                <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
                  <span 
                    className="text-network-highlight bg-gradient-to-r from-purple-500 to-blue-500 
                    text-transparent bg-clip-text animate-text-shimmer 
                    bg-[length:200%_auto] bg-[0%_0%]"
                  >
                    Luxxysystems Network
                  </span>
                </h1>
                <h2 className="text-2xl sm:text-3xl font-medium mb-6">Autonomous System AS214199</h2>
                <p className="text-lg mb-8 opacity-90">
                  Providing reliable network infrastructure and connectivity services with global reach
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/looking-glass" className="bg-network-highlight text-network-blue px-6 py-3 rounded-lg font-medium transition-all hover:bg-opacity-90">
                    Looking Glass
                  </Link>
                  <Link to="/peering" className="bg-transparent border border-network-highlight text-network-highlight px-6 py-3 rounded-lg font-medium transition-all hover:bg-network-highlight hover:bg-opacity-10">
                    Peering Information
                  </Link>
                </div>
              </div>
              <div className="mt-10 lg:mt-0 lg:w-1/2 flex justify-center">
                <Network className="h-64 w-64 text-network-highlight opacity-20" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-12 bg-gradient-to-b from-network-blue to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="network-card border-t-4 border-network-highlight p-6 text-center">
                <div className="flex justify-center mb-4">
                  <Globe className="h-12 w-12 text-network-lightBlue" />
                </div>
                <h3 className="text-2xl font-bold">AS214199</h3>
                <p className="text-muted-foreground">RIPE NCC Registered ASN</p>
              </Card>
              
              <Card className="network-card border-t-4 border-network-highlight p-6 text-center">
                <div className="flex justify-center mb-4">
                  <Server className="h-12 w-12 text-network-lightBlue" />
                </div>
                <h3 className="text-2xl font-bold">5.231.32.0/24</h3>
                <p className="text-muted-foreground">IPv4 Address Space</p>
              </Card>
              
              <Card className="network-card border-t-4 border-network-highlight p-6 text-center">
                <div className="flex justify-center mb-4">
                  <LinkIcon className="h-12 w-12 text-network-lightBlue" />
                </div>
                <h3 className="text-2xl font-bold">Global Connectivity</h3>
                <p className="text-muted-foreground">Multiple Transit & Peering Points</p>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Main Content Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {/* ASN Info Card */}
              <ASNInfo />
              
              {/* Network Status Card */}
              <NetworkStatus />
              
              {/* Quick Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link to="/peering">
                  <Card className="network-card h-full hover:border-network-highlight transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <LinkIcon className="h-5 w-5 text-network-lightBlue mr-2" />
                        <h3 className="text-lg font-semibold">Peering Information</h3>
                      </div>
                      <p className="text-muted-foreground">
                        View our peering policies and current peering partners. Request peering with our network.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                
                <Link to="/subnets">
                  <Card className="network-card h-full hover:border-network-highlight transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Server className="h-5 w-5 text-network-lightBlue mr-2" />
                        <h3 className="text-lg font-semibold">Network Subnets</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Browse our network subnets and their utilization. Find information about IP allocation.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                
                <Link to="/looking-glass">
                  <Card className="network-card h-full hover:border-network-highlight transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Globe className="h-5 w-5 text-network-lightBlue mr-2" />
                        <h3 className="text-lg font-semibold">Looking Glass</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Use our network looking glass to perform ping, traceroute, and BGP queries from our network.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* External Tools Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8 text-center">External Network Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="network-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">BGP.tools Information</h3>
                  <p className="mb-4 text-muted-foreground">
                    View our ASN details, routing information, and network analysis on BGP.tools.
                  </p>
                  <a 
                    href="https://bgp.tools/as/214199"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-network-lightBlue hover:underline"
                  >
                    View on BGP.tools
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </CardContent>
              </Card>
              
              <Card className="network-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">PeeringDB Profile</h3>
                  <p className="mb-4 text-muted-foreground">
                    Check our PeeringDB profile for peering policies, locations, and contact information.
                  </p>
                  <a 
                    href="https://www.peeringdb.com/net/214199"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-network-lightBlue hover:underline"
                  >
                    View on PeeringDB
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
