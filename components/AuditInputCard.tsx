'use client';

import React, { useState } from 'react';
import { AuditRequest, Channel, Currency, Industry } from '@/lib/types';
import { Globe, DollarSign, Layers, Compass, ArrowRight, Play, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';

interface AuditInputCardProps {
  onRunAudit: (request: AuditRequest) => void;
  isLoading: boolean;
  errorMessage?: string | null;
  onClearError?: () => void;
}

export default function AuditInputCard({
  onRunAudit,
  isLoading,
  errorMessage,
  onClearError,
}: AuditInputCardProps) {
  const [url, setUrl] = useState('cultsport.com');
  const [currency, setCurrency] = useState<Currency>('INR');
  const [monthlySpend, setMonthlySpend] = useState(500000);
  const [channels, setChannels] = useState<Channel[]>(['meta', 'google']);
  const [industry, setIndustry] = useState<Industry>('d2c');

  const toggleChannel = (channel: Channel) => {
    if (channels.includes(channel)) {
      if (channels.length > 1) {
        setChannels(channels.filter((c) => c !== channel));
      }
    } else {
      setChannels([...channels, channel]);
    }
  };

  const handleCurrencyChange = (curr: Currency) => {
    setCurrency(curr);
    if (curr === 'USD') {
      setMonthlySpend(10000);
    } else {
      setMonthlySpend(500000);
    }
  };

  const minSpend = currency === 'INR' ? 50000 : 1000;
  const maxSpend = currency === 'INR' ? 5000000 : 100000;
  const spendStep = currency === 'INR' ? 25000 : 1000;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    onRunAudit({
      url,
      monthlySpend,
      currency,
      channels,
      industry,
    });
  };

  const quickSamples = ['cultsport.com', 'superhuman.com', 'headout.com'];

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#121215] border border-[#27272A] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-purple-600/10 via-blue-600/5 to-transparent rounded-full blur-2xl pointer-events-none" />

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#27272A]">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Configure Your Teardown Parameters
            </h2>
            <p className="text-xs text-[#A1A1AA]">
              Set your target brand URL and ad spend to calibrate the overlap calculations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#71717A]">Quick pick:</span>
            {quickSamples.map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => {
                  setUrl(sample);
                  onClearError?.();
                }}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#18181B] hover:bg-[#27272A] text-[#D4D4D8] border border-[#27272A] transition-colors"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/50 text-red-200 text-xs flex items-start gap-3 animate-fade-in shadow-lg shadow-red-950/30">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-red-300 block">Verification Notice</span>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              <span>Target Website or Brand URL</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  onClearError?.();
                }}
                placeholder="e.g. yourbrand.com"
                required
                className={`w-full px-4 py-3 bg-[#18181B] border rounded-xl text-sm text-white placeholder-[#71717A] focus:outline-none transition-all font-mono ${
                  errorMessage
                    ? 'border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                    : 'border-[#27272A] focus:border-purple-500 focus:ring-1 focus:ring-purple-500'
                }`}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-400" />
              <span>Industry Profile</span>
            </label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value as Industry)}
              className="w-full px-4 py-3 bg-[#18181B] border border-[#27272A] rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-sans cursor-pointer"
            >
              <option value="d2c">D2C & E-Commerce (High Transaction Volume)</option>
              <option value="saas">B2B SaaS (High LTV / Complex Funnel)</option>
              <option value="agency">Marketing Agency (Multi-Account Scaling)</option>
              <option value="smb">Indian SMB & Local Service (WhatsApp First)</option>
            </select>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>Monthly Paid Ad Budget</span>
            </label>

            <div className="flex items-center bg-[#18181B] border border-[#27272A] rounded-lg p-0.5">
              <button
                type="button"
                onClick={() => handleCurrencyChange('INR')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  currency === 'INR'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                ₹ INR
              </button>
              <button
                type="button"
                onClick={() => handleCurrencyChange('USD')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  currency === 'USD'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                $ USD
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between bg-[#18181B] border border-[#27272A] rounded-xl p-4">
            <span className="text-xs text-[#71717A] font-mono">
              {formatCurrency(minSpend, currency)}
            </span>
            <span className="text-2xl font-bold font-mono text-emerald-400">
              {formatCurrency(monthlySpend, currency)}
              <span className="text-xs font-normal text-[#A1A1AA]"> / month</span>
            </span>
            <span className="text-xs text-[#71717A] font-mono">
              {formatCurrency(maxSpend, currency)}
            </span>
          </div>

          <input
            type="range"
            min={minSpend}
            max={maxSpend}
            step={spendStep}
            value={monthlySpend}
            onChange={(e) => setMonthlySpend(Number(e.target.value))}
            className="w-full h-2 bg-[#27272A] rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>

        <div className="space-y-2 pt-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Active Paid Ad Channels (Where You Currently Spend)</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'meta', name: 'Meta Ads', sub: 'Instagram & Facebook' },
              { id: 'google', name: 'Google Ads', sub: 'Search & Demand Gen' },
              { id: 'linkedin', name: 'LinkedIn Ads', sub: 'B2B Targeted Feed' },
              { id: 'youtube', name: 'YouTube Video', sub: 'TrueView In-Stream' },
            ].map((ch) => {
              const active = channels.includes(ch.id as Channel);
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => toggleChannel(ch.id as Channel)}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                    active
                      ? 'bg-purple-950/20 border-purple-500/50 text-white shadow-sm'
                      : 'bg-[#18181B] border-[#27272A] text-[#71717A] hover:border-[#3F3F46]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-brand">{ch.name}</span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        active ? 'bg-purple-400' : 'bg-[#3F3F46]'
                      }`}
                    />
                  </div>
                  <span className="text-[10px] text-[#A1A1AA] block mt-0.5">{ch.sub}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-sm tracking-wide uppercase transition-all duration-300 shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Initializing Auroscale Agents...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                <span>Run Instant 15-Second AI Teardown</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
