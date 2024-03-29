import React, {useContext, useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import styled from 'styled-components';
import PlaylistTracks from '../../components/PlaylistTracks';
import EditPlaylistComponent from '../ModifyAlbum';
import AddTracksToPlaylist from '../AddSongToPlaylist';
import {PlaylistContext} from '../../utils/context/PlaylistContext/PlaylistContext';

const PlaylistAlbum = ({id}) => {
  const [playlist, setPlaylist] = useState(null);
  const {playlists, fetchPlaylists} = useContext(PlaylistContext);

  useEffect(() => {
    fetch(
      `https://spotify-api-43ur.onrender.com/api/playlist/${id}?populate=true`,
    )
      .then(response => response.json())
      .then(data => setPlaylist(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, playlists.length]);

  useEffect(() => {
    fetchPlaylists();
  }, [playlist]);

  if (!playlist) return null;

  return (
    <AlbumPageContainer>
      <TrackContainer>
        <AlbumImageContainer>
          <AlbumImage src={playlist?.imageUrl} alt="Album" loading="lazy" />
        </AlbumImageContainer>
        <AlbumContainer>
          <TrackTitle>Album</TrackTitle>
          <AlbumTitle>{playlist.name}</AlbumTitle>
        </AlbumContainer>
      </TrackContainer>
      <EditPlaylistComponent playlist={playlist} setPlaylist={setPlaylist} />

      <PlaylistTracks playlist={playlist} setPlaylist={setPlaylist} />
      <AddTracksToPlaylist playlist={playlist} setPlaylist={setPlaylist} />
    </AlbumPageContainer>
  );
};
const AlbumPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 7px;
`;
const AlbumImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AlbumImageContainer = styled.div`
  margin-top: 50px;
  height: 232px;
  width: 232px;
  margin-bottom: 20px;
`;

const AlbumTitle = styled.h2`
  font-size: 3.5em;
  margin-bottom: 10px;
  margin-top: 0px;
  line-height: 1;
`;

const ArtistName = styled(Link)`
  font-size: 1.5em;
  margin-top: 2rem;
  color: inherit; // pour que le lien ait la même couleur que le texte
  text-decoration: none; // pour supprimer le soulignement du lien
  &:hover {
    color: grey;
    text-decoration: underline;
  }
`;

const TrackContainer = styled.div`
  display: flex;
  border-radius: 7px;
  //Make a linear gradient

  background: linear-gradient(180deg, #523a3a 0%, #121212 100%);
  padding: 1rem;
`;
const AlbumContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
`;

const TrackTitle = styled.p`
  margin-bottom: 0px;
`;

export default PlaylistAlbum;
