/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TimeLogo from '../../assets/clock-3.svg';

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

const getTotalDuration = tracks => {
  let totalDurationInSeconds = 0;
  tracks.forEach(track => {
    const duration = Number(track.duration);
    console.log(
      `Durée de la piste : ${track.duration}, convertie en nombre : ${duration}`,
    ); // Imprime la durée de chaque piste
    if (!isNaN(duration)) {
      totalDurationInSeconds += duration;
    }
  });
  return totalDurationInSeconds;
};

const PopularArtists = ({setCurrentTrack}) => {
  const [tracks, setTracks] = useState([]);
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    fetch('http://localhost:6868/api/track')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setTracks(data);
        setTotalDuration(getTotalDuration(data));
      });
  }, []);
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
        <TrackContainer key={index} onClick={() => setCurrentTrack(track)}>
          <TrackPlace>{index + 1}</TrackPlace>
          <TrackInfo>
            <TrackImage
              src={
                track.imageUrl ||
                'data:image/jpeg;base64,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'
              }
              alt="Track"
            />
            <TrackInfoArtist>
              <TrackName>{track.name}</TrackName>
              <TrackArtist>{track.artist}</TrackArtist>
            </TrackInfoArtist>
          </TrackInfo>
          <TrackAlbum>{track.album}</TrackAlbum>
          <p>{track.addedDate}</p>
          <p>{totalDuration}</p>
        </TrackContainer>
      ))}
    </TrackListContainer>
  );
};

export default PopularArtists;
