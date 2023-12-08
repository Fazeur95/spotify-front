/* eslint-disable react/prop-types */
import {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import TimeLogo from '../../assets/clock-3.svg';
import {AudioPlayerContext} from '../../utils/context/AudioPlayerContext/AudioPlayerContext';

const getTotalDuration = tracks => {
  let totalDurationInSeconds = 0;
  tracks.forEach(track => {
    const duration = Number(track.duration);

    if (!isNaN(duration)) {
      totalDurationInSeconds += duration;
    }
  });
  return totalDurationInSeconds;
};

const PopularArtists = ({album}) => {
  const {setCurrentTrack, currentTrack} = useContext(AudioPlayerContext);
  const [tracks, setTracks] = useState([]);
  const [totalDuration, setTotalDuration] = useState(0);

  console.log(album);

  useEffect(() => {
    if (!album.tracks.length === 0) return;

    setTracks([...album.tracks]);
    // setTotalDuration(getTotalDuration(album.map(album => album.tracks).flat()));
  }, [album]);

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
        <ColumnTitle>
          <DurationIcon src={TimeLogo} alt="Duration" />
        </ColumnTitle>
      </TrackContainer>

      {tracks.map((track, index) => (
        <TrackContainer
          key={index}
          onClick={() =>
            setCurrentTrack({
              ...track,
              album: {
                imageUrl: album.imageUrl,
                name: album.name,
                artist: {
                  name: album.artist.name,
                },
              },
            })
          }>
          <TrackPlace>{index + 1}</TrackPlace>
          <TrackInfo>
            {/* <TrackImage src={album?.imageUrl} alt="Track" /> */}
            <TrackInfoArtist>
              <TrackName
                name={track.name}
                currentTrackName={currentTrack?.name}>
                {track.name}
              </TrackName>
              <TrackArtist>{album?.artist.name}</TrackArtist>
            </TrackInfoArtist>
          </TrackInfo>
          <TrackAlbum>{album.name}</TrackAlbum>
          <p>{track.addedDate}</p>
          <p>{track.totalDuration}</p>
        </TrackContainer>
      ))}
    </TrackListContainer>
  );
};
const TrackListContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #121212;
  color: white;
  padding: 20px;
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

const TrackImage = styled.img`
  width: 75px;
  height: 75px;
  object-fit: cover;
  margin-right: 10px;
`;

const TrackInfo = styled.div`
  display: flex;
  align-items: center;
`;

const TrackName = styled.h2`
  font-size: 16px;
  cursor: pointer;
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

const TrackArtist = styled.h3`
  font-size: 14px;
  margin: 0;
  color: #b3b3b3;
`;

const TrackAlbum = styled.p`
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
`;
export default PopularArtists;
