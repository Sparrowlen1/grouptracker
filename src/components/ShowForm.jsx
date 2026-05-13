import { useState } from 'react';
import {Tv,X, Calendar, Star,FileText,Clock,Save,Eye,CheckCirle,Calender,Xcircle} from 'lucide-react';

const ShowForm = ({ show, onSubmit, onClose }) => {
  const [rating, setRating] = useState(show?.personalRating || '');
  const [notes, setNotes] = useState(show?.personalNotes || '');
  const [status, setStatus] = useState(show?.status || 'watching');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ 
      personalRating: rating ? parseFloat(rating) : null, 
      personalNotes: notes,
      status: status
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold">Edit {show.name}</h2>
            <p className="text-xs text-gray-400 mt-1">Add your personal notes and rating</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-800 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
        
          <div>
            <label className="flex items-center space-x-2 text-sm mb-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>Watch Status</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'watching', icon: <Tv className="w-4 h-4" />, label: 'Watching', color: 'blue' },
                { value: 'completed', icon: <Check className="w-4 h-4" />, label: 'Completed', color: 'green' },
                { value: 'planning', icon: <Calendar className="w-4 h-4" />, label: 'Planning', color: 'purple' },
                { value: 'dropped', icon: <Ban className="w-4 h-4" />, label: 'Dropped', color: 'red' }
              ].map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setStatus(option.value)}
                  className={`px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-1 justify-center ${
                    status === option.value 
                      ? `bg-${option.color}-600 text-white`
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {option.icon}{option.label}
                </button>
              ))}
            </div>
          </div>

          
          <div>
            <label className="flex items-center space-x-2 text-sm mb-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>Your Rating (0-10)</span>
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                value={rating || 0}
                onChange={(e) => setRating(e.target.value)}
                step="0.5"
                min="0"
                max="10"
                className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                step="0.5"
                min="0"
                max="10"
                className="w-20 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-center focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          
          
          <div>
            <label className="flex items-center space-x-2 text-sm mb-2">
              <FileText className="w-4 h-4 text-purple-500" />
              <span>Your Notes</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="4"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
              placeholder="Write your thoughts about this show..."
            />
          </div>
          
          {(show?.personalRating || show?.personalNotes || show?.status) && (
            <div className="bg-gray-800/50 rounded-lg p-3 text-sm">
              <p className="text-xs text-gray-400 mb-2">Currently Saved:</p>
              {show?.status && <p className="text-xs flex items-center gap-1"><Pin className="w-3 h-3" /> Status: {show.status}</p>}
              {show?.personalRating && <p className="flex items-center gap-1"><Star className="w-3 h-3" /> Rating: {show.personalRating}/10</p>}
              {show?.personalNotes && <p className="text-xs text-gray-400 mt-1 line-clamp-2">📝 {show.personalNotes}</p>}
            </div>
          )}
          
          <div className="flex space-x-3 pt-2">
            <button type="submit" className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:opacity-90 flex items-center justify-center gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
            <button type="button" onClick={onClose} className="flex-1 py-2 bg-gray-700 rounded-lg font-semibold hover:bg-gray-600">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShowForm;