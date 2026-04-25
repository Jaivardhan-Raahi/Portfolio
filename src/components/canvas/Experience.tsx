'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Component: Data Network (Pipes & Particles) ---
function DataNetwork() {
  const pipes = useMemo(() => {
    const results = [];
    const pipeCount = 6;
    for (let i = 0; i < pipeCount; i++) {
      // Uniform spherical distribution for endpoints
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.acos(2 * Math.random() - 1);
      const r = 15 + Math.random() * 10;

      const endPoint = new THREE.Vector3(
        r * Math.sin(theta) * Math.cos(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(theta) - 5 // Slight offset to keep them mostly in midground
      );

      const midPoint = new THREE.Vector3(
        endPoint.x * 0.4 + (Math.random() - 0.5) * 10,
        endPoint.y * 0.4 + (Math.random() - 0.5) * 10,
        endPoint.z * 0.4 + (Math.random() - 0.5) * 10
      );

      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        midPoint,
        endPoint,
      ]);
      results.push(curve);
    }
    return results;
  }, []);

  return (
    <group>
      {pipes.map((curve, i) => (
        <group key={i}>
          {/* Minimalist Conduits */}
          <mesh>
            <tubeGeometry args={[curve, 64, 0.015, 8, false]} />
            <meshStandardMaterial 
              color="#00f2ff" 
              transparent 
              opacity={0.1} 
              emissive="#00f2ff" 
              emissiveIntensity={0.3} 
            />
          </mesh>
          {/* Subtle Data Packets */}
          <DataPacket curve={curve} delay={0} />
          <DataPacket curve={curve} delay={0.5} />
        </group>
      ))}
    </group>
  );
}

function DataPacket({ curve, delay }: { curve: THREE.CatmullRomCurve3, delay: number }) {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const t = (state.clock.getElapsedTime() * 0.25 + delay) % 1;
    const point = curve.getPoint(t);
    if (ref.current) {
      ref.current.position.copy(point);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshBasicMaterial color="#00f2ff" />
      <pointLight color="#00f2ff" intensity={1} distance={3} />
    </mesh>
  );
}

// --- Component: Main System Core ---
function Core() {
  const coreRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    tl.to(camera.position, { z: -12, ease: "none" }, 0);
    tl.to(coreRef.current!.scale, { x: 1.4, y: 1.4, z: 1.4, ease: "none" }, 0);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      tl.kill();
    };
  }, [camera]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 1.5) * 0.04;
      coreRef.current.scale.set(pulse, pulse, pulse);
      coreRef.current.rotation.y = t * 0.08;
    }

    if (meshRef.current) {
      // Reverting to the "perfect" brightness and emissive levels
      (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 1 + Math.sin(t * 3) * 0.5;
    }

    const targetX = mouse.current.x * 1.2;
    const targetY = mouse.current.y * 1.2;
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.lookAt(0, 0, camera.position.z - 10);
  });

  return (
    <group ref={coreRef}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 15]} />
        <meshStandardMaterial 
          color="#001a33" 
          emissive="#00f2ff" 
          emissiveIntensity={1.5} 
          wireframe 
        />
      </mesh>
      
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <MeshDistortMaterial 
          color="#00f2ff" 
          speed={2.5} 
          distort={0.4} 
          radius={1} 
          emissive="#00f2ff" 
          emissiveIntensity={1.8}
        />
      </mesh>
      
      <pointLight intensity={4} color="#00f2ff" distance={12} />
    </group>
  );
}

export default function Experience() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={75} />
        <color attach="background" args={['#010103']} />
        <fog attach="fog" args={['#010103', 5, 35]} />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f2ff" />
        
        <Core />
        <DataNetwork />
        
        {Array.from({ length: 150 }).map((_, i) => (
          <mesh key={i} position={[(Math.random()-0.5)*60, (Math.random()-0.5)*60, (Math.random()-0.5)*60 - 15]}>
            <sphereGeometry args={[0.025, 6, 6]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
          </mesh>
        ))}
      </Canvas>
    </div>
  );
}
