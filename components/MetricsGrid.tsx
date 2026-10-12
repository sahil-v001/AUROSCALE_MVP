'use client';

import React from 'react';
import { OverlapMetrics, Currency } from '@/lib/types';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import { AlertTriangle, TrendingDown, Zap, Users } from 'lucide-react';

interface MetricsGridProps {
  metrics: OverlapMetrics;
  currency: Currency;
}

export default function MetricsGrid({ metrics, currency }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-[#121215] border border-red-500/30 rounded-2xl p-5 relative overflow-hidden group hover:border-red-500/60 transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-semibold uppercase text-red-400 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span>Monthly Wasted Spend</span>
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-950/60 text-red-300 border border-red-800/40">
            Leakage
          </span>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
          {formatCurrency(metrics.monthlyWastedSpend, currency)}
        </div>
        <p className="text-xs text-[#A1A1AA] mt-2 font-sans">
          Est. <span className="text-red-400 font-semibold">{formatCurrency(metrics.annualizedWastedSpend, currency)}/yr</span> lost to duplicate bids across Meta & Google.
        </p>
      </div>

      <div className="bg-[#121215] border border-amber-500/30 rounded-2xl p-5 relative overflow-hidden group hover:border-amber-500/60 transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-semibold uppercase text-amber-400 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Audience Overlap</span>
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950/60 text-amber-300 border border-amber-800/40">
            High Risk
          </span>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
          {metrics.overlapPercent}%
        </div>
        <p className="text-xs text-[#A1A1AA] mt-2 font-sans">
          <span className="text-amber-400 font-semibold">{formatNumber(metrics.overlapProfiles)} buyers</span> targeted on both platforms simultaneously.
        </p>
      </div>

      <div className="bg-[#121215] border border-purple-500/30 rounded-2xl p-5 relative overflow-hidden group hover:border-purple-500/60 transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-semibold uppercase text-purple-400 flex items-center gap-1.5">
            <TrendingDown className="w-3.5 h-3.5 text-purple-400" />
            <span>CAC Inflation</span>
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950/60 text-purple-300 border border-purple-800/40">
            Penalty
          </span>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
          +{metrics.cacInflationPercent}%
        </div>
        <p className="text-xs text-[#A1A1AA] mt-2 font-sans">
          Your customer acquisition cost is elevated due to self-competing auctions.
        </p>
      </div>

      <div className="bg-[#121215] border border-emerald-500/30 rounded-2xl p-5 relative overflow-hidden group hover:border-emerald-500/60 transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-semibold uppercase text-emerald-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>ROAS Recovery Lift</span>
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
            Upside
          </span>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 tracking-tight">
          +{metrics.projectedRoasLift}x
        </div>
        <p className="text-xs text-[#A1A1AA] mt-2 font-sans">
          Reallocating wasted budget into new channels unlocks immediate return.
        </p>
      </div>
    </div>
  );
}
