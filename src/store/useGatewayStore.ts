import { create } from 'zustand';
import {
  GatewayStatus,
  Agent,
  Channel,
  Session,
  ToolRun,
  CronJob,
  Skill,
  Message,
  LogEntry,
} from '../types';

interface GatewayState {
  // Gateway Connection
  status: GatewayStatus;
  host: string;
  token: string;
  latency: number;
  setStatus: (status: GatewayStatus) => void;
  setConsistency: (latency: number) => void;

  // Agents
  agents: Agent[];
  selectedAgentId: string | null;
  setSelectedAgentId: (id: string | null) => void;

  // Channels
  channels: Channel[];

  // Sessions
  sessions: Session[];
  selectedSessionId: string | null;
  setSelectedSessionId: (id: string | null) => void;

  // Tools
  tools: ToolRun[];
  recentRuns: ToolRun[];

  // Cron
  cronJobs: CronJob[];

  // Skills
  installedSkills: Skill[];
  registrySkills: Skill[];

  // Messages
  messagesBySession: Record<string, Message[]>;

  // Voice
  voice: {
    wakeWordActive: boolean;
    talkModeActive: boolean;
    transcript: string;
  };
  setVoiceState: (state: Partial<GatewayState['voice']>) => void;

  // Canvas
  canvas: {
    active: boolean;
    url: string | null;
  };
  setCanvasState: (state: Partial<GatewayState['canvas']>) => void;

  // Logs
  logs: LogEntry[];
  addLog: (log: LogEntry) => void;

  // Actions for mock updates
  addMessage: (sessionId: string, message: Message) => void;
}

// --- MOCK DATA ---

const MOCK_AGENTS: Agent[] = [
  {
    id: 'a1',
    name: 'OmniClaw',
    model: 'gpt-4o',
    workspacePath: '/workspace/OmniClaw',
    activeSessions: 12,
    lastActivity: '2m ago',
    tools: ['browser', 'shell', 'file', 'canvas'],
    skills: ['web-search', 'twitter-bot'],
  },
  {
    id: 'a2',
    name: 'DevAssist',
    model: 'claude-3-5-sonnet',
    workspacePath: '/workspace/DevAssist',
    activeSessions: 3,
    lastActivity: '15m ago',
    tools: ['shell', 'file', 'github'],
    skills: ['code-review'],
  },
  {
    id: 'a3',
    name: 'HomeBase',
    model: 'llama-3-70b',
    workspacePath: '/workspace/HomeBase',
    activeSessions: 1,
    lastActivity: '1h ago',
    tools: ['calendar', 'email'],
    skills: ['smart-home'],
  },
];

const MOCK_CHANNELS: Channel[] = [
  {
    id: 'c1',
    name: 'Personal WhatsApp',
    type: 'whatsapp',
    status: 'connected',
    messageCount: 1450,
    routedToAgentId: 'a1',
  },
  {
    id: 'c2',
    name: 'DevOps Slack',
    type: 'slack',
    status: 'connected',
    messageCount: 8900,
    routedToAgentId: 'a2',
  },
  {
    id: 'c3',
    name: 'Public Telegram',
    type: 'telegram',
    status: 'error',
    messageCount: 320,
    routedToAgentId: 'a1',
  },
];

const MOCK_SESSIONS: Session[] = [
  {
    id: 's1',
    agentId: 'a1',
    senderId: 'user_123',
    channelId: 'c1',
    startedAt: new Date(Date.now() - 3600000).toISOString(),
    lastMessageAt: new Date().toISOString(),
    tokenUsage: 4500,
    costEstimate: 0.045,
  },
  {
    id: 's2',
    agentId: 'a2',
    senderId: 'team_devops',
    channelId: 'c2',
    startedAt: new Date(Date.now() - 86400000).toISOString(),
    lastMessageAt: new Date(Date.now() - 300000).toISOString(),
    tokenUsage: 12500,
    costEstimate: 0.125,
  },
];

const MOCK_MESSAGES: Record<string, Message[]> = {
  s1: [
    {
      id: 'm1',
      sessionId: 's1',
      role: 'user',
      content: 'Can you check my calendar for tomorrow and summarize my meetings?',
      timestamp: new Date(Date.now() - 60000).toISOString(),
      channelId: 'c1',
    },
    {
      id: 'm2',
      sessionId: 's1',
      role: 'agent',
      content: 'I have checked your calendar. You have 3 meetings tomorrow:\n1. 10:00 AM - Design Sync\n2. 1:00 PM - Lunch with Sarah\n3. 3:30 PM - Roadmap Review\n\nWould you like me to draft prep notes for the Roadmap Review?',
      timestamp: new Date(Date.now() - 30000).toISOString(),
      channelId: 'c1',
    },
  ],
};

const MOCK_TOOLS: ToolRun[] = [
  { id: 'tr1', toolName: 'browser.goto', status: 'success', startedAt: '5m ago', outputPreview: 'Navigated to https://github.com/openclaw/openclaw' },
  { id: 'tr2', toolName: 'shell.exec', status: 'failed', startedAt: '12m ago', outputPreview: 'Command "npm run build" failed with exit code 1' },
  { id: 'tr3', toolName: 'calendar.listEvents', status: 'running', startedAt: 'Just now' },
];

const MOCK_CRON: CronJob[] = [
  { id: 'cj1', name: 'Daily Briefing', expression: '0 8 * * *', command: 'Run morning summarization agent', nextRun: 'Tomorrow at 08:00 AM', status: 'active' },
  { id: 'cj2', name: 'Backup Workspace', expression: '0 0 * * 0', command: 'tar -czf backup.tar.gz /workspace', nextRun: 'Sunday at 00:00 AM', status: 'active' },
];

const MOCK_LOGS: LogEntry[] = [
  { id: 'l1', timestamp: new Date(Date.now() - 10000).toISOString(), level: 'info', message: 'WebSocket connection to ws://127.0.0.1:18789 established', source: 'app' },
  { id: 'l2', timestamp: new Date(Date.now() - 8000).toISOString(), level: 'success', message: 'Authenticated as openclaw_admin', source: 'gateway' },
  { id: 'l3', timestamp: new Date(Date.now() - 5000).toISOString(), level: 'warn', message: 'Telegram channel disconnected: Retrying...', source: 'gateway' },
];

export const useGatewayStore = create<GatewayState>((set) => ({
  status: 'live',
  host: '127.0.0.1',
  token: 'openclaw_dev_token',
  latency: 42,
  setStatus: (status) => set({ status }),
  setConsistency: (latency) => set({ latency }),

  agents: MOCK_AGENTS,
  selectedAgentId: null,
  setSelectedAgentId: (id) => set({ selectedAgentId: id }),

  channels: MOCK_CHANNELS,

  sessions: MOCK_SESSIONS,
  selectedSessionId: null,
  setSelectedSessionId: (id) => set({ selectedSessionId: id }),

  tools: MOCK_TOOLS,
  recentRuns: MOCK_TOOLS,

  cronJobs: MOCK_CRON,

  installedSkills: [],
  registrySkills: [],

  messagesBySession: MOCK_MESSAGES,

  voice: {
    wakeWordActive: true,
    talkModeActive: false,
    transcript: '',
  },
  setVoiceState: (newState) => set((state) => ({ voice: { ...state.voice, ...newState } })),

  canvas: {
    active: false,
    url: null,
  },
  setCanvasState: (newState) => set((state) => ({ canvas: { ...state.canvas, ...newState } })),

  logs: MOCK_LOGS,
  addLog: (log) => set((state) => ({ logs: [log, ...state.logs].slice(0, 100) })),

  addMessage: (sessionId, message) =>
    set((state) => {
      const sessionMsgs = state.messagesBySession[sessionId] || [];
      return {
        messagesBySession: {
          ...state.messagesBySession,
          [sessionId]: [...sessionMsgs, message],
        },
      };
    }),
}));
