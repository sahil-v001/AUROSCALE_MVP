'use client';

import React from 'react';
import { OverlapMetrics, Currency } from '@/lib/types';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import { ShieldAlert, CheckCircle } from 'lucide-react';

interface OverlapVisualizerProps {
  metrics: OverlapMetrics;
  currency: Currency;
  brandName: string;
}

export default function OverlapVisualizer({ metrics, currency, brandName }: OverlapVisualizerProps) {
  return (
    <div className="w-full bg-[#121215] border border-[#27272A] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#27272A]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
              Agent 03 :: Audience Intelligence Teardown
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-mono">
              Live Simulation
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
            Cross-Channel Audience Overlap & Self-Cannibalization
          </h3>
          <p className="text-xs text-[#A1A1AA] mt-0.5">
            Visualizing the duplicate cohort targeted across Meta Ads and Google Ads simultaneously.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto bg-[#18181B] border border-[#27272A] px-3 py-1.5 rounded-xl text-xs font-mono">
          <span className="text-[#A1A1AA]">Waste Ratio:</span>
          <span className="text-red-400 font-bold">{metrics.overlapPercent}% Duplicate</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-4">
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-[#09090B]/60 border border-[#27272A] rounded-2xl relative min-h-[280px]">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-48 h-48 bg-purple-600/15 rounded-full blur-3xl"></div>
          </div>

          <div className="relative w-full max-w-md h-56 flex items-center justify-center">
            <div className="absolute left-4 sm:left-12 w-44 h-44 sm:w-52 sm:h-52 rounded-full border-2 border-blue-500/60 bg-blue-500/10 backdrop-blur-xs flex flex-col items-start justify-center pl-4 sm:pl-6 text-left transition-transform hover:scale-105 duration-300">
              <span className="text-[11px] font-mono font-bold text-blue-400 uppercase tracking-wide">
                Meta Ads
              </span>
              <span className="text-lg sm:text-xl font-bold font-mono text-white">
                {formatNumber(metrics.metaReach)}
              </span>
              <span className="text-[10px] text-[#A1A1AA]">Target Reach</span>
            </div>

            <div className="absolute right-4 sm:right-12 w-44 h-44 sm:w-52 sm:h-52 rounded-full border-2 border-emerald-500/60 bg-emerald-500/10 backdrop-blur-xs flex flex-col items-end justify-center pr-4 sm:pr-6 text-right transition-transform hover:scale-105 duration-300">
              <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wide">
                Google Ads
              </span>
              <span className="text-lg sm:text-xl font-bold font-mono text-white">
                {formatNumber(metrics.googleReach)}
              </span>
              <span className="text-[10px] text-[#A1A1AA]">Demand Gen & Search</span>
            </div>

            <div className="absolute z-10 w-24 h-24 rounded-full border border-red-500/70 bg-red-500/20 backdrop-blur-sm flex flex-col items-center justify-center text-center p-2 animate-pulse-subtle shadow-lg shadow-red-500/20">
              <span className="text-[9px] font-mono font-bold text-red-300 uppercase tracking-tighter">
                Overlap
              </span>
              <span className="text-xs sm:text-sm font-extrabold font-mono text-white">
                {formatNumber(metrics.overlapProfiles)}
              </span>
              <span className="text-[8px] text-red-200">Duplicate</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-4 text-[11px] font-mono text-[#A1A1AA]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span>Meta Unique Cohort</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span>Duplicate Auction Bids</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>Google Unique Cohort</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4 text-left">
          <div className="p-4 rounded-xl bg-[#18181B] border border-red-500/20 space-y-2">
            <div className="flex items-center gap-2 text-red-400 text-xs font-mono font-semibold">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>Auction Cannibalization Impact</span>
            </div>
            <p className="text-xs text-[#D4D4D8] leading-relaxed">
              Without cross-platform identity resolution, your ads bid against themselves for{' '}
              <strong className="text-white font-mono">{formatNumber(metrics.overlapProfiles)}</strong> high-intent buyers,
              burning <strong className="text-red-400 font-mono">{formatCurrency(metrics.monthlyWastedSpend, currency)}</strong> every month.
            </p>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between items-center py-2 border-b border-[#27272A]">
              <span className="text-[#A1A1AA]">Total Combined Net Reach</span>
              <span className="font-bold text-white">{formatNumber(metrics.totalReach)} users</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-[#27272A]">
              <span className="text-[#A1A1AA]">Prevented Duplicate Bids / Mo</span>
              <span className="font-bold text-emerald-400">+{formatNumber(metrics.preventedDuplicateBids)} bids</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-[#27272A]">
              <span className="text-[#A1A1AA]">Auroscale Exclusion Resolution</span>
              <span className="font-bold text-purple-400">Automated 48-hr Sync</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/30 text-[11px] text-purple-300 flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <span>
              <strong>Auroscale Advantage:</strong> Syncing dynamic negative audience lists cuts duplicate bids before money is spent.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
