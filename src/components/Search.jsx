import { useState } from "react";
import{ Search } from 'lucide-react';


const Search = ({ onSearch, isLoading }) => {
    const [query, setQuery] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) onSearch(query.trim());
    };
    const handleClear = () => {
        setQuery('');
    };


    return (
        <form onSubmit = {handleSubmit} className = "w-full max-w-3xl mx-auto">
           <div className="relative">
            <Search className = "absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search TV shows"
                autoFocus
                aria-label="Search TV shows"
                className="w-full pl-12 pr-28 py-3 bg-gray-900/90 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />

                {query && !isLoading && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="bsolute right-20 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                        aria-label=" Clear search"
                        >
                            
                        </button>
                )}


                <button
                type="submit"
                disabled ={isLoading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
                aria-label="Submit search"
                >
                    {isLoading ?  '...'  : 'Search'}
                </button>
            </div> 
        </form>
    );
};