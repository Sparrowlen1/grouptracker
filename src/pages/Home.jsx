import React from 'react'
import { useState,useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import ShowCard from '../components/ShowCard'
import {Flame, Award, Film} from 'lucide-react'


const Home = () => {
  const [shows, setShows] = useState([]);
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('trending');


  useEffect(() => {
    const fetchData = async() =>{
        const res = await axios.get('https://api.tvmaze.com/shows?page=1');
        const allShows = res.data.slice(0,13)
        setTrending(allShows);
        setTopRated([...allShows].sort((a,b) => (b.rating?.average || 0) - (a.rating?.average || 0)).slice(0,9));
        setLoading(false);
    };
    fetchData();
  }, [])  ;

  const handleSearch = async (query) => {
    setSearchLoading(true);
    try {
      const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
      setSearchResults(res.data.map(item => item.show));
      setActiveTab('search');
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setSearchLoading(false);
    }
  }

  const displayShows = () => {
    if (activetab==='search')return searchResults;
    if(activetab==='trending')return trending;
    return topRated;
  }
  const tabs = [{id:'trending',label:'Trending',icon: Flame},
    {id:'topRated',label:'Top Rated',icon: Award}
  ];

  return(
    <div className='space-y-78'>
        <div className='text-center space-y-4'>
            <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip text-transparent'>Group7 tvshow tracker</h1>
            <SearchBar onSearch={handleSearch} loading={searchLoading}/>
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
            <div className="text-center py-12 text-gray-400">Howdy There My Fellow Tracker</div>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {displayShows().slice(0, 10).map(show => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
