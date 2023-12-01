import {createContext, useState} from 'react';

export const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({children}) => {
  const [currentTrack, setCurrentTrack] = useState(null);

  return (
    <AudioPlayerContext.Provider
      value={{
        currentTrack,
        setCurrentTrack,
      }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export default AudioPlayerProvider;
