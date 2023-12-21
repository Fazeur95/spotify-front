/* eslint-disable react/prop-types */
import {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import TimeLogo from '../../assets/clock-3.svg';
import {AudioPlayerContext} from '../../utils/context/AudioPlayerContext/AudioPlayerContext';
import {Link} from 'react-router-dom';
import PlayButton from '../../assets/play.svg';
import HearthLogo from '../../assets/heart.svg';
import HearthFilledLogo from '../../assets/heart-filled.svg';

const PopularArtists = ({playlist}) => {
  const {setCurrentTrack, currentTrack} = useContext(AudioPlayerContext);
  const [tracks, setTracks] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const [likedTracks, setLikedTracks] = useState(
    JSON.parse(localStorage.getItem('likedTracks')) || [],
  );
  console.log(playlist);

  useEffect(() => {
    if (!playlist.tracks.length === 0) return;

    setTracks([...playlist.tracks]);
    // setTotalDuration(getTotalDuration(playlist.map(playlist => playlist.tracks).flat()));
  }, [playlist]);

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

  const handleOnClickLike = track => {
    const trackInPlaylist = playlist.tracks.find(t => t._id === track._id);

    if (!trackInPlaylist) return;

    likeTrack({
      ...trackInPlaylist,
      album: {
        imageUrl: trackInPlaylist?.album?.imageUrl,
        name: trackInPlaylist?.album?.name,
        artist: {
          name: trackInPlaylist?.album?.artist?.name,
        },
      },
    });
  };

  if (!tracks) {
    return null;
  }

  return (
    <TrackListContainer>
      <TrackContainer>
        <ColumnTitlePlace>#</ColumnTitlePlace>
        <ColumnTitle>Titre</ColumnTitle>
        <ColumnTitle>Album</ColumnTitle>
        <ColumnTitle>Date d'ajout</ColumnTitle>
        <ColumnTitle></ColumnTitle>
      </TrackContainer>

      {tracks.map((track, index) => (
        <TrackContainer key={index}>
          <TrackPlace
            onClick={() => {
              setCurrentTrack({
                ...track,
                album: {
                  imageUrl: track?.album?.imageUrl,
                  name: track?.album?.name,
                  artist: {
                    name: track?.album?.artist?.name,
                  },
                },
              });
              setIsPlaying(true); // Ajoutez cette ligne pour définir l'état de lecture sur vrai
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

              <TrackArtist to={`/artist/${track?.album?.artist._id}`}>
                {track?.album?.artist?.name}
              </TrackArtist>
            </TrackInfoArtist>
          </TrackInfo>
          <TrackAlbumLink to={`/album/${track?.album?._id}`}>
            {track?.album?.name}
          </TrackAlbumLink>

          <LikedLogo
            src={
              likedTracks.find(t => t._id === track._id)
                ? HearthFilledLogo
                : HearthLogo
            }
            onClick={() => {
              handleOnClickLike(track);
            }}
            alt="Like Logo"
          />
        </TrackContainer>
      ))}
    </TrackListContainer>
  );
};
const TrackListContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow-y: auto;
  flex-direction: column;
  background-color: #121212;
  color: white;
  padding: 20px;
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
  grid-template-columns: 0.3fr 3fr 2fr 1fr 1fr;
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
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
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

const TrackAlbumLink = styled(Link)`
  font-size: 14px;
  margin: 0;
  color: #b3b3b3;

  transition: 0.1s ease-in-out;
  &:hover {
    color: #fff;
    text-decoration: underline;
  }
`;

const Trackplaylist = styled.p`
  font-size: 14px;
  margin: 0;
  color: #b3b3b3;
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
export default PopularArtists;
