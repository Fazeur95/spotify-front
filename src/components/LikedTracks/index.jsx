/* eslint-disable react/prop-types */
import {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import TimeLogo from '../../assets/clock-3.svg';
import {AudioPlayerContext} from '../../utils/context/AudioPlayerContext/AudioPlayerContext';
import {Link} from 'react-router-dom';
import PlayButton from '../../assets/play.svg';
import HearthLogo from '../../assets/heart.svg';
import HearthFilledLogo from '../../assets/heart-filled.svg';
import LikedCover from '../../assets/likedCover.webp';
import {LikedTracksContext} from '../../utils/context/LikedTracksContext/LikedTracksContext';

const LikedPlaylist = () => {
  const {setCurrentTrack, currentTrack} = useContext(AudioPlayerContext);
  const [isPlaying, setIsPlaying] = useState(false);

  // Utilisez le contexte pour obtenir likedTracks et setLikedTracks
  const {likedTracks, setLikedTracks} = useContext(LikedTracksContext);

  const likeTrack = track => {
    const isTrackLiked = likedTracks.find(t => t._id === track._id);

    let newLikedTracks;
    if (isTrackLiked) {
      // Si le morceau est déjà aimé, supprimez-le de likedTracks
      newLikedTracks = likedTracks.filter(t => t._id !== track._id);
    } else {
      // Sinon, ajoutez-le à likedTracks
      newLikedTracks = [...likedTracks, track];
    }

    setLikedTracks(newLikedTracks);
    localStorage.setItem('likedTracks', JSON.stringify(newLikedTracks));
  };
  console.log(likedTracks);

  return (
    <TrackListContainer>
      <CoverContainer>
        <TrackContainer>
          <AlbumImageContainer>
            <AlbumImage src={LikedCover} alt="Album" loading="lazy" />
          </AlbumImageContainer>
          <AlbumContainer>
            <TrackTitle>Playlist</TrackTitle>

            {likedTracks.length === 0 ? (
              <AlbumTitle>Vous n'avez pas encore aimé de titres</AlbumTitle>
            ) : (
              <LikedTitle>Titres Likés : {likedTracks.length}</LikedTitle>
            )}
          </AlbumContainer>
        </TrackContainer>
        <TrackContainerBorder>
          <ColumnTitlePlace>#</ColumnTitlePlace>
          <ColumnTitle>Titre</ColumnTitle>
          <ColumnTitle>Album</ColumnTitle>
          <ColumnTitle>Likez</ColumnTitle>
          <ColumnTitle>Date d'ajout</ColumnTitle>
        </TrackContainerBorder>
      </CoverContainer>
      <BackgroundContainer>
        {likedTracks.map((track, index) => (
          <TrackContainer key={index}>
            <TrackPlace
              onClick={() => {
                setCurrentTrack({
                  ...track,
                  album: {
                    imageUrl: track.album.imageUrl,
                    name: track.album.name,
                    artist: {
                      name: track.album.artist.name,
                    },
                  },
                });
                setIsPlaying(true);
              }}>
              {index + 1}
            </TrackPlace>
            <TrackInfo>
              <TrackInfoArtist>
                <TrackName
                  name={track.name}
                  currentTrackName={currentTrack?.name}>
                  {track.name}
                </TrackName>

                <TrackArtist to={`/artist/${track?.album?.artist?._id}`}>
                  {track.album.artist.name}
                </TrackArtist>
              </TrackInfoArtist>
            </TrackInfo>
            <TrackAlbum
              to={
                track.album && track.album._id
                  ? `/album/${track.album._id}`
                  : '#'
              }>
              {track.album.name}
            </TrackAlbum>

            <LikedLogo
              src={
                likedTracks.find(t => t._id === track._id)
                  ? HearthFilledLogo
                  : HearthLogo
              }
              alt="Like Logo"
              onClick={() => likeTrack(track)}
            />
            <TrackAddedDate>
              {new Date(track.createdAt).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </TrackAddedDate>
          </TrackContainer>
        ))}
      </BackgroundContainer>
    </TrackListContainer>
  );
};

const AlbumImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 7px;
`;

const BackgroundContainer = styled.div`
  background-color: #121212;
  color: white;
  height: 100%;
  padding-bottom: 10vh;
`;

const TrackAddedDate = styled.p`
  font-size: 14px;
`;

const CoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 7px;
  padding: 20px;
  background: linear-gradient(180deg, #804dfe -99%, #121212 100%);
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

const LikedTitle = styled.h2`
  font-size: 3.5em;
  margin-top: 0.5rem;
  color: inherit; 
  text-decoration: 
  &:hover {
    color: grey;
    text-decoration: underline;
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
const TrackListContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #121212;
  color: white;
  height: 100%;
  overflow-y: auto;
`;
const LikedLogo = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const TrackContainer = styled.div`
  display: grid;
  grid-template-columns: 0.25fr 3fr 3fr 1.8fr 1fr;
  align-items: center;
  margin-bottom: 20px;

  padding: 10px 0;
`;
const TrackContainerBorder = styled.div`
  display: grid;
  grid-template-columns: 0.25fr 3fr 3fr 1.8fr 1fr;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #282828;
  padding: 10px 0;
`;

const ColumnTitle = styled.h2`
  font-size: 13px;
  color: #b3b3b3;
  margin-bottom: 10px;
`;

const ColumnTitlePlace = styled.h2`
  font-size: 13px;
  color: #b3b3b3;

  display: flex;

  align-items: center;
`;

const TrackInfo = styled.div`
  display: flex;
  align-items: center;
`;

const TrackName = styled.h2`
  font-size: 16px;

  margin: 0;
  transition: 0.1s ease-in-out;
  color: ${({name, currentTrackName}) =>
    name === currentTrackName ? '#1db954' : '#fff'};
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

const DurationIcon = styled.img`
  width: 16px;
  height: 16px;
`;
const TrackPlace = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #b3b3b3;
  align-items: center;
  padding-right: 10px;
  background-image: none;

  &:hover {
    background-image: url(${PlayButton});
    background-repeat: no-repeat;
    background-position: center;
    //Don't show the text while hovering
    color: transparent;

    cursor: pointer;
  }
`;
export default LikedPlaylist;
