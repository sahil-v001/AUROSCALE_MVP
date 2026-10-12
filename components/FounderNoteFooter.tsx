'use client';

import React from 'react';
import { Cpu, Github, ArrowUpRight } from 'lucide-react';

export default function FounderNoteFooter() {
  return (
    <footer className="w-full border-t border-[#27272A] bg-[#09090B] py-12 mt-20 text-xs text-[#71717A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-7 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Cpu className="w-4 h-4 text-purple-400" />
              <span>Auroscale Pulse — Prototype Teardown Engine</span>
            </div>
            <p className="text-[#A1A1AA] leading-relaxed max-w-xl">
              Engineered as a proof-of-work project for <strong className="text-white">Kartikeya Neel Bakshi</strong> and the <strong className="text-white">Auroscale</strong> team.
              Built around Kartikeya’s core philosophy: <em>"Most business work that runs on people repeating steps can run on systems instead."</em>
            </p>
            <p className="text-[11px] text-[#71717A]">
              Designed to solve top-of-funnel conversion by giving brands an instant 15-second self-serve teardown before booking an audit.
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col sm:items-end space-y-3">
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/sahil-v001/AUROSCALE_MVP"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18181B] border border-[#27272A] hover:border-purple-500/50 text-white font-medium transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
                <ArrowUpRight className="w-3 h-3 text-[#71717A]" />
              </a>

              <a
                href="https://auroscale.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18181B] border border-[#27272A] hover:border-blue-500/50 text-white font-medium transition-all"
              >
                <span>Auroscale.com</span>
                <ArrowUpRight className="w-3 h-3 text-[#71717A]" />
              </a>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-[#71717A]">
              <span>Built with Next.js 14, TypeScript & Tailwind CSS</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#18181B] flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px]">
          <span>© 2026 Auroscale Pulse · Independent Candidate Project by Sahil</span>
          <span className="font-mono text-purple-400">Target Role: Full Stack Engineer Intern</span>
        </div>
      </div>
    </footer>
  );
}
