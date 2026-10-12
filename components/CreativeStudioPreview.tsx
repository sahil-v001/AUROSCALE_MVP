'use client';

import React, { useState } from 'react';
import { CreativeCard } from '@/lib/types';
import { Sparkles, Copy, Check, Video, FileText, Search } from 'lucide-react';

interface CreativeStudioPreviewProps {
  creatives: CreativeCard[];
  brandName: string;
}

export default function CreativeStudioPreview({ creatives, brandName }: CreativeStudioPreviewProps) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const current = creatives[activeTab] || creatives[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'meta':
        return <Video className="w-4 h-4 text-blue-400" />;
      case 'linkedin':
        return <FileText className="w-4 h-4 text-purple-400" />;
      case 'google':
        return <Search className="w-4 h-4 text-emerald-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="w-full bg-[#121215] border border-[#27272A] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#27272A]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              Agent 01 :: Creative Studio Teardown
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
              Pre-Scored Concepts
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
            Generated Counter-Creatives with Predicted ROAS
          </h3>
          <p className="text-xs text-[#A1A1AA] mt-0.5">
            Pre-tested copy and visual briefs designed to beat competitor fatigue before spending ad budget.
          </p>
        </div>

        <div className="flex items-center bg-[#18181B] border border-[#27272A] rounded-xl p-1">
          {creatives.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === idx
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-[#A1A1AA] hover:text-white'
              }`}
            >
              {getPlatformIcon(c.platform)}
              <span className="capitalize">{c.platform}</span>
            </button>
          ))}
        </div>
      </div>

      {current && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#18181B] border border-[#27272A] text-purple-300">
                Format: {current.format}
              </span>
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-amber-950/30 border border-amber-500/30 text-amber-300">
                Angle: {current.angle}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272A] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[#71717A] tracking-wider block">
                Primary Hook Headline
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                {current.headline}
              </h4>
              <p className="text-xs text-[#D4D4D8] italic font-sans">{current.hook}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272A] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-[#71717A] tracking-wider">
                  Ad Body Copy
                </span>
                <button
                  onClick={() => handleCopy(current.primaryText, current.id)}
                  className="text-[11px] font-mono flex items-center gap-1 text-[#A1A1AA] hover:text-white transition-colors"
                >
                  {copiedId === current.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy text</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-[#D4D4D8] leading-relaxed font-sans">{current.primaryText}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#09090B] border border-purple-500/20 space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-purple-400 tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Visual Studio AI Generator Prompt</span>
              </span>
              <p className="text-xs text-[#A1A1AA] font-mono leading-relaxed">{current.visualPrompt}</p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#18181B] border border-[#27272A] rounded-2xl p-5 space-y-5">
            <h4 className="text-xs font-mono font-bold uppercase text-[#A1A1AA] tracking-wider">
              Predicted Performance Scoring
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#121215] border border-[#27272A] rounded-xl p-3.5 text-center">
                <span className="text-[10px] font-mono text-[#71717A] uppercase block">
                  Virality & Hook Score
                </span>
                <div className="text-2xl font-black font-mono text-emerald-400 mt-1">
                  {current.viralityScore}/100
                </div>
                <span className="text-[9px] text-[#A1A1AA] mt-0.5 block">Top 8% in Category</span>
              </div>

              <div className="bg-[#121215] border border-[#27272A] rounded-xl p-3.5 text-center">
                <span className="text-[10px] font-mono text-[#71717A] uppercase block">
                  Projected ROAS
                </span>
                <div className="text-2xl font-black font-mono text-purple-400 mt-1">
                  {current.predictedRoas}x
                </div>
                <span className="text-[9px] text-[#A1A1AA] mt-0.5 block">Based on Hook Pacing</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#09090B] border border-[#27272A] space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-[10px] font-bold text-white">
                  {brandName.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{brandName}</div>
                  <div className="text-[9px] text-[#71717A]">Sponsored · Just now</div>
                </div>
              </div>

              <p className="text-[11px] text-[#D4D4D8] line-clamp-2">{current.headline}</p>

              <div className="w-full h-24 rounded-lg bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-[#27272A] flex items-center justify-center text-xs font-mono text-[#71717A]">
                [ 1080x1350 Rendered Creative ]
              </div>

              <div className="flex justify-between items-center pt-1 border-t border-[#27272A]">
                <span className="text-[10px] text-[#71717A] font-mono">auroscale.com</span>
                <span className="px-2.5 py-1 rounded-md bg-white text-[#09090B] text-[10px] font-bold font-sans">
                  {current.callToAction}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
