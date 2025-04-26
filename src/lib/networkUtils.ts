import { toast } from "sonner";

interface SubnetInfo {
  id: string;
  subnet: string;
  description: string;
  allocated: boolean;
  usage: number; // percentage
  type: 'IPv4' | 'IPv6';
}

interface PeeringInfo {
  id: string;
  name: string;
  asn: string;
  location: string;
  ipv4: string;
  ipv6: string;
  speed: string;
}

// Mock data for subnets
export const getSubnets = (): SubnetInfo[] => {
  return [
    {
      id: '1',
      subnet: '5.231.32.0/24',
      description: 'Infrastructure',
      allocated: true,
      usage: 20,
      type: 'IPv4'
    },
    {
      id: '2',
      subnet: '2a0f:85c1:897::/48',
      description: 'IPv6 Infrastructure',
      allocated: true,
      usage: 15,
      type: 'IPv6'
    },
    {
      id: '3',
      subnet: '2a0f:9400:7e16::/48',
      description: 'IPv6 Customer Allocations',
      allocated: true,
      usage: 8,
      type: 'IPv6'
    }
  ];
};

// Mock data for peering info
export const getPeeringInfo = (): PeeringInfo[] => {
  return [
    {
      id: '1',
      name: 'Hurricane Electric',
      asn: 'AS6939',
      location: 'Amsterdam, Netherlands',
      ipv4: '123.45.67.89',
      ipv6: '2001:db8::1',
      speed: '10 Gbps'
    },
    {
      id: '2',
      name: 'AMS-IX',
      asn: 'AS1200',
      location: 'Amsterdam, Netherlands',
      ipv4: '123.45.67.90',
      ipv6: '2001:db8::2',
      speed: '10 Gbps'
    },
    {
      id: '3',
      name: 'Cloudflare',
      asn: 'AS13335',
      location: 'Frankfurt, Germany',
      ipv4: '123.45.67.91',
      ipv6: '2001:db8::3',
      speed: '10 Gbps'
    },
    {
      id: '4',
      name: 'Akamai',
      asn: 'AS20940',
      location: 'London, UK',
      ipv4: '123.45.67.92',
      ipv6: '2001:db8::4',
      speed: '10 Gbps'
    }
  ];
};

export interface LookingGlassResult {
  command: string;
  target: string;
  output: string;
  timestamp: string;
  success: boolean;
}

const CARAMEL_API_URL = 'http://localhost:3000'; // Default development URL, replace with your actual Caramel backend URL

export const executeLookingGlassCommand = async (
  command: string,
  target: string
): Promise<LookingGlassResult> => {
  try {
    let endpoint: string;
    
    // Map frontend commands to Caramel API endpoints
    switch (command) {
      case 'ping':
        endpoint = '/api/ping';
        break;
      case 'traceroute':
        endpoint = '/api/traceroute';
        break;
      case 'mtr':
        endpoint = '/api/mtr';
        break;
      case 'bgp':
        endpoint = target.includes('/') ? '/api/bgp/prefix' : '/api/bgp/asn';
        break;
      default:
        throw new Error('Unknown command');
    }

    const response = await fetch(`${CARAMEL_API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        target: target
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    const result: LookingGlassResult = {
      command,
      target,
      output: data.output || data.message || 'No output received',
      timestamp: new Date().toISOString(),
      success: true
    };

    toast.success(`Command executed: ${command} ${target}`);
    return result;

  } catch (error) {
    console.error('Looking Glass error:', error);
    
    const errorResult: LookingGlassResult = {
      command,
      target,
      output: error instanceof Error ? error.message : 'An unknown error occurred',
      timestamp: new Date().toISOString(),
      success: false
    };

    toast.error(`Error executing command: ${errorResult.output}`);
    return errorResult;
  }
};
