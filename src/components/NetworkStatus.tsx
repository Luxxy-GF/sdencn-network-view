
import React from 'react';
import { Signal, SignalHigh, SignalLow } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLatency } from '@/hooks/useLatency';

interface NetworkStatusProps {
  compact?: boolean;
}

const NetworkStatus: React.FC<NetworkStatusProps> = ({ 
  compact = false
}) => {
  const { latency, isConnected, error } = useLatency();

  const getStatusMessage = () => {
    if (error) return 'Connection Error';
    if (!isConnected) return 'Connecting...';
    if (!latency) return 'Measuring...';
    if (latency < 50) return 'Excellent';
    if (latency < 100) return 'Good';
    return 'Poor';
  };

  const getStatusIcon = () => {
    if (!isConnected || error) return <Signal className="h-5 w-5 text-red-500" />;
    if (!latency) return <Signal className="h-5 w-5 text-yellow-500" />;
    if (latency < 50) return <SignalHigh className="h-5 w-5 text-green-500" />;
    if (latency < 100) return <SignalLow className="h-5 w-5 text-yellow-500" />;
    return <Signal className="h-5 w-5 text-red-500" />;
  };

  if (compact) {
    return (
      <Card className="network-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            {getStatusIcon()}
            Network Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Status</div>
              <div className="font-medium">{getStatusMessage()}</div>
            </div>
            <div className="flex items-center">
              <div className={`h-3 w-3 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'} ping-active`}></div>
              <div className="text-lg font-bold">
                {latency ? `${latency}ms` : 'N/A'}
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
          {getStatusIcon()}
          Network Status Monitor
        </CardTitle>
        <CardDescription>
          Real-time latency monitoring
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
          <div className="flex items-center">
            <div className={`h-4 w-4 rounded-full mr-3 ${isConnected ? 'bg-green-500' : 'bg-red-500'} ping-active`}></div>
            <span className="font-medium">{getStatusMessage()}</span>
          </div>
          <div className="bg-muted px-4 py-2 rounded-lg">
            <span className="text-muted-foreground mr-2">Current Latency:</span>
            <span className="font-bold">{latency ? `${latency}ms` : 'N/A'}</span>
          </div>
        </div>
        
        {error && (
          <div className="text-red-500 text-sm mt-2">
            Error: {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NetworkStatus;
