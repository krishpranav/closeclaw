export type GatewayStatus = 'offline' | 'connecting' | 'live' | 'error';

export interface Agent {
  id: string;
  name: string;
  model: string;
  workspacePath: string;
  activeSessions: number;
  lastActivity: string;
  tools: string[];
  skills: string[];
}

export interface Channel {
  id: string;
  name: string;
  type: 'whatsapp' | 'telegram' | 'discord' | 'slack' | 'voice' | 'webchat';
  status: 'connected' | 'error' | 'paused';
  messageCount: number;
  routedToAgentId: string;
}

export interface Session {
  id: string;
  agentId: string;
  senderId: string;
  channelId: string;
  startedAt: string;
  lastMessageAt: string;
  tokenUsage: number;
  costEstimate: number;
}

export interface ToolRun {
  id: string;
  toolName: string;
  status: 'running' | 'success' | 'failed';
  startedAt: string;
  outputPreview?: string;
}

export interface CronJob {
  id: string;
  name: string;
  expression: string;
  command: string;
  nextRun: string;
  lastRun?: string;
  status: 'active' | 'paused';
}

export interface Skill {
  id: string;
  name: string;
  version: string;
  description: string;
  installed: boolean;
  author: string;
}

export interface Message {
  id: string;
  sessionId: string;
  role: 'user' | 'agent' | 'system';
  content: string;
  timestamp: string;
  channelId?: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'success';
  message: string;
  source: 'gateway' | 'app';
}
