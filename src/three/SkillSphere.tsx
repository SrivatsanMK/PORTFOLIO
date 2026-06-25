import { useRef, useMemo, useState } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface SkillSphereProps {
  words: string[];
  radius?: number;
}

interface WordProps {
  position: [number, number, number];
  word: string;
  index: number;
}

const Word: React.FC<WordProps> = ({ position, word }) => {
  const [hovered, setHovered] = useState(false);

  const color = hovered ? '#00D4FF' : '#ffffff';
  const fontSize = hovered ? 0.25 : 0.18;

  return (
    <Text
      position={position}
      fontSize={fontSize}
      color={color}
      anchorX="center"
      anchorY="middle"
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {word}
    </Text>
  );
};

export const SkillSphere: React.FC<SkillSphereProps> = ({
  words,
  radius = 5,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  const positions = useMemo<[number, number, number][]>(() => {
    const count = words.length;
    return words.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      return [
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi),
      ];
    });
  }, [words, radius]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.12;
      groupRef.current.rotation.x = Math.sin(t * 0.08) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {words.map((word, i) => (
        <Word key={word} position={positions[i]} word={word} index={i} />
      ))}
    </group>
  );
};
