import { Link, useLocation } from 'react-router-dom';
import { Tv, Home, Equal } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-black/50 backdrop-blur-md sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <Tv className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              TVTracker
            </span>
          </Link>
          
          <div className="flex space-x-2">
            <Link to="/" className={`px-4 py-2 rounded-lg transition-all ${
              location.pathname === '/' 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                : 'text-gray-300 hover:bg-white/10'
            }`}>
              <Home className="w-5 h-5" />
            </Link>
            <Link to="/my-list" className={`px-4 py-2 rounded-lg transition-all ${
              location.pathname === '/my-list' 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                : 'text-gray-300 hover:bg-white/10'
            }`}>
              <div className='flex flex-row gap-2'><Equal/> MyList</div>
            
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;