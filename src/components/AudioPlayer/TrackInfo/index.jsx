import React from 'react';
import styled from 'styled-components';

const TrackInfo = ({currentTrack}) => {
  return currentTrack ? (
    <div>
      <img
        style={{width: '80px', height: '80px'}}
        src={currentTrack.album.imageUrl || currentTrack.album}
        alt="track"
      />
      <div
        style={{display: 'flex', flexDirection: 'column', marginLeft: '10px'}}>
        <SongTitle>{currentTrack.name}</SongTitle>
        <ArtistName>{currentTrack.album.artist.name}</ArtistName>
      </div>
    </div>
  ) : null;
};

const SongTitle = styled.h1`
  color: white;
  font-size: 1.2em;
`;

const ArtistName = styled.h1`
  color: #b3b3b3;
  font-size: 1.1em;
`;

export default TrackInfo;
