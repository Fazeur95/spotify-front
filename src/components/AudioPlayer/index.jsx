import styled from 'styled-components';
import {useState, useEffect, useRef, useContext} from 'react';
import MinimizeLogo from '../../assets/minimize-2.svg';
import PlayLogo from '../../assets/play.svg';
import PauseLogo from '../../assets/pause.svg';
import NextLogo from '../../assets/skip-forward.svg';
import PreviousLogo from '../../assets/skip-back.svg';
import ShuffleLogo from '../../assets/shuffle.svg';
import isShuffleLogo from '../../assets/isShuffle.svg';
import RepeatLogo from '../../assets/repeat.svg';
import VolumeLogoOff from '../../assets/volume-off.svg';
import VolumeLogoMedium from '../../assets/volume-medium.svg';
import VolumeLogoHigh from '../../assets/volume-high.svg';
import isRepeatLogo from '../../assets/isRepeat.svg';
import MaximizeLogo from '../../assets/maximize-2.svg';

import shuffle from 'just-shuffle';
import {AudioPlayerContext} from '../../utils/context/AudioPlayerContext/AudioPlayerContext';

const AudioPlayer = () => {
  const {currentTrack, setCurrentTrack} = useContext(AudioPlayerContext);

  const [progress, setProgress] = useState(0);
  const [volumeValue, setVolumeValue] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackList, setTrackList] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMaximized, setIsMaximized] = useState(false); // Utilisez le logo du volume
  const [volumeLogo, setVolumeLogo] = useState(VolumeLogoMedium); // Utilisez le logo du volume
  const audioRef = useRef();

  const playerContainerRef = useRef();

  useEffect(() => {
    fetch('http://localhost:6868/api/track').then(response =>
      response.json().then(data => {
        setTrackList(data);
      }),
    );
  }, []);

  useEffect(() => {
    if (currentTrack) {
      setCurrentTrackIndex(
        trackList.findIndex(t => t._id === currentTrack._id),
      );
    }
  }, [currentTrack, trackList]);

  useEffect(() => {
    if (currentTrack) {
      audioRef.current.load();
      handlePlay();
    }
  }, [currentTrack]);

  const handleNext = () => {
    setIsPlaying(false);
    if (currentTrackIndex < trackList.length - 1) {
      setCurrentTrack(trackList[currentTrackIndex + 1]);
    } else {
      setCurrentTrack(trackList[0]);
    }
  };

  const handlePrevious = () => {
    setIsPlaying(false);
    if (currentTrackIndex > 0) {
      setCurrentTrack(trackList[currentTrackIndex - 1]);
    } else {
      setCurrentTrack(trackList[trackList.length - 1]);
    }
  };

  const handleLoadedMetadata = () => {
    let duration = audioRef.current.duration;
    let minutes = Math.floor(duration / 60);
    let seconds = Math.floor(duration % 60);
    // Ajoute un zéro devant les secondes si elles sont inférieures à 10
    seconds = seconds < 10 ? '0' + seconds : seconds;

    setTotalDuration(`${minutes}:${seconds}`);
  };

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  //Shuffle function

  const handleShuffle = () => {
    const shuffledTrackList = shuffle(trackList);
    const currentTrackIndex = shuffledTrackList.findIndex(
      t => t._id === currentTrack._id,
    );
    setTrackList(shuffledTrackList);
    setCurrentTrackIndex(currentTrackIndex);
    setIsShuffle(!isShuffle);
  };

  //exportthe shuffle function to get the shuffleTracKList in the context

  const handleRepeat = () => {
    const repeat = !audioRef.current.loop;
    audioRef.current.loop = repeat;
    // Mettez à jour l'état lorsque vous changez l'état de la répétition
    setIsRepeat(repeat);
  };

  const factor = 1000;

  const handleTimeUpdate = () => {
    const value = Math.floor(
      (audioRef.current.currentTime / audioRef.current.duration) * factor,
    );
    setProgress(value);
    setCurrentTime(audioRef.current.currentTime);

    if (audioRef.current.ended) {
      handleNext();
    }
  };

  const handleProgressChange = event => {
    const value = event.target.value;
    setProgress(value);
    audioRef.current.currentTime = (value / factor) * audioRef.current.duration;
  };

  const handleVolumeChange = event => {
    const value = event.target.value;
    audioRef.current.volume = value;
    localStorage.setItem('volume', value);
    setVolumeValue(value);

    // Mettez à jour l'image du logo du volume en fonction de la valeur du volume
    if (value <= 0) {
      setVolumeLogo(VolumeLogoOff);
    } else if (value > 0 && value <= 0.5) {
      setVolumeLogo(VolumeLogoMedium);
    } else if (value > 0.5) {
      setVolumeLogo(VolumeLogoHigh);
    }
  };

  const handleMaximizeClick = () => {
    if (!isMaximized) {
      if (playerContainerRef.current) {
        playerContainerRef.current.style.backgroundImage =
          'url("chemin_vers_votre_image.jpg")';
        playerContainerRef.current.style.backgroundSize = 'cover';
        if (playerContainerRef.current.requestFullscreen) {
          playerContainerRef.current.requestFullscreen();
        } else if (playerContainerRef.current.mozRequestFullScreen) {
          /* Firefox */
          playerContainerRef.current.mozRequestFullScreen();
        } else if (playerContainerRef.current.webkitRequestFullscreen) {
          /* Chrome, Safari and Opera */
          playerContainerRef.current.webkitRequestFullscreen();
        } else if (playerContainerRef.current.msRequestFullscreen) {
          /* IE/Edge */
          playerContainerRef.current.msRequestFullscreen();
        }
      }
      setIsMaximized(true);
    }
  };

  const handleMinimizeClick = () => {
    if (isMaximized) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE/Edge */
        document.msExitFullscreen();
      }
      setIsMaximized(false);
    }
  };
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsMaximized(document.fullscreenElement === playerContainerRef.current);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (localStorage.getItem('volume')) {
      setVolumeValue(localStorage.getItem('volume'));
    }
  }, []);

  if (!currentTrack) {
    return null;
  }

  return (
    <PlayerContainer>
      <Column>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}>
          <img
            style={{width: '80px', height: '80px'}}
            src={currentTrack?.imageUrl || ''}
            alt="track"
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '10px',
            }}>
            <Title>{currentTrack?.name}</Title>
            <Title>{currentTrack?.artist}</Title>
          </div>
        </div>
      </Column>
      <Column>
        <Player
          ref={audioRef}
          onLoadedMetadata={handleLoadedMetadata}
          // onLoadedData={handleLoadedData}
          onTimeUpdate={handleTimeUpdate}>
          {currentTrack?.url && (
            <source
              src={
                'http://localhost:6868/' + currentTrack?.url.replace('tmp/', '')
              }
              type="audio/ogg"
            />
          )}
        </Player>
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
              <IconStyled
                src={PauseLogo}
                alt="Pause Logo"
                onClick={handlePause}
              />
            </PauseButton>
          )}
          <IconStyled src={NextLogo} alt="Next Logo" onClick={handleNext} />
          <IconStyled
            src={isRepeat ? isRepeatLogo : RepeatLogo}
            alt="Repeat Logo"
            onClick={handleRepeat}
          />
        </ProgressContainer>
        <ProgressContainer>
          <Timer>
            {Math.floor(currentTime / 60)
              .toString()
              .padStart(2, '0')}
            :
            {Math.floor(currentTime % 60)
              .toString()
              .padStart(2, '0')}
          </Timer>

          <ProgressBar
            value={progress || 0}
            max={factor}
            onChange={handleProgressChange}
          />
          <Timer>{totalDuration}</Timer>
        </ProgressContainer>
      </Column>
      <Column>
        <VolumeContainer>
          <IconStyled src={volumeLogo} alt="Volume Logo" />
          <VolumeControl
            min="0"
            max="1"
            step={0.01}
            value={volumeValue}
            onChange={handleVolumeChange}
          />
          <IconStyled
            src={MaximizeLogo}
            alt="Maximize"
            onClick={handleMaximizeClick}
          />

          <FullScreenDiv ref={playerContainerRef}>
            <PlayerContainer>
              <Column>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                  <img
                    style={{width: '80px', height: '80px'}}
                    src={currentTrack?.imageUrl || ''}
                    alt="track"
                  />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginLeft: '10px',
                    }}>
                    <Title>{currentTrack?.name}</Title>
                    <Title>{currentTrack?.artist}</Title>
                  </div>
                </div>
              </Column>
              <Column>
                <Player
                  ref={audioRef}
                  onLoadedMetadata={handleLoadedMetadata}
                  // onLoadedData={handleLoadedData}
                  onTimeUpdate={handleTimeUpdate}>
                  {currentTrack?.url && (
                    <source
                      src={
                        'http://localhost:6868/' +
                        currentTrack?.url.replace('tmp/', '')
                      }
                      type="audio/ogg"
                    />
                  )}
                </Player>
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
                      <IconStyled
                        src={PlayLogo}
                        alt="Play Logo"
                        onClick={handlePlay}
                      />
                    </PlayButton>
                  ) : (
                    <PauseButton>
                      <IconStyled
                        src={PauseLogo}
                        alt="Pause Logo"
                        onClick={handlePause}
                      />
                    </PauseButton>
                  )}
                  <IconStyled
                    src={NextLogo}
                    alt="Next Logo"
                    onClick={handleNext}
                  />
                  <IconStyled
                    src={isRepeat ? isRepeatLogo : RepeatLogo}
                    alt="Repeat Logo"
                    onClick={handleRepeat}
                  />
                </ProgressContainer>
                <ProgressContainer>
                  <Timer>
                    {Math.floor(currentTime / 60)
                      .toString()
                      .padStart(2, '0')}
                    :
                    {Math.floor(currentTime % 60)
                      .toString()
                      .padStart(2, '0')}
                  </Timer>

                  <ProgressBar
                    value={progress || 0}
                    max={factor}
                    onChange={handleProgressChange}
                  />
                  <Timer>{totalDuration}</Timer>
                </ProgressContainer>
              </Column>
              <Column>
                <VolumeContainer>
                  <IconStyled src={volumeLogo} alt="Volume Logo" />
                  <VolumeControl
                    min="0"
                    max="1"
                    step={0.01}
                    value={volumeValue}
                    onChange={handleVolumeChange}
                  />

                  {isMaximized && (
                    <IconStyled
                      src={MinimizeLogo}
                      alt="Minimize"
                      onClick={handleMinimizeClick}
                    />
                  )}
                </VolumeContainer>
              </Column>
            </PlayerContainer>
          </FullScreenDiv>
        </VolumeContainer>
      </Column>
    </PlayerContainer>
  );
};

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
  padding: 0.5rem 1rem;
  gap: 20px;
  height: 8vh;
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
  padding: 0 10px;
  cursor: pointer;
  &&:hover {
    opacity: 0.5;
  }
  &&:clicked {
    opacity: 0.5;
  }
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

const FullScreenDiv = styled.div``;

export default AudioPlayer;
