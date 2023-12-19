// PlaylistContext.js
import React, {createContext, useState, useEffect} from 'react';

export const PlaylistContext = createContext();

export const PlaylistProvider = ({children}) => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetch('http://localhost:6868/api/playlist')
      .then(response => response.json())
      .then(data => setPlaylists(data));
  }, []);

  return (
    <PlaylistContext.Provider value={{playlists, setPlaylists}}>
      {children}
    </PlaylistContext.Provider>
  );
};
