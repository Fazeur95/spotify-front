import React, {useEffect, useContext, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import styled from 'styled-components';
import PopularArtists from '../../components/PopularArtists';
import {PlaylistContext} from '../../utils/context/PlaylistContext/PlaylistContext';

const AlbumPage = () => {
  const {id} = useParams();
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    fetch(`https://spotify-api-43ur.onrender.com/api/album/${id}?populate=true`)
      .then(response => response.json())
      .then(data => {
        setAlbum({...data});
      });
  }, [id]);

  if (!album) return null;

  return (
    <AlbumPageContainer>
      <TrackContainer>
        <AlbumImageContainer>
          <AlbumImage src={album?.imageUrl} alt="Album" loading="lazy" />
        </AlbumImageContainer>
        <AlbumContainer>
          <TrackTitle>Album</TrackTitle>
          <AlbumTitle>{album.name}</AlbumTitle>
          <ArtistName to={`/artist/${album.artist._id}`}>
            {album.artist.name}
          </ArtistName>
        </AlbumContainer>
      </TrackContainer>

      <PopularArtists album={album} />
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

  @media (max-width: 768px) {
    height: 150px; // Réduire la taille de l'image pour les petits écrans
    width: 150px; // Réduire la taille de l'image pour les petits écrans
  }
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
  background: linear-gradient(180deg, #523a3a 0%, #121212 100%);
  padding: 1rem;

  @media (max-width: 768px) {
    flex-direction: column; // Changer la direction de la flexion pour les petits écrans
  }
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

export default AlbumPage;
