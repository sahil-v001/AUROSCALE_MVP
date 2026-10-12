export type Channel = 'meta' | 'google' | 'linkedin' | 'youtube';

export type Industry = 'd2c' | 'saas' | 'agency' | 'smb';

export type Currency = 'INR' | 'USD';

export interface AuditRequest {
  url: string;
  brandName?: string;
  monthlySpend: number;
  currency: Currency;
  channels: Channel[];
  industry: Industry;
}

export interface ChannelOverlapStat {
  channelA: string;
  channelB: string;
  overlapPercent: number;
  duplicateProfiles: number;
  estimatedWastedSpend: number;
}

export interface OverlapMetrics {
  totalReach: number;
  metaReach: number;
  googleReach: number;
  overlapProfiles: number;
  overlapPercent: number;
  monthlyWastedSpend: number;
  annualizedWastedSpend: number;
  cacInflationPercent: number;
  projectedRoasLift: number;
  preventedDuplicateBids: number;
}

export interface CreativeCard {
  id: string;
  platform: 'meta' | 'linkedin' | 'google';
  format: string;
  hook: string;
  primaryText: string;
  headline: string;
  visualPrompt: string;
  callToAction: string;
  viralityScore: number;
  predictedRoas: number;
  angle: string;
}

export interface AgentLogStep {
  agentName: string;
  agentNumber: string;
  status: 'pending' | 'running' | 'completed';
  message: string;
  detail: string;
  durationMs: number;
}

export interface AuditResult {
  brandName: string;
  url: string;
  metaTitle?: string;
  metaDescription?: string;
  currency: Currency;
  monthlySpend: number;
  industry: Industry;
  healthScore: number;
  overlap: OverlapMetrics;
  creatives: CreativeCard[];
  recommendations: string[];
  generatedAt: string;
}
