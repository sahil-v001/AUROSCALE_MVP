import { AuditRequest, OverlapMetrics, Industry } from './types';

export function calculateOverlapMetrics(request: AuditRequest): OverlapMetrics {
  const { monthlySpend, industry, channels } = request;

  const isINR = request.currency === 'INR';
  const cpmMultiplier = isINR ? 1 : 83;

  const cpmMeta = (industry === 'saas' ? 320 : industry === 'd2c' ? 180 : 240) / (isINR ? 1 : cpmMultiplier);
  const cpmGoogle = (industry === 'saas' ? 450 : industry === 'd2c' ? 260 : 350) / (isINR ? 1 : cpmMultiplier);

  const metaShare = channels.includes('meta') ? 0.55 : 0;
  const googleShare = channels.includes('google') ? (channels.includes('meta') ? 0.35 : 0.7) : 0;

  const metaSpend = monthlySpend * (metaShare > 0 ? metaShare : 0.5);
  const googleSpend = monthlySpend * (googleShare > 0 ? googleShare : 0.5);

  const metaReach = Math.round((metaSpend / cpmMeta) * 1000 * 0.65);
  const googleReach = Math.round((googleSpend / cpmGoogle) * 1000 * 0.55);

  let baseOverlapPercent = 24.5;
  if (industry === 'd2c') baseOverlapPercent = 27.8;
  if (industry === 'saas') baseOverlapPercent = 23.2;
  if (industry === 'agency') baseOverlapPercent = 26.0;

  const hasBothMajor = channels.includes('meta') && channels.includes('google');
  const overlapPercent = hasBothMajor ? baseOverlapPercent : baseOverlapPercent * 0.75;

  const smallerAudience = Math.min(metaReach, googleReach);
  const overlapProfiles = Math.round(smallerAudience * (overlapPercent / 100));
  const totalReach = metaReach + googleReach - overlapProfiles;

  const cannibalizationRate = (overlapPercent / 100) * 0.88;
  const monthlyWastedSpend = Math.round(monthlySpend * cannibalizationRate);
  const annualizedWastedSpend = monthlyWastedSpend * 12;

  const cacInflationPercent = Math.min(41, Math.round(overlapPercent * 1.35));
  const projectedRoasLift = Number(((monthlyWastedSpend / monthlySpend) * 3.8 + 0.4).toFixed(1));
  const preventedDuplicateBids = Math.round(overlapProfiles * 2.3);

  return {
    totalReach,
    metaReach,
    googleReach,
    overlapProfiles,
    overlapPercent: Number(overlapPercent.toFixed(1)),
    monthlyWastedSpend,
    annualizedWastedSpend,
    cacInflationPercent,
    projectedRoasLift,
    preventedDuplicateBids,
  };
}

export function generateHealthScore(overlapPercent: number, channelsCount: number): number {
  let score = 100 - (overlapPercent * 1.8);
  if (channelsCount >= 3) score -= 5;
  return Math.max(48, Math.min(94, Math.round(score)));
}

export function generateRecommendations(industry: Industry, overlap: OverlapMetrics): string[] {
  return [
    `Set real-time cross-channel negative audience exclusion between Meta Custom Audiences and Google Customer Match to save ${overlap.overlapPercent}% duplicate spend.`,
    `Deploy Auroscale Campaign Optimization Agent to reallocate marginal ad spend away from saturated Meta retargeting into Google Demand Gen.`,
    `Implement 48-hour creative fatigue refresh: your current ads show high frequency burnout on the ${overlap.overlapProfiles.toLocaleString()} shared buyer segment.`,
    `Enable automated WhatsApp Nurture trigger on high-intent click drop-offs to capture direct DMs before retargeting bids are triggered.`,
  ];
}
