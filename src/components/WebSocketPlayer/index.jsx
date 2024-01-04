import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {FaPlay, FaPause, FaForward, FaBackward} from 'react-icons/fa';

const WebSocketAudioPlayer = ({track, socket, trackId}) => {
  const audioRef = useRef(); // Create a reference to the audio element
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // Add a state for the progress

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  useEffect(() => {
    if (audioRef.current && socket) {
      const handlePlay = () => {
        socket.emit('playSound', {
          trackId: trackId,
          currentTime: audioRef.current.currentTime,
        });
      };

      const handlePause = () => {
        socket.emit('pauseSound');
      };

      const handleTimeUpdate = () => {
        socket.emit('resumeSound', {currentTime: audioRef.current.currentTime});
        setProgress(
          (audioRef.current.currentTime / audioRef.current.duration) * 100,
        ); // Update the progress
      };

      audioRef.current.addEventListener('play', handlePlay);
      audioRef.current.addEventListener('pause', handlePause);
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        audioRef.current.removeEventListener('play', handlePlay);
        audioRef.current.removeEventListener('pause', handlePause);
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [socket, trackId]);

  return (
    <PlayerContainer>
      <audio ref={audioRef} src={track.url} />
      <ProgressBar value={progress} max={100} /> {/* Add a progress bar */}
      <ControlsContainer>
        <PlayerButton onClick={() => (audioRef.current.currentTime -= 10)}>
          <FaBackward color="white" />
        </PlayerButton>
        <PlayerButton onClick={togglePlayPause}>
          {isPlaying ? <FaPause color="white" /> : <FaPlay color="white" />}
        </PlayerButton>
        <PlayerButton onClick={() => (audioRef.current.currentTime += 10)}>
          <FaForward color="white" />
        </PlayerButton>
      </ControlsContainer>
    </PlayerContainer>
  );
};
const ProgressBar = styled.progress`
  width: 100%;
  height: 10px;
`;
const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 400px;
  margin-top: 20px;
`;

const PlayerButton = styled.button`
  background: none;
  border: none;
  color: #444;
  font-size: 24px;
  cursor: pointer;
`;

export default WebSocketAudioPlayer;
