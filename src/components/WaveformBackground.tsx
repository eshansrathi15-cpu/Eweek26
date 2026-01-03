import { useEffect, useRef, useCallback } from 'react';

interface Tile {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  z: number;
  velocity: number;
  targetZ: number;
}

const WaveformBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tilesRef = useRef<Tile[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>();

  const GRID_SIZE = 60;
  const PERSPECTIVE = 0.4;
  const INFLUENCE_RADIUS = 200;
  const MAX_LIFT = 40;
  const SPRING_TENSION = 0.08;
  const DAMPING = 0.85;

  const initTiles = useCallback((width: number, height: number) => {
    const tiles: Tile[] = [];
    const cols = Math.ceil(width / GRID_SIZE) + 4;
    const rows = Math.ceil(height / GRID_SIZE) + 4;
    const offsetX = -GRID_SIZE * 2;
    const offsetY = -GRID_SIZE * 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = offsetX + col * GRID_SIZE;
        const y = offsetY + row * GRID_SIZE;
        tiles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          z: 0,
          velocity: 0,
          targetZ: 0,
        });
      }
    }
    return tiles;
  }, []);

  const updatePhysics = useCallback(() => {
    const tiles = tilesRef.current;
    const mouse = mouseRef.current;

    tiles.forEach((tile) => {
      // Calculate distance from mouse to tile center
      const tileCenterX = tile.baseX + GRID_SIZE / 2;
      const tileCenterY = tile.baseY + GRID_SIZE / 2;
      const dx = tileCenterX - mouse.x;
      const dy = tileCenterY - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Calculate target Z based on mouse proximity
      if (distance < INFLUENCE_RADIUS) {
        const influence = 1 - distance / INFLUENCE_RADIUS;
        const smoothInfluence = influence * influence * (3 - 2 * influence); // Smoothstep
        tile.targetZ = MAX_LIFT * smoothInfluence;
      } else {
        tile.targetZ = 0;
      }

      // Spring physics
      const springForce = (tile.targetZ - tile.z) * SPRING_TENSION;
      tile.velocity += springForce;
      tile.velocity *= DAMPING;
      tile.z += tile.velocity;

      // Clamp very small values to 0
      if (Math.abs(tile.z) < 0.01 && Math.abs(tile.velocity) < 0.01) {
        tile.z = 0;
        tile.velocity = 0;
      }
    });
  }, []);

  const projectPoint = useCallback((x: number, y: number, z: number, height: number) => {
    // Simple perspective projection
    const vanishY = height * 0.3;
    const scale = 1 + (y - vanishY) * PERSPECTIVE / height;
    const projectedY = y - z * scale;
    return { x, y: projectedY, scale };
  }, []);

  const draw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    
    const tiles = tilesRef.current;
    const cols = Math.ceil(width / GRID_SIZE) + 4;

    // Draw grid lines
    tiles.forEach((tile, index) => {
      const { x, y: projY } = projectPoint(tile.baseX, tile.baseY, tile.z, height);
      const rightTile = tiles[index + 1];
      const bottomTile = tiles[index + cols];

      // Calculate glow intensity based on Z height
      const glowIntensity = Math.min(tile.z / MAX_LIFT, 1);
      
      // Interpolate color from dark gray to bright cyan (#BCF6FA)
      const r = Math.round(42 + (188 - 42) * glowIntensity);
      const g = Math.round(42 + (246 - 42) * glowIntensity);
      const b = Math.round(42 + (250 - 42) * glowIntensity);
      
      ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.lineWidth = glowIntensity > 0.1 ? 1.5 + glowIntensity : 1;

      // Add glow effect for lifted tiles
      if (glowIntensity > 0.1) {
        ctx.shadowColor = `rgba(188, 246, 250, ${glowIntensity * 0.8})`;
        ctx.shadowBlur = 10 * glowIntensity;
      } else {
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      }

      // Draw horizontal line to right neighbor
      if (rightTile && (index + 1) % cols !== 0) {
        const { x: rx, y: rProjY } = projectPoint(rightTile.baseX, rightTile.baseY, rightTile.z, height);
        ctx.beginPath();
        ctx.moveTo(x, projY);
        ctx.lineTo(rx, rProjY);
        ctx.stroke();
      }

      // Draw vertical line to bottom neighbor
      if (bottomTile) {
        const { x: bx, y: bProjY } = projectPoint(bottomTile.baseX, bottomTile.baseY, bottomTile.z, height);
        ctx.beginPath();
        ctx.moveTo(x, projY);
        ctx.lineTo(bx, bProjY);
        ctx.stroke();
      }
    });

    // Reset shadow for next frame
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  }, [projectPoint]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      tilesRef.current = initTiles(canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const animate = () => {
      updatePhysics();
      draw(ctx, canvas.width, canvas.height);
      animationRef.current = requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initTiles, updatePhysics, draw]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: '#050505' }}
    />
  );
};

export default WaveformBackground;
