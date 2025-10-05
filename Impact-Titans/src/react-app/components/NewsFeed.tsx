import { useState, useEffect } from 'react';
import { Newspaper, ExternalLink, Clock, Globe } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  url: string;
  category: 'NASA' | 'Asteroid' | 'Space' | 'Defense';
}

export default function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      // In a real app, this would fetch from a news API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockNews: NewsItem[] = [
        {
          id: 1,
          title: "NASA's DART Mission Results: Successful Asteroid Deflection",
          summary: "Analysis confirms the Double Asteroid Redirection Test successfully altered Dimorphos' orbit, proving kinetic impact as a viable planetary defense strategy.",
          source: "NASA",
          publishedAt: "2024-10-01T10:30:00Z",
          url: "#",
          category: "NASA"
        },
        {
          id: 2,
          title: "New Potentially Hazardous Asteroid Discovered",
          summary: "Astronomers have identified 2024 UX, a 500-meter asteroid with a close approach predicted for 2157. Initial risk assessment shows low probability of impact.",
          source: "ESA",
          publishedAt: "2024-09-28T14:15:00Z",
          url: "#",
          category: "Asteroid"
        },
        {
          id: 3,
          title: "International Space Agencies Collaborate on Planetary Defense",
          summary: "NASA, ESA, and JAXA announce joint initiative to enhance global asteroid monitoring capabilities and develop rapid response protocols.",
          source: "Space News",
          publishedAt: "2024-09-25T09:20:00Z",
          url: "#",
          category: "Defense"
        },
        {
          id: 4,
          title: "Asteroid Sample Return Mission Yields New Insights",
          summary: "OSIRIS-REx samples from Bennu reveal composition details that could inform future deflection mission designs and impact modeling.",
          source: "NASA",
          publishedAt: "2024-09-22T16:45:00Z",
          url: "#",
          category: "Space"
        },
        {
          id: 5,
          title: "Ground-Based Telescopes Enhance NEO Detection",
          summary: "Upgraded observation networks report 40% increase in detection efficiency for near-Earth objects smaller than 100 meters.",
          source: "Astronomical Union",
          publishedAt: "2024-09-20T11:30:00Z",
          url: "#",
          category: "Space"
        }
      ];
      
      setNews(mockNews);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'NASA': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Asteroid': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Space': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Defense': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Space Defense News</h3>
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-slate-700/50 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Newspaper className="w-5 h-5 text-green-400" />
        Space Defense News
      </h3>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {news.map((item) => (
          <article
            key={item.id}
            className="bg-slate-900/50 border border-slate-600 rounded-lg p-4 hover:bg-slate-900/80 transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-2">
              <span className={`px-2 py-1 rounded-full text-xs border ${getCategoryColor(item.category)}`}>
                {item.category}
              </span>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Clock className="w-3 h-3" />
                {formatTimeAgo(item.publishedAt)}
              </div>
            </div>
            
            <h4 className="font-medium text-white mb-2 group-hover:text-orange-400 transition-colors">
              {item.title}
            </h4>
            
            <p className="text-sm text-gray-300 mb-3 line-clamp-2">
              {item.summary}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Globe className="w-3 h-3" />
                {item.source}
              </div>
              <button className="flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 transition-colors">
                Read more
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </article>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-600">
        <button className="w-full text-sm text-orange-400 hover:text-orange-300 transition-colors">
          View All News
        </button>
      </div>
    </div>
  );
}

