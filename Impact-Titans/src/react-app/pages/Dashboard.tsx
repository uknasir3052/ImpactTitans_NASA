import { useState, useEffect } from 'react';
import { Activity, AlertTriangle, Globe, TrendingUp } from 'lucide-react';
import AsteroidRiskList from '../components/AsteriodRiskList';
import RiskTrendChart from '../components/RiskTrendChart';
import NewsFeed from '../components/NewsFeed';
import Navigation from '../components/Navigation';

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      {/* Header */}
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Mission Control Dashboard
              </h1>
              <p className="text-gray-300">
                Real-time asteroid monitoring and risk assessment
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Current Time (UTC)</p>
              <p className="text-white text-lg font-mono">
                {currentTime.toUTCString()}
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-orange-500/30 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-300 text-sm font-medium">Active Threats</p>
                  <p className="text-white text-2xl font-bold">23</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-400" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm font-medium">Tracked Objects</p>
                  <p className="text-white text-2xl font-bold">2,847</p>
                </div>
                <Globe className="w-8 h-8 text-blue-400" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/30 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm font-medium">Risk Level</p>
                  <p className="text-white text-2xl font-bold">LOW</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm font-medium">Simulations Run</p>
                  <p className="text-white text-2xl font-bold">156</p>
                </div>
                <Activity className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Column 1: Asteroid Risk List */}
            <div className="lg:col-span-1">
              <AsteroidRiskList />
            </div>

            {/* Column 2: Risk Trend Chart */}
            <div className="lg:col-span-1">
              <RiskTrendChart />
            </div>

            {/* Column 3: News Feed */}
            <div className="lg:col-span-1">
              <NewsFeed />
            </div>
          </div>

          {/* Education Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Mitigation Strategies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Kinetic Impactor
                </h3>
                <p className="text-gray-300 text-sm">
                  Direct collision to change asteroid trajectory through momentum transfer. 
                  Most effective for smaller asteroids with advance warning.
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Gravity Tractor
                </h3>
                <p className="text-gray-300 text-sm">
                  Spacecraft uses gravitational pull to slowly alter asteroid path. 
                  Precise but requires years of lead time for effectiveness.
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Nuclear Deflection
                </h3>
                <p className="text-gray-300 text-sm">
                  Last resort option for large threats. Nuclear device creates 
                  asymmetric heating to change trajectory without fragmentation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}