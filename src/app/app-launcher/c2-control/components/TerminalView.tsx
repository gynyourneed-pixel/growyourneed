import React, { useState, useRef, useEffect } from 'react';
import { Agent } from '../../../../types';
import { ArrowUturnLeftIcon } from '../../../../icons';

interface TerminalViewProps {
    agent: Agent;
    onExecuteCommand: (command: string) => Promise<string>;
    onExit: () => void;
}

interface OutputLine {
    type: 'command' | 'response';
    text: string;
}

const TerminalView: React.FC<TerminalViewProps> = ({ agent, onExecuteCommand, onExit }) => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState<OutputLine[]>([]);
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isProcessing, setIsProcessing] = useState(false);
    
    const inputRef = useRef<HTMLInputElement>(null);
    const endOfOutputRef = useRef<HTMLDivElement>(null);

    const prompt = <span className="text-gyn-accent-dark">{agent.hostname}:~#&nbsp;</span>;

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        endOfOutputRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [output]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const command = input.trim();
        if (command === '') return;
        
        if (command === 'clear') {
            setOutput([]);
            setInput('');
            setHistory(prev => (command ? [...prev, command] : prev));
            setHistoryIndex(-1);
            return;
        }

        setIsProcessing(true);
        setOutput(prev => [...prev, { type: 'command', text: command }]);
        const response = await onExecuteCommand(command);
        setOutput(prev => [...prev, { type: 'response', text: response }]);

        setInput('');
        setHistory(prev => (command ? [...prev, command] : prev));
        setHistoryIndex(-1);
        setIsProcessing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            const newIndex = historyIndex + 1;
            if (newIndex < history.length) {
                setHistoryIndex(newIndex);
                setInput(history[history.length - 1 - newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            const newIndex = historyIndex - 1;
            if (newIndex >= 0) {
                setHistoryIndex(newIndex);
                setInput(history[history.length - 1 - newIndex]);
            } else {
                setHistoryIndex(-1);
                setInput('');
            }
        }
    };

    useEffect(() => {
        if (!isProcessing) {
            inputRef.current?.focus();
        }
    }, [isProcessing]);

    return (
        <div 
            className="h-full flex flex-col bg-black font-mono text-sm p-4"
            onClick={() => inputRef.current?.focus()}
        >
            <header className="flex justify-between items-center mb-4 shrink-0">
                <h2 className="text-lg font-bold text-gray-300">
                    Shell: <span className="text-gyn-accent-dark">{agent.hostname} ({agent.ip})</span>
                </h2>
                <button 
                    onClick={onExit}
                    className="flex items-center gap-2 px-3 py-1 bg-gyn-bg-tertiary-dark text-gyn-text-primary-dark rounded-md hover:bg-gyn-border-secondary-dark"
                >
                    <ArrowUturnLeftIcon className="w-4 h-4" />
                    Back to Dashboard
                </button>
            </header>

            <div className="flex-1 overflow-y-auto no-scrollbar text-gray-300">
                {output.map((line, index) => (
                    <div key={index}>
                        {line.type === 'command' ? (
                            <div>{prompt}{line.text}</div>
                        ) : (
                            <pre className="whitespace-pre-wrap">{line.text}</pre>
                        )}
                    </div>
                ))}
                <div ref={endOfOutputRef} />
            </div>

            <form onSubmit={handleSubmit} className="flex items-center mt-2 shrink-0">
                {prompt}
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-none outline-none text-gray-300"
                    disabled={isProcessing}
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                />
            </form>
        </div>
    );
};

export default TerminalView;
