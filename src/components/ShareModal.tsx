import React, { useState } from 'react';
import { X, Share2, MessageCircle, Copy, Check, Facebook, ExternalLink, Crown, Heart } from 'lucide-react';
import { triggerShare, getWhatsAppShareUrl } from '../utils/shareUtils';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  text: string;
  url?: string;
  itemName?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title,
  text,
  url,
  itemName,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const targetUrl = url || window.location.href;

  const handleCopyLink = async () => {
    try {
      const fullShareText = itemName
        ? `Check out ${itemName} at Parasakthi Bakery Macherla:\n${targetUrl}`
        : `${title}\n${text}\n${targetUrl}`;
      await navigator.clipboard.writeText(fullShareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleNativeShare = async () => {
    await triggerShare({
      title,
      text,
      url: targetUrl,
    });
  };

  const waShareUrl = getWhatsAppShareUrl(
    itemName
      ? `🎂 *${itemName}* at Parasakthi Bakery Macherla!\n${text}`
      : `✨ *${title}*\n${text}`,
    targetUrl
  );

  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(targetUrl)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
      <div
        className="bg-[#001030] text-white w-full max-w-md rounded-2xl border border-[#D4AF37]/50 shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#000d28] p-4 border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center">
              <Share2 className="w-4 h-4 text-[#F3E5AB]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm text-[#F3E5AB]">
                {itemName ? `Share "${itemName}"` : 'Share Parasakthi Bakery'}
              </h3>
              <p className="text-[10px] text-slate-400">Share with family, friends & celebrations</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          <div className="bg-[#001840] p-3 rounded-xl border border-[#D4AF37]/20 text-center space-y-1">
            <Crown className="w-5 h-5 text-[#D4AF37] mx-auto" />
            <p className="text-xs font-bold text-[#F3E5AB]">{title}</p>
            <p className="text-[11px] text-slate-300 line-clamp-2">{text}</p>
          </div>

          {/* Action Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* WhatsApp Share */}
            <a
              href={waShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white flex flex-col items-center justify-center gap-1.5 transition-all transform hover:scale-[1.02] shadow font-bold text-xs cursor-pointer text-center"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Share on WhatsApp</span>
            </a>

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="p-3 rounded-xl bg-[#0F2C59] hover:bg-[#1a3d75] border border-[#D4AF37]/40 text-white flex flex-col items-center justify-center gap-1.5 transition-all transform hover:scale-[1.02] shadow font-bold text-xs cursor-pointer text-center"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 text-[#F3E5AB]" />
                  <span>Copy Page Link</span>
                </>
              )}
            </button>

            {/* Facebook Share */}
            <a
              href={fbShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-[#1877F2] hover:bg-[#1565c0] text-white flex flex-col items-center justify-center gap-1.5 transition-all transform hover:scale-[1.02] shadow font-bold text-xs cursor-pointer text-center"
            >
              <Facebook className="w-5 h-5" />
              <span>Facebook</span>
            </a>

            {/* Native Share */}
            <button
              onClick={handleNativeShare}
              className="p-3 rounded-xl gold-gradient text-[#001030] flex flex-col items-center justify-center gap-1.5 transition-all transform hover:scale-[1.02] shadow font-bold text-xs cursor-pointer text-center"
            >
              <ExternalLink className="w-5 h-5" />
              <span>More Options</span>
            </button>
          </div>

          {/* Toast Notice */}
          {copied && (
            <div className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 p-2.5 rounded-xl text-center text-xs font-semibold animate-fade-in flex items-center justify-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Link copied to clipboard! Paste it anywhere to share.</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#000d28] px-4 py-2 text-center text-[10px] text-[#D4AF37] font-semibold border-t border-[#D4AF37]/20 flex items-center justify-center gap-1">
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          <span>Parasakthi Bakery • Macherla</span>
        </div>
      </div>
    </div>
  );
};
