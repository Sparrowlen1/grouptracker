import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMyList } from '../context/MyListContext';
import { ArrowLeft, Plus, Check, Calendar, Star, Tv, List } from 'lucide-react';

const ShowDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addShow, removeShow, isInMyList } = useMyList();
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEpisodes, setShowEpisodes] = useState(false);
  const inMyList = isInMyList(parseInt(id));

  useEffect(() => {
           // TODO: may add a skeleton maybe later

    const fetchData = async () => {
      try {
        const [showRes, episodesRes] = await Promise.all([
          axios.get(`https://api.tvmaze.com/shows/${id}`),
          axios.get(`https://api.tvmaze.com/shows/${id}/episodes`)
        ]);
        setShow(showRes.data);
        
        // a few of them first then i can add them maybe later
        setEpisodes(episodesRes.data.slice(0, 8));
      } catch (err) {
        console.log("oops", err);
        setError('something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const toggleMyList = () => {
    if (inMyList) {
      removeShow(parseInt(id));
    } else {
      addShow(show);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-blue-600 rounded-lg"
        >
          Go home
        </button>
      </div>
    );
  }

  if (!show) return <div className="text-center py-12">Show not found</div>;

  const imageUrl = show.image?.original || show.image?.medium;
  const rating = show.rating?.average || 'N/A';

  return (
    <div className="max-w-6xl mx-auto px-4">
      <button 
        onClick={handleBack} 
        className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <div className="bg-gray-900 rounded-2xl overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 lg:w-1/4">
            <img 
              src={imageUrl || 'https://via.placeholder.com/400x600?text=No+Image'} 
              alt={show.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6 md:w-2/3">
            <div className="flex justify-between items-start mb-4">
             <h1 className="text-3xl font-bold text-white">{show.name}</h1>
              <button
                onClick={toggleMyList}
                className={`p-2 rounded-lg ${inMyList ? 'bg-green-600' : 'bg-blue-600'}`}
              >
                {inMyList ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex gap-4 mb-4 text-sm text-gray-200 font-medium">
              {show.premiered && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(show.premiered).getFullYear()}
                </div>
              )}
              {show.runtime && (
                <div className="flex items-center gap-1">
                  <Tv className="w-4 h-4" />
                  {show.runtime} min
                </div>
              )}
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                {rating}
              </div>
            </div>

            {show.genres && (
              <div className="flex gap-2 mb-4 flex-wrap">
                {show.genres.map(genre => (
                 <span key={genre} className="px-2 py-1 bg-gray-800 text-white border border-gray-700 rounded-lg text-sm">{genre}</span>
                ))}
              </div>
            )}

            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Summary</h2>
              <div 
                className="text-white leading-relaxed" 
                dangerouslySetInnerHTML={{ __html: show.summary || 'No summary available.' }} 
              />
            </div>

            {show.status && (
              <p className="mt-4 text-sm text-gray-200 font-medium italic">Status: <span className="text-white">{show.status}</span></p>
            )}

            {episodes.length > 0 && (
              <button
                onClick={() => setShowEpisodes(!showEpisodes)}
                className="text-white mt-4 flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg"
              >
                <List className="w-4 h-4" />
                <span>{showEpisodes ? 'Hide' : 'View'} Episodes ({episodes.length})</span>
              </button>
            )}
          </div>
        </div>

        {showEpisodes && episodes.length > 0 && (
          <div className="border-t border-gray-800 p-6">
            <h3 className="text-xl font-semibold mb-4">Episodes</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {episodes.map(episode => (
                <div key={episode.id} className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-mono text-blue-300 font-bold">
                          S{episode.season}E{episode.number}
                        </span>
                        <h4 className="font-semibold text-white">{episode.name}</h4>
                      </div>
                      {episode.airdate && (
                        <p className="text-xs text-gray-300 mb-2">
                          {new Date(episode.airdate).toLocaleDateString()}
                        </p>
                      )}
                      {episode.summary && (
                        <p 
                          className="text-sm text-gray-200 line-clamp-2" 
                          dangerouslySetInnerHTML={{ __html: episode.summary }}
                        />
                      )}
                    </div>
                    {episode.rating?.average && (
                      <div className="flex items-center space-x-1 text-sm ml-4">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span>{episode.rating.average}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowDetail;