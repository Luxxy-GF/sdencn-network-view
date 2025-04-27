
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { executeLookingGlassCommand, LookingGlassResult } from '@/lib/networkUtils';
import { Globe } from 'lucide-react';

const LookingGlass = () => {
  const [command, setCommand] = useState('ping');
  const [target, setTarget] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [results, setResults] = useState<LookingGlassResult[]>([]);
  
  const executeCommand = async () => {
    if (!target.trim()) {
      return;
    }
    
    setIsExecuting(true);
    try {
      const result = await executeLookingGlassCommand(command, target);
      setResults(prev => [result, ...prev].slice(0, 5));
    } finally {
      setIsExecuting(false);
    }
  };
  
  const isValidTarget = (input: string) => {
    if (command === 'bgp') {
      // For BGP commands, accept ASN format (AS123) or IP prefixes (1.1.1.0/24)
      return /^(AS\d+|\d+\.\d+\.\d+\.\d+\/\d+|[0-9a-fA-F:]+\/\d+)$/.test(input);
    } else {
      // For ping/traceroute/mtr, accept domain names or IP addresses
      return /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$|^\d+\.\d+\.\d+\.\d+$|^[0-9a-fA-F:]+$/.test(input);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-network-blue text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Network Looking Glass
            </h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Perform network diagnostic commands from our infrastructure
            </p>
          </div>
        </div>
      </section>
      
      {/* Command Form */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="network-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-network-lightBlue" />
                Looking Glass Tool
              </CardTitle>
              <CardDescription>Execute network diagnostic commands from AS214199 infrastructure</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => { e.preventDefault(); executeCommand(); }} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base">Select Command</Label>
                    <RadioGroup 
                      value={command} 
                      onValueChange={setCommand}
                      className="flex flex-col space-y-1 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ping" id="ping" />
                        <Label htmlFor="ping" className="font-normal cursor-pointer">Ping</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="traceroute" id="traceroute" />
                        <Label htmlFor="traceroute" className="font-normal cursor-pointer">Traceroute</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mtr" id="mtr" />
                        <Label htmlFor="mtr" className="font-normal cursor-pointer">MTR</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem disabled value="bgp" id="bgp" />
                        <Label htmlFor="bgp" className="font-normal cursor-pointer">BGP Route</Label>
                        <Badge className="ml-2 relative">Disabled</Badge>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="target" className="text-base">
                      {command === 'bgp' ? 'Enter ASN or Prefix' : 'Enter Hostname or IP Address'}
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="target"
                        placeholder={command === 'bgp' ? 'AS123 or 1.1.1.0/24' : 'example.com or 1.1.1.1'}
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        type="submit" 
                        disabled={isExecuting || !isValidTarget(target)}
                      >
                        {isExecuting ? 'Executing...' : 'Execute'}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {command === 'bgp' 
                        ? 'Enter an ASN (e.g., AS1234) or network prefix (e.g., 1.1.1.0/24)' 
                        : 'Enter a valid hostname or IP address to test'}
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          
          {/* Results */}
          <div className="mt-8 space-y-6">
            {results.length > 0 ? (
              results.map((result, index) => (
                <Card key={index} className="network-card">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {result.command.charAt(0).toUpperCase() + result.command.slice(1)} to {result.target}
                        </CardTitle>
                        <CardDescription>
                          Executed at {new Date(result.timestamp).toLocaleString()}
                        </CardDescription>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {result.success ? 'Success' : 'Failed'}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted p-4 rounded-lg">
                      <pre className="text-sm font-mono whitespace-pre-wrap overflow-x-auto">{result.output}</pre>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No commands have been executed yet. Use the form above to run network diagnostic commands.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Usage Information */}
      <section className="py-8 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Looking Glass Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="network-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Ping Command</h3>
                <p className="text-sm text-muted-foreground">
                  Tests basic connectivity by sending ICMP echo requests to a target host. Shows round-trip-time and packet loss statistics.
                </p>
              </CardContent>
            </Card>
            
            <Card className="network-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Traceroute Command</h3>
                <p className="text-sm text-muted-foreground">
                  Shows the path packets take to reach the destination, including all intermediate routers and delay at each hop.
                </p>
              </CardContent>
            </Card>
            
            <Card className="network-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">MTR Command</h3>
                <p className="text-sm text-muted-foreground">
                  Combines ping and traceroute functionality to continuously monitor the network path, showing detailed statistics for each hop.
                </p>
              </CardContent>
            </Card>
            
            <Card className="network-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">BGP Command</h3>
                <p className="text-sm text-muted-foreground">
                  Shows BGP routing information for a prefix or AS number, including path attributes, communities, and next hops.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default LookingGlass;
