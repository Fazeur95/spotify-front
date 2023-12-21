// PlaylistContext.js
import React, {createContext, useState, useEffect} from 'react';

export const PlaylistContext = createContext();

export const PlaylistProvider = ({children}) => {
  const [playlists, setPlaylists] = useState([]);

  const fetchPlaylists = async () => {
    const response = await fetch('http://localhost:6868/api/playlist');
    const data = await response.json();
    setPlaylists([...data]);
  };

  return (
    <PlaylistContext.Provider value={{playlists, setPlaylists, fetchPlaylists}}>
      {children}
    </PlaylistContext.Provider>
  );
};
