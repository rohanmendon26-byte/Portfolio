"use client";

import {
  Canvas,
  useFrame,
  useThree,
} from "@react-three/fiber";

import * as THREE from "three";

import {
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";

import { scrollState } from "@/lib/scrollState";

/* =====================================================
   STAR / PARTICLE FIELD (WITH SCROLL VELOCITY WARP)
===================================================== */
function ParticleField({ isMobile, smoothVelocityRef }) {
  const pointsRef = useRef();
  const { pointer } = useThree();
  const count = isMobile ? 320 : 700;

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      array[i3] = (Math.random() - 0.5) * 35;
      array[i3 + 1] = (Math.random() - 0.5) * 25;
      array[i3 + 2] = (Math.random() - 0.5) * 40;
    }

    return array;
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const time = performance.now() * 0.001;
    const progress = scrollState.progress;
    const vel = smoothVelocityRef.current;

    // Speed up rotation & stretch during scroll velocity surge
    const speedMultiplier = (progress > 0.88 ? 0.3 : 1 + Math.sin(progress * Math.PI) * 1.2) + vel * 2.5;

    // Smooth continuous rotation with velocity boost
    pointsRef.current.rotation.y = time * 0.015 * speedMultiplier;
    pointsRef.current.rotation.x = time * 0.008 * speedMultiplier;
    pointsRef.current.rotation.z += vel * 0.02;

    // Mouse parallax
    pointsRef.current.position.x +=
      (pointer.x * 1.0 - pointsRef.current.position.x) * 0.04;
    pointsRef.current.position.y +=
      (pointer.y * 0.7 - pointsRef.current.position.y) * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={isMobile ? 0.04 : 0.034}
        color="#ffffff"
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
}

/* =====================================================
   SCROLL VELOCITY HYPERSPACE TUNNEL (WARP RINGS)
===================================================== */
function HyperspaceTunnel({ smoothVelocityRef }) {
  const groupRef = useRef();
  const ringCount = 14;

  const ringData = useMemo(() => {
    return Array.from({ length: ringCount }, (_, i) => ({
      id: i,
      baseZ: -24 + (i * 3.2),
      radius: 3.8 + (i % 3) * 0.4,
      color: i % 2 === 0 ? "#00f0ff" : "#a855f7",
    }));
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    const time = performance.now() * 0.001;
    const vel = smoothVelocityRef.current;
    const progress = scrollState.progress;

    // Fade out hyperspace tunnel rings smoothly when leaving Home (progress > 0.15)
    const heroFactor = 1 - THREE.MathUtils.smoothstep(progress, 0.08, 0.18);

    groupRef.current.children.forEach((mesh, idx) => {
      const data = ringData[idx];
      // Speed stream towards camera when scrolling fast during Hero
      let currentZ = mesh.position.z + (0.05 + vel * 0.8 * heroFactor);
      if (currentZ > 10) {
        currentZ = -24;
      }
      mesh.position.z = currentZ;

      // Scale up ring size dynamically on velocity surge (warp flare effect)
      const scaleVal = 1 + vel * 0.4 * heroFactor;
      mesh.scale.set(scaleVal, scaleVal, scaleVal);

      // Rotate rings continuously
      mesh.rotation.z = time * (idx % 2 === 0 ? 0.3 : -0.3) + vel * 0.5 * heroFactor;

      // Brighten ring glow during fast scroll in Hero, fade completely out in Origin and subsequent sections
      if (mesh.material) {
        mesh.material.opacity = THREE.MathUtils.lerp(0.08 * heroFactor, 0.45 * heroFactor, Math.min(vel * 1.5, 1));
      }
    });
  });

  return (
    <group ref={groupRef}>
      {ringData.map((ring) => (
        <mesh key={ring.id} position={[0, 0, ring.baseZ]}>
          <torusGeometry args={[ring.radius, 0.012, 16, 48]} />
          <meshBasicMaterial
            color={ring.color}
            transparent
            opacity={0.08}
            wireframe={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* =====================================================
   ENERGY CORE (CINEMATIC PULSE & EXPANSION)
===================================================== */
function EnergyCore() {
  const coreRef = useRef();
  const innerRef = useRef();

  useFrame(() => {
    if (!coreRef.current || !innerRef.current) return;
    const time = performance.now() * 0.001;
    const progress = scrollState.progress;

    // Outer & inner core rotation
    coreRef.current.rotation.x = time * 0.35;
    coreRef.current.rotation.y = time * 0.55;

    innerRef.current.rotation.x = -time * 0.45;
    innerRef.current.rotation.y = -time * 0.65;

    // Breathing pulse
    const pulse = 1 + Math.sin(time * 2.2) * 0.08;

    // Expand core smoothly at Final Chapter
    const finalExpand = THREE.MathUtils.lerp(1, 1.85, THREE.MathUtils.smoothstep(progress, 0.82, 1));
    const currentScale = pulse * finalExpand;

    coreRef.current.scale.set(currentScale, currentScale, currentScale);
    innerRef.current.scale.set(currentScale * 0.85, currentScale * 0.85, currentScale * 0.85);

    if (coreRef.current.material) {
      coreRef.current.material.opacity = THREE.MathUtils.lerp(0.18, 0.45, THREE.MathUtils.smoothstep(progress, 0.85, 1));
    }
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.6, 2]} />
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>

      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.9, 2]} />
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}

/* =====================================================
   ENERGY RINGS (GYROSCOPIC ROTATION)
===================================================== */
function EnergyRings() {
  const groupRef = useRef();

  useFrame(() => {
    if (!groupRef.current) return;
    const time = performance.now() * 0.001;
    const progress = scrollState.progress;

    groupRef.current.rotation.z = time * 0.18 + progress * Math.PI;
    groupRef.current.rotation.x = Math.sin(time * 0.35) * 0.25 + progress * 0.5;
    groupRef.current.rotation.y = time * 0.1;

    const finalHalo = THREE.MathUtils.smoothstep(progress, 0.85, 1);
    const ringScale = THREE.MathUtils.lerp(1, 1.4, finalHalo);
    groupRef.current.scale.set(ringScale, ringScale, ringScale);
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <torusGeometry args={[2.3, 0.015, 16, 60]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.28}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.8, 0.01, 16, 60]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.2}
        />
      </mesh>

      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[3.3, 0.008, 16, 60]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}

/* =====================================================
   FLOATING ENERGY PARTICLES (LOW POLY)
===================================================== */
function EnergyFragments() {
  const groupRef = useRef();

  const fragments = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 14,
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ],
      scale: 0.02 + Math.random() * 0.04,
    }));
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    const time = performance.now() * 0.001;
    groupRef.current.rotation.y = time * 0.035;
  });

  return (
    <group ref={groupRef}>
      {fragments.map((fragment) => (
        <mesh
          key={fragment.id}
          position={fragment.position}
          rotation={fragment.rotation}
          scale={fragment.scale}
        >
          <octahedronGeometry />
          <meshBasicMaterial
            color="#00f0ff"
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>
      ))}
    </group>
  );
}

/* =====================================================
   CAMERA CONTROLLER (DYNAMIC SCROLL VELOCITY FOV WARP)
===================================================== */
function CameraController({ smoothVelocityRef }) {
  const { camera } = useThree();

  useFrame(() => {
    const progress = scrollState.progress;
    const rawVel = scrollState.velocity || 0;

    // Smooth lerp velocity factor (normalized 0 to 1.8)
    const targetVelFactor = Math.min(rawVel / 1500, 1.8);
    smoothVelocityRef.current += (targetVelFactor - smoothVelocityRef.current) * 0.12;
    const vel = smoothVelocityRef.current;

    // Unified 7-Section Camera Trajectory
    let targetZ = 8.0;
    if (progress <= 0.15) {
      targetZ = THREE.MathUtils.lerp(8.0, 6.5, progress / 0.15);
    } else if (progress <= 0.30) {
      targetZ = THREE.MathUtils.lerp(6.5, 5.0, (progress - 0.15) / 0.15);
    } else if (progress <= 0.45) {
      targetZ = THREE.MathUtils.lerp(5.0, 3.8, (progress - 0.30) / 0.15);
    } else if (progress <= 0.60) {
      targetZ = THREE.MathUtils.lerp(3.8, 2.6, (progress - 0.45) / 0.15);
    } else if (progress <= 0.78) {
      targetZ = THREE.MathUtils.lerp(2.6, 3.6, (progress - 0.60) / 0.18);
    } else if (progress <= 0.90) {
      targetZ = THREE.MathUtils.lerp(3.6, 4.6, (progress - 0.78) / 0.12);
    } else {
      targetZ = THREE.MathUtils.lerp(4.6, 5.8, (progress - 0.90) / 0.10);
    }

    // Smooth lerp interpolation
    camera.position.z += (targetZ - camera.position.z) * 0.08;

    const targetX = Math.sin(progress * Math.PI * 4) * 1.2;
    camera.position.x += (targetX - camera.position.x) * 0.06;

    const targetY = Math.sin(progress * Math.PI * 3) * 0.9;
    camera.position.y += (targetY - camera.position.y) * 0.06;

    const targetRoll = Math.sin(progress * Math.PI * 4) * 0.035;
    camera.rotation.z += (targetRoll - camera.rotation.z) * 0.06;

    // Dynamic FOV hyperspace stretch boost ONLY during Hero transition
    const heroFactor = 1 - THREE.MathUtils.smoothstep(progress, 0.08, 0.18);
    const finalProgress = THREE.MathUtils.smoothstep(progress, 0.88, 1);
    const warpFovBoost = vel * 8.0 * heroFactor;
    const diveFov = 60 + Math.sin(progress * Math.PI) * 4 + finalProgress * 4 + warpFovBoost;

    if (Math.abs(diveFov - camera.fov) > 0.05) {
      camera.fov += (diveFov - camera.fov) * 0.08;
      camera.updateProjectionMatrix();
    }

    camera.lookAt(0, targetY * 0.2, 0);
  });

  return null;
}

/* =====================================================
   EXPERIENCE
===================================================== */
function Experience({ isMobile }) {
  const smoothVelocityRef = useRef(0);

  return (
    <>
      <CameraController smoothVelocityRef={smoothVelocityRef} />
      <HyperspaceTunnel smoothVelocityRef={smoothVelocityRef} />
      <ParticleField isMobile={isMobile} smoothVelocityRef={smoothVelocityRef} />
      <EnergyCore />
      <EnergyRings />
      <EnergyFragments />
    </>
  );
}

/* =====================================================
   MAIN SCENE (OPTIMIZED)
===================================================== */
export default function Scene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="scene">
      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 60,
        }}
        dpr={isMobile ? 1 : [1, 1.5]}
        gl={{ powerPreference: "high-performance", antialias: false, depth: true }}
      >
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 4, 28]} />
        <Experience isMobile={isMobile} />
      </Canvas>
    </div>
  );
}