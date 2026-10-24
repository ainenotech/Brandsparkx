"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Icon } from "@/components/Icon";
import type { CaseStudy } from "@/content/cases";

const pad = (n: number) => String(n).padStart(2, "0");

/** What the 3D model on the stage represents for each artwork variant. */
const models: Record<CaseStudy["art"], string> = {
  1: "Voice agent · inbound line",
  2: "Follow-up loop · calls + WhatsApp",
  3: "Workflow engine · forms → CRM → reports",
};

type Shape = { pos: Float32Array; hot: Float32Array };

/** A twisted, tapering tower of lit floors with signal rings around it (real estate + voice). */
function tower(n: number): Shape {
  const pos = new Float32Array(n * 3);
  const hot = new Float32Array(n);
  const floors = 30;
  const h = 2.5;
  for (let i = 0; i < n; i++) {
    const r = Math.random();
    let x: number, y: number, z: number;
    if (r < 0.93) {
      const slab = r < 0.78;
      const f = slab ? Math.floor(Math.random() * floors) / (floors - 1) : Math.random();
      const s = 0.6 - f * 0.22;
      y = -h / 2 + f * h;
      if (slab) {
        // A point on the floor's square outline.
        const u = Math.random() * 4;
        const side = Math.floor(u);
        const v = (u - side) * 2 - 1;
        [x, z] = [
          [v * s, s],
          [s, -v * s],
          [-v * s, -s],
          [-s, v * s],
        ][side];
        hot[i] = Math.round(f * (floors - 1)) % 6 === 5 ? 1 : 0;
      } else {
        // The four corner columns.
        const c = Math.floor(Math.random() * 4);
        x = c & 1 ? s : -s;
        z = c & 2 ? s : -s;
      }
      const tw = f * Math.PI * 0.6;
      [x, z] = [x * Math.cos(tw) - z * Math.sin(tw), x * Math.sin(tw) + z * Math.cos(tw)];
    } else {
      const k = Math.floor(Math.random() * 3);
      const a = Math.random() * Math.PI * 2;
      const rad = 0.95 + k * 0.26;
      x = Math.cos(a) * rad;
      z = Math.sin(a) * rad;
      y = 0.35 + k * 0.05;
      hot[i] = k === 0 ? 1 : 0.45;
    }
    pos.set([x, y, z], i * 3);
  }
  return { pos, hot };
}

/** An endless torus-knot loop with red touchpoints along it (follow-up that never stops). */
function knot(n: number): Shape {
  const pos = new Float32Array(n * 3);
  const hot = new Float32Array(n);
  const sc = 0.42;
  const curve = (t: number) => [
    (2 + Math.cos(3 * t)) * Math.cos(2 * t) * sc,
    (2 + Math.cos(3 * t)) * Math.sin(2 * t) * sc,
    Math.sin(3 * t) * sc * 1.2,
  ];
  const nodes = 6;
  for (let i = 0; i < n; i++) {
    const isNode = Math.random() < 0.16;
    const t = isNode
      ? (Math.floor(Math.random() * nodes) / nodes) * Math.PI * 2
      : Math.random() * Math.PI * 2;
    const c = curve(t);
    const a = curve(t - 0.001);
    const b = curve(t + 0.001);
    // Tube frame: tangent, then two normals perpendicular to it.
    let [tx, ty, tz] = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
    const tl = Math.hypot(tx, ty, tz);
    tx /= tl;
    ty /= tl;
    tz /= tl;
    let [nx, ny] = [ty, -tx];
    const nl = Math.hypot(nx, ny);
    nx /= nl;
    ny /= nl;
    const [bx, by, bz] = [-tz * ny, tz * nx, tx * ny - ty * nx];
    const ang = Math.random() * Math.PI * 2;
    const rad = isNode ? Math.cbrt(Math.random()) * 0.11 : 0.05 + Math.random() * 0.04;
    const [ca, sa] = [Math.cos(ang) * rad, Math.sin(ang) * rad];
    pos.set([c[0] + nx * ca + bx * sa, c[1] + ny * ca + by * sa, c[2] + bz * sa], i * 3);
    hot[i] = isNode ? 1 : Math.random() < 0.03 ? 1 : 0;
  }
  return { pos, hot };
}

/** A 3×3×3 lattice of modules; a red path runs through it like a workflow. */
function lattice(n: number): Shape {
  const pos = new Float32Array(n * 3);
  const hot = new Float32Array(n);
  const half = 0.23;
  const step = 0.66;
  const id = (x: number, y: number, z: number) => x + y * 3 + z * 9;
  const path = new Set([
    id(0, 0, 0),
    id(1, 0, 0),
    id(1, 1, 0),
    id(1, 1, 1),
    id(2, 1, 1),
    id(2, 2, 1),
    id(2, 2, 2),
  ]);
  for (let i = 0; i < n; i++) {
    const cube = Math.floor(Math.random() * 27);
    const centre = [(cube % 3) - 1, (Math.floor(cube / 3) % 3) - 1, Math.floor(cube / 9) - 1].map(
      (v) => v * step,
    );
    const p = [0, 0, 0];
    if (Math.random() < 0.88) {
      // A point on one of the cube's twelve edges.
      const e = Math.floor(Math.random() * 12);
      const axis = Math.floor(e / 4);
      p[axis] = (Math.random() * 2 - 1) * half;
      p[(axis + 1) % 3] = e & 1 ? half : -half;
      p[(axis + 2) % 3] = e & 2 ? half : -half;
    } else {
      // A faint core inside the module.
      for (let k = 0; k < 3; k++) p[k] = (Math.random() * 2 - 1) * half * 0.45;
    }
    pos.set([centre[0] + p[0], centre[1] + p[1], centre[2] + p[2]], i * 3);
    hot[i] = path.has(cube) ? 1 : 0;
  }
  return { pos, hot };
}

const shapes: Record<CaseStudy["art"], (n: number) => Shape> = { 1: tower, 2: knot, 3: lattice };

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;
  uniform float uPixelRatio;
  uniform float uDist;
  attribute vec3 aTo;
  attribute float aHot;
  attribute float aHotTo;
  attribute float aSeed;
  varying float vHot;
  varying float vGlow;
  varying float vAlpha;

  void main() {
    // Particles leave in a staggered wave, burst outward mid-flight, then settle into the next model.
    float d = aSeed * 0.35;
    float t = smoothstep(d, d + 0.65, uMorph);
    vec3 p = mix(position, aTo, t);
    float burst = sin(t * 3.14159);
    p += normalize(p + 1e-4) * burst * (0.2 + aSeed * 0.45);
    p += 0.012 * vec3(
      sin(uTime * 1.3 + aSeed * 40.0),
      cos(uTime * 1.1 + aSeed * 30.0),
      sin(uTime * 0.9 + aSeed * 20.0));

    // A scan band sweeps up through the model.
    vGlow = smoothstep(0.1, 0.0, abs(fract(p.y * 0.3 - uTime * 0.18) - 0.5));
    vHot = mix(aHot, aHotTo, t);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (2.2 + aSeed * 2.8 + vHot * 1.2) * uPixelRatio * (uDist / -mv.z);
    // Points on the far side fade back, which gives the model depth.
    vAlpha = mix(1.0, 0.3, smoothstep(uDist - 1.0, uDist + 1.4, -mv.z));
  }
`;

const fragment = /* glsl */ `
  varying float vHot;
  varying float vGlow;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    vec3 col = mix(vec3(0.84, 0.84, 0.9), vec3(1.0, 0.27, 0.22), vHot);
    col += vGlow * vec3(1.0, 0.45, 0.4) * 0.6;
    gl_FragColor = vec4(col, smoothstep(0.5, 0.0, d) * vAlpha * (0.72 + vGlow * 0.5));
  }
`;

/**
 * Use cases on the home page as a scroll story: the case panels scroll past a sticky
 * three.js stage whose particle model morphs and turns from one case to the next.
 * three is imported on demand, rendering pauses off screen, and reduced motion gets still frames.
 */
export function CaseCards({ items }: { items: CaseStudy[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const progress = useRef(0);
  const redraw = useRef<(() => void) | null>(null);
  const [active, setActive] = useState(0);
  const arts = items.map((c) => c.art).join(",");

  // Scroll position → continuous case index (0 … n-1) for the stage, plus the active panel.
  useEffect(() => {
    const root = rootRef.current;
    const list = listRef.current;
    if (!root || !list) return;
    const panels = Array.from(list.children) as HTMLElement[];
    const narrow = window.matchMedia("(max-width: 899px)");
    let frame = 0;
    let last = -1;

    const update = () => {
      frame = 0;
      const anchor = window.innerHeight * (narrow.matches ? 0.7 : 0.5);
      const centres = panels.map((el) => {
        const r = el.getBoundingClientRect();
        return r.top + r.height / 2;
      });
      let p = 0;
      if (anchor >= centres[centres.length - 1]) p = centres.length - 1;
      else {
        for (let i = 0; i < centres.length - 1; i++) {
          if (anchor < centres[i + 1]) {
            p = i + Math.max(0, (anchor - centres[i]) / (centres[i + 1] - centres[i]));
            break;
          }
        }
      }
      progress.current = p;
      root.style.setProperty(
        "--stx-p",
        (centres.length > 1 ? p / (centres.length - 1) : 1).toFixed(4),
      );
      const idx = Math.round(p);
      if (idx !== last) setActive((last = idx));
      redraw.current?.();
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [arts]);

  // The three.js stage.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;
    let cleanup = () => {};

    import("three").then((THREE) => {
      if (disposed) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        return; // No WebGL: the stage keeps its CSS glow and grid.
      }
      const dpr = Math.min(window.devicePixelRatio, 2);
      renderer.setPixelRatio(dpr);
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
      const group = new THREE.Group();
      scene.add(group);

      const count = window.innerWidth < 700 ? 4200 : 7000;
      const list = arts.split(",").map((a) => shapes[Number(a) as CaseStudy["art"]](count));
      const seeds = new Float32Array(count).map(() => Math.random());
      const geometry = new THREE.BufferGeometry();
      const from = new THREE.BufferAttribute(new Float32Array(count * 3), 3);
      const to = new THREE.BufferAttribute(new Float32Array(count * 3), 3);
      const hotFrom = new THREE.BufferAttribute(new Float32Array(count), 1);
      const hotTo = new THREE.BufferAttribute(new Float32Array(count), 1);
      geometry.setAttribute("position", from);
      geometry.setAttribute("aTo", to);
      geometry.setAttribute("aHot", hotFrom);
      geometry.setAttribute("aHotTo", hotTo);
      geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
      const material = new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms: {
          uTime: { value: 0 },
          uMorph: { value: 0 },
          uPixelRatio: { value: dpr },
          uDist: { value: 6 },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const points = new THREE.Points(geometry, material);
      points.frustumCulled = false;
      group.add(points);

      // The morph always runs between two neighbouring models; swap them in as the scroll crosses a case.
      let segment = -1;
      const load = (s: number) => {
        segment = s;
        const a = list[s];
        const b = list[Math.min(s + 1, list.length - 1)];
        (from.array as Float32Array).set(a.pos);
        (to.array as Float32Array).set(b.pos);
        (hotFrom.array as Float32Array).set(a.hot);
        (hotTo.array as Float32Array).set(b.hot);
        from.needsUpdate = to.needsUpdate = hotFrom.needsUpdate = hotTo.needsUpdate = true;
      };

      // A pedestal of faint rings under the model, and drifting dust around the stage.
      const ringGeometry = new THREE.BufferGeometry().setFromPoints(
        new THREE.EllipseCurve(0, 0, 1, 1)
          .getPoints(160)
          .map((p) => new THREE.Vector3(p.x, 0, p.y)),
      );
      const ringMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.1,
      });
      const pedestal = new THREE.Group();
      pedestal.position.y = -1.5;
      [1.15, 1.42, 1.7].forEach((r, i) => {
        const ring = new THREE.LineLoop(
          ringGeometry,
          i === 0 ? ringMaterial : ringMaterial.clone(),
        );
        ring.scale.setScalar(r);
        if (i)
          (ring.material as InstanceType<typeof THREE.LineBasicMaterial>).opacity = 0.1 / (i + 1);
        pedestal.add(ring);
      });
      const satGeometry = new THREE.SphereGeometry(0.035, 16, 16);
      const satMaterial = new THREE.MeshBasicMaterial({ color: 0xff4d40 });
      const sat = new THREE.Mesh(satGeometry, satMaterial);
      pedestal.add(sat);
      scene.add(pedestal);

      const dustCount = 500;
      const dustPos = new Float32Array(dustCount * 3);
      for (let i = 0; i < dustCount; i++) {
        const v = new THREE.Vector3().randomDirection().multiplyScalar(2.6 + Math.random() * 3.5);
        dustPos.set([v.x, v.y, v.z], i * 3);
      }
      const dustGeometry = new THREE.BufferGeometry();
      dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
      const dustMaterial = new THREE.PointsMaterial({
        color: 0x8a8a96,
        size: 0.018,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      });
      const dust = new THREE.Points(dustGeometry, dustMaterial);
      scene.add(dust);

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = host;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        // Pull back on tall stages so the widest model never clips.
        const dist = 5.4 * Math.max(1, 0.95 / camera.aspect);
        camera.position.set(0, 0.5, dist);
        material.uniforms.uDist.value = dist;
        camera.lookAt(0, -0.05, 0);
        camera.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(resize);
      ro.observe(host);
      resize();

      // The model leans gently toward the pointer.
      const target = { x: 0, y: 0 };
      const stage = host.parentElement ?? host;
      const onMove = (e: PointerEvent) => {
        const r = stage.getBoundingClientRect();
        target.x = ((e.clientX - r.left) / r.width - 0.5) * 0.5;
        target.y = ((e.clientY - r.top) / r.height - 0.5) * 0.3;
      };
      const onLeave = () => {
        target.x = target.y = 0;
      };
      stage.addEventListener("pointermove", onMove);
      stage.addEventListener("pointerleave", onLeave);

      const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const clock = new THREE.Clock();
      let elapsed = 0;
      let spin = 0;
      let shown = progress.current;
      const last = list.length - 1;
      const draw = () => {
        const dt = still ? 0 : Math.min(clock.getDelta(), 0.05);
        elapsed += dt;
        spin += dt * 0.1;
        // Ease toward the scroll position so the model glides rather than jumps.
        const goal = still ? Math.round(progress.current) : progress.current;
        shown = still ? goal : shown + (goal - shown) * (1 - Math.exp(-dt * 5));
        const s = Math.max(0, Math.min(Math.floor(shown), Math.max(0, last - 1)));
        if (s !== segment) load(s);
        const frac = Math.min(1, shown - s);
        const morph = frac * frac * (3 - 2 * frac);
        material.uniforms.uTime.value = elapsed;
        material.uniforms.uMorph.value = morph;

        // Scroll turns the model; between cases it also dips and shrinks a touch.
        group.rotation.y = spin + shown * Math.PI * 0.85;
        group.rotation.x += (0.18 + target.y - group.rotation.x) * 0.06;
        group.rotation.z += (-target.x * 0.25 - group.rotation.z) * 0.06;
        group.scale.setScalar(1 - Math.sin(morph * Math.PI) * 0.08);
        group.position.y = Math.sin(elapsed * 0.6) * 0.04;
        scene.rotation.y += (target.x - scene.rotation.y) * 0.05;
        pedestal.rotation.y = -spin * 1.6;
        const a = elapsed * 0.5;
        sat.position.set(Math.cos(a) * 1.42, 0, Math.sin(a) * 1.42);
        dust.rotation.y = spin * 0.4;
        renderer.render(scene, camera);
      };

      const io = new IntersectionObserver(([entry]) => {
        clock.getDelta();
        renderer.setAnimationLoop(entry.isIntersecting ? draw : null);
      });
      if (still) {
        redraw.current = draw;
        draw();
      } else io.observe(host);

      cleanup = () => {
        redraw.current = null;
        io.disconnect();
        ro.disconnect();
        stage.removeEventListener("pointermove", onMove);
        stage.removeEventListener("pointerleave", onLeave);
        renderer.setAnimationLoop(null);
        geometry.dispose();
        material.dispose();
        ringGeometry.dispose();
        pedestal.children.forEach((c) => {
          if (c instanceof THREE.LineLoop)
            (c.material as InstanceType<typeof THREE.Material>).dispose();
        });
        satGeometry.dispose();
        satMaterial.dispose();
        dustGeometry.dispose();
        dustMaterial.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, [arts]);

  const current = items[Math.min(active, items.length - 1)];
  const jump = (i: number) =>
    listRef.current?.children[i]?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <div className="stx" ref={rootRef} style={{ "--stx-n": items.length } as CSSProperties}>
      <div className="stx-stage">
        <div className="stx-canvas" ref={hostRef} aria-hidden="true" />
        <i className="stx-corner c-tl" aria-hidden="true" />
        <i className="stx-corner c-tr" aria-hidden="true" />
        <i className="stx-corner c-bl" aria-hidden="true" />
        <i className="stx-corner c-br" aria-hidden="true" />
        <div className="stx-hud" aria-hidden="true">
          <span className="stx-hud-idx">
            Case <b>{pad(active + 1)}</b> / {pad(items.length)}
          </span>
          <span className="stx-hud-live">
            <i />
            Live model
          </span>
        </div>
        <div className="stx-foot">
          <span className="stx-model" key={active} aria-hidden="true">
            {models[current.art]}
          </span>
          <nav className="stx-rail" aria-label="Use cases">
            {items.map((c, i) => (
              <button
                key={c.title}
                type="button"
                className={i === active ? "on" : undefined}
                aria-label={`Case ${i + 1}: ${c.title}`}
                aria-current={i === active ? "step" : undefined}
                onClick={() => jump(i)}
              >
                {pad(i + 1)}
              </button>
            ))}
            <span className="stx-track" aria-hidden="true">
              <span />
            </span>
          </nav>
        </div>
      </div>

      <ol className="stx-list" ref={listRef}>
        {items.map((c, i) => (
          <li
            key={c.title}
            className={["stx-item", i === active && "on"].filter(Boolean).join(" ")}
          >
            <article>
              <div className="stx-meta">
                <span className="stx-num">{pad(i + 1)}</span>
              </div>
              <div className="stx-cat">{c.category}</div>
              <h3>{c.title}</h3>
              <dl className="stx-csr">
                <div>
                  <dt>Challenge</dt>
                  <dd>{c.challenge}</dd>
                </div>
                <div>
                  <dt>Solution</dt>
                  <dd>{c.solution}</dd>
                </div>
                {/* Impact appears only once a client has approved verified results. */}
                {c.impact && (
                  <div>
                    <dt>Impact</dt>
                    <dd>{c.impact}</dd>
                  </div>
                )}
              </dl>
              {c.metrics.length > 0 && (
                <ul className="stx-metrics" aria-label="Measured">
                  {c.metrics.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              )}
              <Link href="/work" className="stx-link">
                Learn more <Icon name="i-arrow" width={16} height={16} />
              </Link>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
