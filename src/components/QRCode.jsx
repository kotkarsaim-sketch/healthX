import { useEffect, useRef } from 'react';

export default function QRCode({ value = 'QUEUECARE-TOKEN', size = 120 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const s = size;
    canvas.width = s; canvas.height = s;
    ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, s, s);
    
    // Simple QR-like pattern from the value string
    const grid = 15;
    const cell = s / grid;
    ctx.fillStyle = '#0F172A';
    
    // Corner squares
    const drawFinder = (x, y) => {
      ctx.fillRect(x*cell, y*cell, 7*cell, 7*cell);
      ctx.fillStyle = '#FFFFFF'; ctx.fillRect((x+1)*cell, (y+1)*cell, 5*cell, 5*cell);
      ctx.fillStyle = '#0F172A'; ctx.fillRect((x+2)*cell, (y+2)*cell, 3*cell, 3*cell);
    };
    drawFinder(0, 0); ctx.fillStyle = '#0F172A'; drawFinder(grid-7, 0); ctx.fillStyle = '#0F172A'; drawFinder(0, grid-7); ctx.fillStyle = '#0F172A';

    // Data pattern from string hash
    let hash = 0;
    for (let i = 0; i < value.length; i++) hash = ((hash << 5) - hash) + value.charCodeAt(i);
    for (let y = 0; y < grid; y++) {
      for (let x = 0; x < grid; x++) {
        if ((x < 8 && y < 8) || (x >= grid-8 && y < 8) || (x < 8 && y >= grid-8)) continue;
        if (((hash >> ((x+y*grid) % 31)) & 1) || ((x * y + hash) % 3 === 0 && (x+y) % 2 === 0)) {
          ctx.fillStyle = '#0F172A'; ctx.fillRect(x*cell, y*cell, cell, cell);
        }
      }
    }
  }, [value, size]);

  return (
    <div className="qr-container">
      <canvas ref={canvasRef} style={{ width: size, height: size, imageRendering: 'pixelated' }} />
    </div>
  );
}
