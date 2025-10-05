import { useState, useEffect } from 'react';
import { AlertTriangle, Circle, TrendingUp } from 'lucide-react';

interface Asteroid {
  id: number;
  name: string;
  diameter_km: number;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  distance_au: number;
  next_approach_date: string;
}

export default function AsteroidRiskList() {
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAsteroids();
  }, []);

  const fetchAsteroids = async () => {
    try {
      const response = await fetch('/api/asteroids');
      if (response.ok) {
        const data = await response.json();
        setAsteroids(data);
      } 
      else 
        {
        // Fallback data for demo
        setAsteroids([
          {
            id: 1,
            name: '2025 RX',
            diameter_km: 0.5,
            risk_level: 'MEDIUM',
            distance_au: 0.02,
            next_approach_date: '2025-03-15'
          },
          {
            id: 2,
            name: 'Apophis',
            diameter_km: 0.34,
            risk_level: 'HIGH',
            distance_au: 0.0003,
            next_approach_date: '2029-04-13'
          },
          {
            id: 3,
            name: 'Bennu',
            diameter_km: 0.49,
            risk_level: 'LOW',
            distance_au: 0.08,
            next_approach_date: '2135-09-25'
          },
          {
            id: 4,
            name: '1950 DA',
            diameter_km: 1.1,
            risk_level: 'CRITICAL',
            distance_au: 0.015,
            next_approach_date: '2880-03-16'
          },
          {
            id: 5,
            name: 'Didymos',
            diameter_km: 0.78,
            risk_level: 'LOW',
            distance_au: 0.07,
            next_approach_date: '2026-10-14'
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching asteroids:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'LOW': return 'text-green-400 border-green-500';
      case 'MEDIUM': return 'text-yellow-400 border-yellow-500';
      case 'HIGH': return 'text-orange-400 border-orange-500';
      case 'CRITICAL': return 'text-red-400 border-red-500';
      default: return 'text-gray-400 border-gray-500';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'CRITICAL':
      case 'HIGH':
        return <AlertTriangle className="w-4 h-4" />;
      case 'MEDIUM':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Asteroid Risk Assessment</h3>
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-slate-700/50 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-orange-400" />
        Asteroid Risk Assessment
      </h3>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {asteroids.map((asteroid) => (
          <div key={asteroid.id} className="bg-slate-900/50 border border-slate-600 rounded-lg p-4 hover:bg-slate-900/80 transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-white">{asteroid.name}</h4>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${getRiskColor(asteroid.risk_level)}`}>
                {getRiskIcon(asteroid.risk_level)}
                {asteroid.risk_level}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
              <div>
                <span className="block">Diameter: {asteroid.diameter_km} km</span>
                <span className="block">Distance: {asteroid.distance_au} AU</span>
              </div>
              <div>
                <span className="block">Next Approach:</span>
                <span className="block text-white">{new Date(asteroid.next_approach_date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}