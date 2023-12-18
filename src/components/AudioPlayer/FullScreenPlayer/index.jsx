// FullScreenPlayer.js
import React from 'react';
import MinimizeLogo from '../../../assets/minimize-2.svg';
import styled from 'styled-components';

const FullScreenPlayer = ({isMaximized, onMinimize, currentTrack}) => {
  const handleMinimize = () => {
    if (isMaximized) {
      onMinimize();
    }
  };

  return (
    <div>
      {isMaximized && (
        <div>
          <img
            style={{width: '80px', height: '80px'}}
            src={currentTrack?.album?.imageUrl || ''}
            alt="track"
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '10px',
            }}>
            <h2>{currentTrack?.name}</h2>
            <p>{currentTrack?.album?.artist?.name}</p>
          </div>
          <img src={MinimizeLogo} alt="Minimize" onClick={handleMinimize} />
        </div>
      )}
    </div>
  );
};

export default FullScreenPlayer;
