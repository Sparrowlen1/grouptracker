
import { Link } from 'react-router-dom';
import { Plus, Check, Star } from 'lucide-react';
import { useMyList } from '../context/MyListContext';

const ShowCard = ({ show }) => {
  const { addShow, removeShow, isInMyList, getShowFromList } = useMyList();
  const inMyList = isInMyList(show.id);
  const myShowData = getShowFromList(show.id);

  const handleClick = (e) => {
    e.preventDefault();
    inMyList ? removeShow(show.id) : addShow(show);
  };

  const imageUrl = show.image?.medium || 'https://via.placeholder.com/300x450?text=No+Image';
  const rating = show.rating?.average || 'N/A';

  const getStatusBadge = () => {
    if (!myShowData?.status) return null;
    const statusConfig = {
      watching: { label: 'Watching', color: 'bg-blue-600'},
      completed: { label: 'Completed', color: 'bg-green-600' },
      planning: { label: 'Planning', color: 'bg-purple-600' },
      dropped: { label: 'Dropped', color: 'bg-red-600' }
    };
    const config = statusConfig[myShowData.status];
    if (!config) return null;
    return (
      <div className={`absolute top-2 left-2 px-2 py-1 ${config.color} rounded-lg text-xs font-semibold flex items-center gap-1`}>
        <span>{config.label}</span>
      </div>
    );
  };

  return (
    <div className="group relative bg-gray-900 rounded-xl overflow-hidden hover:transform hover:-translate-y-1 transition-all duration-300">
      <Link to={`/show/${show.id}`}>
        <div className="relative aspect-[2/3]">
          <img src={imageUrl} alt={show.name} className="w-full h-full object-cover" />
          
    
          <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 rounded-lg flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="text-xs">{rating}</span>
          </div>
          
          
          {getStatusBadge()}
          
          
          {myShowData?.personalRating && (
            <div className="absolute bottom-2 left-2 px-2 py-1 bg-yellow-600 rounded-lg text-xs font-semibold">
               {myShowData.personalRating}
            </div>
          )}
          
          <button
            onClick={handleClick}
            className="absolute bottom-2 right-2 p-2 bg-black/70 rounded-full hover:bg-blue-600 transition-colors"
          >
            {inMyList ? <Check className="w-4 h-4 text-green-500" /> : <Plus className="w-4 h-4" />}
          </button>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform">
            <button className="w-full py-2 bg-blue-600 rounded-lg text-sm font-semibold">
              View Details
            </button>
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-sm line-clamp-1">{show.name}</h3>
          {show.premiered && <p className="text-xs text-gray-400 mt-1">{new Date(show.premiered).getFullYear()}</p>}
          {myShowData?.personalNotes && (
            <p className="text-xs text-gray-500 mt-1 line-clamp-1 italic"> {myShowData.personalNotes.substring(0, 30)}</p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ShowCard;