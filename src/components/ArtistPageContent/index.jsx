import styled from 'styled-components';
import VerifiedBadge from '../../assets/badge-check.svg';
import PlayButton from '../../assets/play.svg';
import {useNavigate} from 'react-router-dom';

const ArtistPageContent = ({
  artist,
  tracks,
  currentTrack,
  setCurrentTrack,
  numberListenings,
}) => {
  const navigate = useNavigate();
  console.log(tracks);

  return (
    <ArtistPageContainer>
      <ImageContainer>
        <VerifiedContainer>
          <VerifiedArtistBadge src={VerifiedBadge} alt="Verified" />
          <VerifiedTitle>Artiste Vérifiée</VerifiedTitle>
        </VerifiedContainer>
        <ImageStyled src={artist.imageUrl} alt="Artist" loading="lazy" />
        <ArtistName>{artist.name}</ArtistName>
        <MonthlyListeners>
          {numberListenings} auditeurs mensuels
        </MonthlyListeners>
      </ImageContainer>

      <PopularTracksContainer>
        <PopularSongContainer>
          <PopularTitle>Populaires</PopularTitle>
          {tracks.map((track, index) => {
            const isPlaying = currentTrack?.name === track.name;
            return (
              <SongList key={index} isPlaying={isPlaying}>
                <TrackPlace isPlaying={isPlaying}>{index + 1}</TrackPlace>
                <PlayButtonLogo
                  src={PlayButton}
                  alt="Play"
                  onClick={() => setCurrentTrack(track)}
                />
                <TrackImage
                  src={track.album.imageUrl}
                  alt="Album"
                  loading="lazy"
                />
                <TrackName isPlaying={isPlaying}>{track.name}</TrackName>
                <TrackListener>{numberListenings}</TrackListener>
              </SongList>
            );
          })}
        </PopularSongContainer>
        <PopularSongContainer>
          <PopularTitle>Discographie</PopularTitle>
          <CardContainer>
            {artist.albums &&
              artist.albums.map((album, index) => (
                <Card
                  key={index}
                  onClick={() => {
                    navigate(`/album/${album._id}`);
                  }}>
                  <CardImage src={album.imageUrl} alt="Album" />
                  <CardTitle>{album.name}</CardTitle>
                  <CardArtist>{album.artist.name}</CardArtist>
                </Card>
              ))}
          </CardContainer>
        </PopularSongContainer>

        <PopularSongContainer>
          <PopularTitle>Sélection de l'artiste</PopularTitle>
        </PopularSongContainer>
      </PopularTracksContainer>
    </ArtistPageContainer>
  );
};

const ArtistPageContainer = styled.div`
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
  object-fit: cover;
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
const CardContainer = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  width: 100%;
  scrollbar-width: thin;
`;
const Card = styled.div`
  width: 170px;
  border-radius: 10px;
  padding: 1rem;
  background-color: #181818;
  &:hover {
    cursor: pointer;
    background-color: #282828;
    transition: 0.3s ease-in-out;
  }
`;

const CardTitle = styled.h2`
  color: white;
  font-size: 20px;
  font-weight: bold;
  white-space: nowrap;
  margin-top: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardArtist = styled.p`
  color: grey;
  font-size: 18px;
  margin-top: 0;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardImage = styled.img`
  width: 100%; /* Make sure the image takes the full width of its container */
  height: auto; /* Maintain the aspect ratio of the image */
  border-radius: 10px;
  object-fit: cover;
  object-position: center;
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

export default ArtistPageContent;
