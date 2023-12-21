// PlaylistContext.js
import React, {createContext, useState, useEffect} from 'react';

export const PlaylistContext = createContext();

export const PlaylistProvider = ({children}) => {
  const [playlists, setPlaylists] = useState([]);

  const fetchPlaylists = async () => {
    const response = await fetch(
      'https://spotify-api-43ur.onrender.com/api/playlist',
    );
    const data = await response.json();
    setPlaylists([...data]);
  };

  return (
    <PlaylistContext.Provider value={{playlists, setPlaylists, fetchPlaylists}}>
      {children}
    </PlaylistContext.Provider>
  );
};
