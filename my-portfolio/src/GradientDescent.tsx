import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import { ArrowLeft, Moon, Play, RotateCcw, SlidersHorizontal, Sun } from "lucide-react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./gradient-descent.css";

type Point = { x: number; y: number };
type PhysicsState = { position: Point; velocity: Point; rotation: number };

const BASE = import.meta.env.BASE_URL;
const SURFACE_WIDTH = 8;
const SURFACE_DEPTH = 6;
const BALL_RADIUS = 0.28;

function surface({ x, y }: Point) {
  return 0.16 * (x * x + 1.35 * y * y) + 0.035 * Math.sin(x * 1.7) * Math.cos(y * 1.3) + 0.012 * Math.sin(x * 3.4 + y);
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
    current = {
      x: Math.max(-3.9, Math.min(3.9, current.x - learningRate * slope.x)),
      y: Math.max(-2.9, Math.min(2.9, current.y - learningRate * slope.y)),
    };
    points.push(current);
    if (Math.hypot(slope.x, slope.y) < 0.035) break;
  }
  return points;
}

function setBallMesh(mesh: THREE.Mesh, point: Point) {
  mesh.position.set(point.x, surface(point) + BALL_RADIUS, point.y);
}

export default function GradientDescent() {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
  const [start, setStart] = useState<Point>({ x: 2.8, y: -1.9 });
  const [learningRate, setLearningRate] = useState(0.28);
  const [running, setRunning] = useState(true);
  const [ballPosition, setBallPosition] = useState(start);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{ camera: THREE.PerspectiveCamera; terrain: THREE.Mesh; ball: THREE.Mesh; path: THREE.Line } | null>(null);
  const physicsRef = useRef<PhysicsState>({ position: start, velocity: { x: 0, y: 0 }, rotation: 0 });
  const frameRef = useRef<number | null>(null);
  const path = useMemo(() => descend(start, learningRate), [start, learningRate]);
  const destination = path[path.length - 1];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(dark ? "#0b1120" : "#f8fafc");
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(7.5, 7.5, 8.5);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);
    controls.enableDamping = true;
    controls.minDistance = 5;
    controls.maxDistance = 15;

    scene.add(new THREE.HemisphereLight("#ffffff", dark ? "#1e293b" : "#cbd5e1", 2.1));
    const keyLight = new THREE.DirectionalLight("#ffffff", 3.5);
    keyLight.position.set(-4, 9, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    scene.add(keyLight);

    const geometry = new THREE.PlaneGeometry(SURFACE_WIDTH, SURFACE_DEPTH, 64, 48);
    const positions = geometry.attributes.position;
    for (let index = 0; index < positions.count; index += 1) {
      const x = positions.getX(index);
      const y = -positions.getY(index);
      positions.setZ(index, surface({ x, y }));
    }
    geometry.computeVertexNormals();
    const terrainMaterial = new THREE.MeshStandardMaterial({
      color: dark ? "#334155" : "#cbd5e1",
      roughness: 0.88,
      metalness: 0.02,
    });
    const terrain = new THREE.Mesh(geometry, terrainMaterial);
    terrain.rotation.x = -Math.PI / 2;
    terrain.receiveShadow = true;
    scene.add(terrain);

    const ball = new THREE.Mesh(
      new THREE.SphereGeometry(BALL_RADIUS, 32, 20),
      new THREE.MeshStandardMaterial({ color: "#b91c1c", roughness: 0.35, metalness: 0.08 }),
    );
    ball.castShadow = true;
    setBallMesh(ball, physicsRef.current.position);
    scene.add(ball);

    const pathLine = new THREE.Line(
      new THREE.BufferGeometry(),
      new THREE.LineBasicMaterial({ color: "#b91c1c" }),
    );
    scene.add(pathLine);
    sceneRef.current = { camera, terrain, ball, path: pathLine };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(rect.width, rect.height, false);
    };
    const render = () => {
      controls.update();
      renderer.render(scene, camera);
    };
    resize();
    window.addEventListener("resize", resize);
    renderer.setAnimationLoop(render);
    return () => {
      window.removeEventListener("resize", resize);
      renderer.setAnimationLoop(null);
      controls.dispose();
      geometry.dispose();
      terrainMaterial.dispose();
      ball.geometry.dispose();
      (ball.material as THREE.Material).dispose();
      pathLine.geometry.dispose();
      (pathLine.material as THREE.Material).dispose();
      renderer.dispose();
      sceneRef.current = null;
    };
  }, [dark]);

  useEffect(() => {
    const currentScene = sceneRef.current;
    if (!currentScene) return;
    const points = path.map((point) => new THREE.Vector3(point.x, surface(point) + 0.045, point.y));
    currentScene.path.geometry.dispose();
    currentScene.path.geometry = new THREE.BufferGeometry().setFromPoints(points);
    setBallMesh(currentScene.ball, start);
  }, [path, start]);

  useEffect(() => {
    physicsRef.current = { position: start, velocity: { x: 0, y: 0 }, rotation: 0 };
    setBallPosition(start);
    setRunning(true);
  }, [start, learningRate]);

  useEffect(() => {
    if (!running) return;
    let previousTime = performance.now();
    const tick = (time: number) => {
      const elapsed = Math.min((time - previousTime) / 1000, 0.04);
      previousTime = time;
      const simulation = physicsRef.current;
      const slope = gradient(simulation.position);
      const acceleration = { x: -slope.x * 2.4, y: -slope.y * 2.4 };
      simulation.velocity.x = (simulation.velocity.x + acceleration.x * elapsed) * Math.pow(0.996, elapsed * 60);
      simulation.velocity.y = (simulation.velocity.y + acceleration.y * elapsed) * Math.pow(0.996, elapsed * 60);
      simulation.position = {
        x: Math.max(-3.9, Math.min(3.9, simulation.position.x + simulation.velocity.x * elapsed)),
        y: Math.max(-2.9, Math.min(2.9, simulation.position.y + simulation.velocity.y * elapsed)),
      };
      const speed = Math.hypot(simulation.velocity.x, simulation.velocity.y);
      simulation.rotation += speed * elapsed * 5;
      const currentScene = sceneRef.current;
      if (currentScene) {
        setBallMesh(currentScene.ball, simulation.position);
        currentScene.ball.rotation.z = simulation.rotation;
        currentScene.ball.rotation.x = simulation.rotation * 0.7;
      }
      setBallPosition({ ...simulation.position });
      if (Math.hypot(slope.x, slope.y) > 0.035 || speed > 0.02) frameRef.current = requestAnimationFrame(tick);
      else setRunning(false);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [running]);

  const handleCanvasPointer = (event: PointerEvent<HTMLCanvasElement>) => {
    const currentScene = sceneRef.current;
    const canvas = canvasRef.current;
    if (!currentScene || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    const pointer = new THREE.Vector2(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(pointer, currentScene.camera);
    const hit = raycaster.intersectObject(currentScene.terrain)[0];
    if (hit) {
      setStart({
        x: Math.max(-3.9, Math.min(3.9, hit.point.x)),
        y: Math.max(-2.9, Math.min(2.9, hit.point.z)),
      });
    }
  };

  return (
    <div className="descent-page">
      <style>{`@font-face { font-family: "OffBit"; src: url("${BASE}fonts/OffBit-Bold.ttf") format("truetype"); font-weight: 700; font-display: swap; }`}</style>
      <header className="descent-header">
        <a className="back-link" href="./"><ArrowLeft size={16} /> Back to portfolio</a>
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
          <p className="intro-copy">Orbit the 3D landscape, then click to drop a ball. </p>
        </section>
        <section className="descent-layout">
          <div className="visual-card">
            <div className="visual-toolbar">
              <span><span className="live-dot" /> WebGL surface</span>
              <span className="toolbar-hint">Drag to orbit · Click to drop</span>
            </div>
            <div className="three-canvas-wrap"><canvas ref={canvasRef} className="three-canvas" onPointerDown={handleCanvasPointer} /></div>
            <div className="map-legend"><span><i className="legend-ball" /> 3D ball</span><span><i className="legend-path" /> Descent path</span><span><i className="legend-target" /> Global minimum</span></div>
          </div>
          <aside className="control-card">
            <div className="control-heading"><SlidersHorizontal size={17} /><span>Experiment controls</span></div>
            <label className="control-label" htmlFor="learning-rate">Learning rate <strong>{learningRate.toFixed(2)}</strong></label>
            <input id="learning-rate" type="range" min="0.08" max="0.55" step="0.01" value={learningRate} onChange={(event) => setLearningRate(Number(event.target.value))} />
            <div className="range-labels"><span>Precise</span><span>Fast</span></div>
            <div className="control-actions">
              <button className="primary-control" onClick={() => setRunning((value) => !value)}><Play size={15} fill="currentColor" /> {running ? "Pause path" : "Run path"}</button>
              <button className="secondary-control" onClick={() => setStart({ x: 2.8, y: -1.9 })}><RotateCcw size={15} /> Reset</button>
            </div>
            <div className="readout">
              <div><span>Iterations</span><strong>{path.length - 1}</strong></div>
              <div><span>Ball position</span><strong>({ballPosition.x.toFixed(1)}, {ballPosition.y.toFixed(1)})</strong></div>
              <div><span>Minimum found</span><strong>({destination.x.toFixed(2)}, {destination.y.toFixed(2)})</strong></div>
            </div>
          </aside>
        </section>
        <footer><span>∇f(x) &nbsp;→&nbsp; x − η∇f(x)</span></footer>
      </main>
    </div>
  );
}
