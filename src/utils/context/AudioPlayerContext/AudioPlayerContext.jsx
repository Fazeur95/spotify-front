import {createContext, useState, useEffect} from 'react';
import {io} from 'socket.io-client';

export const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({children}) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('https://spotify-websocket.onrender.com');
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return (
    <AudioPlayerContext.Provider
      value={{currentTrack, setCurrentTrack, socket}}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export default AudioPlayerProvider;
