import styled from 'styled-components';
import {useState, useEffect, useRef} from 'react';
import PlayLogo from '../../assets/play.svg';
import PauseLogo from '../../assets/pause.svg';
import NextLogo from '../../assets/skip-forward.svg';
import PreviousLogo from '../../assets/skip-back.svg';
import ShuffleLogo from '../../assets/shuffle.svg';
import RepeatLogo from '../../assets/repeat.svg';
import VolumeLogo from '../../assets/volume.svg';

const audioFilePath = '../../src/assets/sound.mp3';

const Player = styled.audio`
  width: 100%;
  background-color: #282828;
  color: #b3b3b3;
`;

const PlayerContainer = styled.div`
  position: fixed;
  bottom: 0;
  background-color: black;
  display: grid;
  grid-template-columns: 20% 60% 20%;
  gap: 20px;
  width: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  color: #b3b3b3;
  font-size: 1.2em;
`;

const ProgressBar = styled.input.attrs({type: 'range'})`
  width: 80%;
  justify-self: center;
  align-self: center;
`;

const PlayButton = styled.button`
  background: transparent;
  border: none;
`;

const PauseButton = styled.button`
  background: transparent;
  border: none;
`;

const Timer = styled.span`
  color: #b3b3b3;
  padding: 0 10px;
`;

const VolumeControl = styled.input.attrs({type: 'range'})`
  display: flex;
  align-items: center;
  justifycontent: center;
`;

const IconStyled = styled.img`
  width: 30px;
  height: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justifycontent: center;
`;

const ProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VolumeContainer = styled.div`
  margin: auto 0;
  display: flex;
  align-self: center;
`;

const AudioPlayer = () => {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const audioRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        const value = Math.floor(
          (audioRef.current.currentTime / totalDuration) * 100,
        );
        setProgress(value);
        setCurrentTime(audioRef.current.currentTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [totalDuration]);

  const handleLoadedData = () => {
    setTotalDuration(audioRef.current.duration);
  };

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
    setIsClicked(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleProgressChange = event => {
    const value = event.target.value;
    setProgress(value);
    audioRef.current.currentTime = (value / 100) * totalDuration;
  };

  const handleVolumeChange = event => {
    audioRef.current.volume = event.target.value / 100;
  };

  return (
    <PlayerContainer>
      <Column>
        <Title>Artiste / Album</Title>
      </Column>
      <Column>
        <Player ref={audioRef} onLoadedData={handleLoadedData}>
          <source src={audioFilePath} type="audio/mpeg" />
        </Player>
        <ProgressContainer>
          <IconStyled src={ShuffleLogo} alt="Shuffle Logo" />
          <IconStyled src={PreviousLogo} alt="Previous Logo" />
          {!isPlaying ? (
            <PlayButton onClick={handlePlay}>
              <IconStyled src={PlayLogo} alt="Play Logo" />
            </PlayButton>
          ) : (
            <PauseButton onClick={handlePause}>
              <IconStyled src={PauseLogo} alt="Pause Logo" />
            </PauseButton>
          )}
          <IconStyled src={NextLogo} alt="Next Logo" />
          <IconStyled src={RepeatLogo} alt="Repeat Logo" />
        </ProgressContainer>
        <ProgressContainer>
          <Timer>
            {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60)}
          </Timer>
          <ProgressBar
            value={progress}
            max="100"
            onChange={handleProgressChange}
          />
          <Timer>
            {Math.floor(totalDuration / 60)}:{Math.floor(totalDuration % 60)}
          </Timer>
        </ProgressContainer>
      </Column>
      <Column>
        <VolumeContainer>
          <IconStyled src={VolumeLogo} alt="Volume Logo" />
          <VolumeControl min="0" max="100" onChange={handleVolumeChange} />
        </VolumeContainer>
      </Column>
    </PlayerContainer>
  );
};

export default AudioPlayer;
