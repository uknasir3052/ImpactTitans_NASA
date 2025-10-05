
CREATE TABLE asteroids (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  diameter_km REAL,
  velocity_km_s REAL,
  orbital_period_days REAL,
  distance_au REAL,
  risk_level TEXT,
  last_approach_date DATE,
  next_approach_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE impact_simulations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  asteroid_size_km REAL NOT NULL,
  impact_velocity_km_s REAL NOT NULL,
  impact_location TEXT NOT NULL,
  crater_diameter_km REAL,
  tnt_equivalent_megatons REAL,
  seismic_magnitude REAL,
  casualties_estimate INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT,
  game_type TEXT NOT NULL,
  score INTEGER NOT NULL,
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0,
  title TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE achievements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT,
  achievement_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
