import { useMemo, useState } from "react";
import { ArrowLeft, Play, RotateCcw, SlidersHorizontal } from "lucide-react";
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
  return {
    x: Math.max(-3.9, Math.min(3.9, (screenX - MAP_WIDTH / 2) / 70)),
    y: Math.max(-3.1, Math.min(3.1, (screenY - MAP_HEIGHT / 2) / 20)),
  };
}

export default function GradientDescent() {
  const [start, setStart] = useState<Point>({ x: 2.8, y: -1.9 });
  const [learningRate, setLearningRate] = useState(0.28);
  const [running, setRunning] = useState(true);
  const path = useMemo(() => descend(start, learningRate), [start, learningRate]);
  const destination = path[path.length - 1];

  const handleMapPointer = (event: React.PointerEvent<SVGSVGElement>) => {
    const point = mapPoint(event.clientX, event.clientY, event.currentTarget.getBoundingClientRect());
    setStart(point);
    setRunning(true);
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

  const pathPoints = path.map((point) => project(point));
  const pathD = pathPoints.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const ball = project(path[running ? 0 : path.length - 1]);
  const finalPoint = project(destination);

  return (
    <div className="descent-page">
      <header className="descent-header">
        <a className="back-link" href="./">
          <ArrowLeft size={16} /> Back to portfolio
        </a>
        <div className="descent-mark">KR / LAB 01</div>
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
              <path
                d="M 96 225 L 646 134 L 685 310 L 139 418 Z"
                fill="url(#surface-gradient)"
                opacity=".92"
              />
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
              <circle cx={ball.x} cy={ball.y} r="14" className="descent-ball" />
              <circle cx={ball.x - 4} cy={ball.y - 5} r="3" className="ball-highlight" />
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
