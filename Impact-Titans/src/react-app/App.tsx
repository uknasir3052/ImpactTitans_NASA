import { BrowserRouter as Router, Routes, Route } from "react-router";
import Landing from "../react-app/pages/Landing";
import Dashboard from "../react-app/pages/Dashboard";
import Visualization3D from "../react-app/pages/Visualization3D";
import Simulation from "../react-app/pages/Simulation";
import Game from "../react-app/pages/Game";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/3d-visualization" element={<Visualization3D />} />
        <Route path="/simulation" element={<Simulation />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
}
