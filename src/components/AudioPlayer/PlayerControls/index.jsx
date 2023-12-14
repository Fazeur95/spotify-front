import styled from 'styled-components';
import PlayLogo from '../../../assets/play.svg';
import PauseLogo from '../../../assets/pause.svg';
import NextLogo from '../../../assets/skip-forward.svg';
import PreviousLogo from '../../../assets/skip-back.svg';
import ShuffleLogo from '../../../assets/shuffle.svg';
import isShuffleLogo from '../../../assets/isShuffle.svg';
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
    <div>
      <button onClick={handleShuffle}>
        <IconStyled
          src={isShuffle ? isShuffleLogo : ShuffleLogo}
          alt="Shuffle Logo"
        />
      </button>
      <button onClick={handlePrevious}>
        <IconStyled src={PreviousLogo} alt="Previous Logo" />
      </button>
      {isPlaying ? (
        <button onClick={handlePause}>
          <IconStyled src={PauseLogo} alt="Pause Logo" />
        </button>
      ) : (
        <button onClick={handlePlay}>
          <IconStyled src={PlayLogo} alt="Play Logo" />
        </button>
      )}
      <button onClick={handleNext}>
        <IconStyled src={NextLogo} alt="Next Logo" />
      </button>
      <button onClick={handleRepeat}>
        <IconStyled
          src={isRepeat ? isRepeatLogo : RepeatLogo}
          alt="Repeat Logo"
        />
      </button>
    </div>
  );
};
const IconStyled = styled.img`
  width: 30px;
  height: 30px;
  padding: 0 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  &&:hover {
    opacity: 0.5;
  }
  &&:clicked {
    opacity: 0.5;
  }
`;
export default PlayerControls;
