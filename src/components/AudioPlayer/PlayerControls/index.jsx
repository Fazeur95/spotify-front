import React from 'react';
import styled from 'styled-components';
import ShuffleLogo from '../../../assets/shuffle.svg';
import isShuffleLogo from '../../../assets/isShuffle.svg';
import PreviousLogo from '../../../assets/skip-back.svg';
import PlayLogo from '../../../assets/play.svg';
import PauseLogo from '../../../assets/pause.svg';
import NextLogo from '../../../assets/skip-forward.svg';
import RepeatLogo from '../../../assets/repeat.svg';
import isRepeatLogo from '../../../assets/isRepeat.svg';

const PlayerControls = ({
  isPlaying,
  handlePlay,
  handlePause,
  handleNext,
  handlePrevious,
  handleShuffle,
  isShuffle,
  handleRepeat,
  isRepeat,
}) => {
  return (
    <ProgressContainer>
      <IconStyled
        src={isShuffle ? isShuffleLogo : ShuffleLogo}
        alt="Shuffle Logo"
        onClick={handleShuffle}
      />
      <IconStyled
        src={PreviousLogo}
        alt="Previous Logo"
        onClick={handlePrevious}
      />
      {!isPlaying ? (
        <PlayButton>
          <IconStyled src={PlayLogo} alt="Play Logo" onClick={handlePlay} />
        </PlayButton>
      ) : (
        <PauseButton>
          <IconStyled src={PauseLogo} alt="Pause Logo" onClick={handlePause} />
        </PauseButton>
      )}
      <IconStyled src={NextLogo} alt="Next Logo" onClick={handleNext} />
      <IconStyled
        src={isRepeat ? isRepeatLogo : RepeatLogo}
        alt="Repeat Logo"
        onClick={handleRepeat}
      />
    </ProgressContainer>
  );
};
const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const IconStyled = styled.img`
  width: 30px;
  height: 30px;
  padding: 0 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
    outline: none;
  }
  &:clicked {
    outline: none;
  }
  outline: none;
`;
const PlayButton = styled.button`
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
    outline: none;
  }
  &:clicked {
    opacity: 0.5;
    outline: none;
  }
`;
const PauseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  &:hover {
    opacity: 0.5;
    outline: none;
  }
  &:clicked {
    opacity: 0.5;
    outline: none;
  }
`;

export default PlayerControls;
