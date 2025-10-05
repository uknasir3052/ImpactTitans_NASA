import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Zap, MapPin, Calculator, AlertTriangle } from 'lucide-react';
import Navigation from '@/react-app/components/Navigation';
import ImpactMap from '@/react-app/components/ImpactMap';

interface SimulationResult {
  crater_diameter_km: number;
  tnt_equivalent_megatons: number;
  seismic_magnitude: number;
  casualties_estimate: number;
  impact_location: string;
  asteroid_size_km: number;
  impact_velocity_km_s: number;
}

export default function Simulation() {
  const [asteroidSize, setAsteroidSize] = useState(0.5);
  const [impactVelocity, setImpactVelocity] = useState(20);
  const [impactLocation, setImpactLocation] = useState('New York');
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const cities = [
    'New York', 'Los Angeles', 'London', 'Tokyo', 'Paris', 
    'Berlin', 'Moscow', 'Sydney', 'Mumbai', 'São Paulo'
  ];

  const runSimulation = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/calculate-impact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          asteroid_size_km: asteroidSize,
          impact_velocity_km_s: impactVelocity,
          impact_location: impactLocation
        })
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        console.error('Simulation failed');
      }
    } catch (error) {
      console.error('Error running simulation:', error);
    } finally {
      setLoading(false);
    }
  };

  const getResultChartData = () => {
    if (!result) return [];
    
    return [
      {
        name: 'Crater Diameter',
        value: result.crater_diameter_km,
        unit: 'km',
        color: '#EF4444'
      },
      {
        name: 'TNT Equivalent',
        value: result.tnt_equivalent_megatons,
        unit: 'MT',
        color: '#F59E0B'
      },
      {
        name: 'Seismic Magnitude',
        value: result.seismic_magnitude,
        unit: 'M',
        color: '#10B981'
      },
      {
        name: 'Casualties (K)',
        value: Math.floor(result.casualties_estimate / 1000),
        unit: 'K',
        color: '#8B5CF6'
      }
    ];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Impact Simulation
            </h1>
            <p className="text-gray-300">
              Model asteroid impact scenarios and analyze potential damage
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Parameters Panel */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-orange-400" />
                  Simulation Parameters
                </h3>

                <div className="space-y-6">
                  {/* Asteroid Size */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Asteroid Size: {asteroidSize} km
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="5.0"
                      step="0.1"
                      value={asteroidSize}
                      onChange={(e) => setAsteroidSize(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>0.1 km</span>
                      <span>5.0 km</span>
                    </div>
                  </div>

                  {/* Impact Velocity */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Impact Velocity: {impactVelocity} km/s
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="70"
                      step="1"
                      value={impactVelocity}
                      onChange={(e) => setImpactVelocity(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>10 km/s</span>
                      <span>70 km/s</span>
                    </div>
                  </div>

                  {/* Impact Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Impact Location
                    </label>
                    <select
                      value={impactLocation}
                      onChange={(e) => setImpactLocation(e.target.value)}
                      className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2"
                    >
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  {/* Run Simulation Button */}
                  <button
                    onClick={runSimulation}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5" />
                        Run Simulation
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Impact Map */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  Impact Zone Visualization
                </h3>
                <ImpactMap 
                  location={impactLocation}
                  craterDiameter={result?.crater_diameter_km || 0}
                />
              </div>

              {/* Results */}
              {result && (
                <>
                  {/* Impact Analysis */}
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      Impact Analysis Report
                    </h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-slate-900/50 rounded-lg p-4 text-center">
                        <p className="text-gray-400 text-sm">Crater Diameter</p>
                        <p className="text-2xl font-bold text-red-400">{result.crater_diameter_km} km</p>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-4 text-center">
                        <p className="text-gray-400 text-sm">TNT Equivalent</p>
                        <p className="text-2xl font-bold text-orange-400">{result.tnt_equivalent_megatons} MT</p>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-4 text-center">
                        <p className="text-gray-400 text-sm">Seismic Magnitude</p>
                        <p className="text-2xl font-bold text-green-400">{result.seismic_magnitude} M</p>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-4 text-center">
                        <p className="text-gray-400 text-sm">Est. Casualties</p>
                        <p className="text-2xl font-bold text-purple-400">{result.casualties_estimate.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Chart */}
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={getResultChartData()}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                          <YAxis stroke="#9ca3af" fontSize={12} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#1e293b',
                              border: '1px solid #475569',
                              borderRadius: '8px'
                            }}
                            formatter={(value, name, props) => [
                              `${value} ${props.payload.unit}`,
                              name
                            ]}
                          />
                          <Bar 
                            dataKey="value" 
                            fill="#f97316"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Scenario Summary */}
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Scenario Summary</h3>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 mb-4">
                        A {result.asteroid_size_km} km diameter asteroid impacting {result.impact_location} at 
                        {result.impact_velocity_km_s} km/s would create devastating consequences:
                      </p>
                      <ul className="text-gray-300 space-y-2">
                        <li>
                          <strong>Crater Formation:</strong> A {result.crater_diameter_km} km diameter crater would be formed, 
                          completely obliterating the immediate impact zone.
                        </li>
                        <li>
                          <strong>Energy Release:</strong> The impact would release energy equivalent to 
                          {result.tnt_equivalent_megatons} megatons of TNT, causing widespread destruction.
                        </li>
                        <li>
                          <strong>Seismic Effects:</strong> A magnitude {result.seismic_magnitude} earthquake would 
                          be generated, affecting structures hundreds of kilometers away.
                        </li>
                        <li>
                          <strong>Human Impact:</strong> Estimated casualties could reach {result.casualties_estimate.toLocaleString()} 
                          people, requiring immediate global response and aid.
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
