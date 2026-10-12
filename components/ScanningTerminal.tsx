'use client';

import React, { useEffect, useState } from 'react';
import { Terminal, CheckCircle2, Loader2 } from 'lucide-react';

interface ScanningTerminalProps {
  onScanComplete: () => void;
  brandName: string;
}

interface Step {
  agentNum: string;
  agentName: string;
  text: string;
  detail: string;
  status: 'pending' | 'running' | 'done';
}

export default function ScanningTerminal({ onScanComplete, brandName }: ScanningTerminalProps) {
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const initialSteps: Step[] = [
    {
      agentNum: '01',
      agentName: 'Creative Studio Agent',
      text: `Inspecting ${brandName} public landing pages & hook patterns...`,
      detail: 'Scanning visual angles, CTA friction, and copy fatigue risk.',
      status: 'running',
    },
    {
      agentNum: '02',
      agentName: 'Social & PR Autopilot',
      text: 'Evaluating industry trends & competitor positioning...',
      detail: 'Scraping real-time market sentiment & ad library benchmarks.',
      status: 'pending',
    },
    {
      agentNum: '03',
      agentName: 'Audience Intelligence Agent',
      text: 'Resolving cross-channel identity graph (Meta vs Google)...',
      detail: 'Calculating duplicate audience overlap and auction cannibalization.',
      status: 'pending',
    },
    {
      agentNum: '04',
      agentName: 'Campaign Optimization Agent',
      text: 'Simulating marginal ROAS reallocation curves...',
      detail: 'Identifying negative exclusion opportunities & budget leakage.',
      status: 'pending',
    },
    {
      agentNum: '05',
      agentName: 'WhatsApp Nurture Agent',
      text: 'Preparing conversational qualification & instant PDF trigger...',
      detail: 'Connecting lead capture route for Indian market buyers.',
      status: 'pending',
    },
  ];

  const [steps, setSteps] = useState<Step[]>(initialSteps);

  useEffect(() => {
    const stepDuration = 1000;
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        const nextIndex = prev + 1;
        if (nextIndex >= steps.length) {
          clearInterval(interval);
          setProgress(100);
          setTimeout(() => {
            onScanComplete();
          }, 600);
          return prev;
        }

        setSteps((current) =>
          current.map((s, idx) => {
            if (idx < nextIndex) return { ...s, status: 'done' };
            if (idx === nextIndex) return { ...s, status: 'running' };
            return { ...s, status: 'pending' };
          })
        );
        setProgress(Math.round(((nextIndex) / steps.length) * 100));
        return nextIndex;
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#121215] border border-[#27272A] rounded-2xl overflow-hidden shadow-2xl transition-all">
      <div className="bg-[#18181B] px-5 py-3 border-b border-[#27272A] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <span className="text-xs font-mono text-[#A1A1AA] ml-3 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            <span>auroscale-orchestrator :: live-audit-stream</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-purple-400 font-bold">{progress}%</span>
          <div className="w-24 h-1.5 bg-[#27272A] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="p-6 font-mono text-xs space-y-4">
        {steps.map((step, idx) => {
          const isDone = step.status === 'done';
          const isRunning = step.status === 'running';

          return (
            <div
              key={step.agentNum}
              className={`p-3.5 rounded-xl border transition-all duration-300 ${
                isRunning
                  ? 'bg-purple-950/20 border-purple-500/40 text-white shadow-md'
                  : isDone
                  ? 'bg-[#18181B]/70 border-[#27272A] text-[#D4D4D8]'
                  : 'bg-transparent border-transparent text-[#52525B]'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      isRunning
                        ? 'bg-purple-500 text-white'
                        : isDone
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-[#27272A] text-[#71717A]'
                    }`}
                  >
                    Agent {step.agentNum}
                  </span>

                  <div>
                    <div className="font-semibold flex items-center gap-2">
                      <span className={isRunning ? 'text-purple-300' : isDone ? 'text-white' : 'text-[#71717A]'}>
                        {step.agentName}
                      </span>
                    </div>
                    <p className="mt-1 text-[#A1A1AA] text-[11px] font-sans">{step.text}</p>
                    <p className="text-[10px] text-[#71717A] mt-0.5 font-sans">{step.detail}</p>
                  </div>
                </div>

                <div className="shrink-0 mt-0.5">
                  {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  {isRunning && <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />}
                  {step.status === 'pending' && <span className="w-4 h-4 block" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
