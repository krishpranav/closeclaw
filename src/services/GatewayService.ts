import { useGatewayStore } from '../store/useGatewayStore';
import { LogEntry } from '../types';

class GatewayService {
  private static instance: GatewayService;
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private isMockMode = true; // Use mock data for Phase 1

  private constructor() {}

  public static getInstance(): GatewayService {
    if (!GatewayService.instance) {
      GatewayService.instance = new GatewayService();
    }
    return GatewayService.instance;
  }

  public connect() {
    if (this.isMockMode) {
      this.log('GatewayService simulating connection (Mock Mode)');
      return;
    }

    const { host, token } = useGatewayStore.getState();
    const wsUrl = `ws://${host}:18789`;

    this.log(`Connecting to Gateway at ${wsUrl}...`);
    useGatewayStore.getState().setStatus('connecting');

    try {
      this.ws = new WebSocket(wsUrl, undefined);
      
      // In a real implementation, we would pass the auth token either via
      // query parameter or, if supported, protocol headers. 
      // For OpenClaw, assume query auth for browsers/RN: ws://host:18789?token=xyz

      this.ws.onopen = this.handleOpen.bind(this);
      this.ws.onmessage = this.handleMessage.bind(this);
      this.ws.onclose = this.handleClose.bind(this);
      this.ws.onerror = this.handleError.bind(this);
    } catch (e) {
      this.log(`Connection initialization failed: ${e}`, 'error');
      useGatewayStore.getState().setStatus('error');
    }
  }

  public disconnect() {
    this.log('Disconnecting from Gateway...');
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    useGatewayStore.getState().setStatus('offline');
  }

  public sendMessage(sessionId: string, text: string) {
    this.log(`Sending message to session ${sessionId}: ${text}`);
    // this.send({ type: 'message.send', payload: { sessionId, text } });
  }

  public runTool(toolName: string, args: Record<string, any>) {
    this.log(`Running tool ${toolName} with args: ${JSON.stringify(args)}`);
    // this.send({ type: 'tool.run', payload: { toolName, args } });
  }

  public installSkill(skillName: string) {
    this.log(`Requesting installation of skill: ${skillName}`);
    // this.send({ type: 'skill.install', payload: { name: skillName } });
  }

  public toggleJob(jobId: string, active: boolean) {
    this.log(`${active ? 'Resuming' : 'Pausing'} cron job ${jobId}`);
    // this.send({ type: 'cron.toggle', payload: { jobId, active } });
  }

  private send(payload: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(payload));
    } else {
      this.log('Cannot send message: WebSocket is not open', 'error');
    }
  }

  private handleOpen() {
    this.log('Gateway connection established', 'success');
    useGatewayStore.getState().setStatus('live');
    this.reconnectAttempts = 0;
  }

  private handleMessage(event: WebSocketMessageEvent) {
    try {
      const data = JSON.parse(event.data);
      // Dispatch events to Zustand store here
      this.log(`Received event: ${data.type}`);
    } catch (e) {
      this.log('Failed to parse incoming WS message', 'error');
    }
  }

  private handleClose() {
    this.log('Gateway connection closed', 'warn');
    useGatewayStore.getState().setStatus('offline');
    this.attemptReconnect();
  }

  private handleError(e: Event) {
    this.log(`WebSocket error occurred`, 'error');
    useGatewayStore.getState().setStatus('error');
  }

  private attemptReconnect() {
    if (this.isMockMode) return;
    
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
      this.log(`Reconnecting in ${delay}ms (Attempt ${this.reconnectAttempts})...`, 'warn');
      setTimeout(() => this.connect(), delay);
    } else {
      this.log('Max reconnection attempts reached. Staying offline.', 'error');
    }
  }

  private log(message: string, level: LogEntry['level'] = 'info') {
    useGatewayStore.getState().addLog({
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
      level,
      message,
      source: 'app',
    });
  }
}

export const gatewayService = GatewayService.getInstance();
