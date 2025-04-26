
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
      usage: 87,
      type: 'IPv4'
    },
    {
      id: '2',
      subnet: '5.231.33.0/24',
      description: 'Customer Allocations',
      allocated: true,
      usage: 74,
      type: 'IPv4'
    },
    {
      id: '3',
      subnet: '5.231.34.0/24',
      description: 'CDN Network',
      allocated: true,
      usage: 92,
      type: 'IPv4'
    },
    {
      id: '4',
      subnet: '5.231.35.0/24',
      description: 'Reserved',
      allocated: false,
      usage: 0,
      type: 'IPv4'
    },
    {
      id: '5',
      subnet: '2a0f:0:1::/48',
      description: 'IPv6 Infrastructure',
      allocated: true,
      usage: 15,
      type: 'IPv6'
    },
    {
      id: '6',
      subnet: '2a0f:0:2::/48',
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

// Looking Glass command execution (simulated)
export interface LookingGlassResult {
  command: string;
  target: string;
  output: string;
  timestamp: string;
  success: boolean;
}

export const executeLookingGlassCommand = (
  command: string,
  target: string
): Promise<LookingGlassResult> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      let output: string;
      let success = true;
      
      switch (command) {
        case 'ping':
          output = generatePingOutput(target);
          break;
        case 'traceroute':
          output = generateTracerouteOutput(target);
          break;
        case 'bgp':
          output = generateBgpOutput(target);
          break;
        default:
          output = 'Unknown command';
          success = false;
      }
      
      const result: LookingGlassResult = {
        command,
        target,
        output,
        timestamp: new Date().toISOString(),
        success
      };
      
      toast.success(`Command executed: ${command} ${target}`);
      resolve(result);
    }, 1500); // Simulate network delay
  });
};

// Helper functions to generate sample output
function generatePingOutput(target: string): string {
  const pingTimes = Array(5).fill(0).map(() => Math.floor(Math.random() * 30) + 15);
  const average = Math.floor(pingTimes.reduce((a, b) => a + b, 0) / pingTimes.length);
  
  return `PING ${target} (${target}) 56 data bytes
64 bytes from ${target}: icmp_seq=1 ttl=56 time=${pingTimes[0]} ms
64 bytes from ${target}: icmp_seq=2 ttl=56 time=${pingTimes[1]} ms
64 bytes from ${target}: icmp_seq=3 ttl=56 time=${pingTimes[2]} ms
64 bytes from ${target}: icmp_seq=4 ttl=56 time=${pingTimes[3]} ms
64 bytes from ${target}: icmp_seq=5 ttl=56 time=${pingTimes[4]} ms

--- ${target} ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4007ms
rtt min/avg/max/mdev = ${Math.min(...pingTimes)}/${average}/${Math.max(...pingTimes)}/2.5 ms`;
}

function generateTracerouteOutput(target: string): string {
  return `traceroute to ${target} (${target}), 30 hops max, 60 byte packets
 1  router.sdencn.net (5.231.32.1)  0.456 ms  0.411 ms  0.407 ms
 2  core1.sdencn.net (5.231.32.2)  0.934 ms  0.930 ms  0.925 ms
 3  ams-ix.net (80.249.208.1)  1.170 ms  1.165 ms  1.160 ms
 4  ams-core1.transit.net (80.249.209.1)  1.567 ms  1.561 ms  1.555 ms
 5  fra-edge1.transit.net (80.249.210.1)  5.234 ms  5.229 ms  5.222 ms
 6  fra-peer1.target-isp.net (64.233.175.1)  5.705 ms  5.699 ms  5.692 ms
 7  ${target} (${target})  7.878 ms  7.870 ms  7.861 ms`;
}

function generateBgpOutput(target: string): string {
  if (target.includes('/')) {
    // If it looks like a prefix
    return `BGP routing table entry for ${target}
Paths: (2 available, best #2, table default)
  Advertised to non peer-group peers:
  65001 65002 65003
    192.0.2.1 from 192.0.2.1 (192.0.2.1)
      Origin IGP, metric 0, localpref 100, valid, external
      Community: 65001:100 65001:2000
      Last update: ${new Date().toISOString()}
  65001 65004
    192.0.2.2 from 192.0.2.2 (192.0.2.2)
      Origin IGP, metric 0, localpref 200, valid, external, best
      Community: 65001:100 65001:3000
      Last update: ${new Date().toISOString()}`;
  } else {
    // If it looks like an ASN
    return `BGP routing table entries for ASN ${target.replace('AS', '')}
Network          Next Hop            Metric LocPrf Weight Path
5.231.32.0/24    192.0.2.1                0    100      0 ${target.replace('AS', '')} i
5.231.33.0/24    192.0.2.1                0    100      0 ${target.replace('AS', '')} i
5.231.34.0/24    192.0.2.1                0    100      0 ${target.replace('AS', '')} i
5.231.35.0/24    192.0.2.1                0    100      0 ${target.replace('AS', '')} i
2a0f:0:1::/48    2001:db8::1              0    100      0 ${target.replace('AS', '')} i
2a0f:0:2::/48    2001:db8::1              0    100      0 ${target.replace('AS', '')} i`;
  }
}
