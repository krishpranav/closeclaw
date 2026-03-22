import { create } from "zustand";

export type ScanStatus = "idle" | "scanning" | "complete" | "error";
export type SessionStatus = "active" | "closed" | "meterpreter";

export interface Target {
  id: string;
  ip: string;
  hostname: string;
  os: string;
  ports: number[];
  vulnerabilities: string[];
  riskLevel: "low" | "medium" | "high" | "critical";
  lastSeen: string;
}

export interface Session {
  id: string;
  targetIp: string;
  type: "shell" | "meterpreter";
  status: SessionStatus;
  openedAt: string;
  user: string;
}

export interface Exploit {
  id: string;
  name: string;
  cve: string;
  description: string;
  rank: "excellent" | "great" | "good" | "normal" | "low";
  platform: string;
  lastUsed?: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: "info" | "warn" | "error" | "success";
  message: string;
}

interface ClawStore {
  workspaceName: string;
  setWorkspaceName: (name: string) => void;

  scanStatus: ScanStatus;
  scanTarget: string;
  setScanTarget: (t: string) => void;
  startScan: () => void;
  stopScan: () => void;

  targets: Target[];
  selectedTarget: Target | null;
  setSelectedTarget: (t: Target | null) => void;

  sessions: Session[];
  addSession: (s: Session) => void;
  closeSession: (id: string) => void;

  exploits: Exploit[];
  selectedExploit: Exploit | null;
  setSelectedExploit: (e: Exploit | null) => void;
  runExploit: (exploitId: string, targetId: string) => void;

  logs: LogEntry[];
  clearLogs: () => void;
}

const MOCK_TARGETS: Target[] = [
  {
    id: "t1",
    ip: "192.168.1.105",
    hostname: "dev-server-01",
    os: "Ubuntu 22.04",
    ports: [22, 80, 443, 3306],
    vulnerabilities: ["CVE-2023-0386", "CVE-2022-47966"],
    riskLevel: "critical",
    lastSeen: "2m ago",
  },
  {
    id: "t2",
    ip: "192.168.1.112",
    hostname: "win-workstation",
    os: "Windows 11",
    ports: [135, 139, 445],
    vulnerabilities: ["MS17-010"],
    riskLevel: "high",
    lastSeen: "5m ago",
  },
  {
    id: "t3",
    ip: "192.168.1.120",
    hostname: "nas-storage",
    os: "FreeNAS 12.0",
    ports: [80, 443, 9000],
    vulnerabilities: [],
    riskLevel: "low",
    lastSeen: "12m ago",
  },
];

const MOCK_EXPLOITS: Exploit[] = [
  {
    id: "e1",
    name: "EternalBlue",
    cve: "MS17-010",
    description: "SMB remote code execution exploit affecting Windows systems.",
    rank: "excellent",
    platform: "Windows",
    lastUsed: "1h ago",
  },
  {
    id: "e2",
    name: "Log4Shell",
    cve: "CVE-2021-44228",
    description: "Remote code execution via JNDI injection in Log4j.",
    rank: "excellent",
    platform: "Linux/Windows",
    lastUsed: "3h ago",
  },
  {
    id: "e3",
    name: "Dirty Pipe",
    cve: "CVE-2022-0847",
    description: "Linux kernel privilege escalation via pipe buffer overwrite.",
    rank: "great",
    platform: "Linux",
  },
  {
    id: "e4",
    name: "PrintNightmare",
    cve: "CVE-2021-34527",
    description: "Windows Print Spooler remote code execution.",
    rank: "great",
    platform: "Windows",
  },
];

const MOCK_SESSIONS: Session[] = [
  {
    id: "s1",
    targetIp: "192.168.1.105",
    type: "meterpreter",
    status: "meterpreter",
    openedAt: "14:32",
    user: "root",
  },
];

let logCounter = 10;
const makeLog = (level: LogEntry["level"], message: string): LogEntry => ({
  id: String(logCounter++),
  timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
  level,
  message,
});

export const useClawStore = create<ClawStore>((set, get) => ({
  workspaceName: "CloseClaw-Dev",
  setWorkspaceName: (name) => set({ workspaceName: name }),

  scanStatus: "idle",
  scanTarget: "192.168.1.0/24",
  setScanTarget: (t) => set({ scanTarget: t }),

  startScan: () => {
    set({
      scanStatus: "scanning",
      logs: [
        makeLog("info", `Starting Nmap scan on ${get().scanTarget}`),
        makeLog("info", "Host discovery phase..."),
        ...get().logs,
      ],
    });
    setTimeout(() => {
      set({
        scanStatus: "complete",
        targets: MOCK_TARGETS,
        logs: [
          makeLog("success", `Scan complete — ${MOCK_TARGETS.length} hosts found`),
          ...get().logs,
        ],
      });
    }, 3000);
  },

  stopScan: () => {
    set({
      scanStatus: "idle",
      logs: [makeLog("warn", "Scan aborted by user"), ...get().logs],
    });
  },

  targets: MOCK_TARGETS,
  selectedTarget: null,
  setSelectedTarget: (t) => set({ selectedTarget: t }),

  sessions: MOCK_SESSIONS,
  addSession: (s) =>
    set((state) => ({
      sessions: [s, ...state.sessions],
      logs: [makeLog("success", `Session ${s.id} opened on ${s.targetIp}`), ...state.logs],
    })),
  closeSession: (id) =>
    set((state) => ({
      sessions: state.sessions.map((s) =>
        s.id === id ? { ...s, status: "closed" as SessionStatus } : s
      ),
      logs: [makeLog("warn", `Session ${id} closed`), ...state.logs],
    })),

  exploits: MOCK_EXPLOITS,
  selectedExploit: null,
  setSelectedExploit: (e) => set({ selectedExploit: e }),

  runExploit: (exploitId, targetId) => {
    const exploit = get().exploits.find((e) => e.id === exploitId);
    const target = get().targets.find((t) => t.id === targetId);
    if (!exploit || !target) return;

    set((state) => ({
      logs: [
        makeLog("info", `Running ${exploit.name} against ${target.ip}...`),
        makeLog("info", `Payload: generic/shell_reverse_tcp`),
        ...state.logs,
      ],
    }));

    setTimeout(() => {
      const newSession: Session = {
        id: `s${Date.now()}`,
        targetIp: target.ip,
        type: "meterpreter",
        status: "meterpreter",
        openedAt: new Date().toLocaleTimeString("en-US", { hour12: false }),
        user: "root",
      };
      get().addSession(newSession);
    }, 2500);
  },

  logs: [
    makeLog("success", "CloseClaw framework initialized"),
    makeLog("info", "Workspace: CloseClaw-Dev"),
    makeLog("info", "Connected to local MSF RPC — mock mode"),
  ],
  clearLogs: () => set({ logs: [] }),
}));
