// qr.js — Genera QR con el master hash (via CDN)
export async function renderQR(elementId, text) {
  const QRCode = await import('https://esm.sh/qrcode@1.5.3');
  const canvas = document.getElementById(elementId);
  await QRCode.toCanvas(canvas, text, { width: 200, margin: 1, color: { dark: '#a855f7', light: '#050510' } });
  return canvas.toDataURL('image/png');
}
