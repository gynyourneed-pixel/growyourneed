import { useState, useEffect, useCallback } from 'react';
import { Agent } from '../../../../types';

const generateRandomIp = () => `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
const osTypes: Array<'windows' | 'linux' | 'macos'> = ['windows', 'linux', 'macos'];
const hostnames = ['WEB-01', 'DB-SRV', 'DEV-STATION', 'FINANCE-PC', 'MARKETING-MAC', 'BUILD-AGENT'];

const initialAgents: Agent[] = Array.from({ length: 5 }, (_, i) => ({
  id: `agent-${i + 1}`,
  ip: generateRandomIp(),
  os: osTypes[i % 3],
  hostname: `${hostnames[i % 6]}-${Math.floor(Math.random() * 100)}`,
  lastSeen: Date.now() - Math.random() * 1000 * 60 * 5, // Last seen within 5 minutes
  status: Math.random() > 0.3 ? 'online' : 'offline',
}));

const useC2Simulator = () => {
    const [agents, setAgents] = useState<Agent[]>(initialAgents);

    useEffect(() => {
        const interval = setInterval(() => {
            setAgents(prevAgents => 
                prevAgents.map(agent => {
                    const random = Math.random();
                    let newStatus = agent.status;
                    if (random < 0.1) { // 10% chance to flip status
                        newStatus = agent.status === 'online' ? 'offline' : 'online';
                    }
                    
                    return {
                        ...agent,
                        status: newStatus,
                        lastSeen: newStatus === 'online' ? Date.now() : agent.lastSeen,
                    };
                })
            );
        }, 5000); // Update status every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const executeCommand = useCallback(async (agentId: string, command: string): Promise<string> => {
        const agent = agents.find(a => a.id === agentId);
        if (!agent || agent.status === 'offline') {
            return "Error: Agent is offline.";
        }
        
        // Simulate network latency
        await new Promise(res => setTimeout(res, Math.random() * 300 + 100));

        const cmd = command.toLowerCase().trim().split(' ')[0];
        const args = command.trim().split(' ').slice(1).join(' ');

        switch (cmd) {
            case 'whoami':
                return agent.os === 'windows' ? 'corp\\svc_admin' : 'root';
            case 'hostname':
                return agent.hostname;
            case 'ls':
            case 'dir':
                if (agent.os === 'windows') {
                    return `
    Directory: C:\\Users\\svc_admin

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----         5/15/2024   9:03 AM                Documents
d-----         5/14/2024  11:12 PM                Downloads
-a----         5/13/2024   3:45 PM          32768 important_data.xlsx
-a----         5/12/2024   1:22 PM           1024 credentials.txt.bak
`;
                }
                return `
total 12
drwxr-xr-x 1 root root 4096 May 15 09:03 app
-rw-r--r-- 1 root root 1024 May 14 11:12 config.yaml
-rwxr-xr-- 1 root root 2048 May 13 03:45 startup.sh
`;
            case 'ps':
            case 'tasklist':
                 return agent.os === 'windows' ? 'powershell.exe\nsvchost.exe\nlsass.exe\n...' : '/bin/bash\n/usr/sbin/sshd\n/usr/bin/python3\n...';
            case 'cat':
                if(args.includes('credentials.txt.bak')) return 'user=admin\npass=P@$$w0rd123!';
                return `cat: ${args}: No such file or directory`;
            case 'type':
                 if(args.includes('credentials.txt.bak')) return 'user=admin\npass=P@$$w0rd123!';
                return `The system cannot find the file specified.`;
            case 'help':
                return 'Available commands: whoami, hostname, ls, dir, ps, tasklist, cat, type, help, clear';
            default:
                return `command not found: ${command}`;
        }
    }, [agents]);

    return { agents, executeCommand };
};

export default useC2Simulator;
