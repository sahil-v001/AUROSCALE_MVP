'use client';

import React from 'react';
import { Cpu, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#09090B]/85 backdrop-blur-md border-b border-[#27272A] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white font-brand">
                Auroscale
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Pulse
              </span>
            </div>
            <span className="text-[11px] text-[#A1A1AA] hidden sm:inline-block">
              Self-Serve Growth & Overlap Engine
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-[#27272A] text-xs text-[#A1A1AA]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-mono text-[11px] text-[#E4E4E7]">5 AI Agents Online</span>
          </div>

          <a
            href="https://auroscale.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-xs font-medium text-white transition-all duration-200"
          >
            <span>Auroscale.com</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#A1A1AA]" />
          </a>
        </div>
      </div>
    </header>
  );
}
