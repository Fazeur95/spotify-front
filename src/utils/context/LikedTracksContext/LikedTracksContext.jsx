import React, {createContext, useState, useEffect} from 'react';

// Créer le contexte
export const LikedTracksContext = createContext();

// Créer le fournisseur de contexte
export const LikedTracksProvider = ({children}) => {
  const [likedTracks, setLikedTracks] = useState(
    JSON.parse(localStorage.getItem('likedTracks')) || [],
  );

  // Mettre à jour à la fois l'état et le localStorage
  const setLikedTracksWithStorage = newLikedTracks => {
    setLikedTracks(newLikedTracks);
    localStorage.setItem('likedTracks', JSON.stringify(newLikedTracks));
  };

  useEffect(() => {
    const handleStorageChange = e => {
      if (e.key === 'likedTracks') {
        setLikedTracks(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <LikedTracksContext.Provider
      value={{likedTracks, setLikedTracks: setLikedTracksWithStorage}}>
      {children}
    </LikedTracksContext.Provider>
  );
};

export default LikedTracksProvider;
