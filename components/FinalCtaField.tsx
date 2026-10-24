"use client";

import { useEffect, useRef } from "react";

/** How many click/tap pulses can travel across the field at once. */
const RIPPLES = 5;
/** Seconds a pulse lives before it fades out. */
const RIPPLE_LIFE = 4;

const vertex = /* glsl */ `
  #define RIPPLES ${RIPPLES}
  uniform float uTime;
  uniform float uPixelRatio;
  uniform vec2 uPointer;
  uniform float uHover;
  uniform vec3 uRipples[RIPPLES];
  varying float vEnergy;
  varying float vAlpha;
  varying float vCrest;

  void main() {
    vec3 p = position;
    float t = uTime;
    // Layered slow swells, like a calm sea of signal.
    float h = sin(p.x * 0.55 + t * 0.55) * 0.16
            + sin(p.z * 0.8 - t * 0.42) * 0.12
            + sin((p.x + p.z) * 0.32 + t * 0.3) * 0.2;

    // The pointer lifts a soft hill under it.
    float d = distance(p.xz, uPointer);
    float lift = exp(-d * d * 0.55) * uHover;
    h += lift * 0.85;
    float energy = lift;

    // Each pulse is a ring travelling outward from where it was sent.
    for (int i = 0; i < RIPPLES; i++) {
      float age = t - uRipples[i].z;
      if (age < 0.0 || age > ${RIPPLE_LIFE.toFixed(1)}) continue;
      float r = age * 3.4;
      float fade = 1.0 - age / ${RIPPLE_LIFE.toFixed(1)};
      float ring = exp(-pow(distance(p.xz, uRipples[i].xy) - r, 2.0) * 2.4) * fade;
      h += ring * 0.55;
      energy += ring;
    }
    p.y += h;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    vEnergy = clamp(energy, 0.0, 1.0);
    vCrest = clamp(h * 1.6 + 0.5, 0.0, 1.0);
    gl_PointSize = (2.1 + h * 0.8 + vEnergy * 3.0) * uPixelRatio * (6.0 / -mv.z);
    // Far rows melt into the dark; the nearest row softens at the card's bottom edge.
    vAlpha = smoothstep(-30.0, -8.0, mv.z) * (1.0 - smoothstep(-3.0, -1.2, mv.z));
  }
`;

const fragment = /* glsl */ `
  varying float vEnergy;
  varying float vAlpha;
  varying float vCrest;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    // Wave crests catch more light than the troughs.
    vec3 base = vec3(0.8, 0.8, 0.88) * mix(0.55, 1.15, vCrest);
    vec3 hot = vec3(1.0, 0.3, 0.24);
    vec3 color = mix(base, hot, smoothstep(0.05, 0.6, vEnergy));
    float alpha = mix(0.6, 1.0, vEnergy) * vAlpha;
    gl_FragColor = vec4(color, smoothstep(0.5, 0.05, d) * alpha);
  }
`;

/**
 * Interactive "signal field" behind the final call to action: a wide plane of points rolling in
 * slow waves. The pointer raises a glowing hill under it and a click or tap sends a red pulse
 * across the field; while nobody touches it, a pulse goes out on its own every few seconds.
 * three is imported on demand, rendering pauses off screen, and reduced motion gets a still frame.
 */
export function FinalCtaField() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const card = host?.parentElement;
    if (!host || !card) return;
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
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 60);
      camera.position.set(1.5, 2.6, 6.5);
      camera.lookAt(1.5, -0.2, -3);

      // A flat grid of points on y=0; the shader shapes it into waves.
      const step = 0.3;
      const xs = Math.round(44 / step);
      const zs = Math.round(20 / step);
      const positions = new Float32Array(xs * zs * 3);
      for (let i = 0; i < xs; i++) {
        for (let j = 0; j < zs; j++) {
          positions.set([-20.5 + i * step, 0, -16 + j * step], (i * zs + j) * 3);
        }
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const ripples = Array.from({ length: RIPPLES }, () => new THREE.Vector3(0, 0, -100));
      const material = new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: dpr },
          uPointer: { value: new THREE.Vector2(0, -100) },
          uHover: { value: 0 },
          uRipples: { value: ripples },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      scene.add(new THREE.Points(geometry, material));

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

      // Pointer → point on the ground plane, through the camera.
      const raycaster = new THREE.Raycaster();
      const ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
      const ndc = new THREE.Vector2();
      const hit = new THREE.Vector3();
      const toGround = (e: PointerEvent) => {
        const r = host.getBoundingClientRect();
        ndc.set(
          ((e.clientX - r.left) / r.width) * 2 - 1,
          -((e.clientY - r.top) / r.height) * 2 + 1,
        );
        raycaster.setFromCamera(ndc, camera);
        return raycaster.ray.intersectPlane(ground, hit);
      };

      const timer = new THREE.Timer();
      let elapsed = 0;
      let hovering = false;
      let lastTouch = -10;
      let nextAuto = 1.2;
      let slot = 0;
      const pointer = new THREE.Vector2(0, -100);
      const pointerGoal = new THREE.Vector2(0, -100);

      const pulse = (x: number, z: number) => {
        ripples[slot].set(x, z, elapsed);
        slot = (slot + 1) % RIPPLES;
      };
      const onMove = (e: PointerEvent) => {
        const p = toGround(e);
        if (!p) return;
        // Snap on entry so the hill rises where the pointer is, then trail it smoothly.
        if (!hovering) pointer.set(p.x, p.z);
        pointerGoal.set(p.x, p.z);
        hovering = true;
        lastTouch = elapsed;
      };
      const onLeave = () => {
        hovering = false;
      };
      const onDown = (e: PointerEvent) => {
        const p = toGround(e);
        if (!p) return;
        pulse(p.x, p.z);
        lastTouch = elapsed;
        card.dataset.touched = "";
      };
      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
      card.addEventListener("pointerdown", onDown);

      const draw = () => {
        timer.update();
        const dt = Math.min(timer.getDelta(), 0.05);
        elapsed += dt;
        const u = material.uniforms;
        u.uTime.value = elapsed;
        pointer.lerp(pointerGoal, 1 - Math.pow(0.002, dt));
        u.uPointer.value.copy(pointer);
        u.uHover.value += ((hovering ? 1 : 0) - u.uHover.value) * (1 - Math.pow(0.02, dt));
        // Left alone, the field sends out its own pulse every few seconds.
        if (elapsed - lastTouch > 3 && elapsed > nextAuto) {
          pulse(-2 + Math.random() * 10, -7 + Math.random() * 6);
          nextAuto = elapsed + 3.5 + Math.random() * 2;
        }
        renderer.render(scene, camera);
      };

      card.dataset.live = "";
      const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const io = new IntersectionObserver(([entry]) => {
        timer.update(); // drop the time spent off screen
        renderer.setAnimationLoop(entry.isIntersecting ? draw : null);
      });
      if (still) draw();
      else io.observe(host);

      cleanup = () => {
        io.disconnect();
        ro.disconnect();
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
        card.removeEventListener("pointerdown", onDown);
        delete card.dataset.live;
        renderer.setAnimationLoop(null);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div className="fcta-field" ref={hostRef} aria-hidden="true" />;
}
