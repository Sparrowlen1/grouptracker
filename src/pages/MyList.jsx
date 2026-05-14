import { useState } from 'react';
import { useMyList } from '../context/MyListContext';
import ShowCard from '../components/ShowCard';
import ShowForm from '../components/ShowForm';
import { Trash2, Edit, Film, Clock, CheckCircle, Calendar, Star, FileText, X } from 'lucide-react';

const MyList = () => {
  const { myShows, removeShow, updateShow } = useMyList();
  const [editingShow, setEditingShow] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredShows = filter === 'all' 
    ? myShows 
    : myShows.filter(s => s.status === filter);

  const counts = {
    all: myShows.length,
    watching: myShows.filter(s => s.status === 'watching').length,
    completed: myShows.filter(s => s.status === 'completed').length,
    planning: myShows.filter(s => s.status === 'planning').length,
    dropped: myShows.filter(s => s.status === 'dropped').length,
  };

  if (myShows.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4"></div>
        <h2 className="text-2xl font-bold mb-2">Your list is empty</h2>
        <p className="text-gray-400 mb-4">Start adding shows to track what you watch!</p>
        <a href="/" className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
          Browse Shows
        </a>
      </div>
    );
  }

  const DetailsModal = ({ show, onClose }) => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold">{show.name}</h2>
            <p className="text-xs text-gray-400 mt-1">Your saved details</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-800 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
<<<<<<< HEAD
=======
          
>>>>>>> f15e889 (fix:fixed the undefined lucide react icons that brought about rendereing isssues)
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
              <Clock className="w-4 h-4" />
              <span>Watch Status</span>
            </div>
            <p className="font-semibold">
              {show.status === 'watching' && ' Currently Watching'}
              {show.status === 'completed' && ' Completed'}
              {show.status === 'planning' && ' Planning to Watch'}
              {show.status === 'dropped' && ' Dropped'}
            </p>
          </div>
          
<<<<<<< HEAD
=======
        
>>>>>>> f15e889 (fix:fixed the undefined lucide react icons that brought about rendereing isssues)
          {show.personalRating && (
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>Your Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(10)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(show.personalRating) ? 'text-yellow-500 fill-current' : 'text-gray-600'}`} />
                  ))}
                </div>
                <span className="font-semibold">{show.personalRating}/10</span>
              </div>
            </div>
          )}
          
<<<<<<< HEAD
=======
          
>>>>>>> f15e889 (fix:fixed the undefined lucide react icons that brought about rendereing isssues)
          {show.personalNotes && (
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                <FileText className="w-4 h-4" />
                <span>Your Notes</span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{show.personalNotes}</p>
            </div>
          )}
          
<<<<<<< HEAD
=======
         
>>>>>>> f15e889 (fix:fixed the undefined lucide react icons that brought about rendereing isssues)
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
              <Calendar className="w-4 h-4" />
              <span>Dates</span>
            </div>
            <p className="text-sm">Added: {new Date(show.addedAt).toLocaleDateString()}</p>
            {show.updatedAt && <p className="text-sm">Last updated: {new Date(show.updatedAt).toLocaleDateString()}</p>}
          </div>
          
<<<<<<< HEAD
=======
          
>>>>>>> f15e889 (fix:fixed the undefined lucide react icons that brought about rendereing isssues)
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
              <Film className="w-4 h-4" />
              <span>Show Info</span>
            </div>
            {show.premiered && <p className="text-sm">Year: {new Date(show.premiered).getFullYear()}</p>}
            {show.rating?.average && <p className="text-sm">TVmaze Rating: {show.rating.average}/10</p>}
            {show.genres && <p className="text-sm">Genres: {show.genres.join(', ')}</p>}
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <button 
            onClick={() => {
              setEditingShow(show);
              onClose();
            }}
            className="flex-1 py-2 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
          <button 
            onClick={() => {
              if (confirm(`Howdy my fellow tracker do you want to remove "${show.name}" from your list?`)) {
                removeShow(show.id);
                onClose();
              }
            }}
            className="flex-1 py-2 bg-red-600 rounded-lg font-semibold hover:bg-red-700 flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">My List</h1>
        <p className="text-gray-400">{myShows.length} shows in your collection</p>
      </div>

       <div className="flex flex-wrap gap-2">
        <button onClick={() => setFilter('all')} className={`px-3 py-1.5 rounded-lg text-sm transition-all ${filter === 'all' ? 'bg-blue-600' : 'bg-gray-800'}`}>
          All ({counts.all})
        </button>
        <button onClick={() => setFilter('watching')} className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 transition-all ${filter === 'watching' ? 'bg-blue-600' : 'bg-gray-800'}`}>
           Watching ({counts.watching})
        </button>
        <button onClick={() => setFilter('completed')} className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 transition-all ${filter === 'completed' ? 'bg-blue-600' : 'bg-gray-800'}`}>
           Completed ({counts.completed})
        </button>
        <button onClick={() => setFilter('planning')} className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 transition-all ${filter === 'planning' ? 'bg-blue-600' : 'bg-gray-800'}`}>
           Planning ({counts.planning})
        </button>
        <button onClick={() => setFilter('dropped')} className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 transition-all ${filter === 'dropped' ? 'bg-blue-600' : 'bg-gray-800'}`}>
           Dropped ({counts.dropped})
        </button>
      </div>

<<<<<<< HEAD
=======
      
>>>>>>> f15e889 (fix:fixed the undefined lucide react icons that brought about rendereing isssues)
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredShows.map(show => (
          <div key={show.id} className="relative group cursor-pointer" onClick={() => setSelectedShow(show)}>
            <ShowCard show={show} />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
              <span className="text-white text-sm font-semibold">Click to view details</span>
            </div>
          </div>
        ))}
      </div>

<<<<<<< HEAD
=======
    
>>>>>>> f15e889 (fix:fixed the undefined lucide react icons that brought about rendereing isssues)
      {selectedShow && (
        <DetailsModal show={selectedShow} onClose={() => setSelectedShow(null)} />
      )}

<<<<<<< HEAD
=======
      
>>>>>>> f15e889 (fix:fixed the undefined lucide react icons that brought about rendereing isssues)
      {editingShow && (
        <ShowForm 
          show={editingShow} 
          onSubmit={(data) => {
            updateShow(editingShow.id, data);
            setEditingShow(null);
          }} 
          onClose={() => setEditingShow(null)} 
        />
      )}
    </div>
  );
};

export default MyList;