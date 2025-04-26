
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ExchangePoints = () => {
  return (
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
  );
};

export default ExchangePoints;
