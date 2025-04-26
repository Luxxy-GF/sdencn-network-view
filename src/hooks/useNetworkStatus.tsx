
import { useState, useEffect } from 'react';

interface PingResult {
  timestamp: string;
  responseTime: number | null;
  status: 'success' | 'failed';
}

export const useNetworkStatus = (ipAddress: string = '5.231.32.2') => {
  const [isLoading, setIsLoading] = useState(true);
  const [pingResults, setPingResults] = useState<PingResult[]>([]);
  const [averagePing, setAveragePing] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState('Checking network status...');

  // Simulate ping functionality since we can't actually ping from the browser
  useEffect(() => {
    const simulatePing = () => {
      // Generate a realistic ping time between 5-60ms with occasional timeouts
      const success = Math.random() > 0.05; // 5% chance of failure
      const pingTime = success ? Math.floor(Math.random() * 55) + 5 : null;
      
      const newPingResult: PingResult = {
        timestamp: new Date().toISOString(),
        responseTime: pingTime,
        status: success ? 'success' : 'failed',
      };
      
      setPingResults(prev => {
        const updatedResults = [newPingResult, ...prev].slice(0, 10);
        
        // Calculate average of successful pings
        const successfulPings = updatedResults.filter(ping => ping.status === 'success');
        if (successfulPings.length > 0) {
          const sum = successfulPings.reduce((acc, ping) => acc + (ping.responseTime || 0), 0);
          setAveragePing(Math.round(sum / successfulPings.length));
          setStatusMessage('Network is operational');
        } else {
          setAveragePing(null);
          setStatusMessage('Network appears to be down');
        }
        
        return updatedResults;
      });
      
      setIsLoading(false);
    };

    // Initial ping
    simulatePing();
    
    // Schedule regular pings
    const intervalId = setInterval(simulatePing, 5000);
    
    // Clean up
    return () => clearInterval(intervalId);
  }, [ipAddress]);
  
  return { 
    pingResults, 
    averagePing, 
    statusMessage, 
    isLoading,
    targetIP: ipAddress
  };
};
