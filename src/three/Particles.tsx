import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  count?: number;
}

export const Particles: React.FC<ParticlesProps> = ({ count = 200 }) => {
  const mesh = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = 0;
    }

    return { positions, velocities };
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: '#7C3AED',
        size: 0.05,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
      }),
    []
  );

  useFrame(() => {
    if (!mesh.current) return;
    const pos = mesh.current.geometry.attributes.position;
    const arr = pos.array as Float32Array;

    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3] + mouse.x * 0.002;
      arr[i * 3 + 1] += velocities[i * 3 + 1] + mouse.y * 0.002;

      // Wrap around
      if (Math.abs(arr[i * 3]) > 20) arr[i * 3] *= -0.95;
      if (Math.abs(arr[i * 3 + 1]) > 20) arr[i * 3 + 1] *= -0.95;
    }

    pos.needsUpdate = true;
    mesh.current.rotation.z += 0.0002;
  });

  return <points ref={mesh} geometry={geometry} material={material} />;
};
