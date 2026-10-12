'use client';

import React from 'react';
import { Sparkles, Bot, Zap, Clock } from 'lucide-react';

export default function HeroBanner() {
  return (
    <section className="relative pt-12 pb-8 overflow-hidden text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-[#27272A] text-xs font-mono text-purple-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PRODUCT-LED DIAGNOSTIC FOR AUROSCALE</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
          Your AI Marketing Audit. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400">
            Instant & Self-Serve in 15 Seconds.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
          Skip the 30-minute discovery call. Diagnose your hidden cross-channel audience overlap,
          calculate cannibalized ad budget between Meta & Google, and generate high-converting counter-creatives on autopilot.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-medium text-[#71717A]">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-400" />
            <span>15-Second Teardown</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Zero Setup / No Login Required</span>
          </div>
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-blue-400" />
            <span>Powered by Auroscale 5-Agent Architecture</span>
          </div>
        </div>
      </div>
    </section>
  );
}
