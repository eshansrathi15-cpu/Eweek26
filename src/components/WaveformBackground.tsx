import { useEffect, useRef, useCallback } from 'react';

interface Line {
  y: number;
  points: { x: number; displacement: number; velocity: number }[];
}

const WaveformBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const linesRef = useRef<Line[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  const LINE_SPACING = 40;
  const POINT_SPACING = 10;
  const INFLUENCE_RADIUS = 120;
  const SPRING_TENSION = 0.03;
  const DAMPING = 0.92;
  const MAX_DISPLACEMENT = 25;

  const initLines = useCallback((width: number, height: number) => {
    const lines: Line[] = [];
    const numLines = Math.ceil(height / LINE_SPACING) + 1;
    const numPoints = Math.ceil(width / POINT_SPACING) + 1;

    for (let i = 0; i < numLines; i++) {
      const points = [];
      for (let j = 0; j < numPoints; j++) {
        points.push({
          x: j * POINT_SPACING,
          displacement: 0,
          velocity: 0,
        });
      }
      lines.push({ y: i * LINE_SPACING, points });
    }
    return lines;
  }, []);

  const updatePhysics = useCallback(() => {
    const lines = linesRef.current;
    const mouse = mouseRef.current;

    lines.forEach((line) => {
      line.points.forEach((point) => {
        // Calculate distance from mouse
        const dx = point.x - mouse.x;
        const dy = line.y + point.displacement - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Apply mouse influence
        if (distance < INFLUENCE_RADIUS && distance > 0) {
          const force = (1 - distance / INFLUENCE_RADIUS) * 2;
          const angle = Math.atan2(dy, dx);
          point.velocity += Math.sin(angle) * force * 0.5;
        }

        // Spring physics - pull back to rest
        const springForce = -point.displacement * SPRING_TENSION;
        point.velocity += springForce;

        // Apply damping
        point.velocity *= DAMPING;

        // Update displacement
        point.displacement += point.velocity;

        // Clamp displacement
        point.displacement = Math.max(-MAX_DISPLACEMENT, Math.min(MAX_DISPLACEMENT, point.displacement));
      });
    });
  }, []);

  const draw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    
    const lines = linesRef.current;

    lines.forEach((line) => {
      ctx.beginPath();
      ctx.strokeStyle = '#2A2A2A';
      ctx.lineWidth = 1;

      line.points.forEach((point, index) => {
        const y = line.y + point.displacement;
        if (index === 0) {
          ctx.moveTo(point.x, y);
        } else {
          // Smooth curve through points
          const prev = line.points[index - 1];
          const prevY = line.y + prev.displacement;
          const cpX = (prev.x + point.x) / 2;
          ctx.quadraticCurveTo(prev.x, prevY, cpX, (prevY + y) / 2);
        }
      });

      ctx.stroke();
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      linesRef.current = initLines(canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      updatePhysics();
      draw(ctx, canvas.width, canvas.height);
      animationRef.current = requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initLines, updatePhysics, draw]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: '#050505' }}
    />
  );
};

export default WaveformBackground;
