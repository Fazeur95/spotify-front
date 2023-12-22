import {useState, useEffect, useContext} from 'react';

import styled from 'styled-components';
import {AudioPlayerContext} from '../../utils/context/AudioPlayerContext/AudioPlayerContext';

const RandomPlaylist = () => {
  const [playlist, setPlaylist] = useState([]);
  const {setCurrentTrack, currentTrack} = useContext(AudioPlayerContext);
  const [currentPlayingTrack, setCurrentPlayingTrack] = useState(null);

  //Create a random playlist with 5 random tracks
  useEffect(() => {
    fetch('https://spotify-api-43ur.onrender.com/api/track?populate=true')
      .then(response => response.json())
      .then(data => {
        setPlaylist(data);
      });
  }, []);

  //Display only 5 random tracks

  const randomTracks = playlist
    .sort(() => Math.random() - Math.random())
    .slice(0, 5);

  if (!playlist) return null;

  return (
    <PlaylistContainer>
      {randomTracks.map((track, index) => (
        <TrackContainer
          key={index}
          onClick={() => {
            setCurrentTrack(track);
            setCurrentPlayingTrack(track);
          }}>
          <TrackNumber>{index + 1}</TrackNumber>
          <TrackTitle isPlaying={currentPlayingTrack === track}>
            {track.name}
          </TrackTitle>
        </TrackContainer>
      ))}
    </PlaylistContainer>
  );
};
const PlaylistContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #121212;
  color: white;
  padding: 20px;
  width: 100%;
`;

const TrackContainer = styled.div`
  display: flex;
  align-items: center;

  background-color: #282828;
  color: white;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    background-color: #333;
  }
`;

const TrackNumber = styled.span`
  color: #b3b3b3;
  margin-right: 10px;
`;

const TrackTitle = styled.h1`
  font-size: 1.2em;
  flex-grow: 1;
  margin-left: 10px;
  color: ${props => (props.isPlaying ? '#1db954' : 'white')};
`;
export default RandomPlaylist;
