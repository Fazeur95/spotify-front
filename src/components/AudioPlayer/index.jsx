import styled from 'styled-components';
import {useState, useEffect, useRef} from 'react';
import PlayLogo from '../../assets/play.svg';
import PauseLogo from '../../assets/pause.svg';
const audioFilePath = '../../src/assets/sound.mp3';

const Player = styled.audio`
  width: 100%;
  background-color: #282828;
  color: #b3b3b3;
`;

const PlayerContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #282828;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: #b3b3b3;
  font-size: 1.2em;
`;

const ProgressBar = styled.input.attrs({type: 'range'})`
  width: 100%;
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
`;

const VolumeControl = styled.input.attrs({type: 'range'})`
  width: 100%;
`;

const IconStyled = styled.img`
  width: 50px;
  height: 50px;
`;

const AudioPlayer = () => {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const audioRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        const value = Math.floor(
          (audioRef.current.currentTime / audioRef.current.duration) * 100,
        );
        setProgress(value);
        setCurrentTime(audioRef.current.currentTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
    audioRef.current.currentTime = (value / 100) * audioRef.current.duration;
  };

  const handleVolumeChange = event => {
    audioRef.current.volume = event.target.value / 100;
  };

  return (
    isClicked && (
      <PlayerContainer>
        <Column>
          <Title>Artiste / Album</Title>
        </Column>
        <Column>
          <Title>Lecteur Audio </Title>
          <Player ref={audioRef}>
            <source src={audioFilePath} type="audio/mpeg" />
          </Player>
          {!isPlaying ? (
            <PlayButton onClick={handlePlay}>
              <IconStyled src={PlayLogo} alt="Play Logo" />
            </PlayButton>
          ) : (
            <PauseButton onClick={handlePause}>
              <IconStyled src={PauseLogo} alt="Pause Logo" />
            </PauseButton>
          )}
          <ProgressBar
            value={progress}
            max="100"
            onChange={handleProgressChange}
          />
          <Timer>
            {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60)}
          </Timer>
        </Column>
        <Column>
          <VolumeControl min="0" max="100" onChange={handleVolumeChange} />
        </Column>
      </PlayerContainer>
    )
  );
};

export default AudioPlayer;
