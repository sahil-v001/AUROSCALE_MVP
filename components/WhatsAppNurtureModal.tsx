'use client';

import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle2, X, Download, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WhatsAppNurtureModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandName: string;
  wastedSpendFormatted: string;
}

export default function WhatsAppNurtureModal({
  isOpen,
  onClose,
  brandName,
  wastedSpendFormatted,
}: WhatsAppNurtureModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [stage, setStage] = useState<'form' | 'chat'>('form');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setStage('chat');
    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-[#121215] border border-[#27272A] rounded-2xl p-6 shadow-2xl relative overflow-hidden space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#71717A] hover:text-white hover:bg-[#18181B] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {stage === 'form' ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-teal-400 font-bold block">
                  Agent 05 :: WhatsApp Nurture
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Get Full Teardown PDF on WhatsApp
                </h3>
              </div>
            </div>

            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              We generated the complete 12-page breakdown for <strong className="text-white">{brandName}</strong>,
              including negative audience exclusion IDs to stop <strong className="text-red-400">{wastedSpendFormatted}</strong> in monthly duplicate bidding.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5 pt-2">
              <div className="space-y-1.5 text-left">
                <label className="text-[11px] font-semibold text-[#A1A1AA]">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sahil"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 bg-[#18181B] border border-[#27272A] rounded-xl text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-[11px] font-semibold text-[#A1A1AA]">WhatsApp Phone Number</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-[#27272A] bg-[#18181B] text-xs font-mono text-[#A1A1AA]">
                    +91
                  </span>
                  <input
                    type="tel"
                    placeholder="98765 43210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-[#18181B] border border-[#27272A] rounded-r-xl text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-teal-500 font-mono"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-600/20 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Audit PDF to My WhatsApp</span>
                </button>
              </div>
            </form>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#71717A]">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Zero spam guarantee · Verified WhatsApp Business API</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#27272A] pb-3">
              <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-xs font-bold text-white">
                A
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Auroscale AI Nurture Agent</h4>
                <span className="text-[10px] text-teal-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block"></span>
                  Verified Business · Online
                </span>
              </div>
            </div>

            <div className="space-y-3 font-sans text-xs bg-[#09090B] p-4 rounded-xl border border-[#27272A]">
              <div className="bg-[#18181B] p-3 rounded-xl rounded-tl-none border border-[#27272A] text-[#E4E4E7] space-y-1">
                <p>
                  Hey {name || 'there'}! 👋 Kartikeya’s team from Auroscale here.
                </p>
                <p>
                  We finished generating the full cross-channel audit for <strong>{brandName}</strong>.
                </p>
              </div>

              <div className="bg-[#18181B] p-3 rounded-xl rounded-tl-none border border-teal-500/40 text-[#E4E4E7] space-y-2">
                <div className="flex items-center gap-2 text-teal-400 font-semibold text-[11px]">
                  <Download className="w-4 h-4" />
                  <span>{brandName}-Audit-Report-Auroscale.pdf (2.4 MB)</span>
                </div>
                <p className="text-[11px] text-[#A1A1AA]">
                  Contains full audience overlap analysis, negative audience exclusions, and 3 pre-scored creative briefs.
                </p>
              </div>

              <div className="bg-[#18181B] p-3 rounded-xl rounded-tl-none border border-[#27272A] text-[#E4E4E7]">
                <p>
                  Our agent detected <strong className="text-red-400">{wastedSpendFormatted}</strong>/mo in self-competing bids.
                  Would you like our autonomous Campaign Optimization Agent to deploy this fix for you?
                </p>
              </div>
            </div>

            <div className="p-3 bg-teal-950/20 border border-teal-500/30 rounded-xl text-[11px] text-teal-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Simulated WhatsApp delivery complete!</span>
              </span>
              <button
                onClick={onClose}
                className="px-2.5 py-1 rounded bg-teal-600 hover:bg-teal-500 text-white font-semibold text-[10px]"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
