import { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Star, Award, Crown, Zap } from 'lucide-react';

interface LeaderboardEntry {
  id: number;
  username: string;
  level: number;
  xp: number;
  title: string;
  totalScore: number;
  gamesPlayed: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface LeaderboardProps {
  onBack: () => void;
}

export default function Leaderboard({ onBack }: LeaderboardProps) {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'achievements'>('leaderboard');
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    loadLeaderboardData();
    loadAchievements();
  }, []);

  const loadLeaderboardData = () => {
    // Mock leaderboard data
    const mockData: LeaderboardEntry[] = [
      {
        id: 1,
        username: "SpaceDefender_Pro",
        level: 15,
        xp: 12500,
        title: "Asteroid Expert",
        totalScore: 8750,
        gamesPlayed: 45
      },
      {
        id: 2,
        username: "CosmicGuardian",
        level: 12,
        xp: 9800,
        title: "Space Defender",
        totalScore: 7200,
        gamesPlayed: 38
      },
      {
        id: 3,
        username: "PlanetProtector",
        level: 11,
        xp: 8900,
        title: "Cosmic Survivor",
        totalScore: 6850,
        gamesPlayed: 32
      },
      {
        id: 4,
        username: "AsteroidHunter",
        level: 10,
        xp: 8200,
        title: "Physics Master",
        totalScore: 6100,
        gamesPlayed: 29
      },
      {
        id: 5,
        username: "StellarStrategist",
        level: 9,
        xp: 7600,
        title: "Creative Defender",
        totalScore: 5750,
        gamesPlayed: 26
      },
      {
        id: 6,
        username: "OrbitGuardian",
        level: 8,
        xp: 6900,
        title: "Survival Expert",
        totalScore: 5200,
        gamesPlayed: 24
      },
      {
        id: 7,
        username: "MeteorMaster",
        level: 7,
        xp: 6200,
        title: "Asteroid Architect",
        totalScore: 4800,
        gamesPlayed: 22
      },
      {
        id: 8,
        username: "QuantumDefender",
        level: 6,
        xp: 5500,
        title: "Space Cadet",
        totalScore: 4200,
        gamesPlayed: 19
      }
    ];

    setLeaderboardData(mockData);
  };

  const loadAchievements = () => {
    const achievementsList: Achievement[] = [
      {
        id: 'asteroid_architect',
        title: 'Asteroid Architect',
        description: 'Successfully complete 10 asteroid defense scenarios',
        icon: Award,
        unlocked: true,
        rarity: 'epic'
      },
      {
        id: 'survival_expert',
        title: 'Survival Expert',
        description: 'Score over 5000 points in Survival Strategy mode',
        icon: Trophy,
        unlocked: true,
        rarity: 'rare'
      },
      {
        id: 'creative_defender',
        title: 'Creative Defender',
        description: 'Use all deflection strategies successfully',
        icon: Star,
        unlocked: false,
        rarity: 'legendary'
      },
      {
        id: 'physics_master',
        title: 'Physics Master',
        description: 'Complete crossword puzzle with no hints',
        icon: Zap,
        unlocked: true,
        rarity: 'rare'
      },
      {
        id: 'speed_demon',
        title: 'Speed Demon',
        description: 'Complete a scenario in under 10 seconds',
        icon: Crown,
        unlocked: false,
        rarity: 'epic'
      },
      {
        id: 'perfectionist',
        title: 'Perfectionist',
        description: 'Get 100% accuracy in 5 consecutive games',
        icon: Award,
        unlocked: false,
        rarity: 'legendary'
      }
    ];

    setAchievements(achievementsList);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Trophy className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-gray-400 font-bold">{rank}</span>;
    }
  };

  const getTitleColor = (title: string) => {
    switch (title) {
      case 'Asteroid Expert': return 'text-red-400';
      case 'Space Defender': return 'text-blue-400';
      case 'Physics Master': return 'text-purple-400';
      case 'Creative Defender': return 'text-green-400';
      case 'Survival Expert': return 'text-orange-400';
      case 'Cosmic Survivor': return 'text-cyan-400';
      case 'Asteroid Architect': return 'text-pink-400';
      default: return 'text-gray-400';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-500 bg-gray-500/10';
      case 'rare': return 'border-blue-500 bg-blue-500/10';
      case 'epic': return 'border-purple-500 bg-purple-500/10';
      case 'legendary': return 'border-yellow-500 bg-yellow-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Menu
          </button>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'leaderboard'
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Leaderboard
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'achievements'
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Achievements
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'leaderboard' ? (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <Trophy className="w-8 h-8 text-yellow-400" />
              <h2 className="text-3xl font-bold text-white">Global Leaderboard</h2>
            </div>

            <div className="space-y-4">
              {leaderboardData.map((player, index) => (
                <div
                  key={player.id}
                  className={`p-6 rounded-lg border transition-all hover:bg-slate-700/30 ${
                    index < 3 
                      ? 'bg-gradient-to-r from-slate-700/50 to-slate-800/50 border-orange-500/30' 
                      : 'bg-slate-900/50 border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Rank */}
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-800">
                        {getRankIcon(index + 1)}
                      </div>

                      {/* Player Info */}
                      <div>
                        <h3 className="text-lg font-bold text-white">{player.username}</h3>
                        <div className="flex items-center gap-4 text-sm">
                          <span className={`font-medium ${getTitleColor(player.title)}`}>
                            {player.title}
                          </span>
                          <span className="text-gray-400">
                            Level {player.level} • {player.xp.toLocaleString()} XP
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-400">
                        {player.totalScore.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-400">
                        {player.gamesPlayed} games played
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Summary */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/50 rounded-lg p-4 text-center">
                <p className="text-gray-400 text-sm mb-1">Your Rank</p>
                <p className="text-2xl font-bold text-orange-400">#42</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 text-center">
                <p className="text-gray-400 text-sm mb-1">Your Score</p>
                <p className="text-2xl font-bold text-blue-400">3,250</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 text-center">
                <p className="text-gray-400 text-sm mb-1">Total Players</p>
                <p className="text-2xl font-bold text-green-400">2,847</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <Award className="w-8 h-8 text-purple-400" />
              <h2 className="text-3xl font-bold text-white">Achievement Gallery</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={achievement.id}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      achievement.unlocked 
                        ? `${getRarityColor(achievement.rarity)} opacity-100` 
                        : 'border-gray-700 bg-gray-700/10 opacity-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-full ${
                        achievement.unlocked 
                          ? 'bg-gradient-to-r from-orange-500 to-red-600' 
                          : 'bg-gray-600'
                      }`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className={`font-bold ${achievement.unlocked ? 'text-white' : 'text-gray-500'}`}>
                          {achievement.title}
                        </h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${getRarityColor(achievement.rarity)}`}>
                          {achievement.rarity.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <p className={`text-sm ${achievement.unlocked ? 'text-gray-300' : 'text-gray-500'}`}>
                      {achievement.description}
                    </p>

                    {achievement.unlocked && (
                      <div className="mt-3 flex items-center gap-2 text-green-400 text-sm">
                        <Star className="w-4 h-4" />
                        <span>Unlocked!</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Achievement Progress */}
            <div className="mt-8 bg-slate-900/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Progress Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Unlocked</p>
                  <p className="text-2xl font-bold text-green-400">
                    {achievements.filter(a => a.unlocked).length}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Total</p>
                  <p className="text-2xl font-bold text-blue-400">{achievements.length}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Completion</p>
                  <p className="text-2xl font-bold text-orange-400">
                    {Math.round((achievements.filter(a => a.unlocked).length / achievements.length) * 100)}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Next Goal</p>
                  <p className="text-sm font-bold text-purple-400">Speed Demon</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}