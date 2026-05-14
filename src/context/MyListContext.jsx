import React, { createContext, useContext, useState, useEffect } from 'react';

const MyListContext = createContext();

export const useMyList = () => useContext(MyListContext);

export const MyListProvider = ({ children }) => {
  const [myShows, setMyShows] = useState(() => {
    const saved = localStorage.getItem('myShows');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('myShows', JSON.stringify(myShows));
  }, [myShows]);

  const addShow = (show) => {
    if (!myShows.find(s => s.id === show.id)) {
      setMyShows([...myShows, { 
        ...show, 
        status: 'watching', 
        personalRating: null, 
        personalNotes: '',
        addedAt: new Date().toISOString()
      }]);
    }
  };

  const removeShow = (id) => {
    setMyShows(myShows.filter(show => show.id !== id));
  };

  const updateShow = (id, data) => {
    setMyShows(myShows.map(show => 
      show.id === id ? { ...show, ...data, updatedAt: new Date().toISOString() } : show
    ));
  };

  const isInMyList = (id) => {
    return myShows.some(show => show.id === id);
  };

  const getShowFromList = (id) => {
    return myShows.find(show => show.id === id);
  };

  return (
    <MyListContext.Provider value={{ myShows, addShow, removeShow, updateShow, isInMyList, getShowFromList }}>
      {children}
    </MyListContext.Provider>
  );
};