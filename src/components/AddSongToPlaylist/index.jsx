import {useEffect, useState, useContext} from 'react';
import styled from 'styled-components';
import {PlaylistContext} from '../../utils/context/PlaylistContext/PlaylistContext';
import {Link} from 'react-router-dom';
import SearchLogo from '../../assets/search.svg';
function AddTracksToPlaylist({setPlaylist, playlist}) {
  const [tracks, setTracks] = useState([]);
  const [search, setSearch] = useState('');
  const {fetchPlaylists} = useContext(PlaylistContext);

  useEffect(() => {
    const fetchTracks = async () => {
      const response = await fetch(
        'https://spotify-api-43ur.onrender.com/api/track',
      );
      const data = await response.json();

      const filteredTracks = data.filter(
        track => !playlist.tracks.find(t => t._id === track._id),
      );

      setTracks(filteredTracks);
    };

    fetchTracks();
  }, [playlist]);

  const addTrackToPlaylist = async trackId => {
    const response = await fetch(
      `https://spotify-api-43ur.onrender.com/api/playlist/${playlist._id}/track`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trackId: trackId,
        }),
      },
    );

    const data = await response.json();
    setPlaylist(data);
    setTracks(tracks.filter(track => track._id !== trackId));
  };

  return (
    <CreatePlaylistContainer>
      <SelectTitle>Cherchons du contenu à ajouter à votre playlist</SelectTitle>
      <SelectContainer>
        <StyledLogo src={SearchLogo} alt="Search" />
        <StyledInput
          type="text"
          placeholder="Rechercher des titres"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </SelectContainer>

      {search &&
        tracks
          .filter(track =>
            track.name.toLowerCase().includes(search.toLowerCase()),
          )
          .map(track => (
            <TrackContainer key={track._id}>
              <TrackImage src={track.album.imageUrl} />
              <TrackInfo>
                <TrackInfoArtist>
                  <TrackName>{track.name}</TrackName>

                  <TrackArtist to={`/artist/${track.album.artist._id}`}>
                    {track.album.artist.name}
                  </TrackArtist>
                </TrackInfoArtist>
              </TrackInfo>
              <TrackAlbum to={`/album/${track.album._id}`}>
                {track.album.name}
              </TrackAlbum>
              <StyledButton onClick={() => addTrackToPlaylist(track._id)}>
                Ajouter
              </StyledButton>
            </TrackContainer>
          ))}
    </CreatePlaylistContainer>
  );
}

const CreatePlaylistContainer = styled.div`
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  background-color: #121212;
  color: white;
  padding: 20px 0px 10rem 20px;
`;
const SelectTitle = styled.h2`
  font-size: 1.4em;
  margin-bottom: 10px;
  margin-top: 0px;
  line-height: 1;
`;
const SelectContainer = styled.div`
  width: 30%; // Utiliser toute la largeur disponible
  background-color: #282828;
  justify-content: space-between; // Espacer les éléments uniformément
  align-items: center;
  height: 10px; // Adapter la hauteur au contenu
  display: flex;
  flex-direction: row;
  padding: 20px; // Ajouter un padding pour l'espacement interne
  border-radius: 5px; // Augmenter le rayon de la bordure pour des coins plus arrondis
`;

const StyledLogo = styled.img`
  width: 20px; // Augmenter la taille du logo
  height: 20px;
  margin-right: 10px; // Ajouter une marge à droite pour séparer le logo de l'input
`;

const StyledInput = styled.input`
  flex-grow: 1; // Permettre à l'input de prendre tout l'espace restant
  height: 40px;
  border-radius: 5px; // Augmenter le rayon de la bordure pour des coins plus arrondis
  border: none;
  background-color: #282828;
  color: #fff;
  font-size: 1em;
  padding: 0 10px;
  transition: all 0.3s ease; // Ajouter une transition pour les changements d'état

  &:focus {
    // Ajouter un style pour l'état focus
    outline: none;
  }
`;

const TrackInfo = styled.div`
  display: flex;
  align-items: center;
`;
const TrackInfoArtist = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;
const TrackArtist = styled(Link)`
  font-size: 14px;
  margin: 0;
  color: #b3b3b3;

  transition: 0.1s ease-in-out;
  &:hover {
    color: #fff;
    text-decoration: underline;
  }
`;
const TrackName = styled.h2`
  font-size: 16px;

  margin: 0;
  transition: 0.1s ease-in-out;
  color: #fff;
`;
const TrackAlbum = styled(Link)`
  font-size: 14px;
  margin: 0;
  color: #b3b3b3;

  transition: 0.1s ease-in-out;
  &:hover {
    color: #fff;
    text-decoration: underline;
  }
`;
const TrackContainer = styled.div`
  display: grid;
  grid-template-columns: 0.1fr 1fr 1fr 0.2fr;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #282828;
  padding: 10px 0;
  width: 100%;
`;
const TrackImage = styled.img`
  width: 50px;
  height: 50px;

  margin-right: 20px;
`;

const StyledButton = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  border: none;
  background-color: #1db954;
  color: #fff;
  font-size: 1em;
  padding: 0 10px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  &:hover {
    cursor: pointer;
    background-color: #1ed760;
  }
`;

const Track = styled.div`
  font-size: 1em;
  color: #fff;
  margin-right: 20px;
`;

export default AddTracksToPlaylist;
