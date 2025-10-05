import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Clock, Award } from 'lucide-react';

interface Scenario {
  id: number;
  title: string;
  description: string;
  asteroidSize: number;
  timeToImpact: string;
  location: string;
  strategies: string[];
  correctStrategy: number;
  explanation: string;
}

interface SurvivalGameProps {
  onScoreUpdate: (score: number) => void;
  onBack: () => void;
}

export default function SurvivalGame({ onScoreUpdate, onBack }: SurvivalGameProps) {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedStrategy, setSelectedStrategy] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameComplete, setGameComplete] = useState(false);

  const scenarios: Scenario[] = [
    {
      id: 1,
      title: "Apophis Approach 2029",
      description: "A 340-meter asteroid is approaching Earth with high precision orbit calculations. Impact probability is currently 0.1% but rising.",
      asteroidSize: 0.34,
      timeToImpact: "4 years",
      location: "Pacific Ocean",
      strategies: [
        "Nuclear Deflection - Immediate deployment",
        "Kinetic Impactor - Multiple spacecraft mission",
        "Gravity Tractor - Long-term orbital adjustment",
        "Evacuation Planning - Focus on affected regions"
      ],
      correctStrategy: 2,
      explanation: "With 4 years lead time and moderate size, a Gravity Tractor provides precise orbital adjustment without fragmentation risk."
    },
    {
      id: 2,
      title: "City Killer Alert",
      description: "A 150-meter asteroid has been detected on collision course with New York City. Impact in 6 months with 95% certainty.",
      asteroidSize: 0.15,
      timeToImpact: "6 months",
      location: "New York City",
      strategies: [
        "Kinetic Impactor - Emergency fast-track mission",
        "Nuclear Deflection - High-yield warhead deployment",
        "Gravity Tractor - Continuous thrust application",
        "Mass Evacuation - Complete city evacuation"
      ],
      correctStrategy: 0,
      explanation: "With limited time and moderate size, a Kinetic Impactor mission offers the best balance of effectiveness and deployment speed."
    },
    {
      id: 3,
      title: "Global Extinction Event",
      description: "A 5-kilometer asteroid has been confirmed on direct impact trajectory. Global extinction-level event in 2 years.",
      asteroidSize: 5.0,
      timeToImpact: "2 years",
      location: "Atlantic Ocean",
      strategies: [
        "Nuclear Deflection - Multiple high-yield devices",
        "Mass Driver Array - Continuous material ejection",
        "Combined Mission - Nuclear + Kinetic + Gravity",
        "Underground Bunker Program - Species preservation"
      ],
      correctStrategy: 2,
      explanation: "For extinction-level threats, only a combined approach using multiple deflection methods simultaneously offers hope of success."
    }
  ];

  useEffect(() => {
    if (timeLeft > 0 && !showResult && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeUp();
    }
  }, [timeLeft, showResult, gameComplete]);

  const handleTimeUp = () => {
    setShowResult(true);
  };

  const handleStrategySelect = (strategyIndex: number) => {
    if (showResult) return;
    setSelectedStrategy(strategyIndex);
  };

  const handleSubmit = () => {
    if (selectedStrategy === null) return;
    setShowResult(true);
    
    const isCorrect = selectedStrategy === scenarios[currentScenario].correctStrategy;
    const points = isCorrect ? 1000 + (timeLeft * 10) : 200;
    const newScore = score + points;
    setScore(newScore);
    onScoreUpdate(newScore);
  };

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedStrategy(null);
      setShowResult(false);
      setTimeLeft(30);
    } else {
      setGameComplete(true);
    }
  };

  const scenario = scenarios[currentScenario];
  const isCorrect = selectedStrategy === scenario.correctStrategy;

  if (gameComplete) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-12">
            <Award className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-4">Mission Complete!</h2>
            <p className="text-xl text-gray-300 mb-6">
              You've completed all asteroid defense scenarios
            </p>
            <div className="text-3xl font-bold text-orange-400 mb-8">
              Final Score: {score} points
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-slate-900/50 rounded-lg p-4">
                <p className="text-gray-400">Scenarios Completed</p>
                <p className="text-2xl font-bold text-green-400">{scenarios.length}</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <p className="text-gray-400">Average Score</p>
                <p className="text-2xl font-bold text-blue-400">{Math.round(score / scenarios.length)}</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <p className="text-gray-400">Achievement Level</p>
                <p className="text-2xl font-bold text-purple-400">
                  {score > 2500 ? 'Expert' : score > 1500 ? 'Advanced' : 'Defender'}
                </p>
              </div>
            </div>
            
            <button
              onClick={onBack}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200"
            >
              Return to Game Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Menu
          </button>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-white">
              <Clock className="w-5 h-5 text-orange-400" />
              <span className="font-mono text-lg">{timeLeft}s</span>
            </div>
            <div className="text-white">
              Score: <span className="text-orange-400 font-bold">{score}</span>
            </div>
            <div className="text-gray-400">
              Scenario {currentScenario + 1} / {scenarios.length}
            </div>
          </div>
        </div>

        {/* Scenario Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">{scenario.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-orange-400 mb-3">Scenario Details</h3>
              <p className="text-gray-300 mb-4">{scenario.description}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Asteroid Size:</span>
                  <span className="text-white">{scenario.asteroidSize} km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Time to Impact:</span>
                  <span className="text-white">{scenario.timeToImpact}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Impact Location:</span>
                  <span className="text-white">{scenario.location}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-3">Mission Objective</h3>
              <p className="text-gray-300 mb-4">
                Select the most appropriate deflection strategy for this scenario. 
                Consider the asteroid size, available time, and potential consequences.
              </p>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                <p className="text-yellow-300 text-sm">
                  ⚠️ Quick decision required! Time is running out.
                </p>
              </div>
            </div>
          </div>

          {/* Strategy Options */}
          <h3 className="text-lg font-semibold text-white mb-4">Choose Your Strategy:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {scenario.strategies.map((strategy, index) => (
              <button
                key={index}
                onClick={() => handleStrategySelect(index)}
                disabled={showResult}
                className={`p-4 rounded-lg border text-left transition-all ${
                  selectedStrategy === index
                    ? 'bg-orange-500/20 border-orange-500/50 text-orange-400'
                    : 'bg-slate-700/50 border-slate-600 text-gray-300 hover:bg-slate-700 hover:border-slate-500'
                } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
                    selectedStrategy === index ? 'border-orange-500' : 'border-gray-500'
                  }`}>
                    {selectedStrategy === index && (
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    )}
                  </div>
                  <span className="font-medium">{strategy}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Submit Button */}
          {!showResult && (
            <button
              onClick={handleSubmit}
              disabled={selectedStrategy === null}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
            >
              Submit Strategy
            </button>
          )}
        </div>

        {/* Result */}
        {showResult && (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              {isCorrect ? (
                <CheckCircle className="w-8 h-8 text-green-400" />
              ) : (
                <XCircle className="w-8 h-8 text-red-400" />
              )}
              <h3 className={`text-2xl font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? 'Excellent Strategy!' : 'Strategy Assessment'}
              </h3>
            </div>
            
            <p className="text-gray-300 mb-4">{scenario.explanation}</p>
            
            <div className="bg-slate-900/50 rounded-lg p-4 mb-6">
              <p className="text-gray-400 text-sm mb-2">Correct Answer:</p>
              <p className="text-green-400 font-medium">{scenario.strategies[scenario.correctStrategy]}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-white">
                Points Earned: <span className={`font-bold ${isCorrect ? 'text-green-400' : 'text-orange-400'}`}>
                  +{isCorrect ? 1000 + (timeLeft * 10) : 200}
                </span>
              </div>
              
              <button
                onClick={handleNext}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
              >
                {currentScenario < scenarios.length - 1 ? 'Next Scenario' : 'Complete Mission'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}