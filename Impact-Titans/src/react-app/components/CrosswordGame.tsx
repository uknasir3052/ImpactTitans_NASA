import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, Lightbulb, RotateCcw } from 'lucide-react';

interface CrosswordClue {
  id: number;
  clue: string;
  answer: string;
  direction: 'across' | 'down';
  row: number;
  col: number;
  length: number;
}

interface CrosswordGameProps {
  onScoreUpdate: (score: number) => void;
  onBack: () => void;
}

export default function CrosswordGame({ onScoreUpdate, onBack }: CrosswordGameProps) {
  const [grid, setGrid] = useState<string[][]>([]);
  const [userAnswers, setUserAnswers] = useState<string[][]>([]);
  const [selectedClue, setSelectedClue] = useState<number | null>(null);
  const [completedClues, setCompletedClues] = useState<Set<number>>(new Set());
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);

  const clues: CrosswordClue[] = [
    {
      id: 1,
      clue: "Space rock that enters Earth's atmosphere",
      answer: "METEOR",
      direction: "across",
      row: 0,
      col: 0,
      length: 6
    },
    {
      id: 2,
      clue: "Potentially Hazardous _ (NASA classification)",
      answer: "ASTEROID",
      direction: "down",
      row: 0,
      col: 2,
      length: 8
    },
    {
      id: 3,
      clue: "NASA mission that hit asteroid Dimorphos",
      answer: "DART",
      direction: "across",
      row: 2,
      col: 1,
      length: 4
    },
    {
      id: 4,
      clue: "Deflection method using spacecraft gravity",
      answer: "TRACTOR",
      direction: "down",
      row: 2,
      col: 3,
      length: 7
    },
    {
      id: 5,
      clue: "Large crater formed by asteroid impact",
      answer: "BASIN",
      direction: "across",
      row: 4,
      col: 0,
      length: 5
    },
    {
      id: 6,
      clue: "Asteroid sample return mission",
      answer: "OSIRIS",
      direction: "down",
      row: 1,
      col: 5,
      length: 6
    },
    {
      id: 7,
      clue: "Earth's natural satellite",
      answer: "MOON",
      direction: "across",
      row: 6,
      col: 2,
      length: 4
    },
    {
      id: 8,
      clue: "Space agency that tracks NEOs",
      answer: "NASA",
      direction: "down",
      row: 5,
      col: 1,
      length: 4
    }
  ];

  useEffect(() => {
    initializeGrid();
  }, []);

  const initializeGrid = () => {
    const gridSize = 10;
    const newGrid: string[][] = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
    const newUserAnswers: string[][] = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));

    // Place answers in grid
    clues.forEach(clue => {
      for (let i = 0; i < clue.answer.length; i++) {
        const row = clue.direction === 'across' ? clue.row : clue.row + i;
        const col = clue.direction === 'across' ? clue.col + i : clue.col;
        if (row < gridSize && col < gridSize) {
          newGrid[row][col] = clue.answer[i];
        }
      }
    });

    setGrid(newGrid);
    setUserAnswers(newUserAnswers);
  };

  const handleCellChange = (row: number, col: number, value: string) => {
    if (value.length > 1) return;
    
    const newUserAnswers = [...userAnswers];
    newUserAnswers[row][col] = value.toUpperCase();
    setUserAnswers(newUserAnswers);

    // Check if any clues are completed
    checkCompletedClues(newUserAnswers);
  };

  const checkCompletedClues = (answers: string[][]) => {
    const newCompleted = new Set<number>();
    let newScore = 0;

    clues.forEach(clue => {
      let isComplete = true;
      for (let i = 0; i < clue.answer.length; i++) {
        const row = clue.direction === 'across' ? clue.row : clue.row + i;
        const col = clue.direction === 'across' ? clue.col + i : clue.col;
        if (answers[row]?.[col] !== clue.answer[i]) {
          isComplete = false;
          break;
        }
      }
      
      if (isComplete) {
        newCompleted.add(clue.id);
        newScore += 100;
      }
    });

    setCompletedClues(newCompleted);
    const finalScore = newScore - (hintsUsed * 20);
    setScore(finalScore);
    onScoreUpdate(finalScore);
  };

  const getHint = () => {
    if (selectedClue === null) return;
    
    const clue = clues.find(c => c.id === selectedClue);
    if (!clue) return;

    // Fill in the first empty cell
    for (let i = 0; i < clue.answer.length; i++) {
      const row = clue.direction === 'across' ? clue.row : clue.row + i;
      const col = clue.direction === 'across' ? clue.col + i : clue.col;
      
      if (userAnswers[row]?.[col] === '') {
        const newUserAnswers = [...userAnswers];
        newUserAnswers[row][col] = clue.answer[i];
        setUserAnswers(newUserAnswers);
        setHintsUsed(hintsUsed + 1);
        checkCompletedClues(newUserAnswers);
        break;
      }
    }
  };

  const resetGame = () => {
    const gridSize = 10;
    const newUserAnswers: string[][] = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
    setUserAnswers(newUserAnswers);
    setCompletedClues(new Set());
    setScore(0);
    setHintsUsed(0);
    setSelectedClue(null);
    onScoreUpdate(0);
  };

  const getCellClass = (row: number, col: number) => {
    const hasLetter = grid[row]?.[col] !== '';
    const isCompleted = clues.some(clue => {
      if (!completedClues.has(clue.id)) return false;
      
      for (let i = 0; i < clue.answer.length; i++) {
        const cellRow = clue.direction === 'across' ? clue.row : clue.row + i;
        const cellCol = clue.direction === 'across' ? clue.col + i : clue.col;
        if (cellRow === row && cellCol === col) return true;
      }
      return false;
    });

    if (!hasLetter) return 'bg-slate-900';
    if (isCompleted) return 'bg-green-500/20 border-green-500/50';
    return 'bg-slate-700 border-slate-500';
  };

  const getClueNumbers = (row: number, col: number) => {
    return clues
      .filter(clue => clue.row === row && clue.col === col)
      .map(clue => clue.id);
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
          
          <div className="flex items-center gap-6">
            <div className="text-white">
              Score: <span className="text-orange-400 font-bold">{score}</span>
            </div>
            <div className="text-gray-400">
              Completed: {completedClues.size} / {clues.length}
            </div>
            <div className="text-gray-400">
              Hints Used: {hintsUsed}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Crossword Grid */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                NASA Space & Asteroid Crossword
              </h2>
              
              <div className="grid grid-cols-10 gap-1 w-fit mx-auto mb-6">
                {Array(10).fill(null).map((_, row) =>
                  Array(10).fill(null).map((_, col) => {
                    const hasLetter = grid[row]?.[col] !== '';
                    const clueNumbers = getClueNumbers(row, col);
                    
                    return (
                      <div
                        key={${row}-${col}}
                        className={w-8 h-8 border relative ${getCellClass(row, col)}}
                      >
                        {clueNumbers.length > 0 && (
                          <span className="absolute top-0 left-0 text-xs text-orange-400 font-bold">
                            {clueNumbers[0]}
                          </span>
                        )}
                        {hasLetter && (
                          <input
                            type="text"
                            value={userAnswers[row]?.[col] || ''}
                            onChange={(e) => handleCellChange(row, col, e.target.value)}
                            className="w-full h-full bg-transparent text-center text-white font-bold text-sm border-none outline-none"
                            maxLength={1}
                          />
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={getHint}
                  disabled={selectedClue === null}
                  className="flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Lightbulb className="w-4 h-4" />
                  Get Hint (-20 pts)
                </button>
                
                <button
                  onClick={resetGame}
                  className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Clues */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Clues</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-orange-400 mb-2">Across</h4>
                  <div className="space-y-2">
                    {clues.filter(c => c.direction === 'across').map(clue => (
                      <button
                        key={clue.id}
                        onClick={() => setSelectedClue(clue.id)}
                        className={`w-full text-left p-2 rounded-lg text-sm transition-all ${
                          selectedClue === clue.id
                            ? 'bg-orange-500/20 border border-orange-500/30 text-orange-400'
                            : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {completedClues.has(clue.id) && (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          )}
                          <span className="font-bold">{clue.id}.</span>
                          <span>{clue.clue}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-blue-400 mb-2">Down</h4>
                  <div className="space-y-2">
                    {clues.filter(c => c.direction === 'down').map(clue => (
                      <button
                        key={clue.id}
                        onClick={() => setSelectedClue(clue.id)}
                        className={`w-full text-left p-2 rounded-lg text-sm transition-all ${
                          selectedClue === clue.id
                            ? 'bg-blue-500/20 border border-blue-500/30 text-blue-400'
                            : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {completedClues.has(clue.id) && (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          )}
                          <span className="font-bold">{clue.id}.</span>
                          <span>{clue.clue}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-6 pt-4 border-t border-slate-600">
                <div className="bg-slate-900/50 rounded-lg p-3">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white">{completedClues.size} / {clues.length}</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: ${(completedClues.size / clues.length) * 100}% }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}