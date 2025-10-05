import { useState } from 'react';
import { Gamepad2, Trophy, Target, Brain } from 'lucide-react';
import Navigation from '@/react-app/components/Navigation';
import SurvivalGame from '@/react-app/components/SurvivalGame';
import CrosswordGame from '@/react-app/components/CrosswordGame';
import Leaderboard from '@/react-app/components/Leaderboard';

type GameMode = 'menu' | 'survival' | 'crossword' | 'leaderboard';

export default function Game() {
  const [currentMode, setCurrentMode] = useState<GameMode>('menu');
  const [currentScore, setCurrentScore] = useState(0);

  const gameOptions = [
    {
      id: 'survival',
      title: 'Survival Strategy Assessment',
      description: 'Test your asteroid defense knowledge with scenario-based challenges',
      icon: Target,
      color: 'from-orange-500 to-red-600',
      difficulty: 'Advanced'
    },
    {
      id: 'crossword',
      title: 'NASA Space Crossword',
      description: 'Solve space and asteroid-related crossword puzzles',
      icon: Brain,
      color: 'from-blue-500 to-purple-600',
      difficulty: 'Intermediate'
    },
    {
      id: 'leaderboard',
      title: 'Leaderboard & Achievements',
      description: 'View your progress and compete with other space defenders',
      icon: Trophy,
      color: 'from-green-500 to-emerald-600',
      difficulty: 'All Levels'
    }
  ];

  const renderGameContent = () => {
    switch (currentMode) {
      case 'survival':
        return <SurvivalGame onScoreUpdate={setCurrentScore} onBack={() => setCurrentMode('menu')} />;
      case 'crossword':
        return <CrosswordGame onScoreUpdate={setCurrentScore} onBack={() => setCurrentMode('menu')} />;
      case 'leaderboard':
        return <Leaderboard onBack={() => setCurrentMode('menu')} />;
      default:
        return null;
    }
  };

  if (currentMode !== 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <Navigation />
        {renderGameContent()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Gamepad2 className="w-12 h-12 text-orange-400" />
              <h1 className="text-5xl font-bold text-white">
                Game Mode
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-2">
              Test your asteroid defense knowledge and compete with others
            </p>
            <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-2">
              <span className="text-gray-400">Current Score:</span>
              <span className="text-orange-400 font-bold">{currentScore} pts</span>
            </div>
          </div>

          {/* Game Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {gameOptions.map((game) => {
              const Icon = game.icon;
              return (
                <div
                  key={game.id}
                  className="group relative overflow-hidden bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
                  onClick={() => setCurrentMode(game.id as GameMode)}
                >
                  {/* Background Gradient */}
                  <div className={absolute inset-0 bg-gradient-to-br ${game.color} opacity-10 group-hover:opacity-20 transition-opacity}></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <Icon className="w-12 h-12 text-orange-400 group-hover:text-orange-300 transition-colors" />
                      <span className="text-xs bg-slate-700 text-gray-300 px-2 py-1 rounded-full">
                        {game.difficulty}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                      {game.title}
                    </h3>
                    
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {game.description}
                    </p>
                    
                    <div className="mt-6">
                      <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200">
                        Start Game
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Game Features */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Game Features
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">Achievement System</h3>
                <p className="text-gray-400 text-sm">Unlock titles like Asteroid Expert and Space Defender</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">Strategy Challenges</h3>
                <p className="text-gray-400 text-sm">Real asteroid scenarios based on NASA data</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">Educational Content</h3>
                <p className="text-gray-400 text-sm">Learn while playing with scientific accuracy</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gamepad2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">Competitive Play</h3>
                <p className="text-gray-400 text-sm">Global leaderboards and scoring system</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}