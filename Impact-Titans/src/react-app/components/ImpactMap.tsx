import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface ImpactMapProps {
  location: string;
  craterDiameter: number;
}

export default function ImpactMap({ location, craterDiameter }: ImpactMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const cityCoordinates: { [key: string]: [number, number] } = {
    'New York': [-74.006, 40.7128],
    'Los Angeles': [-118.2437, 34.0522],
    'London': [-0.1276, 51.5074],
    'Tokyo': [139.6917, 35.6895],
    'Paris': [2.3522, 48.8566],
    'Berlin': [13.4050, 52.5200],
    'Moscow': [37.6173, 55.7558],
    'Sydney': [151.2093, -33.8688],
    'Mumbai': [72.8777, 19.0760],
    'São Paulo': [-46.6333, -23.5505]
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 600;
    const height = 400;
    
    svg.attr("width", width).attr("height", height);

    // Create a simple world map projection
    const projection = d3.geoNaturalEarth1()
      .scale(120)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    // Add background
    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#0f172a");

    // Create simplified continents
    const continents = [
      // North America
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [[
            [-140, 70], [-60, 70], [-60, 20], [-140, 20], [-140, 70]
          ]]
        }
      },
      // Europe
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [[
            [-10, 70], [50, 70], [50, 35], [-10, 35], [-10, 70]
          ]]
        }
      },
      // Asia
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [[
            [50, 80], [180, 80], [180, 10], [50, 10], [50, 80]
          ]]
        }
      },
      // Africa
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [[
            [-20, 40], [50, 40], [50, -40], [-20, -40], [-20, 40]
          ]]
        }
      },
      // South America
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [[
            [-90, 15], [-30, 15], [-30, -60], [-90, -60], [-90, 15]
          ]]
        }
      },
      // Australia
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [[
            [110, -10], [160, -10], [160, -45], [110, -45], [110, -10]
          ]]
        }
      }
    ];

    // Draw continents
    svg.selectAll(".continent")
      .data(continents)
      .enter()
      .append("path")
      .attr("class", "continent")
      .attr("d", path as any)
      .attr("fill", "#1e293b")
      .attr("stroke", "#334155")
      .attr("stroke-width", 1);

    // Add grid lines
    const graticule = d3.geoGraticule()
      .step([30, 30]);

    svg.append("path")
      .datum(graticule())
      .attr("class", "graticule")
      .attr("d", path as any)
      .attr("fill", "none")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 0.5)
      .attr("opacity", 0.3);

    // Get impact location coordinates
    const coords = cityCoordinates[location];
    if (coords) {
      const [lng, lat] = coords;
      const projected = projection([lng, lat]);
      
      if (projected) {
        const [x, y] = projected;

        // Impact point
        svg.append("circle")
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", 4)
          .attr("fill", "#ffffff")
          .attr("stroke", "#ef4444")
          .attr("stroke-width", 2);

        // Crater zone (if simulation has been run)
        if (craterDiameter > 0) {
          // Convert crater diameter to map scale (very approximate)
          const scale = projection.scale();
          const craterRadius = (craterDiameter * scale) / 10000; // Rough conversion

          // Crater
          svg.append("circle")
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", craterRadius)
            .attr("fill", "#ef4444")
            .attr("fill-opacity", 0.6)
            .attr("stroke", "#ffffff")
            .attr("stroke-width", 2);

          // Damage zones (concentric circles)
          const zones = [
            { radius: craterRadius * 3, color: "#f97316", opacity: 0.3, label: "Severe Damage" },
            { radius: craterRadius * 6, color: "#eab308", opacity: 0.2, label: "Moderate Damage" },
            { radius: craterRadius * 10, color: "#84cc16", opacity: 0.1, label: "Light Damage" }
          ];

          zones.forEach((zone) => {
            svg.append("circle")
              .attr("cx", x)
              .attr("cy", y)
              .attr("r", zone.radius)
              .attr("fill", "none")
              .attr("stroke", zone.color)
              .attr("stroke-width", 2)
              .attr("stroke-opacity", zone.opacity * 2)
              .attr("fill", zone.color)
              .attr("fill-opacity", zone.opacity);
          });
        }

        // Location label
        svg.append("text")
          .attr("x", x + 10)
          .attr("y", y - 10)
          .attr("fill", "#ffffff")
          .attr("font-size", "12px")
          .attr("font-weight", "bold")
          .text(location);
      }
    }

    // Add legend if crater is shown
    if (craterDiameter > 0) {
      const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(20, 20)");

      const legendData = [
        { color: "#ffffff", label: "Impact Point" },
        { color: "#ef4444", label: "Crater Zone" },
        { color: "#f97316", label: "Severe Damage" },
        { color: "#eab308", label: "Moderate Damage" },
        { color: "#84cc16", label: "Light Damage" }
      ];

      legendData.forEach((item, i) => {
        const legendRow = legend.append("g")
          .attr("transform", `translate(0, ${i * 20})`);

        legendRow.append("circle")
          .attr("cx", 6)
          .attr("cy", 6)
          .attr("r", 6)
          .attr("fill", item.color)
          .attr("opacity", 0.7);

        legendRow.append("text")
          .attr("x", 16)
          .attr("y", 10)
          .attr("fill", "#ffffff")
          .attr("font-size", "11px")
          .text(item.label);
      });

      // Legend background
      const bbox = legend.node()?.getBBox();
      if (bbox) {
        legend.insert("rect", ":first-child")
          .attr("x", -5)
          .attr("y", -5)
          .attr("width", bbox.width + 10)
          .attr("height", bbox.height + 10)
          .attr("fill", "#000000")
          .attr("opacity", 0.7)
          .attr("rx", 4);
      }
    }

  }, [location, craterDiameter]);

  return (
    <div className="w-full bg-slate-900/50 rounded-lg p-4">
      <svg ref={svgRef} className="w-full h-auto max-h-96"></svg>
      <div className="mt-2 text-center">
        <p className="text-gray-400 text-sm">
          Impact location: <span className="text-white font-medium">{location}</span>
          {craterDiameter > 0 && (
            <span className="ml-4">
              Crater diameter: <span className="text-red-400 font-medium">{craterDiameter} km</span>
            </span>
          )}
        </p>
      </div>
    </div>
  );
}