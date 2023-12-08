import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import styled from 'styled-components';
import PopularArtists from '../../components/PopularArtists';

const AlbumPage = () => {
  const {id} = useParams();
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:6868/api/album/${id}?populate=true`)
      .then(response => response.json())
      .then(data => setAlbum(data));
  }, [id]);

  if (!album) return null;

  return (
    <AlbumPageContainer>
      <TrackContainer>
        <AlbumImageContainer>
          <AlbumImage src={album?.imageUrl} alt="Album" />
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

export default AlbumPage;
