import { useState, useEffect } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, Calendar } from 'lucide-react';

interface RiskData {
  date: string;
  riskScore: number;
  threats: number;
  closestApproach: number;
}

export default function RiskTrendChart() {
  const [data, setData] = useState<RiskData[]>([]);
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRiskData();
  }, [timeRange]);

  const fetchRiskData = async () => {
    setLoading(true);
    try {
      // Simulate API call - in real app, this would fetch from backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData = generateMockData(timeRange);
      setData(mockData);
    } catch (error) {
      console.error('Error fetching risk data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateMockData = (range: string) => {
    const days = range === '7d' ? 7 : range === '30d' ? 30 : 90;
    const data: RiskData[] = [];
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toISOString().split('T')[0],
        riskScore: Math.floor(Math.random() * 100) + 1,
        threats: Math.floor(Math.random() * 50) + 10,
        closestApproach: Math.random() * 0.1 + 0.01
      });
    }
    
    return data;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{`Date: ${label}`}</p>
          <p className="text-orange-400">{`Risk Score: ${payload[0].value}`}</p>
          <p className="text-blue-400">{`Active Threats: ${payload[0].payload.threats}`}</p>
          <p className="text-green-400">{`Closest: ${payload[0].payload.closestApproach.toFixed(4)} AU`}</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Risk Trend Analysis</h3>
        <div className="animate-pulse">
          <div className="h-64 bg-slate-700/50 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          Risk Trend Analysis
        </h3>
        
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-slate-900 border border-slate-600 text-white text-sm rounded px-2 py-1"
          >
            <option value="7d">7 Days</option>
            <option value="30d">30 Days</option>
            <option value="90d">90 Days</option>
          </select>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="date" 
              stroke="#9ca3af"
              fontSize={12}
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <YAxis stroke="#9ca3af" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="riskScore"
              stroke="#f97316"
              strokeWidth={2}
              fill="url(#riskGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="bg-slate-900/50 rounded p-3">
          <p className="text-gray-400 text-xs">Current Risk</p>
          <p className="text-orange-400 font-bold">{data[data.length - 1]?.riskScore || 0}</p>
        </div>
        <div className="bg-slate-900/50 rounded p-3">
          <p className="text-gray-400 text-xs">Active Threats</p>
          <p className="text-blue-400 font-bold">{data[data.length - 1]?.threats || 0}</p>
        </div>
        <div className="bg-slate-900/50 rounded p-3">
          <p className="text-gray-400 text-xs">Closest (AU)</p>
          <p className="text-green-400 font-bold">{data[data.length - 1]?.closestApproach.toFixed(3) || '0.000'}</p>
        </div>
      </div>
    </div>
  );
}
