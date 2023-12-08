import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';

const ArtistPage = () => {
  const {id} = useParams();
  const [artist, setArtist] = useState(null);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:6868/api/artist/${id}?populate=true`)
      .then(response => response.json())
      .then(data => setArtist(data));
  }, [id]);

  useEffect(() => {
    if (artist?.albums?.length > 0) {
      fetch(
        `http://localhost:6868/api/album/${artist.albums[0]._id}?populate=true`,
      )
        .then(response => response.json())
        .then(data => {
          data?.tracks?.map(track => {
            setTracks(prevData => [...prevData, track]);
          });
        });
    }
  }, [artist]);

  if (!artist) return null;

  return (
    <ArtistContainer>
      <ArtistName>{artist.name}</ArtistName>
      <MonthlyListeners> auditeurs mensuels</MonthlyListeners>

      <SongList>
        {artist.albums?.map((album, index) => (
          <li key={index}>{album.name}</li>
        ))}
        {tracks?.map((track, index) => (
          <li key={index}>{track.name}</li>
        ))}
      </SongList>
    </ArtistContainer>
  );
};

const ArtistContainer = styled.div`
  /* Ajoutez vos styles ici */
`;

const ArtistName = styled.h1`
  /* Ajoutez vos styles ici */
`;

const MonthlyListeners = styled.p`
  /* Ajoutez vos styles ici */
`;

const SongList = styled.ul`
  /* Ajoutez vos styles ici */
`;

export default ArtistPage;
