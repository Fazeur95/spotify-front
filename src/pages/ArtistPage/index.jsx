/* eslint-disable react-hooks/rules-of-hooks */
import {useEffect, useState, useContext, useMemo} from 'react';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';
import ArtistPageContent from '../../components/ArtistPageContent';
import {AudioPlayerContext} from '../../utils/context/AudioPlayerContext/AudioPlayerContext';
const ArtistPage = () => {
  const {id} = useParams();
  const {setCurrentTrack, currentTrack} = useContext(AudioPlayerContext);
  const [artist, setArtist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [numberListenings, setNumberListenings] = useState(null);

  useEffect(() => {
    fetch(
      `https://spotify-api-43ur.onrender.com/api/artist/${id}?populate=true`,
    )
      .then(response => response.json())
      .then(data => {
        setArtist(data);
        setNumberListenings(data.numberListenings); // Stocker numberListenings dans l'état
      });
  }, [id]);

  useEffect(() => {
    if (artist?.albums?.length > 0) {
      fetch(
        `https://spotify-api-43ur.onrender.com/api/album/${artist.albums[0]._id}?populate=true`,
      )
        .then(response => response.json())
        .then(data => {
          data?.tracks?.map(track => {
            setTracks(prevData => {
              if (prevData?.find(t => t._id === track._id)) return prevData;

              return [
                ...prevData,
                {
                  ...track,
                  album: {
                    imageUrl: data.imageUrl,
                    name: data.name,
                    artist: {
                      name: artist.name,
                    },
                  },
                },
              ];
            });
          });
        });
    }
  }, [artist]);

  const randomTracks = useMemo(() => {
    return tracks.sort(() => Math.random() - Math.random()).slice(0, 5);
  }, [tracks]);

  if (!artist) return null;
  //Make a random function to get a random track from the artist

  return (
    <ArtistContainer>
      <ArtistPageContent
        artist={artist}
        tracks={randomTracks}
        currentTrack={currentTrack}
        setCurrentTrack={setCurrentTrack}
        numberListenings={numberListenings}
      />
    </ArtistContainer>
  );
};

const ArtistContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #121212;
  color: white;
`;
export default ArtistPage;
