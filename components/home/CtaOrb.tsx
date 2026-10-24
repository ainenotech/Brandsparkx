"use client";

import { useEffect, useRef } from "react";

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aSeed;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 p = position;
    // Slow breathing ripple across the surface.
    float n = sin(p.x * 3.0 + uTime * 0.8 + aSeed * 6.2832) * 0.5
            + sin(p.y * 4.0 - uTime * 0.6) * 0.5;
    p *= 1.0 + n * 0.05;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.6 + aSeed * 2.2) * uPixelRatio * (3.4 / -mv.z);
    vColor = aColor;
    // Points on the far side fade back, which gives the sphere depth.
    vAlpha = mix(0.12, 1.0, smoothstep(-4.4, -2.4, mv.z));
  }
`;

const fragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    gl_FragColor = vec4(vColor, smoothstep(0.5, 0.0, d) * vAlpha);
  }
`;

/**
 * A slowly turning particle sphere with two orbit rings, drawn with three.js.
 * three is imported on demand, rendering pauses off screen, and reduced motion gets a still frame.
 */
export function CtaOrb() {
  const hostRef = useRef<HTMLDivElement>(null);

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
        return; // No WebGL: the card's CSS glow stands in.
      }
      const dpr = Math.min(window.devicePixelRatio, 2);
      renderer.setPixelRatio(dpr);
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 20);
      camera.position.z = 3.4;
      const group = new THREE.Group();
      group.rotation.x = 0.35;
      scene.add(group);

      // Points spread evenly over a sphere (Fibonacci lattice); a few are brand red.
      const count = 2200;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const seeds = new Float32Array(count);
      const white = new THREE.Color("#ececf0");
      const red = new THREE.Color("#ff4d40");
      const golden = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const t = golden * i;
        positions.set([Math.cos(t) * r, y, Math.sin(t) * r], i * 3);
        const c = Math.random() < 0.07 ? red : white;
        colors.set([c.r, c.g, c.b], i * 3);
        seeds[i] = Math.random();
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
      const material = new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms: { uTime: { value: 0 }, uPixelRatio: { value: dpr } },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      group.add(new THREE.Points(geometry, material));

      // Two thin orbit rings, each carrying a small red satellite.
      const ringGeometry = new THREE.BufferGeometry().setFromPoints(
        new THREE.EllipseCurve(0, 0, 1.45, 1.45)
          .getPoints(160)
          .map((p) => new THREE.Vector3(p.x, p.y, 0)),
      );
      const ringMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.14,
      });
      const satGeometry = new THREE.SphereGeometry(0.03, 16, 16);
      const satMaterial = new THREE.MeshBasicMaterial({ color: 0xff4d40 });
      const orbits = [
        { tilt: new THREE.Euler(1.2, 0.3, 0), speed: 0.5 },
        { tilt: new THREE.Euler(1.75, -0.5, 0.4), speed: -0.35 },
      ].map(({ tilt, speed }) => {
        const orbit = new THREE.Group();
        orbit.rotation.copy(tilt);
        orbit.add(new THREE.LineLoop(ringGeometry, ringMaterial));
        const sat = new THREE.Mesh(satGeometry, satMaterial);
        orbit.add(sat);
        scene.add(orbit);
        return { sat, speed };
      });

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = host;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(resize);
      ro.observe(host);
      resize();

      // The orb leans gently toward the pointer.
      const target = { x: 0, y: 0 };
      const card = host.parentElement ?? host;
      const onMove = (e: PointerEvent) => {
        const r = card.getBoundingClientRect();
        target.x = ((e.clientX - r.left) / r.width - 0.5) * 0.6;
        target.y = ((e.clientY - r.top) / r.height - 0.5) * 0.4;
      };
      card.addEventListener("pointermove", onMove);

      const clock = new THREE.Clock();
      let elapsed = 0;
      const draw = () => {
        const dt = Math.min(clock.getDelta(), 0.05);
        elapsed += dt;
        material.uniforms.uTime.value = elapsed;
        group.rotation.y += dt * 0.12;
        group.rotation.x += (0.35 + target.y - group.rotation.x) * 0.05;
        scene.rotation.y += (target.x - scene.rotation.y) * 0.05;
        for (const { sat, speed } of orbits) {
          const a = elapsed * speed;
          sat.position.set(Math.cos(a) * 1.45, Math.sin(a) * 1.45, 0);
        }
        renderer.render(scene, camera);
      };

      const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const io = new IntersectionObserver(([entry]) => {
        clock.getDelta();
        renderer.setAnimationLoop(entry.isIntersecting ? draw : null);
      });
      if (still) draw();
      else io.observe(host);

      cleanup = () => {
        io.disconnect();
        ro.disconnect();
        card.removeEventListener("pointermove", onMove);
        renderer.setAnimationLoop(null);
        geometry.dispose();
        material.dispose();
        ringGeometry.dispose();
        ringMaterial.dispose();
        satGeometry.dispose();
        satMaterial.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div className="sx-orb3d" ref={hostRef} aria-hidden="true" />;
}
