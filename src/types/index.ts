import React from 'react';

export type RightNavItemId = 'dashboard' | 'students' | 'staff' | 'academics' | 'finance';

export interface NavItem {
  id: string;
  label: string;
  icon?: React.FC<{ className?: string }>;
}

export interface RightNavItem {
  id: RightNavItemId;
  label: string;
  icon: React.FC<{ className?: string }>;
}

export interface AppItem {
  id: string;
  name: string;
  icon: React.FC<{ className?: string }>;
  description: string;
}

export interface UserData {
    name: string;
    role: string;
    avatarUrl: {
        small: string;
        medium: string;
        large: string;
    };
}

// Types for Reporting Feature
export interface ReportKpi {
    label: string;
    value: string;
    change?: string;
    changeType?: 'positive' | 'negative';
    subValue?: string;
}

export type ReportTableRow = {
  [key: string]: string | number;
};

export interface Report {
    id: string;
    title: string;
    description: string;
    icon: React.FC<{ className?: string }>;
    kpis: ReportKpi[];
    chartData: any[];
    tableData: {
        headers: string[];
        rows: ReportTableRow[];
    };
}

// Types for App Launcher
export interface AppState {
    id: string;
    name: string;
    icon: React.FC<{ className?: string }>;
}

export interface AppHeaderItem {
  id: string;
  label: string;
}

export interface AppNavItem {
  id: string;
  label: string;
  icon: React.FC<{ className?: string }>;
  children?: AppNavItem[];
  features?: string[];
}

export interface ToolbarItem {
  id: string;
  label: string;
  icon: React.FC<{ className?: string }>;
  type: 'button' | 'divider';
}

// Types for C2 Control App
export interface Agent {
  id: string;
  ip: string;
  os: 'windows' | 'linux' | 'macos';
  hostname: string;
  lastSeen: number;
  status: 'online' | 'offline';
}
