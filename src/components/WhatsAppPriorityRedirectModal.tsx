import React, { useEffect, useState } from 'react';
import { MessageCircle, Heart, Crown, Sparkles, CheckCircle2, ExternalLink } from 'lucide-react';

interface WhatsAppPriorityRedirectModalProps {
  isOpen: boolean;
  whatsappUrl: string;
  customMessageText?: string;
  onClose: () => void;
  ownerName?: string;
}

export const WhatsAppPriorityRedirectModal: React.FC<WhatsAppPriorityRedirectModalProps> = ({
  isOpen,
  whatsappUrl,
  customMessageText,
  onClose,
  ownerName = 'Srinivasarao Kolisetty',
}) => {
  const [countdown, setCountdown] = useState(3);
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    if (!isOpen || !whatsappUrl) {
      setCountdown(3);
      setRedirected(false);
      return;
    }

    setCountdown(3);
    setRedirected(false);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (!redirected) {
            setRedirected(true);
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
            setTimeout(() => onClose(), 500);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 900);

    return () => clearInterval(interval);
  }, [isOpen, whatsappUrl]);

  if (!isOpen) return null;

  const handleManualRedirect = () => {
    if (!redirected) {
      setRedirected(true);
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-[#001030] text-white w-full max-w-lg rounded-2xl border-2 border-[#D4AF37] shadow-2xl overflow-hidden relative p-6 sm:p-8 text-center space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#F3E5AB] text-xs font-bold uppercase tracking-widest shadow-md">
          <Crown className="w-4 h-4 text-[#D4AF37]" />
          <span>VIP PRIORITY CUSTOMER SERVICE • పరాశక్తి బేకరీ</span>
        </div>

        {/* Royalty Icon */}
        <div className="relative mx-auto w-16 h-16 rounded-full gold-gradient p-0.5 flex items-center justify-center shadow-lg">
          <div className="w-full h-full bg-[#000d28] rounded-full flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-[#25D366] animate-bounce" />
          </div>
          <Sparkles className="w-5 h-5 text-[#D4AF37] absolute -top-1 -right-1" />
        </div>

        {/* Live Thanking Messages with New Line formatting */}
        <div className="bg-[#001840] p-4 sm:p-5 rounded-xl border border-[#D4AF37]/30 space-y-3.5 text-left">
          {/* Telugu Thanking Section */}
          <div className="space-y-1 text-[#F3E5AB] font-sans border-b border-[#D4AF37]/20 pb-3">
            <p className="font-bold text-sm sm:text-base flex items-center gap-1.5 text-amber-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              నమస్కారం! పరాశక్తి బేకరీ మాచర్లను ఎంచుకున్నందుకు ధన్యవాదములు!
            </p>
            <p className="text-xs text-slate-200 leading-relaxed font-semibold pl-5">
              మీరు మాకు అత్యంత ప్రాధాన్యత కలిగిన గౌరవనీయ కస్టమర్.
            </p>
            <p className="text-xs text-slate-300 pl-5">
              యజమాని శ్రీనివాసరావు కొలిశెట్టి గారి పర్యవేక్షణలో మీ ఆర్డర్ తక్షణమే ప్రాసెస్ చేయబడుతుంది.
            </p>
          </div>

          {/* English Thanking Section */}
          <div className="space-y-1 text-slate-100 font-sans pt-1">
            <p className="font-bold text-xs sm:text-sm text-white flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-400 shrink-0 fill-rose-400" />
              Thank you for choosing Parasakthi Bakery, Macherla!
            </p>
            <p className="text-[11px] text-slate-300 leading-relaxed pl-5 font-medium">
              You are our highest priority customer. We treat every order with personal care.
            </p>
            <p className="text-[11px] text-amber-200 pl-5">
              Connecting you directly to our WhatsApp order desk under {ownerName}...
            </p>
          </div>

          {customMessageText && (
            <div className="mt-2 pt-2 border-t border-[#D4AF37]/30 text-[11px] text-[#F3E5AB] italic bg-[#000d28]/60 p-2.5 rounded-lg">
              "{customMessageText}"
            </div>
          )}
        </div>

        {/* Countdown & Redirect Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#F3E5AB]">
            <span>Redirecting to WhatsApp Desk...</span>
            <span className="font-mono bg-[#000d28] px-2 py-0.5 rounded border border-[#D4AF37]/40 text-emerald-400">
              {countdown}s
            </span>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden border border-[#D4AF37]/30">
            <div 
              className="bg-gradient-to-r from-[#D4AF37] via-emerald-400 to-[#25D366] h-full transition-all duration-1000 ease-linear"
              style={{ width: `${((3 - countdown + 1) / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Manual Trigger Button */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleManualRedirect}
            className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm tracking-wide uppercase flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] transition-all cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
            <span>Open WhatsApp Now ({countdown}s)</span>
            <ExternalLink className="w-4 h-4 ml-1" />
          </button>
        </div>

        <p className="text-[10px] text-slate-400">
          Under HDFC Bank, Main Road, Macherla • Contact: +91 9440740619
        </p>
      </div>
    </div>
  );
};
