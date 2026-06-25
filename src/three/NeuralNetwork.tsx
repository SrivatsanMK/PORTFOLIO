import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NeuralNetworkProps {
  nodeCount?: number;
  connectionDistance?: number;
}

export const NeuralNetwork: React.FC<NeuralNetworkProps> = ({
  nodeCount = 80,
  connectionDistance = 3.5,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Generate random node positions
  const nodePositions = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      positions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        )
      );
    }
    return positions;
  }, [nodeCount]);

  // Generate connections between nearby nodes
  const lineGeometry = useMemo(() => {
    const points: number[] = [];
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < connectionDistance) {
          points.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          );
        }
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    return geometry;
  }, [nodePositions, connectionDistance]);

  // Instanced mesh for nodes
  const nodeGeometry = useMemo(() => new THREE.SphereGeometry(0.08, 8, 8), []);
  const nodeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#00D4FF',
        emissive: '#00D4FF',
        emissiveIntensity: 0.6,
        roughness: 0.1,
        metalness: 0.9,
      }),
    []
  );
  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: '#00D4FF',
        transparent: true,
        opacity: 0.15,
      }),
    []
  );

  // Set instance positions
  useMemo(() => {
    if (!nodesRef.current) return;
    const dummy = new THREE.Object3D();
    nodePositions.forEach((pos, i) => {
      dummy.position.copy(pos);
      dummy.updateMatrix();
      nodesRef.current!.setMatrixAt(i, dummy.matrix);
    });
    nodesRef.current.instanceMatrix.needsUpdate = true;
  }, [nodePositions]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.04;
      groupRef.current.rotation.x = Math.sin(t * 0.02) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={nodesRef}
        args={[nodeGeometry, nodeMaterial, nodeCount]}
      />
      <lineSegments ref={linesRef} geometry={lineGeometry} material={lineMaterial} />
    </group>
  );
};
