import { useEffect, useState } from 'react';
import { ChevronRight, Shield, Globe, Zap } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function Landing() {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnterApp = () => {
    navigate('/dashboard');
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url('../../../images/Landing_bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          transform: `translateY(${scrollPosition * 0.5}px)`,
        }}
      />
      
      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black/60 z-10" />
      
      {/* Content */}
      <div className="relative z-20 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 md:p-8">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-3">
              <img 
                src="../../../images/app_logo.png" 
                alt="Impact Titans Logo" 
                className="w-20 h-20"
              />
              <div>
                <h1 className="text-2xl font-bold text-white">IMPACT TITANS</h1>
                <p className="text-orange-200 text-sm">Global Asteroid Risk Management</p>
              </div>
            </div>
            <button
              onClick={handleEnterApp}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 flex items-center space-x-2 group"
            >
              <span>Enter Mission Control</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Protecting
                <span className="block bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  Our Planet
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                Advanced asteroid threat assessment, 3D orbital visualization, and impact simulation 
                powered by NASA data and cutting-edge technology.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <Globe className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">3D Visualization</h3>
                <p className="text-gray-300">Real-time orbital tracking and trajectory modeling</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <Zap className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Impact Analysis</h3>
                <p className="text-gray-300">Comprehensive damage assessment and simulation</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Risk Management</h3>
                <p className="text-gray-300">Early warning systems and mitigation strategies</p>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleEnterApp}
              className="px-12 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white text-lg font-semibold rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-2xl hover:shadow-orange-500/25 transform hover:scale-105"
            >
              Launch Mission Control
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center pb-8">
          <div className="inline-flex flex-col items-center text-white/70">
            <span className="text-sm mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Content Section */}
      <div className="relative z-20 bg-gradient-to-b from-black/80 to-black py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              NASA Hackathon Project
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built with real NASA data sources, advanced 3D graphics, and comprehensive 
              impact modeling to provide the most accurate asteroid threat assessment platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">1000+</div>
              <div className="text-gray-300">Near-Earth Objects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">Real-time</div>
              <div className="text-gray-300">NASA Data Integration</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">3D</div>
              <div className="text-gray-300">Orbital Visualization</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">Advanced</div>
              <div className="text-gray-300">Impact Simulation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}