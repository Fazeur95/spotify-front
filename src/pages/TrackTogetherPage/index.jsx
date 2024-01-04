import React, {useEffect, useState, useContext, useRef} from 'react';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';
import {AudioPlayerContext} from '../../utils/context/AudioPlayerContext/AudioPlayerContext'; // Import the context
import {a} from 'react-spring';

const TrackTogetherPage = () => {
  const {id} = useParams(); // Get the track ID from the URL
  const {socket} = useContext(AudioPlayerContext); // Access the socket
  const [track, setTrack] = useState(null);
  const audioRef = useRef(); // Create a reference to the audio element

  useEffect(() => {
    // Fetch the track details from the server or a database
    fetch(`https://spotify-api-43ur.onrender.com/api/track/${id}`)
      .then(response => response.json())
      .then(data => setTrack(data))
      .catch(error => console.error(error));
  }, [id]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load(); // Reload the audio source
    }
  }, [track]);

  useEffect(() => {
    if (socket == null) return;

    socket.on('playSound', track => {
      if (track.id === id) {
        // Play the audio player...

        // You can also use the audioRef to play the audio:

        audioRef.current.play();
      }
    });

    socket.on('pauseSound', () => {
      // Pause the audio player...
    });

    socket.on('resumeSound', () => {
      // Resume the audio player...
    });

    return () => {
      socket.off('playSound');
      socket.off('pauseSound');
      socket.off('resumeSound');
    };
  }, [socket, id]);

  if (track === null) {
    return <div>Loading...</div>;
  }

  return (
    <TrackPageContainer>
      <TrackInfo>
        <TrackTitle>{track.name}</TrackTitle>
        <TrackArtist>{track.album}</TrackArtist>
        {/* Add more track details here... */}
      </TrackInfo>
      <StyledAudio ref={audioRef} controls src={track.url} />
    </TrackPageContainer>
  );
};

// Your styled components...

const TrackPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 7px;
  background: linear-gradient(180deg, #091221 0%, #121212 8%);
  height: 100rem;
  overflow: hidden;
  @media (max-width: 768px) {
    height: auto;
    padding: 10px;
  }
`;
const TrackInfo = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const TrackTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  color: white;
`;

const TrackArtist = styled.h3`
  margin: 0;
  font-size: 20px;
  color: #b3b3b3;
`;
const StyledAudio = styled.audio`
  width: 100%;
  margin: 20px;
`;

export default TrackTogetherPage;
