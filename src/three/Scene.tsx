import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import { NeuralNetwork } from './NeuralNetwork';
import { Particles } from './Particles';

interface SceneProps {
  type?: 'hero' | 'ambient';
}

export const Scene: React.FC<SceneProps> = ({ type = 'hero' }) => {
  return (
    <Canvas
      style={{ position: 'absolute', inset: 0 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 18]} fov={60} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00D4FF" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7C3AED" />
      <fog attach="fog" args={['#0A0A0A', 20, 60]} />

      <Suspense fallback={null}>
        <NeuralNetwork nodeCount={type === 'hero' ? 80 : 40} />
        <Particles count={type === 'hero' ? 200 : 80} />
      </Suspense>

      {type === 'hero' && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
        />
      )}
    </Canvas>
  );
};
