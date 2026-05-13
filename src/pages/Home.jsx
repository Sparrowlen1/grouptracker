import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import ShowCard from '../components/ShowCard';
import { Flame, Award, Film } from 'lucide-react';

const Home = () => {
  const [shows, setShows] = useState([]);
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('trending');

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('https://api.tvmaze.com/shows?page=1');
      const allShows = res.data.slice(0, 12);
      setTrending(allShows);
      setTopRated([...allShows].sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0)).slice(0, 8));
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSearch = async (query) => {
    setSearchLoading(true);
    const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
    setSearchResults(res.data.map(item => item.show));
    setActiveTab('search');
    setSearchLoading(false);
  };

  const displayShows = () => {
    if (activeTab === 'search') return searchResults;
    if (activeTab === 'trending') return trending;
    return topRated;
  };

  const tabs = [
    { id: 'trending', label: 'Trending', icon: Flame },
    { id: 'top-rated', label: 'Top Rated', icon: Award }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          <GroupTracker></GroupTracker>
        </h1>
        <SearchBar onSearch={handleSearch} isLoading={searchLoading} />
      </div>

      {!searchResults.length && (
        <div className="flex gap-3 border-b border-gray-800 pb-3">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {activeTab === 'search' && searchResults.length === 0 && !searchLoading && (
            <div className="text-center py-12 text-gray-400">Howdy There my fellow tracker no shows found</div>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {displayShows().slice(0, 10).map(show => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;