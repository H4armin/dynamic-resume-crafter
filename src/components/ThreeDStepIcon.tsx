
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Group } from 'three';

interface ThreeDStepIconProps {
  step: number;
  color?: string;
}

const FormIcon = ({ color = '#ff4d4d' }) => {
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 2, 0.1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Form lines */}
      {[-0.5, 0, 0.5].map((y, i) => (
        <mesh key={i} position={[-0.2, y, 0.06]}>
          <boxGeometry args={[0.8, 0.1, 0.1]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}
      {/* Form checkbox */}
      <mesh position={[0.45, 0.5, 0.06]}>
        <boxGeometry args={[0.2, 0.2, 0.1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};

const TemplateIcon = ({ color = '#4da6ff' }) => {
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 0.1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Template layout elements */}
      <mesh position={[-0.5, 0.7, 0.06]}>
        <boxGeometry args={[0.8, 0.3, 0.05]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.5, 0, 0.06]}>
        <boxGeometry args={[0.8, 1, 0.05]} />
        <meshStandardMaterial color="#ffffff" opacity={0.5} transparent />
      </mesh>
      <mesh position={[0.5, 0.3, 0.06]}>
        <boxGeometry args={[0.8, 1.4, 0.05]} />
        <meshStandardMaterial color="#ffffff" opacity={0.7} transparent />
      </mesh>
    </group>
  );
};

const DocumentIcon = ({ color = '#4dff88' }) => {
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* PDF page */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.6, 2, 0.05]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* PDF header */}
      <mesh position={[0, 0.8, 0.06]}>
        <boxGeometry args={[1.4, 0.3, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* PDF content lines */}
      {[-0.2, -0.5, -0.8].map((y, i) => (
        <mesh key={i} position={[0, y, 0.06]}>
          <boxGeometry args={[1.2, 0.1, 0.05]} />
          <meshStandardMaterial color="#dddddd" />
        </mesh>
      ))}
      
      {/* PDF corner fold */}
      <mesh position={[0.55, 0.75, 0.03]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.4, 0.4, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

const ThreeDStepIcon: React.FC<ThreeDStepIconProps> = ({ step, color }) => {
  return (
    <div className="h-48 w-full">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        {step === 1 && <FormIcon color={color} />}
        {step === 2 && <TemplateIcon color={color} />}
        {step === 3 && <DocumentIcon color={color} />}
        <OrbitControls enableZoom={false} autoRotate={false} />
      </Canvas>
      <div className="absolute top-2 left-2 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold z-10">
        {step}
      </div>
    </div>
  );
};

export default ThreeDStepIcon;
