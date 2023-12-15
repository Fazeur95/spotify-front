import {useEffect, useState} from 'react';
import styled from 'styled-components';
function AddTracksToPlaylist({playlistId}) {
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);

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
    await fetch(
      `http://localhost:6868/api/playlist/${playlistId}/tracks/${selectedTrack}`,
      {
        method: 'POST',
      },
    );
  };

  return (
    <>
      <StyledSelect onChange={handleSelectTrack}>
        <StyledOption value={null}>Choisissez une chanson</StyledOption>
        {tracks.map(track => (
          <StyledOption key={track._id} value={track._id}>
            <StyledTrack>{track.name}</StyledTrack>
          </StyledOption>
        ))}
      </StyledSelect>
      <StyledButton onClick={addTrackToPlaylist}>Ajouter</StyledButton>
    </>
  );
}
const StyledSelect = styled.select`
  width: 100%;
  height: 40px;
  border-radius: 7px;
  border: 1px solid #000;
  margin-bottom: 20px;
  color: white;
  @media (min-width: 768px) {
    height: 45px;
  }
  @media (min-width: 1024px) {
    height: 50px;
  }
`;

const StyledOption = styled.option`
  font-size: 1em;
  padding: 10px;
  color: white;
  @media (min-width: 768px) {
    font-size: 1.2em;
  }
  @media (min-width: 1024px) {
    font-size: 1.5em;
  }
`;

const StyledButton = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 7px;
  border: 1px solid #000;
  margin-bottom: 20px;
  background-color: #000;
  color: #fff;
  font-size: 1em;
  cursor: pointer;
  @media (min-width: 768px) {
    height: 45px;
    font-size: 1.2em;
  }
  @media (min-width: 1024px) {
    height: 50px;
    font-size: 1.5em;
  }
`;

const StyledTrack = styled.p`
  font-size: 1em;
  padding: 10px;
  @media (min-width: 768px) {
    font-size: 1.2em;
  }
  @media (min-width: 1024px) {
    font-size: 1.5em;
  }
`;

export default AddTracksToPlaylist;
