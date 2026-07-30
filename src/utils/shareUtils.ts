export interface ShareItemData {
  title: string;
  text: string;
  url?: string;
}

/**
  * Safely triggers native device sharing or falls back to WhatsApp share or link copy
  */
export async function triggerShare(data: ShareItemData): Promise<{ success: boolean; copied?: boolean }> {
  const shareUrl = data.url || window.location.href;
  const fullText = `${data.title}\n${data.text}\n${shareUrl}`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: data.title,
        text: data.text,
        url: shareUrl,
      });
      return { success: true };
    } catch (err) {
      // User cancelled or native share failed, fallback
      if ((err as Error).name !== 'AbortError') {
        console.warn('Native share failed:', err);
      }
    }
  }

  // Fallback 1: Clipboard Copy
  try {
    await navigator.clipboard.writeText(fullText);
    return { success: true, copied: true };
  } catch (clipErr) {
    console.warn('Clipboard write failed:', clipErr);
    return { success: false };
  }
}

export function getWhatsAppShareUrl(text: string, url?: string): string {
  const targetUrl = url || window.location.href;
  const message = `${text}\n👉 Check out here: ${targetUrl}`;
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
}
