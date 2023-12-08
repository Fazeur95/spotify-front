/* eslint-disable react-hooks/rules-of-hooks */
import {useEffect, useState, useContext, useMemo} from 'react';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';
import VerifiedBadge from '../../assets/badge-check.svg';
import PlayButton from '../../assets/play.svg';
import {AudioPlayerContext} from '../../utils/context/AudioPlayerContext/AudioPlayerContext';
const ArtistPage = ({album}) => {
  const {id} = useParams();
  const {setCurrentTrack, currentTrack} = useContext(AudioPlayerContext);
  const [artist, setArtist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [currentPlayingTrack, setCurrentPlayingTrack] = useState(null);

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

  const randomTracks = useMemo(() => {
    return tracks.sort(() => Math.random() - Math.random()).slice(0, 5);
  }, [tracks]);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 1000000 + 1000000)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  const persistantRandomNumber = useMemo(() => generateRandomNumber(), []);

  if (!artist) return null;
  //Make a random function to get a random track from the artist

  return (
    <ArtistContainer>
      <ImageContainer>
        <VerifiedContainer>
          <VerifiedArtistBadge src={VerifiedBadge} alt="Verified" />
          <VerifiedTitle>Artiste Vérifiée</VerifiedTitle>
        </VerifiedContainer>
        <ImageStyled src={artist.imageUrl} alt="Artist" />
        <ArtistName>{artist.name}</ArtistName>
        <MonthlyListeners>
          {persistantRandomNumber} auditeurs mensuels
        </MonthlyListeners>
      </ImageContainer>

      <PopularTracksContainer>
        <PopularSongContainer>
          <PopularTitle>Populaires</PopularTitle>

          {randomTracks?.map((track, index) => {
            const isPlaying = currentTrack?.name === track.name;
            return (
              <SongList key={index} isPlaying={isPlaying}>
                <TrackPlace isPlaying={isPlaying}>{index + 1}</TrackPlace>
                <PlayButtonLogo
                  src={PlayButton}
                  alt="Play"
                  onClick={() =>
                    setCurrentTrack({
                      ...track,
                      album: {
                        imageUrl: artist.imageUrl,
                        name: artist.name,
                        artist: {
                          name: artist.name,
                        },
                      },
                    })
                  }
                />
                <TrackImage src={artist.imageUrl} alt="Album" />
                <TrackName isPlaying={isPlaying}>{track.name}</TrackName>
                <TrackListener>{persistantRandomNumber}</TrackListener>
              </SongList>
            );
          })}
        </PopularSongContainer>

        <PopularSongContainer>
          <PopularTitle>Discographie</PopularTitle>
        </PopularSongContainer>

        <PopularSongContainer>
          <PopularTitle>Sélection de l'artiste</PopularTitle>
        </PopularSongContainer>
      </PopularTracksContainer>
    </ArtistContainer>
  );
};

const ArtistContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #121212;
  color: white;
`;
const PopularTracksContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const TrackPlace = styled.p`
  padding: 0 10px;
  font-size: 1.1em;
`;
const TrackImage = styled.img`
  width: 50px;
  padding: 0 10px;
  height: 50px;
`;
const TrackName = styled.h3`
  font-size: 1.1em;
  padding: 0 10px;
  color: ${props => (props.isPlaying ? 'green' : 'white')};
`;
const TrackListener = styled.p`
  font-size: 1.1em;
`;
const PopularSongContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #121212;
  padding: 20px;
  margin-bottom: 0px;
  color: white;
`;
const PlayButtonLogo = styled.img`
  display: none;
  padding: 0 10px;
  width: 20px;
`;

const PopularTitle = styled.h1`
  color: white;
  font-size: 1.5em;
  margin-left: 5px;
`;
const ImageContainer = styled.div`
  display: flex;

  flex-direction: column;
`;

const ImageStyled = styled.img`
  width: 100%;
  height: 400px;
`;
const VerifiedTitle = styled.h1`
  color: white;
  font-size: 1.1em;
  margin-left: 10px;
`;
const VerifiedArtistBadge = styled.img``;
const VerifiedContainer = styled.div`
  position: absolute;
  display: flex;
  top: 18%;
  margin-left: 10px;
`;

const ArtistName = styled.h1`
  font-size: 4em;
  top: 19%;
  margin-left: 10px;
  position: absolute;
`;

const MonthlyListeners = styled.h2`
  font-size: 1.2em;
  top: 35%;
  margin-left: 10px;
  position: absolute;
`;

const SongList = styled.ul`
  display: grid;
  //Grid take 50% of the screen

  //Less margin between the tracks
  grid-template-columns: 0.3fr 0.3fr 3fr 1fr;

  align-items: center;
  margin-bottom: 1px;
  border-radius: 10px;
  background-color: ${props => (props.isPlaying ? '#282828' : 'transparent')};
  padding: 5px 0;
  &:hover {
    background-color: #282828;
    cursor: pointer;
    transition: 0.1s ease-in-out;
    ${PlayButtonLogo} {
      display: block;
      color: #1db954;
    }
    ${TrackPlace} {
      display: none;
    }
  }
`;

export default ArtistPage;
