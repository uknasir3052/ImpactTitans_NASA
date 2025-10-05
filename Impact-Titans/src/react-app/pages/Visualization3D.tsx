import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';
import Navigation from '../components/Navigation';
import { Play, Pause, RotateCcw, Eye, EyeOff } from 'lucide-react';

interface AsteroidData {
  id: string;
  name: string;
  velocity: number;
  size: number;
  riskLevel: string;
  distance: number;
}

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (earthRef.current) earthRef.current.rotation.y += 0.002;
  });

  return (
    <Sphere ref={earthRef} args={[1, 64, 64]} position={[0, 0, 0]}>
      <meshStandardMaterial color="#4A90E2" roughness={0.7} metalness={0.2} />
      <Html position={[0, 1.2, 0]} center>
        <div className="bg-blue-500/80 text-white px-2 py-1 rounded text-xs">Earth</div>
      </Html>
    </Sphere>
  );
}
function Asteroid({
  asteroid,
  showAll,
  selectedAsteroid,
  isPlaying,
}: {
  asteroid: AsteroidData;
  showAll: boolean;
  selectedAsteroid: string | null;
  isPlaying: boolean;
}) {
  const asteroidRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (asteroidRef.current && isPlaying) {
      const time = state.clock.getElapsedTime();
      const radius = asteroid.distance;
      asteroidRef.current.position.x = Math.cos(time * asteroid.velocity * 0.00005) * radius;
      asteroidRef.current.position.z = Math.sin(time * asteroid.velocity * 0.00005) * radius;
    }
  });

  const visible = showAll || selectedAsteroid === asteroid.name;
  if (!visible) return null;

  // High-contrast colors
  const getRiskColor = (risk: string) =>
    risk === 'HIGH' ? '#FF3B30' : risk === 'MEDIUM' ? '#34C759' : '#FF9500';

  return (
    <group>
      <Sphere
        ref={asteroidRef}
        args={[asteroid.size * 2, 16, 16]} // Bigger size
        position={[asteroid.distance, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={getRiskColor(asteroid.riskLevel)}
          emissive={getRiskColor(asteroid.riskLevel)}
          emissiveIntensity={hovered ? 0.5 : 0.2} // Glow on hover
        />
      </Sphere>

      {hovered && (
        <Html position={[asteroid.distance, 0.2, 0]} center>
          <div className="bg-slate-900 border border-slate-600 rounded-lg p-3 text-white text-sm min-w-48">
            <h4 className="font-bold mb-2">{asteroid.name}</h4>
            <p>Velocity: {asteroid.velocity.toFixed(1)} km/s</p>
            <p>Size: {asteroid.size.toFixed(2)} km</p>
            <p>
              Risk:{' '}
              <span
                className={`font-bold ${
                  asteroid.riskLevel === 'HIGH'
                    ? 'text-red-400'
                    : asteroid.riskLevel === 'MEDIUM'
                    ? 'text-green-400'
                    : 'text-orange-400'
                }`}
              >
                {asteroid.riskLevel}
              </span>
            </p>
          </div>
        </Html>
      )}
    </group>
  );
}

function OrbitPath({ radius, color = '#ffffff', opacity = 0.3 }: { radius: number; color?: string; opacity?: number }) {
  const points = [];
  for (let i = 0; i <= 360; i += 5) {
    const angle = (i * Math.PI) / 180;
    points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  return <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color, transparent: true, opacity }))} />;
}

export default function Visualization() {
  const [asteroids, setAsteroids] = useState<AsteroidData[]>([]);
  const [selectedAsteroid, setSelectedAsteroid] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showOrbits, setShowOrbits] = useState(true);
  const [category, setCategory] = useState<'today' | 'week' | 'month'>('today');

  const API_KEY = 'DwWOc4v2hfaF1EWJxGwZxHQzi48jSdWWK1eqWEYD'; // replace with your NASA API key

  useEffect(() => {
    async function fetchAsteroids() {
      try {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');

        let startDate = `${yyyy}-${mm}-${dd}`;
        let endDate = startDate;

        if (category === 'week') {
          const nextWeek = new Date(today);
          nextWeek.setDate(today.getDate() + 7);
          const yyyy2 = nextWeek.getFullYear();
          const mm2 = String(nextWeek.getMonth() + 1).padStart(2, '0');
          const dd2 = String(nextWeek.getDate()).padStart(2, '0');
          endDate = `${yyyy2}-${mm2}-${dd2}`;
        } else if (category === 'month') {
          const nextMonth = new Date(today);
          nextMonth.setDate(today.getDate() + 30);
          const yyyy2 = nextMonth.getFullYear();
          const mm2 = String(nextMonth.getMonth() + 1).padStart(2, '0');
          const dd2 = String(nextMonth.getDate()).padStart(2, '0');
          endDate = `${yyyy2}-${mm2}-${dd2}`;
        }

        const res = await fetch(
          `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`
        );
        const data = await res.json();

        const neos: AsteroidData[] = [];
        Object.values(data.near_earth_objects).forEach((day: any) => {
          day.forEach((obj: any) => {
            const estDiameter = obj.estimated_diameter.kilometers.estimated_diameter_max;
            const velocity = parseFloat(obj.close_approach_data[0]?.relative_velocity?.kilometers_per_second || '10');
            const missDistance = parseFloat(obj.close_approach_data[0]?.miss_distance?.lunar || '50');
            const hazard = obj.is_potentially_hazardous_asteroid;

            neos.push({
              id: obj.id,
              name: obj.name,
              velocity,
              size: Math.min(0.15, estDiameter / 10),
              distance: Math.max(1.5, missDistance / 10),
              riskLevel: hazard ? 'HIGH' : velocity > 25 ? 'MEDIUM' : 'LOW',
            });
          });
        });

        setAsteroids(neos);
        setSelectedAsteroid(neos[0]?.name || null);
      } catch (error) {
        console.error('Error fetching NASA data:', error);
      }
    }

    fetchAsteroids();
  }, [category]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />

      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-left">
          <h1 className="text-4xl font-bold text-white mb-2">3D Asteroid Visualization</h1>
          <p className="text-gray-300">
            Interactive 3D view of near-Earth asteroids and their orbital paths
          </p>
        </div>

        {/* Category Selector */}
        <div className="flex space-x-4 mb-6">
          {['today', 'week', 'month'].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c as 'today' | 'week' | 'month')}
              className={`px-4 py-2 rounded-lg text-white font-medium transition-all ${category === c ? 'bg-blue-600' : 'bg-slate-700 hover:bg-slate-600'
                }`}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Controls</h3>
              <div className="space-y-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${isPlaying ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-gray-300'
                    }`}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? 'Pause' : 'Play'}
                </button>

                <button
                  onClick={() => setShowAll(!showAll)}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${showAll ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-gray-300'
                    }`}
                >
                  {showAll ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showAll ? 'Hide Others' : 'Show All'}
                </button>

                <button
                  onClick={() => setShowOrbits(!showOrbits)}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${showOrbits ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-gray-300'
                    }`}
                >
                  <RotateCcw className="w-4 h-4" />
                  {showOrbits ? 'Hide Orbits' : 'Show Orbits'}
                </button>
              </div>
            </div>

            {/* Asteroid List */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Select Asteroid</h3>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {asteroids.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setSelectedAsteroid(a.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all ${selectedAsteroid === a.name
                      ? 'bg-orange-500/20 border border-orange-500/30 text-orange-400'
                      : 'bg-slate-700/50 hover:bg-slate-700 text-gray-300'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{a.name}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${a.riskLevel === 'HIGH'
                          ? 'bg-red-500/20 text-red-400'
                          : a.riskLevel === 'MEDIUM'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-green-500/20 text-green-400'
                          }`}
                      >
                        {a.riskLevel}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3D Scene */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4 h-96 lg:h-[600px]">
              <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
                {/* Lights */}
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                {/* Stars Background */}
                <points>
                  <bufferGeometry>
                    <bufferAttribute
                      attach="attributes-position"
                      args={[
                        new Float32Array(
                          Array.from({ length: 5000 * 3 }, () => (Math.random() - 0.5) * 50)
                        ),
                        3, // itemSize
                      ]}
                    />
                  </bufferGeometry>
                  <pointsMaterial
                    size={0.05}
                    color="#ffffff"
                    opacity={0.7}
                    transparent
                    sizeAttenuation
                  />
                </points>



                {/* Earth */}
                <Earth />

                {/* Orbits */}
                {showOrbits &&
                  asteroids.map((a) => (
                    <OrbitPath
                      key={`orbit-${a.id}`}
                      radius={a.distance}
                      color={a.riskLevel === 'HIGH' ? '#EF4444' : a.riskLevel === 'MEDIUM' ? '#F59E0B' : '#10B981'}
                      opacity={selectedAsteroid === a.name ? 0.6 : 0.2}
                    />
                  ))}

                {/* Asteroids */}
                {asteroids.map((a) => (
                  <Asteroid
                    key={a.id}
                    asteroid={{ ...a, size: a.size * 1.2 }} // Slightly bigger
                    showAll={showAll}
                    selectedAsteroid={selectedAsteroid}
                    isPlaying={isPlaying}
                  />
                ))}

                <OrbitControls enablePan enableZoom enableRotate />
              </Canvas>
            </div>

            {/* Info Panel */}
            <div className="mt-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-gray-400 text-sm">Selected Object</p>
                  <p className="text-white font-semibold">{selectedAsteroid || 'None'}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Visible Objects</p>
                  <p className="text-white font-semibold">{showAll ? asteroids.length : 1}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Animation</p>
                  <p className="text-white font-semibold">{isPlaying ? 'Playing' : 'Paused'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
