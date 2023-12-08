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
            setTracks(prevData => {
              if (prevData?.find(t => t._id === track._id)) return prevData;

              return [...prevData, track];
            });
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
        {tracks?.map((track, index) => (
          <li key={index}>{track.name}</li>
        ))}
      </SongList>
    </ArtistContainer>
  );
};

const ArtistContainer = styled.div`
  display: flex;
  flex-direction: column;

  background-color: #121212;
  color: white;
  padding: 20px;
`;

const ArtistName = styled.h1`
  font-size: 2.5em;
  text-align: center;
  color: #1db954; /* Couleur verte Spotify */
`;

const MonthlyListeners = styled.p`
  font-size: 1.2em;
  text-align: center;
  color: #b3b3b3; /* Gris clair */
`;

const SongList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
  margin-top: 20px;

  & > li {
    padding: 10px 0;
    border-bottom: 1px solid #282828; /* Ligne de séparation entre les chansons */
    font-size: 1.1em;
  }
`;

export default ArtistPage;
