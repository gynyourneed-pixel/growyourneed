
import React, { useState, useEffect, useMemo } from 'react';
import { Report, ReportTableRow } from '../types';
import { useTheme } from '../context/ThemeContext';
import { XMarkIcon, ChevronUpIcon, ChevronDownIcon, ArrowDownTrayIcon } from '../icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import KpiCard from './KpiCard';
import DropdownMenu from './DropdownMenu';

interface ReportModalProps {
  report: Report;
  onClose: () => void;
}

type SortConfig = {
    key: string;
    direction: 'ascending' | 'descending';
} | null;

const ReportModal: React.FC<ReportModalProps> = ({ report, onClose }) => {
    const { theme } = useTheme();
    const [sortConfig, setSortConfig] = useState<SortConfig>(null);
    const [activeChartFilter, setActiveChartFilter] = useState<string | null>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
    const [filters, setFilters] = useState({ status: 'all', dateRange: 'all' });

    // --- FILTERS ---
    const hasStatusFilter = useMemo(() => report.tableData.headers.includes('Status'), [report]);
    const statusOptions = useMemo(() => {
        if (!hasStatusFilter) return [];
        return ['All', ...Array.from(new Set(report.tableData.rows.map(row => row.status as string)))];
    }, [report, hasStatusFilter]);

    const hasDateFilter = useMemo(() => report.tableData.headers.some(h => h.toLowerCase().includes('date')), [report]);
    const dateRangeOptions = [
        { value: 'all', label: 'All Time' },
        { value: 'last_30_days', label: 'Last 30 Days' },
        { value: 'last_90_days', label: 'Last 90 Days' },
    ];
    
    const handleFilterChange = (filterType: 'status' | 'dateRange', value: string) => {
        setFilters(prev => ({ ...prev, [filterType]: value }));
    };

    const clearAllFilters = () => {
        setFilters({ status: 'all', dateRange: 'all' });
        setActiveChartFilter(null);
        setActiveIndex(null);
    };

    const isAnyFilterActive = useMemo(() => {
        return filters.status !== 'all' || filters.dateRange !== 'all' || activeChartFilter !== null;
    }, [filters, activeChartFilter]);

    // Reset filters when the report changes
    useEffect(() => {
        clearAllFilters();
        setSortConfig(null);
    }, [report]);

    // Close modal on 'Escape' key press
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const sortedAndFilteredRows = useMemo(() => {
        let items: ReportTableRow[] = [...report.tableData.rows];
        
        // Chart-based filtering logic
        if (activeChartFilter) {
            if (report.id === 'staff_attendance') {
                const getMonthShortName = (date: Date) => date.toLocaleString('default', { month: 'short' });
                items = items.filter(row => getMonthShortName(new Date(row.date as string)) === activeChartFilter);
            } else if (report.id === 'financial_summary') {
                const getQuarter = (date: Date) => `Q${Math.floor(date.getMonth() / 3) + 1}`;
                items = items.filter(row => getQuarter(new Date(row.date as string)) === activeChartFilter);
            }
        }

        // Status filter
        if (hasStatusFilter && filters.status !== 'all') {
            items = items.filter(row => row.status === filters.status);
        }

        // Date range filter
        if (hasDateFilter && filters.dateRange !== 'all') {
            const now = new Date();
            const days = filters.dateRange === 'last_30_days' ? 30 : 90;
            const cutoff = new Date(new Date().setDate(now.getDate() - days));

            const dateHeaderKey = report.tableData.headers
                .find(h => h.toLowerCase().includes('date'))
                ?.toLowerCase()
                .replace(/ /g, '_');

            if (dateHeaderKey) {
                items = items.filter(row => new Date(row[dateHeaderKey] as string) >= cutoff);
            }
        }

        // Sorting logic
        if (sortConfig !== null) {
            items.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];
                if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }
        return items;
    }, [report, activeChartFilter, sortConfig, filters, hasStatusFilter, hasDateFilter]);


    const requestSort = (key: string) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const handleBarClick = (data: any, index: number) => {
        const newFilter = data.name;
        if (activeIndex === index) {
            setActiveIndex(null);
            setActiveChartFilter(null);
        } else {
            setActiveIndex(index);
            setActiveChartFilter(newFilter);
        }
    };

    const handleExport = (format: 'csv' | 'txt' | 'ps1' | 'doc') => {
        setIsExportMenuOpen(false); // Close menu after selection

        const headers = report.tableData.headers;
        const rows = sortedAndFilteredRows;
        let content = '';
        let mimeType = '';
        let fileExtension = '';

        switch (format) {
            case 'csv':
                fileExtension = 'csv';
                mimeType = 'text/csv;charset=utf-8;';
                const headerRow = headers.join(',');
                const csvRows = rows.map(row => 
                    headers.map(header => {
                        const key = header.toLowerCase().replace(/ /g, '_');
                        let value = String(row[key] ?? '');
                        // Escape commas and quotes
                        if (value.includes(',') || value.includes('"')) {
                            value = `"${value.replace(/"/g, '""')}"`;
                        }
                        return value;
                    }).join(',')
                );
                content = [headerRow, ...csvRows].join('\r\n');
                break;

            case 'txt':
                fileExtension = 'txt';
                mimeType = 'text/plain;charset=utf-8;';
                const txtHeaderRow = headers.join('\t\t'); // Use tabs for basic alignment
                const txtRows = rows.map(row => 
                    headers.map(header => {
                        const key = header.toLowerCase().replace(/ /g, '_');
                        return String(row[key] ?? '');
                    }).join('\t\t')
                );
                content = [txtHeaderRow, ...txtRows].join('\r\n');
                break;

            case 'ps1':
                fileExtension = 'ps1';
                mimeType = 'application/octet-stream;';
                const psObjects = rows.map(row => {
                    const properties = headers.map(header => {
                        const key = header.toLowerCase().replace(/ /g, '_');
                        const value = String(row[key] ?? '').replace(/'/g, "''"); // Escape single quotes for PowerShell
                        return `\t'${header}' = '${value}'`;
                    }).join(';\r\n');
                    return `[PSCustomObject]@{\r\n${properties}\r\n}`;
                }).join(',\r\n');
                content = `$data = @(\r\n${psObjects}\r\n)\r\n$data | Export-Csv -Path ".\\${report.id}_report.csv" -NoTypeInformation`;
                break;
                
            case 'doc':
                fileExtension = 'doc';
                mimeType = 'application/msword;';
                const tableHeader = `<tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>`;
                const tableRows = rows.map(row => {
                    const cells = headers.map(header => {
                        const key = header.toLowerCase().replace(/ /g, '_');
                        return `<td>${String(row[key] ?? '')}</td>`;
                    }).join('');
                    return `<tr>${cells}</tr>`;
                }).join('');
                content = `
                    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                    <head><meta charset='utf-8'><title>Export</title></head>
                    <body>
                        <h1>${report.title} Report</h1>
                        <p>Data exported on ${new Date().toLocaleString()}</p>
                        <table border="1">
                            <thead>${tableHeader}</thead>
                            <tbody>${tableRows}</tbody>
                        </table>
                    </body>
                    </html>
                `;
                break;
        }

        const blob = new Blob([content], { type: mimeType });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${report.id}_report.${fileExtension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    };

    const tickColor = theme === 'dark' ? 'rgb(209 213 219)' : 'rgb(74 74 74)';
    const gridColor = theme === 'dark' ? 'rgb(55 65 81)' : 'rgb(233 234 255)';
    const tooltipBg = theme === 'dark' ? 'rgb(31 41 55)' : 'rgb(255 255 255)';
    const chartBarFill = theme === 'dark' ? 'rgb(245 166 35)' : 'rgb(48 65 199)';
    const chartBarFillActive = theme === 'dark' ? 'rgb(251 146 60)' : 'rgb(245 166 35)';


    return (
        <div 
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-modal-title"
        >
            <div 
                className="bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark w-full max-w-4xl h-[90vh] rounded-lg shadow-2xl flex flex-col animate-scaleIn"
                onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                {/* Header */}
                <header className="flex items-center justify-between p-4 border-b-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark shrink-0">
                    <h2 id="report-modal-title" className="text-lg font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">{report.title} Report</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gyn-bg-tertiary-light dark:hover:bg-gyn-bg-tertiary-dark">
                        <XMarkIcon className="w-6 h-6 text-gyn-text-primary-light dark:text-gyn-text-primary-dark" />
                    </button>
                </header>
                
                {/* Content */}
                <div className="flex-1 p-4 overflow-y-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Left Section: KPIs and Chart */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {report.kpis.map(kpi => (
                                <KpiCard 
                                    key={kpi.label}
                                    title={kpi.label}
                                    value={kpi.value}
                                    change={kpi.change}
                                    changeType={kpi.changeType}
                                    subValue={kpi.subValue}
                                />
                            ))}
                        </div>
                        <div className="flex-1 min-h-[300px]">
                             <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={report.chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                                    <XAxis dataKey="name" tick={{ fill: tickColor, fontSize: 12 }} />
                                    <YAxis tick={{ fill: tickColor, fontSize: 12 }} />
                                    <Tooltip
                                    contentStyle={{
                                        backgroundColor: tooltipBg,
                                        border: `1px solid ${gridColor}`,
                                        borderRadius: '0.375rem',
                                        color: tickColor
                                    }}
                                    />
                                    <Legend wrapperStyle={{ fontSize: '14px', paddingTop: '20px' }} />
                                    <Bar 
                                        dataKey={Object.keys(report.chartData[0])[1]} 
                                        name={Object.keys(report.chartData[0])[1].replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} 
                                        radius={[4, 4, 0, 0]}
                                    >
                                       {report.chartData.map((entry, index) => (
                                            <Cell 
                                                cursor="pointer" 
                                                fill={index === activeIndex ? chartBarFillActive : chartBarFill} 
                                                key={`cell-${index}`}
                                                onClick={() => handleBarClick(entry, index)}
                                            />
                                        ))}
                                    </Bar>
                                    {Object.keys(report.chartData[0])[2] && <Bar dataKey={Object.keys(report.chartData[0])[2]} fill="rgb(107 114 128)" name={Object.keys(report.chartData[0])[2].replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} radius={[4, 4, 0, 0]} />}
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Right Section: Data Table */}
                    <div className="lg:col-span-1 bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark p-2 rounded-md flex flex-col">
                        <div className="flex items-center justify-between p-2">
                             <h3 className="text-md font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Detailed Data</h3>
                            <div className="flex items-center gap-2">
                                {activeChartFilter && (
                                    <span className="text-xs font-semibold bg-gyn-accent-light dark:bg-gyn-accent-dark text-gyn-blue-dark px-2 py-1 rounded-full animate-scaleIn" style={{animationDuration: '200ms'}}>
                                        {activeChartFilter}
                                    </span>
                                )}
                                <div className="relative">
                                    <button 
                                        onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
                                        className="p-1.5 rounded-md hover:bg-gyn-bg-tertiary-light dark:hover:bg-gyn-bg-tertiary-dark text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark"
                                        title="Export Data"
                                    >
                                        <ArrowDownTrayIcon className="w-5 h-5" />
                                    </button>
                                    <DropdownMenu isOpen={isExportMenuOpen} onClose={() => setIsExportMenuOpen(false)}>
                                        <button onClick={() => handleExport('csv')} className="w-full text-left px-4 py-2 text-sm text-gyn-text-primary-light dark:text-gyn-text-primary-dark hover:bg-gyn-bg-tertiary-light dark:hover:bg-gyn-bg-tertiary-dark">Export as CSV</button>
                                        <button onClick={() => handleExport('txt')} className="w-full text-left px-4 py-2 text-sm text-gyn-text-primary-light dark:text-gyn-text-primary-dark hover:bg-gyn-bg-tertiary-light dark:hover:bg-gyn-bg-tertiary-dark">Export as TXT</button>
                                        <button onClick={() => handleExport('doc')} className="w-full text-left px-4 py-2 text-sm text-gyn-text-primary-light dark:text-gyn-text-primary-dark hover:bg-gyn-bg-tertiary-light dark:hover:bg-gyn-bg-tertiary-dark">Export as Word</button>
                                        <button onClick={() => handleExport('ps1')} className="w-full text-left px-4 py-2 text-sm text-gyn-text-primary-light dark:text-gyn-text-primary-dark hover:bg-gyn-bg-tertiary-light dark:hover:bg-gyn-bg-tertiary-dark">Export as PowerShell</button>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>

                        {/* Filter Controls */}
                        {(hasStatusFilter || hasDateFilter) && (
                            <div className="flex flex-wrap items-center gap-4 px-2 pb-2 border-b-2 border-gyn-bg-secondary-light dark:border-gyn-bg-secondary-dark">
                                {hasStatusFilter && (
                                    <div className="flex items-center gap-2">
                                        <label htmlFor="status-filter" className="text-xs font-semibold text-gyn-text-primary-light dark:text-gyn-text-primary-dark">Status</label>
                                        <select
                                            id="status-filter"
                                            value={filters.status}
                                            onChange={(e) => handleFilterChange('status', e.target.value)}
                                            className="text-xs rounded-md p-1 border-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark focus:ring-gyn-accent-light dark:focus:ring-gyn-accent-dark focus:border-gyn-accent-light dark:focus:border-gyn-accent-dark"
                                        >
                                            {statusOptions.map(opt => <option key={opt} value={opt === 'All' ? 'all' : opt}>{opt}</option>)}
                                        </select>
                                    </div>
                                )}
                                {hasDateFilter && (
                                     <div className="flex items-center gap-2">
                                        <label htmlFor="date-filter" className="text-xs font-semibold text-gyn-text-primary-light dark:text-gyn-text-primary-dark">Date</label>
                                        <select
                                            id="date-filter"
                                            value={filters.dateRange}
                                            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                                            className="text-xs rounded-md p-1 border-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark focus:ring-gyn-accent-light dark:focus:ring-gyn-accent-dark focus:border-gyn-accent-light dark:focus:border-gyn-accent-dark"
                                        >
                                            {dateRangeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                        </select>
                                    </div>
                                )}
                                {isAnyFilterActive && (
                                    <button onClick={clearAllFilters} className="text-xs font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark bg-gyn-bg-tertiary-light dark:bg-gyn-bg-tertiary-dark px-2 py-1 rounded-md hover:bg-gyn-tan dark:hover:bg-gyn-bg-tertiary-light/20">
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        )}
                        
                        <div className="flex-1 overflow-y-auto no-scrollbar pt-2">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark uppercase bg-gyn-bg-tertiary-light dark:bg-gyn-bg-tertiary-dark sticky top-0">
                                    <tr>
                                        {report.tableData.headers.map(header => (
                                            <th key={header} scope="col" className="px-4 py-3">
                                                <button onClick={() => requestSort(header.toLowerCase().replace(/ /g, '_'))} className="flex items-center gap-1 hover:text-gyn-accent-light dark:hover:text-gyn-accent-dark">
                                                    {header}
                                                    {sortConfig?.key === header.toLowerCase().replace(/ /g, '_') ? (
                                                        sortConfig.direction === 'ascending' ? <ChevronUpIcon className="w-4 h-4"/> : <ChevronDownIcon className="w-4 h-4"/>
                                                    ) : <div className="w-4 h-4 opacity-0 group-hover:opacity-100"><ChevronDownIcon/></div>}
                                                </button>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedAndFilteredRows.length > 0 ? sortedAndFilteredRows.map((row, index) => (
                                        <tr key={index} className="border-b border-gyn-border-primary-light dark:border-gyn-border-primary-dark hover:bg-gyn-bg-secondary-light dark:hover:bg-gyn-bg-secondary-dark">
                                            {report.tableData.headers.map((header, i) => {
                                                const key = header.toLowerCase().replace(/ /g, '_');
                                                return (
                                                   <td key={i} className="px-4 py-3 font-medium text-gyn-text-primary-light dark:text-gyn-text-primary-dark whitespace-nowrap">{String(row[key] ?? '')}</td>
                                                )
                                            })}
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={report.tableData.headers.length} className="text-center p-8 text-gyn-text-primary-light dark:text-gyn-text-primary-dark">
                                                No data matches the current filters.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportModal;
