# Impact Titans - Global Asteroid Risk Management Tool

A comprehensive NASA Hackathon-level web application for asteroid threat assessment, impact simulation, and planetary defense education. Built with modern web technologies and powered by real NASA data.

## Overview

Impact Titans is a sophisticated web application that combines real-time asteroid tracking, 3D orbital visualization, impact simulation, and educational resources about planetary defense. The application integrates with NASA's APIs to provide up-to-date information about Near-Earth Objects (NEOs) and potential threats.

## Application Architecture

## Frontend Architecture

src/react-app/
├── pages/           # Main page components (Landing, Dashboard, 3D Viz, Simulation)
├── components/      # Reusable UI components
├── hooks/          # Custom React hooks
└── utils/          # Utility functions


## Backend Architecture

src/worker/
├── index.ts        # Main Cloudflare Worker with API endpoints
└── types/          # TypeScript type definitions

## Technology Stack

## Frontend
- *React 19* - Modern React with latest features
- *TypeScript* - Type-safe development
- *Tailwind CSS* - Utility-first styling
- *Framer Motion* - Advanced animations
- *Three.js / React Three Fiber* - 3D visualizations
- *D3.js* - Data visualization and mapping
- *Recharts* - Chart components
- *React Router 7* - Client-side routing

## Backend
- *Cloudflare Workers* - Serverless edge computing
- *Hono* - Fast web framework
- *Zod* - Schema validation
- *NASA APIs* - Real astronomical data

## Infrastructure
- *Cloudflare D1* - SQLite-based edge database
- *Vite* - Build tool and dev server
- *ESLint* - Code linting
- *PostCSS* - CSS processing

## 🛠 Development Workflow

## Prerequisites
- Node.js 18+
- npm or yarn
- NASA API Key (free from api.nasa.gov)

## Installation Steps

1. *Clone and Setup*
bash
git clone <repository-url>
if not alredy in folder: 
cd ImpactTitans_NASA
cd Impact-Titans
npm install


2. *Environment Configuration*
bash
# Set up NASA API key 
# Create .env file with NASA_API_KEY = //enter your api key here 



3. *Development Server*
bash
npm run dev
# Application runs on http://localhost:5173


4. *Build for Production*
bash
npm run build
# Creates optimized production build


5. *Type Checking*
bash
npm run check
# Validates TypeScript and builds


## Project Structure Detailed


impact-titans/
├── public/                 # Static assets
├── src/
│   ├── react-app/         # Frontend React application
│   │   ├── components/    # Reusable UI components
│   │   │   ├── Layout.tsx
│   │   │   ├── AsteroidRiskList.tsx
│   │   │   ├── RiskOverTimeChart.tsx
│   │   │   ├── NewsFeed.tsx
│   │   │   ├── EducationPanel.tsx
│   │   │   ├── EarthModel.tsx
│   │   │   ├── AsteroidSelector.tsx
│   │   │   ├── AsteroidTrajectory.tsx
│   │   │   ├── ImpactParameters.tsx
│   │   │   ├── ImpactZoneMap.tsx
│   │   │   └── SimulationResults.tsx
│   │   ├── pages/         # Main page components
│   │   │   ├── Landing.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Visualization3D.tsx
│   │   │   └── Simulation.tsx
│   │   └── hooks/         # Custom React hooks
│   ├── worker/            # Backend Cloudflare Worker
│   │   └── index.ts       # API endpoints and business logic
│   └── shared/           # Shared types and utilities
├── tailwind.config.js    # Styling configuration
├── vite.config.ts        # Build configuration
├── package.json          # Dependencies and scripts
└── README.md            # This file

## Future Enhancements

## Planned Features
- *Game Mode* - Interactive asteroid defense scenarios
- *Leaderboards* - Competition and achievements
- *Advanced Simulations* - Multi-asteroid scenarios
- *Mobile App* - React Native version
- *VR Support* - Immersive 3D experiences

## Technical Improvements
- *Real-time Updates* - WebSocket connections
- *Machine Learning* - Risk prediction models
- *Advanced Physics* - More accurate simulations
- *International Data* - ESA, JAXA API integration

## Acknowledgments

- *NASA* for providing comprehensive APIs and data
- *ESA* for European space mission information
- *The Planetary Society* for educational resources
- *Three.js Community* for 3D visualization tools
- *D3.js Team* for data visualization framework

*Impact Titans* - Protecting Earth through technology, education, and international cooperation.

