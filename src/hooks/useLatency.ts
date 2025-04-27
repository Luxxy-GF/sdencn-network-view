
import { useState, useEffect } from 'react';

interface LatencyState {
  latency: number | null;
  isConnected: boolean;
  error: string | null;
}

export const useLatency = () => {
  const [state, setState] = useState<LatencyState>({
    latency: null,
    isConnected: false,
    error: null,
  });

  useEffect(() => {
    const wsUrl = `${import.meta.env.VITE_CARAMEL_API_URL?.replace('http', 'ws') || 'ws://localhost:33046'}/latency`;
    const ws = new WebSocket(wsUrl);
    let pingInterval: NodeJS.Timeout;

    ws.onopen = () => {
      setState(prev => ({ ...prev, isConnected: true, error: null }));
      
      // Send ping every 2 seconds
      pingInterval = setInterval(() => {
        const start = Date.now();
        ws.send(start.toString());
      }, 2000);
    };

    ws.onmessage = (event) => {
      const sendTime = parseInt(event.data);
      const latency = Date.now() - sendTime;
      setState(prev => ({ ...prev, latency }));
    };

    ws.onerror = (error) => {
      setState(prev => ({ 
        ...prev, 
        isConnected: false, 
        error: 'Failed to connect to WebSocket server'
      }));
    };

    ws.onclose = () => {
      setState(prev => ({ 
        ...prev, 
        isConnected: false,
        error: 'WebSocket connection closed'
      }));
    };

    return () => {
      clearInterval(pingInterval);
      ws.close();
    };
  }, []);

  return state;
};
