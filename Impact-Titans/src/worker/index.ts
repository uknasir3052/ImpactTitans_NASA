import { Hono } from "hono";
import { cors } from "hono/cors";
import { Env, AsteroidType, RiskDataType, NewsItemType } from "../shared/types";

const app = new Hono<{ Bindings: Env }>();

// Enable CORS for all routes
app.use('*', cors());

// NASA API endpoints
app.get('/api/asteroids', async (c) => {
  try {
    const NASA_API_KEY = "b795tq1CmOWO1QKPBDHEPQOfQYB1aOhmvhFvsbdV" ;
    
    // Fetch Near-Earth Objects from NASA API
    const today = new Date().toISOString().split('T')[0];
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    const endDateStr = endDate.toISOString().split('T')[0];
    
    const url = https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${endDateStr}&api_key=${NASA_API_KEY};
    
    const response = await fetch(url);
    const data = await response.json() as any;
    
    if (!response.ok) {
      throw new Error(`NASA API error: ${data?.error_message || 'Unknown error'}`);
    }
    
    // Process and format the data
    const asteroids: AsteroidType[] = [];
    
    for (const date in data?.near_earth_objects || {}) {
      const dailyAsteroids = data.near_earth_objects[date];
      
      for (const asteroid of dailyAsteroids) {
        const closeApproach = asteroid.close_approach_data[0];
        const diameter = asteroid.estimated_diameter.kilometers;
        const avgDiameter = (diameter.estimated_diameter_min + diameter.estimated_diameter_max) / 2;
        
        // Calculate risk level based on size and distance
        const distance = parseFloat(closeApproach.miss_distance.astronomical);
        const velocity = parseFloat(closeApproach.relative_velocity.kilometers_per_second);
        
        let riskLevel: 'low' | 'medium' | 'high' = 'low';
        if (avgDiameter > 1 && distance < 0.1) riskLevel = 'high';
        else if (avgDiameter > 0.5 && distance < 0.2) riskLevel = 'medium';
        
        asteroids.push({
          id: asteroid.id,
          name: asteroid.name.replace(/[()]/g, ''),
          diameter: avgDiameter,
          riskLevel,
          distance: distance,
          velocity: velocity,
          isPotentiallyHazardous: asteroid.is_potentially_hazardous_asteroid,
          closeApproachDate: closeApproach.close_approach_date
        });
      }
    }
    
    // Sort by risk level and distance
    asteroids.sort((a, b) => {
      const riskOrder: Record<string, number> = { high: 3, medium: 2, low: 1 };
      const aRisk = riskOrder[a.riskLevel] || 1;
      const bRisk = riskOrder[b.riskLevel] || 1;
      if (aRisk !== bRisk) {
        return bRisk - aRisk;
      }
      return a.distance - b.distance;
    });
    
    return c.json(asteroids.slice(0, 20)); // Return top 20
    
  } catch (error) {
    console.error('Error fetching asteroids:', error);
    
    // Return fallback data in case of API failure
    return c.json([
      {
        id: '1',
        name: '2024 UY1',
        diameter: 0.8,
        riskLevel: 'high',
        distance: 0.05,
        velocity: 20.3,
        isPotentiallyHazardous: true,
        closeApproachDate: '2024-10-15'
      },
      {
        id: '2',
        name: '2024 TX3',
        diameter: 1.2,
        riskLevel: 'medium',
        distance: 0.12,
        velocity: 18.7,
        isPotentiallyHazardous: false,
        closeApproachDate: '2024-10-20'
      },
      {
        id: '3',
        name: '2024 WZ5',
        diameter: 0.4,
        riskLevel: 'low',
        distance: 0.28,
        velocity: 15.2,
        isPotentiallyHazardous: false,
        closeApproachDate: '2024-10-25'
      }
    ]);
  }
});

app.get('/api/risk-timeline', async (c) => {
  try {
    // Generate risk timeline data
    const timeline: RiskDataType[] = [];
    const baseDate = new Date('2024-10-01');
    
    for (let i = 0; i < 6; i++) {
      const date = new Date(baseDate);
      date.setMonth(date.getMonth() + i);
      
      // Simulate risk variation over time
      const baseRisk = Math.random() * 3 + 1;
      const variation = Math.sin(i * 0.5) * 1.5;
      const riskScore = Math.max(0.1, baseRisk + variation);
      
      timeline.push({
        date: date.toISOString().slice(0, 7), // YYYY-MM format
        riskScore: riskScore,
        asteroidCount: Math.floor(Math.random() * 10) + 3
      });
    }
    
    return c.json(timeline);
    
  } catch (error) {
    console.error('Error generating risk timeline:', error);
    return c.json({ error: 'Failed to generate risk timeline' }, 500);
  }
});

app.get('/api/space-news', async (c) => {
  try {
    // In a real implementation, you might use a news API like NewsAPI
    // For now, return curated space news
    const news: NewsItemType[] = [
      {
        id: '1',
        title: 'NASA\'s DART Mission Successfully Deflects Asteroid',
        summary: 'The Double Asteroid Redirection Test demonstrates humanity\'s first planetary defense capability.',
        url: 'https://www.nasa.gov/news/dart-mission-success',
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        source: 'NASA News'
      },
      {
        id: '2',
        title: 'New Near-Earth Asteroid Discovered by LINEAR',
        summary: 'Astronomers identify potentially hazardous asteroid with close approach in 2025.',
        url: 'https://www.space.com/new-asteroid-discovery',
        publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), // 18 hours ago
        source: 'Space.com'
      },
      {
        id: '3',
        title: 'ESA Prepares Hera Mission for Asteroid Investigation',
        summary: 'European mission will study the aftermath of NASA\'s DART impact on Dimorphos.',
        url: 'https://www.esa.int/hera-mission-update',
        publishedAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(), // 26 hours ago
        source: 'ESA News'
      },
      {
        id: '4',
        title: 'Ground-Based Telescopes Enhance Asteroid Tracking',
        summary: 'New automated systems improve detection of potentially hazardous objects.',
        url: 'https://www.astronomy.com/asteroid-tracking',
        publishedAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(), // 36 hours ago
        source: 'Astronomy Magazine'
      }
    ];
    
    return c.json(news);
    
  } catch (error) {
    console.error('Error fetching space news:', error);
    return c.json({ error: 'Failed to fetch space news' }, 500);
  }
});

app.get('/api/calculate_trajectory', async (c) => {
  try {
    // Generate orbital trajectory points using simplified Keplerian elements
    const points = [];
    const numPoints = 100;
    
    // Simplified orbital parameters (in a real app, these would come from NASA's Small-Body Database)
    const a = 1.5; // semi-major axis (AU)
    const e = 0.1; // eccentricity
    const i = 5 * Math.PI / 180; // inclination (radians)
    
    for (let j = 0; j < numPoints; j++) {
      const theta = (j / numPoints) * 2 * Math.PI; // true anomaly
      
      // Calculate distance from focus
      const r = (a * (1 - e * e)) / (1 + e * Math.cos(theta));
      
      // Position in orbital plane
      const x_orbit = r * Math.cos(theta);
      const y_orbit = r * Math.sin(theta);
      
      // Rotate for inclination (simplified)
      const x = x_orbit * 5; // Scale for visualization
      const y = y_orbit * Math.cos(i) * 0.5; // Slight vertical component
      const z = y_orbit * Math.sin(i) * 5;
      
      points.push({
        x: x,
        y: y,
        z: z,
        time: j / numPoints
      });
    }
    
    return c.json(points);
    
  } catch (error) {
    console.error('Error calculating trajectory:', error);
    return c.json({ error: 'Failed to calculate trajectory' }, 500);
  }
});
// Impact simulation endpoint
app.post('/api/calculate-impact', async (c) => {
  try {
    const { asteroid_size_km, impact_velocity_km_s, impact_location } = await c.req.json();

    // Simple impact calculations (in reality would be much more complex)
    const kinetic_energy = 0.5 * (asteroid_size_km * 3) * 2600 * (impact_velocity_km_s * 2);
    const crater_diameter_km = Math.pow(kinetic_energy / 1e15, 0.25) * 1.8;
    const tnt_equivalent_megatons = kinetic_energy / 4.184e15;
    const seismic_magnitude = Math.log10(kinetic_energy) - 4.8;
    const casualties_estimate = Math.floor(tnt_equivalent_megatons * 100000);

    const result = {
      crater_diameter_km: Number(crater_diameter_km.toFixed(2)),
      tnt_equivalent_megatons: Number(tnt_equivalent_megatons.toFixed(1)),
      seismic_magnitude: Number(seismic_magnitude.toFixed(1)),
      casualties_estimate,
      impact_location,
      asteroid_size_km,
      impact_velocity_km_s
    };

    return c.json(result);
  } catch (error) {
    return c.json({ error: 'Failed to calculate impact' }, 500);
  }
});

// Health check endpoint
app.get('/api/health', (c) => {
  return c.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.post('/api/game-score', async (c) => {
  try {
    const { user_id, game_type, score } = await c.req.json();
    
    // In production, this would save to database
    const result = {
      user_id,
      game_type,
      score,
      level: Math.floor(score / 1000) + 1,
      xp: score * 10,
      title: score > 5000 ? 'Asteroid Expert' : score > 2000 ? 'Space Defender' : 'Cosmic Survivor'
    };

    return c.json(result);
  } catch (error) {
    return c.json({ error: 'Failed to save score' }, 500);
  }
});

export default app;