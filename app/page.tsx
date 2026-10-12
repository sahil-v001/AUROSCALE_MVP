'use client';

import React, { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import AuditInputCard from '@/components/AuditInputCard';
import ScanningTerminal from '@/components/ScanningTerminal';
import MetricsGrid from '@/components/MetricsGrid';
import OverlapVisualizer from '@/components/OverlapVisualizer';
import CreativeStudioPreview from '@/components/CreativeStudioPreview';
import WhatsAppNurtureModal from '@/components/WhatsAppNurtureModal';
import FounderNoteFooter from '@/components/FounderNoteFooter';
import { AuditRequest, AuditResult } from '@/lib/types';
import { formatCurrency } from '@/lib/formatters';
import { MessageSquare, ArrowRight, RefreshCw, CheckCircle2, Sparkles } from 'lucide-react';

export default function Home() {
  const [stage, setStage] = useState<'idle' | 'scanning' | 'results'>('idle');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentRequest, setCurrentRequest] = useState<AuditRequest | null>(null);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleRunAudit = async (request: AuditRequest) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || 'Failed to verify website domain.');
        setIsLoading(false);
        return;
      }

      setAuditResult(data);
      setCurrentRequest(request);
      setIsLoading(false);
      setStage('scanning');
    } catch {
      setErrorMessage('Network timeout while reaching target domain. Please try again.');
      setIsLoading(false);
    }
  };

  const handleScanComplete = () => {
    setStage('results');
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleReset = () => {
    setStage('idle');
    setErrorMessage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] flex flex-col font-sans auro-grid-bg">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-10 py-6">
        <HeroBanner />

        {stage === 'idle' && (
          <AuditInputCard
            onRunAudit={handleRunAudit}
            isLoading={isLoading}
            errorMessage={errorMessage}
            onClearError={() => setErrorMessage(null)}
          />
        )}

        {stage === 'scanning' && currentRequest && (
          <div className="py-6">
            <ScanningTerminal
              onScanComplete={handleScanComplete}
              brandName={auditResult?.brandName || 'Your Brand'}
            />
          </div>
        )}

        {stage === 'results' && auditResult && (
          <div ref={resultsRef} className="space-y-10 pt-4 animate-fade-in">
            <div className="bg-[#121215] border border-[#27272A] rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                    Audit Complete · {auditResult.url}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950/40 text-purple-300 border border-purple-800/40">
                    Industry: {auditResult.industry.toUpperCase()}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {auditResult.brandName} Growth & Overlap Teardown
                </h2>
                {auditResult.metaTitle && (
                  <div className="flex items-center gap-1.5 text-xs text-purple-300 font-mono pt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate max-w-xl">Live Title Verified: &ldquo;{auditResult.metaTitle}&rdquo;</span>
                  </div>
                )}
                <p className="text-xs text-[#A1A1AA]">
                  Generated across Google, Meta, and LinkedIn targeting graphs · Analyzed with 5 Auroscale agents
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-3.5 py-2 rounded-xl bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-xs font-mono text-[#D4D4D8] transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>New Teardown</span>
                </button>

                <button
                  onClick={() => setIsWhatsAppOpen(true)}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-teal-600/20"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Send PDF to WhatsApp</span>
                </button>
              </div>
            </div>

            <MetricsGrid metrics={auditResult.overlap} currency={auditResult.currency} />

            <OverlapVisualizer
              metrics={auditResult.overlap}
              currency={auditResult.currency}
              brandName={auditResult.brandName}
            />

            <CreativeStudioPreview
              creatives={auditResult.creatives}
              brandName={auditResult.brandName}
            />

            <div className="bg-gradient-to-r from-purple-950/40 via-[#18181B] to-blue-950/40 border border-purple-500/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-2 text-left">
                <span className="text-[11px] font-mono uppercase text-purple-400 font-bold tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The Auroscale Resolution</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Stop burning {formatCurrency(auditResult.overlap.monthlyWastedSpend, auditResult.currency)} every month on duplicate bidding.
                </h3>
                <p className="text-xs text-[#A1A1AA] max-w-2xl leading-relaxed">
                  Auroscale replaces fragmented point-tools with 5 collaborative AI agents that share one intelligence layer.
                  Deploy cross-channel identity resolution, predictive creative scoring, and WhatsApp lead nurture in 48 hours.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <button
                  onClick={() => setIsWhatsAppOpen(true)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-600/20"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Get WhatsApp Report</span>
                </button>

                <a
                  href="https://auroscale.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white hover:bg-gray-100 text-[#09090B] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <span>Book Free Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {auditResult && (
        <WhatsAppNurtureModal
          isOpen={isWhatsAppOpen}
          onClose={() => setIsWhatsAppOpen(false)}
          brandName={auditResult.brandName}
          wastedSpendFormatted={formatCurrency(auditResult.overlap.monthlyWastedSpend, auditResult.currency)}
        />
      )}

      <FounderNoteFooter />
    </div>
  );
}
