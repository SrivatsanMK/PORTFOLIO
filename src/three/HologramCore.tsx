import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const HologramCore: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Generate a particle cloud orbiting the core
  const particles = useMemo(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);
      const r = THREE.MathUtils.randFloat(2.2, 3.8);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      randoms[i] = Math.random();
    }
    return { positions, randoms };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Rotate the inner core mesh
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15;
      meshRef.current.rotation.y = t * 0.25;
    }
    
    // Rotate orbiting rings
    if (ringRef1.current) {
      ringRef1.current.rotation.x = t * 0.3;
      ringRef1.current.rotation.y = t * 0.1;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y = -t * 0.2;
      ringRef2.current.rotation.z = t * 0.15;
    }

    // Spin particle cloud and apply breathing wave effect
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.08;
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particles.positions.length / 3; i++) {
        const idx = i * 3;
        const wave = Math.sin(t * 1.5 + particles.randoms[i] * 8) * 0.04;
        const factor = 1 + wave;
        positions[idx] = particles.positions[idx] * factor;
        positions[idx + 1] = particles.positions[idx + 1] * factor;
        positions[idx + 2] = particles.positions[idx + 2] * factor;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group scale={1.2}>
      {/* Central Holographic Distorted Mesh */}
      <Float speed={3} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.3, 2]} />
          <MeshDistortMaterial
            color="#00D4FF"
            emissive="#00D4FF"
            emissiveIntensity={0.6}
            roughness={0.1}
            metalness={0.9}
            distort={0.35}
            speed={2}
            wireframe
          />
        </mesh>
      </Float>

      {/* Orbiting Ring 1 (Purple) */}
      <mesh ref={ringRef1}>
        <torusGeometry args={[2.2, 0.015, 12, 80]} />
        <meshBasicMaterial color="#7C3AED" transparent opacity={0.5} wireframe />
      </mesh>

      {/* Orbiting Ring 2 (Blue) */}
      <mesh ref={ringRef2}>
        <torusGeometry args={[2.8, 0.012, 8, 80]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.3} wireframe />
      </mesh>

      {/* Glow Center Sphere Core */}
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.15} />
      </mesh>

      {/* Particle Cloud (Blue) */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles.positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00D4FF"
          size={0.06}
          transparent
          opacity={0.7}
          sizeAttenuation
        />
      </points>

      {/* Orbiting Particles (Purple) */}
      <points rotation={[0.4, -0.4, 0.2]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles.positions.slice().reverse(), 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#7C3AED"
          size={0.045}
          transparent
          opacity={0.55}
          sizeAttenuation
        />
      </points>
    </group>
  );
};
