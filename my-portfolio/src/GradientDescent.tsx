import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Moon, Play, RotateCcw, SlidersHorizontal, Sun } from "lucide-react";
import "./gradient-descent.css";

type Point = { x: number; y: number };

const MAP_WIDTH = 760;
const MAP_HEIGHT = 520;
const GRID_SIZE = 12;
const SURFACE_SCALE = 70;

function surface({ x, y }: Point) {
  return (
    0.11 * (x * x + 1.35 * y * y) +
    0.25 * Math.sin(x * 1.7) * Math.cos(y * 1.3) +
    0.08 * Math.sin(x * 3.4 + y)
  );
}

function gradient(point: Point): Point {
  const epsilon = 0.001;
  return {
    x: (surface({ x: point.x + epsilon, y: point.y }) - surface({ x: point.x - epsilon, y: point.y })) / (2 * epsilon),
    y: (surface({ x: point.x, y: point.y + epsilon }) - surface({ x: point.x, y: point.y - epsilon })) / (2 * epsilon),
  };
}

function descend(start: Point, learningRate: number) {
  const points = [start];
  let current = start;

  for (let step = 0; step < 42; step += 1) {
    const slope = gradient(current);
    const next = {
      x: Math.max(-3.9, Math.min(3.9, current.x - learningRate * slope.x)),
      y: Math.max(-3.1, Math.min(3.1, current.y - learningRate * slope.y)),
    };
    points.push(next);
    current = next;
    if (Math.hypot(slope.x, slope.y) < 0.035) break;
  }

  return points;
}

function project(point: Point, z = surface(point)) {
  return {
    x: MAP_WIDTH / 2 + point.x * 70 - point.y * 52,
    y: MAP_HEIGHT / 2 + point.x * 20 + point.y * 20 - z * SURFACE_SCALE,
  };
}

function mapPoint(clientX: number, clientY: number, rect: DOMRect): Point {
  const screenX = ((clientX - rect.left) / rect.width) * MAP_WIDTH;
  const screenY = ((clientY - rect.top) / rect.height) * MAP_HEIGHT;
  let closest = { point: { x: 0, y: 0 }, distance: Number.POSITIVE_INFINITY };
  for (let x = -3.9; x <= 3.9; x += 0.15) {
    for (let y = -3.1; y <= 3.1; y += 0.15) {
      const projected = project({ x, y });
      const distance = Math.hypot(projected.x - screenX, projected.y - screenY);
      if (distance < closest.distance) closest = { point: { x, y }, distance };
    }
  }
  return closest.point;
}

export default function GradientDescent() {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
  const [start, setStart] = useState<Point>({ x: 2.8, y: -1.9 });
  const [learningRate, setLearningRate] = useState(0.28);
  const [running, setRunning] = useState(true);
  const [ballPosition, setBallPosition] = useState<Point>({ x: 2.8, y: -1.9 });
  const [rotation, setRotation] = useState(0);
  const physicsRef = useRef({ position: start, velocity: { x: 0, y: 0 }, rotation: 0 });
  const frameRef = useRef<number | null>(null);
  const path = useMemo(() => descend(start, learningRate), [start, learningRate]);
  const destination = path[path.length - 1];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    physicsRef.current = { position: start, velocity: { x: 0, y: 0 }, rotation: 0 };
    setBallPosition(start);
    setRotation(0);
  }, [start, learningRate]);

  useEffect(() => {
    if (!running) return;
    let previousTime = performance.now();
    const tick = (time: number) => {
      const elapsed = Math.min((time - previousTime) / 1000, 0.04);
      previousTime = time;
      const simulation = physicsRef.current;
      const slope = gradient(simulation.position);
      const acceleration = { x: -slope.x * 1.85, y: -slope.y * 1.85 };
      simulation.velocity.x = (simulation.velocity.x + acceleration.x * elapsed) * Math.pow(0.985, elapsed * 60);
      simulation.velocity.y = (simulation.velocity.y + acceleration.y * elapsed) * Math.pow(0.985, elapsed * 60);
      simulation.position = {
        x: Math.max(-3.9, Math.min(3.9, simulation.position.x + simulation.velocity.x * elapsed)),
        y: Math.max(-3.1, Math.min(3.1, simulation.position.y + simulation.velocity.y * elapsed)),
      };
      if (Math.hypot(...Object.values(simulation.velocity)) > 0.01) {
        simulation.rotation += Math.hypot(simulation.velocity.x, simulation.velocity.y) * elapsed * 5;
      }
      setBallPosition({ ...simulation.position });
      setRotation(simulation.rotation);
      if (Math.hypot(slope.x, slope.y) > 0.035 || Math.hypot(...Object.values(simulation.velocity)) > 0.02) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setRunning(false);
      }
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [running]);

  const handleMapPointer = (event: React.PointerEvent<SVGSVGElement>) => {
    const point = mapPoint(event.clientX, event.clientY, event.currentTarget.getBoundingClientRect());
    setStart(point);
    setRunning(true);
  };

  const handleMapPointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (event.buttons === 1) handleMapPointer(event);
  };

  const surfaceLines = useMemo(() => {
    const lines: Array<{ key: string; points: string }> = [];
    for (let row = -GRID_SIZE / 2; row <= GRID_SIZE / 2; row += 1) {
      const y = row * 0.55;
      const points = Array.from({ length: 17 }, (_, index) => project({ x: -4.4 + index * 0.55, y }))
        .map(({ x, y: screenY }) => `${x},${screenY}`)
        .join(" ");
      lines.push({ key: `row-${row}`, points });
    }
    for (let column = -8; column <= 8; column += 1) {
      const x = column * 0.55;
      const points = Array.from({ length: 13 }, (_, index) => project({ x, y: -3.3 + index * 0.55 }))
        .map(({ x: screenX, y }) => `${screenX},${y}`)
        .join(" ");
      lines.push({ key: `column-${column}`, points });
    }
    return lines;
  }, []);
  const surfaceCells = useMemo(() => {
    const cells: Array<{ key: string; points: string; fill: string }> = [];
    const colors = dark
      ? ["#1e293b", "#334155", "#7f1d1d", "#991b1b", "#dc2626"]
      : ["#e2e8f0", "#cbd5e1", "#fecaca", "#fca5a5", "#b91c1c"];
    for (let row = 0; row < 12; row += 1) {
      for (let column = 0; column < 16; column += 1) {
        const x = -4.4 + column * 0.55;
        const y = -3.3 + row * 0.55;
        const corners = [
          project({ x, y }),
          project({ x: x + 0.55, y }),
          project({ x: x + 0.55, y: y + 0.55 }),
          project({ x, y: y + 0.55 }),
        ];
        const normalized = Math.max(0, Math.min(0.999, (surface({ x: x + 0.275, y: y + 0.275 }) + 1) / 5));
        cells.push({
          key: `${row}-${column}`,
          points: corners.map((point) => `${point.x},${point.y}`).join(" "),
          fill: colors[Math.floor(normalized * colors.length)],
        });
      }
    }
    return cells;
  }, [dark]);

  const pathPoints = path.map((point) => project(point));
  const pathD = pathPoints.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const ball = project(ballPosition);
  const finalPoint = project(destination);

  return (
    <div className="descent-page">
      <header className="descent-header">
        <a className="back-link" href="./">
          <ArrowLeft size={16} /> Back to portfolio
        </a>
        <div className="descent-header-actions">
          <div className="descent-mark">KR / LAB 01</div>
          <button className="theme-control" aria-label="Toggle dark mode" onClick={() => setDark((value) => !value)}>
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </header>

      <main className="descent-shell">
        <section className="descent-intro">
          <p className="eyebrow">Interactive experiment</p>
          <h1>Gradient <em>descent</em></h1>
          <p className="intro-copy">
            Drop the ball anywhere on the landscape. Watch it sample the slope and descend toward a local minimum.
          </p>
        </section>

        <section className="descent-layout">
          <div className="visual-card">
            <div className="visual-toolbar">
              <span><span className="live-dot" /> Live surface</span>
              <span className="toolbar-hint">Click anywhere to drop the ball</span>
            </div>
            <svg
              className="surface-map"
              viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
              role="img"
              aria-label="Interactive 3D gradient descent surface"
              onPointerDown={handleMapPointer}
              onPointerMove={handleMapPointerMove}
            >
              <defs>
                <linearGradient id="surface-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fbd1c6" />
                  <stop offset="48%" stopColor="#eb8f8c" />
                  <stop offset="100%" stopColor="#b65d71" />
                </linearGradient>
                <filter id="surface-shadow"><feGaussianBlur stdDeviation="18" /></filter>
              </defs>
              <ellipse cx="375" cy="380" rx="260" ry="48" fill="#631b42" opacity=".22" filter="url(#surface-shadow)" />
              <g className="surface-cells">
                {surfaceCells.map((cell) => <polygon key={cell.key} points={cell.points} fill={cell.fill} />)}
              </g>
              <g className="surface-grid">
                {surfaceLines.map((line) => <polyline key={line.key} points={line.points} />)}
              </g>
              <path d={pathD} className="descent-path" />
              <g className="path-dots">
                {pathPoints.filter((_, index) => index % 4 === 0).map((point, index) => (
                  <circle key={index} cx={point.x} cy={point.y} r="3" />
                ))}
              </g>
              <circle cx={finalPoint.x} cy={finalPoint.y} r="9" className="target-ring" />
              <g transform={`translate(${ball.x} ${ball.y}) rotate(${rotation})`}>
                <circle r="14" className="descent-ball" />
                <path d="M -8 0 H 8" className="ball-stripe" />
                <circle cx="-4" cy="-5" r="3" className="ball-highlight" />
              </g>
            </svg>
            <div className="map-legend">
              <span><i className="legend-ball" /> Start</span>
              <span><i className="legend-path" /> Descent path</span>
              <span><i className="legend-target" /> Local minimum</span>
            </div>
          </div>

          <aside className="control-card">
            <div className="control-heading"><SlidersHorizontal size={17} /><span>Experiment controls</span></div>
            <label className="control-label" htmlFor="learning-rate">Learning rate <strong>{learningRate.toFixed(2)}</strong></label>
            <input
              id="learning-rate"
              type="range"
              min="0.08"
              max="0.55"
              step="0.01"
              value={learningRate}
              onChange={(event) => setLearningRate(Number(event.target.value))}
            />
            <div className="range-labels"><span>Precise</span><span>Fast</span></div>
            <div className="control-actions">
              <button className="primary-control" onClick={() => setRunning((value) => !value)}>
                <Play size={15} fill="currentColor" /> {running ? "Pause path" : "Run path"}
              </button>
              <button className="secondary-control" onClick={() => { setStart({ x: 2.8, y: -1.9 }); setRunning(true); }}>
                <RotateCcw size={15} /> Reset
              </button>
            </div>
            <div className="readout">
              <div><span>Iterations</span><strong>{path.length - 1}</strong></div>
              <div><span>Start point</span><strong>({start.x.toFixed(1)}, {start.y.toFixed(1)})</strong></div>
              <div><span>Minimum found</span><strong>({destination.x.toFixed(2)}, {destination.y.toFixed(2)})</strong></div>
            </div>
            <p className="control-note">The ball moves against the gradient — each step nudges it downhill by the learning rate.</p>
          </aside>
        </section>

        <footer className="descent-footer">
          <span>Built to make optimization feel tangible.</span>
          <span>∇f(x) &nbsp;→&nbsp; x − η∇f(x)</span>
        </footer>
      </main>
    </div>
  );
}
