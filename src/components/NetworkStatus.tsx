
import React from 'react';
import { Server } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

interface NetworkStatusProps {
  ipAddress?: string;
  compact?: boolean;
}

const NetworkStatus: React.FC<NetworkStatusProps> = ({ 
  ipAddress = '5.231.32.2',
  compact = false
}) => {
  const { pingResults, averagePing, statusMessage, isLoading, targetIP } = useNetworkStatus(ipAddress);

  if (compact) {
    return (
      <Card className="network-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Server className="h-5 w-5 text-network-lightBlue" />
            Network Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Status</div>
              <div className="font-medium">{statusMessage}</div>
            </div>
            <div className="flex items-center">
              <div className={`h-3 w-3 rounded-full mr-2 ${averagePing ? 'bg-green-500' : 'bg-red-500'} ping-active`}></div>
              <div className="text-lg font-bold">
                {isLoading ? 'Loading...' : averagePing ? `${averagePing}ms` : 'Timeout'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="network-card">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Server className="h-5 w-5 text-network-lightBlue" />
          Network Status Monitor
        </CardTitle>
        <CardDescription>
          Real-time ping results to {targetIP}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
          <div className="flex items-center">
            <div className={`h-4 w-4 rounded-full mr-3 ${averagePing ? 'bg-green-500' : 'bg-red-500'} ping-active`}></div>
            <span className="font-medium">{statusMessage}</span>
          </div>
          <div className="bg-muted px-4 py-2 rounded-lg">
            <span className="text-muted-foreground mr-2">Avg Response:</span>
            <span className="font-bold">{isLoading ? 'Checking...' : averagePing ? `${averagePing}ms` : 'Timeout'}</span>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-right">Response Time</th>
                <th className="px-4 py-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center">Loading network status...</td>
                </tr>
              ) : pingResults.map((ping, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-muted bg-opacity-50' : ''}>
                  <td className="px-4 py-2">
                    {new Date(ping.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="px-4 py-2 text-right font-mono">
                    {ping.responseTime ? `${ping.responseTime}ms` : '-'}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      ping.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {ping.status === 'success' ? 'Success' : 'Failed'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkStatus;
