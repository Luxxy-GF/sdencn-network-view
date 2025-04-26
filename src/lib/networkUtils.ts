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

// Looking Glass command execution
export interface LookingGlassResult {
  command: string;
  target: string;
  output: string;
  timestamp: string;
  success: boolean;
}

// Network hop representation
interface NetworkHop {
  hop: number;
  host: string;
  ip: string;
  loss: number;
  responses: number[];
}

// Helper function to generate realistic IPs for the path
function generatePathIPs(target: string, hops: number): string[] {
  const path: string[] = [];
  
  // Start with our network
  path.push('5.231.32.1'); // Gateway
  path.push('5.231.32.2'); // Core router
  
  // Add realistic intermediate hops
  path.push('80.249.208.1');  // AMS-IX
  path.push('80.249.209.1');  // Transit provider core
  path.push('80.249.210.1');  // Transit edge
  
  // Generate remaining hops
  for (let i = path.length; i < hops - 1; i++) {
    const octet1 = Math.floor(Math.random() * 223) + 1;
    const octet2 = Math.floor(Math.random() * 255);
    const octet3 = Math.floor(Math.random() * 255);
    const octet4 = Math.floor(Math.random() * 254) + 1;
    path.push(`${octet1}.${octet2}.${octet3}.${octet4}`);
  }
  
  path.push(target); // Final destination
  return path;
}

function generateLatency(hopIndex: number): number {
  // More realistic latency simulation based on hop distance
  const baseLatency = 0.5; // Local network
  const latencyIncrement = 5; // ms per hop
  const jitter = Math.random() * 2 - 1; // -1 to 1 ms jitter
  
  return Math.max(0.1, baseLatency + (hopIndex * latencyIncrement) + jitter);
}

function generateMTROutput(target: string): string {
  const hops = Math.floor(Math.random() * 4) + 6; // 6-9 hops
  const pathIPs = generatePathIPs(target, hops);
  let output = "Start: " + new Date().toISOString() + "\n";
  output += "HOST: AS214199-LG              Loss%   Snt   Last   Avg  Best  Wrst StDev\n";
  
  for (let i = 0; i < hops; i++) {
    const ip = pathIPs[i];
    const loss = i === hops - 1 ? 0 : Math.random() < 0.1 ? Math.floor(Math.random() * 20) : 0;
    const sent = 10;
    const latencies = Array(10).fill(0).map(() => generateLatency(i));
    const avg = latencies.reduce((a, b) => a + b) / latencies.length;
    const best = Math.min(...latencies);
    const worst = Math.max(...latencies);
    const stdDev = Math.sqrt(latencies.reduce((s, n) => s + Math.pow(n - avg, 2), 0) / latencies.length);
    
    output += `${(i + 1).toString().padStart(2)}.|-- ${ip.padEnd(20)} `;
    output += `${loss.toFixed(1)}%`.padStart(6);
    output += `${sent}`.padStart(6);
    output += `${latencies[latencies.length - 1].toFixed(1)}`.padStart(7);
    output += `${avg.toFixed(1)}`.padStart(6);
    output += `${best.toFixed(1)}`.padStart(6);
    output += `${worst.toFixed(1)}`.padStart(6);
    output += `${stdDev.toFixed(1)}`.padStart(7);
    output += "\n";
  }
  
  return output;
}

function generatePingOutput(target: string): string {
  const baseLatency = generateLatency(4); // Assume target is ~4 hops away
  const responses = Array(5).fill(0).map(() => baseLatency + (Math.random() * 2 - 1));
  const min = Math.min(...responses);
  const max = Math.max(...responses);
  const avg = responses.reduce((a, b) => a + b) / responses.length;
  const mdev = Math.sqrt(responses.reduce((s, n) => s + Math.pow(n - avg, 2), 0) / responses.length);
  
  return `PING ${target} (${target}) 56(84) bytes of data.
64 bytes from ${target}: icmp_seq=1 ttl=56 time=${responses[0].toFixed(3)} ms
64 bytes from ${target}: icmp_seq=2 ttl=56 time=${responses[1].toFixed(3)} ms
64 bytes from ${target}: icmp_seq=3 ttl=56 time=${responses[2].toFixed(3)} ms
64 bytes from ${target}: icmp_seq=4 ttl=56 time=${responses[3].toFixed(3)} ms
64 bytes from ${target}: icmp_seq=5 ttl=56 time=${responses[4].toFixed(3)} ms

--- ${target} ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4007ms
rtt min/avg/max/mdev = ${min.toFixed(3)}/${avg.toFixed(3)}/${max.toFixed(3)}/${mdev.toFixed(3)} ms`;
}

function generateTracerouteOutput(target: string): string {
  const hops = Math.floor(Math.random() * 4) + 6; // 6-9 hops
  const pathIPs = generatePathIPs(target, hops);
  let output = `traceroute to ${target} (${target}), 30 hops max, 60 byte packets\n`;
  
  for (let i = 0; i < hops; i++) {
    const ip = pathIPs[i];
    const latencies = Array(3).fill(0).map(() => generateLatency(i));
    
    output += ` ${i + 1}  `;
    if (Math.random() < 0.05) {
      output += "* * *\n"; // Simulate occasional timeout
      continue;
    }
    
    // Add realistic hostnames for known hops
    let hostname = "";
    if (i === 0) hostname = "gateway.as214199.net";
    else if (i === 1) hostname = "core1.as214199.net";
    else if (i === 2) hostname = "ams-ix.net";
    else if (i === 3) hostname = "transit-core.net";
    else hostname = ip;
    
    output += `${hostname} (${ip})  `;
    output += latencies.map(l => `${l.toFixed(3)} ms`).join("  ");
    output += "\n";
  }
  
  return output;
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

export const executeLookingGlassCommand = (
  command: string,
  target: string
): Promise<LookingGlassResult> => {
  return new Promise((resolve) => {
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
        case 'mtr':
          output = generateMTROutput(target);
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
