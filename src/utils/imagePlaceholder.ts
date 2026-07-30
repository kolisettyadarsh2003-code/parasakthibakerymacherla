// SVG Placeholder Generator for Parasakthi Bakery
// Generates clean, elegant royal-themed SVG placeholders with gold vector accents

export function createCleanPlaceholderSvg(title: string, category: string): string {
  const sanitizedTitle = title.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const sanitizedCat = category.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" fill="none">
    <rect width="800" height="600" fill="#0A192F"/>
    <rect x="20" y="20" width="760" height="560" rx="16" fill="#0F2C59" stroke="#D4AF37" stroke-width="2" stroke-dasharray="6 6" opacity="0.6"/>
    
    <!-- Background luxury glow -->
    <circle cx="400" cy="260" r="180" fill="#D4AF37" opacity="0.05"/>
    <circle cx="400" cy="260" r="120" stroke="#D4AF37" stroke-width="1" opacity="0.2"/>
    
    <!-- Elegant Bakery Icon Frame -->
    <g transform="translate(360, 180)" stroke="#D4AF37" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 36 C 12 18, 68 18, 68 36 Z"/>
      <path d="M8 36 L72 36 L68 64 L12 64 Z" fill="#D4AF37" fill-opacity="0.1"/>
      <path d="M24 36 L24 24"/>
      <path d="M40 36 L40 20"/>
      <path d="M56 36 L56 24"/>
      <!-- Small Sparkle/Star -->
      <path d="M40 8 L40 14 M37 11 L43 11" stroke="#F3E5AB"/>
    </g>
    
    <!-- Badge -->
    <rect x="310" y="280" width="180" height="28" rx="14" fill="#D4AF37" fill-opacity="0.2" stroke="#D4AF37" stroke-width="1"/>
    <text x="400" y="299" fill="#F3E5AB" font-family="sans-serif" font-size="12" font-weight="600" letter-spacing="1.5" text-anchor="middle" uppercase="true">${sanitizedCat.toUpperCase()}</text>
    
    <!-- Title -->
    <text x="400" y="360" fill="#FAF8F5" font-family="serif" font-size="28" font-weight="700" text-anchor="middle">${sanitizedTitle}</text>
    
    <!-- Subtitle / Instruction -->
    <text x="400" y="410" fill="#C5A059" font-family="sans-serif" font-size="14" text-anchor="middle">Photo Pending Upload</text>
    <text x="400" y="435" fill="#94A3B8" font-family="sans-serif" font-size="12" text-anchor="middle">Owner can add photos via Admin Panel</text>
    
    <!-- Decorative Flourish -->
    <path d="M350 470 Q 400 480 450 470" stroke="#D4AF37" stroke-width="1.5" opacity="0.4" fill="none"/>
    <circle cx="400" cy="475" r="3" fill="#D4AF37"/>
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

// Client-side image optimizer & converter to webp/jpeg dataUrl with AUTOMATIC WATERMARK
export function compressAndResizeImage(file: File, maxWidth = 1200, maxHeight = 1200, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image format'));
      img.onload = () => {
        let { width, height } = img;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Canvas context not supported'));
        }

        // Draw original image
        ctx.drawImage(img, 0, 0, width, height);

        // AUTOMATIC WATERMARK OVERLAY (PARASAKTHI BAKERS TAG)
        try {
          ctx.save();
          
          const fontSize = Math.max(13, Math.round(width * 0.028));
          const paddingX = Math.round(fontSize * 1.1);
          const paddingY = Math.round(fontSize * 0.55);
          
          ctx.font = `bold ${fontSize}px sans-serif`;
          const watermarkText = 'PARASAKTHI BAKERS • MACHERLA';
          const textMetrics = ctx.measureText(watermarkText);
          const textWidth = textMetrics.width;
          
          const badgeWidth = textWidth + paddingX * 2;
          const badgeHeight = fontSize + paddingY * 2;
          const margin = Math.max(12, Math.round(width * 0.022));
          
          const x = width - badgeWidth - margin;
          const y = height - badgeHeight - margin;
          
          // Draw dark royal pill background
          ctx.fillStyle = 'rgba(0, 16, 48, 0.88)';
          const radius = Math.min(10, badgeHeight / 2);
          
          ctx.beginPath();
          ctx.moveTo(x + radius, y);
          ctx.lineTo(x + badgeWidth - radius, y);
          ctx.quadraticCurveTo(x + badgeWidth, y, x + badgeWidth, y + radius);
          ctx.lineTo(x + badgeWidth, y + badgeHeight - radius);
          ctx.quadraticCurveTo(x + badgeWidth, y + badgeHeight, x + badgeWidth - radius, y + badgeHeight);
          ctx.lineTo(x + radius, y + badgeHeight);
          ctx.quadraticCurveTo(x, y + badgeHeight, x, y + badgeHeight - radius);
          ctx.lineTo(x, y + radius);
          ctx.quadraticCurveTo(x, y, x + radius, y);
          ctx.closePath();
          ctx.fill();
          
          // Gold Border Line
          ctx.strokeStyle = 'rgba(212, 175, 55, 0.95)';
          ctx.lineWidth = Math.max(1.5, Math.round(width * 0.002));
          ctx.stroke();
          
          // Text inside badge
          ctx.fillStyle = '#F3E5AB';
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          ctx.fillText(watermarkText, x + paddingX, y + badgeHeight / 2);

          ctx.restore();
        } catch (wmErr) {
          console.warn('Watermark drawing failed, proceeding with image', wmErr);
        }

        // Try webp first, fallback to jpeg
        try {
          const dataUrl = canvas.toDataURL('image/webp', quality);
          if (dataUrl.startsWith('data:image/webp')) {
            return resolve(dataUrl);
          }
        } catch (_) {
          // Ignore fallback to jpeg
        }

        const fallbackUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(fallbackUrl);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
