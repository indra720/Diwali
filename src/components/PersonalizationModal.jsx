import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  Copy,
  Check,
  Share2,
  Sparkles,
  Send,
  MessageSquare,
} from "lucide-react";

export const PersonalizationModal = ({
  isOpen,
  onClose,
  currentTo = "Hemant",
  currentFrom = "Indrajeet",
  currentMsg = "",
  onApply,
}) => {
  const [recipient, setRecipient] = useState(currentTo);
  const [sender, setSender] = useState(currentFrom);
  const [message, setMessage] = useState(currentMsg);
  const [copied, setCopied] = useState(false);

  // Construct personalized URL
  const generateUrl = () => {
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    const params = new URLSearchParams();
    if (recipient) params.set("to", recipient);
    if (sender) params.set("from", sender);
    if (message && message.trim()) {
      params.set("msg", message.trim());
    }
    return `${origin}${pathname}?${params.toString()}`;
  };

  const surpriseUrl = generateUrl();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(surpriseUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch (e) {
      const input = document.createElement("input");
      input.value = surpriseUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const handleWhatsAppShare = () => {
    const text = `✨ Hey ${recipient || "Hemant"}! I've prepared a special magical Diwali surprise just for you for 8 November 2026. Open your surprise here: 🪔🎆\n${surpriseUrl}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `✨ A Special Diwali Surprise for ${recipient}! ✨`,
          text: `A magical personalized Diwali greeting from ${sender}!`,
          url: surpriseUrl,
        });
      } catch (err) {}
    } else {
      handleCopy();
    }
  };

  const handleApplyAndPreview = () => {
    onApply({
      recipient,
      sender,
      message,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-md rounded-3xl border border-yellow-500/50 bg-gradient-to-b from-[#111738] via-[#0b0e27] to-[#060818] p-5 sm:p-6 text-left shadow-[0_0_60px_rgba(234,179,8,0.35)] my-4 max-h-[92vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-yellow-300 hover:bg-white/5 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          <h3 className="text-xl font-serif font-bold text-yellow-100">
            Share Diwali Surprise
          </h3>
        </div>
        <p className="text-xs text-yellow-200/70 mb-4">
          Diwali: <strong>8 November 2026</strong> • Dedicated to{" "}
          <strong>Hemant</strong>
        </p>

        <div className="space-y-3.5">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-yellow-300/90 mb-1">
              Who is this surprise for?
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-stone-900/80 border border-yellow-500/40 text-yellow-100 placeholder-yellow-500/30 focus:outline-none focus:border-yellow-400 text-xs sm:text-sm font-medium"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-yellow-300/90 mb-1">
              Your Name (Sender)
            </label>
            <input
              type="text"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-stone-900/80 border border-yellow-500/40 text-yellow-100 placeholder-yellow-500/30 focus:outline-none focus:border-yellow-400 text-xs sm:text-sm font-medium"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-yellow-300/90 mb-1 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Greeting Message</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full px-3.5 py-2 rounded-xl bg-stone-900/80 border border-yellow-500/40 text-yellow-100 text-xs sm:text-sm leading-relaxed resize-none focus:outline-none focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-yellow-300/90 mb-1">
              Surprise Link
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={surpriseUrl}
                className="w-full px-3 py-1.5 rounded-xl bg-stone-950 border border-yellow-500/30 text-yellow-300/80 text-xs font-mono select-all truncate"
              />
              <button
                type="button"
                onClick={handleCopy}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all shrink-0 ${
                  copied
                    ? "bg-emerald-600 text-white"
                    : "bg-yellow-500 text-stone-950 hover:bg-yellow-400 shadow-md"
                }`}
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-3.5 border-t border-yellow-500/20 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleWhatsAppShare}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>WhatsApp Share</span>
            </button>
            <button
              type="button"
              onClick={handleNativeShare}
              className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-yellow-200 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleApplyAndPreview}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
          >
            Apply & View
          </button>
        </div>
      </motion.div>
    </div>
  );
};
