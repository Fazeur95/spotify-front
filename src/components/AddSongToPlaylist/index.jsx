import {useEffect, useState, useContext} from 'react';
import styled from 'styled-components';
import {PlaylistContext} from '../../utils/context/PlaylistContext/PlaylistContext';

function AddTracksToPlaylist({playlistId}) {
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const {playlists, setPlaylists} = useContext(PlaylistContext);

  useEffect(() => {
    const fetchTracks = async () => {
      const response = await fetch('http://localhost:6868/api/track');
      const data = await response.json();
      setTracks(data);
    };

    fetchTracks();
  }, []);

  const handleSelectTrack = event => {
    setSelectedTrack(event.target.value);
  };

  const addTrackToPlaylist = async () => {
    const response = await fetch(
      `http://localhost:6868/api/playlist/${playlistId}/tracks/${selectedTrack}`,
      {
        method: 'POST',
      },
    );
    const data = await response.json();
    setPlaylists(
      playlists.map(playlist => (playlist._id === data._id ? data : playlist)),
    );
  };

  return (
    <CreatePlaylistContainer>
      <SelectContainer>
        <StyledSelect onChange={handleSelectTrack}>
          <StyledOption value={null}>Choisissez une chanson</StyledOption>
          {tracks.map(track => (
            <StyledOption key={track._id} value={track._id}>
              {track.name}
            </StyledOption>
          ))}
        </StyledSelect>
      </SelectContainer>
      <ButtonContainer>
        <StyledButton onClick={addTrackToPlaylist}>Ajouter</StyledButton>
      </ButtonContainer>
    </CreatePlaylistContainer>
  );
}

const CreatePlaylistContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 100%;
  height: 100%;
  background-color: #121212;
  transition: all 0.3s ease;
  justify-content: center;
`;

const SelectContainer = styled.div`
  width: 20%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledSelect = styled.select`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  color: #333;
  font-size: 1em;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #eee;
  }
`;

const StyledOption = styled.option`
  font-size: 1em;
  padding: 12px;
  color: #333;
  transition: all 0.3s ease;

  &:hover {
    background-color: #eee;
  }
`;

const ButtonContainer = styled.div`
  width: 20%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledButton = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #333;
  color: #fff;
  font-size: 1em;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #555;
  }
`;

const Track = styled.p`
  font-size: 1em;
  padding: 12px;
  transition: all 0.3s ease;
`;

export default AddTracksToPlaylist;
