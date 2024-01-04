import React, {useEffect, useState, useContext} from 'react';
import {useParams} from 'react-router-dom';
import {AudioPlayerContext} from '../../utils/context/AudioPlayerContext/AudioPlayerContext'; // Import the context
import styled from 'styled-components';
import WebSocketAudioPlayer from '../../components/WebSocketPlayer'; // Import the AudioPlayer component

const TrackTogetherPage = () => {
  const {id} = useParams(); // Get the track ID from the URL
  const {socket} = useContext(AudioPlayerContext); // Access the socket
  const [track, setTrack] = useState(null);

  useEffect(() => {
    // Fetch the track details from the server or a database
    fetch(`https://spotify-api-43ur.onrender.com/api/track/${id}`)
      .then(response => response.json())
      .then(data => setTrack(data))
      .catch(error => console.error(error));
  }, [id]);

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
      <WebSocketAudioPlayer track={track} socket={socket} trackId={id} />
    </TrackPageContainer>
  );
};

// Your styled components...

const TrackPageContainer = styled.div`
  background-color: #1f1f1f;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  box-sizing: border-box;
  padding: 1rem;
  border-radius: 0.3rem;
`;

const TrackInfo = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TrackTitle = styled.h2`
  color: white;
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
`;

const TrackArtist = styled.h3`
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
`;

export default TrackTogetherPage;
