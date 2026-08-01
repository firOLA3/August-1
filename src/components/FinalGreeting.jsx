import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, Stars, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import confetti from 'canvas-confetti';

function HeartModel(props) {
  const meshRef = useRef();

  const geometry = useMemo(() => {
    const x = 0, y = 0;
    const heartShape = new THREE.Shape();
    heartShape.moveTo(x + 5, y + 5);
    heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
    heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
    heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
    heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
    heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
    heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

    const extrudeSettings = { depth: 2, bevelEnabled: true, bevelSegments: 3, steps: 2, bevelSize: 1, bevelThickness: 1 };
    const geom = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

    geom.computeBoundingBox();
    const centerOffset = -0.5 * (geom.boundingBox.max.x - geom.boundingBox.min.x);
    const centerOffsetY = -0.5 * (geom.boundingBox.max.y - geom.boundingBox.min.y);
    geom.translate(centerOffset, centerOffsetY, -1);

    geom.rotateZ(Math.PI); // Heart draws upside down initially
    return geom;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.05;
      meshRef.current.scale.set(scale * 0.3, scale * 0.3, scale * 0.3);
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} {...props}>
      <meshPhysicalMaterial
        color="#ff0a54"
        metalness={0.2}
        roughness={0.1}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
        envMapIntensity={2.0}
      />
    </mesh>
  );
}

export default function FinalGreeting() {
  useEffect(() => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0a54', '#ff477e', '#ffb3c6']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff0a54', '#ff477e', '#ffb3c6']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', background: 'radial-gradient(circle at center, #2b0014, #000000)', zIndex: 1000 }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffb3c6" />
        <directionalLight position={[-10, -10, 10]} intensity={0.5} color="#ff0a54" />

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <HeartModel position={[0, 1, 0]} />
        </Float>

        <Html position={[0, -4, 0]} center zIndexRange={[100, 0]}>
          <div style={{ textAlign: 'center', width: '100vw', pointerEvents: 'none' }}>
            <h1 style={{ color: '#ffb3c6', fontSize: '4rem', margin: 0, textShadow: '0 0 20px rgba(255, 179, 198, 0.5)', fontFamily: 'Outfit, sans-serif', fontWeight: 800 }}>
              Happy Girlfriend's Day MOI DEBORAH!
            </h1>
            <p style={{ color: '#ffb3c6', fontSize: '2.5rem', margin: '10px 0 0 0', fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}>
              I love you so much EBAAAAAAAAAA❤️
            </p>
          </div>
        </Html>

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}