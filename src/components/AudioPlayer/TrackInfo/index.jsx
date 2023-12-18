import React from 'react';
import styled from 'styled-components';
const TrackInfo = ({currentTrack}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}>
      <img
        style={{width: '80px', height: '80px'}}
        src={currentTrack.album.imageUrl || currentTrack.album}
        alt="track"
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: '10px',
        }}>
        <SongTitle>{currentTrack?.name}</SongTitle>
        <ArtistName>{currentTrack?.album?.artist?.name}</ArtistName>
      </div>
    </div>
  );
};

const SongTitle = styled.h2`
  font-size: 1.1em;
  margin-bottom: 10px;

  line-height: 1;
`;

const ArtistName = styled.p`
  font-size: 1em;
  margin-top: 0px;
  line-height: 1;
`;

export default TrackInfo;
