import styled from 'styled-components';
import {useState, useEffect, useRef, useContext} from 'react';
import VolumeLogoOff from '../../assets/volume-off.svg';
import VolumeLogoMedium from '../../assets/volume-medium.svg';
import VolumeLogoHigh from '../../assets/volume-high.svg';
import PlayTogetherIcon from '../../assets/users-round.svg';
import shuffle from 'just-shuffle';
import TrackInfo from './TrackInfo';
import PlayerControls from './PlayerControls';
import ProgressBarComponent from './ProgressBar';
import VolumeControlComponent from './VolumeControl';
import {AudioPlayerContext} from '../../utils/context/AudioPlayerContext/AudioPlayerContext';
import {Link} from 'react-router-dom';
import {io} from 'socket.io-client';

const AudioPlayer = ({track}) => {
  const {currentTrack, setCurrentTrack, socket} =
    useContext(AudioPlayerContext);
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
  const [isOpen, setIsOpen] = useState(false); // Add a state for controlling if the audio player is open

  useEffect(() => {
    fetch('https://spotify-api-43ur.onrender.com/api/track').then(response =>
      response.json().then(data => {
        setTrackList(data);
      }),
    );
  }, []);

  useEffect(() => {
    const newSocket = io('https://spotify-websocket.onrender.com', {
      transports: ['websocket'],
      upgrade: false,
    });

    newSocket.on('playSound', track => {
      setCurrentTrack(track);
      setIsPlaying(true);
    });

    return () => newSocket.disconnect();
  }, []);

  console.log('trackList', currentTrack);

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
      audioRef.current.volume = volumeValue;
      handlePlay();
    }
  }, [currentTrack]);
  const MuteSound = () => {
    if (audioRef.current.volume === 0) {
      audioRef.current.volume = volumeValue;
    } else {
      audioRef.current.volume = 0;
      setVolumeLogo(VolumeLogoOff);
      setVolumeValue(audioRef.current.volume);
    }
  };
  const handlePlayClick = () => {
    socket.emit('playSound', track);
    setIsOpen(true); // Open the audio player when the play button is clicked
  };

  const handleCloseClick = () => {
    setIsOpen(false); // Close the audio player when it is clicked
  };
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
      //L'image ne se raffraichit pas quand on change de musique
      playerContainerRef.current.style.backgroundImage = `url(${currentTrack?.album?.imageUrl})`;
      playerContainerRef.current.style.backgroundRepeat = 'no-repeat';
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
      setIsMaximized(true);
    }
  };

  const handleMinimizeClick = () => {
    if (isMaximized) {
      // Réinitialisez l'image de fond
      playerContainerRef.current.style.backgroundImage = '';
      playerContainerRef.current.style.backgroundRepeat = '';
      playerContainerRef.current.style.backgroundSize = '';

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
      setIsMaximized(document.fullscreenElement !== null);
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
    return <p>Loading ...</p>;
  }

  return (
    <PlayerContainer isMaximized={isMaximized} ref={playerContainerRef}>
      <Column>
        <TrackInfo currentTrack={currentTrack} />
      </Column>
      <Column>
        <Player
          ref={audioRef}
          onLoadedMetadata={handleLoadedMetadata}
          // onLoadedData={handleLoadedData}
          onTimeUpdate={handleTimeUpdate}>
          {currentTrack?.url && (
            <source src={currentTrack?.url} type="audio/ogg" />
          )}
        </Player>

        <PlayerControls
          isPlaying={isPlaying}
          handlePlay={handlePlay}
          handlePause={handlePause}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          handleShuffle={handleShuffle}
          isShuffle={isShuffle}
          handleRepeat={handleRepeat}
          isRepeat={isRepeat}
        />

        <ProgressBarComponent
          currentTime={currentTime}
          progress={progress}
          factor={factor}
          handleProgressChange={handleProgressChange}
          totalDuration={totalDuration}
        />
      </Column>
      <Column>
        <VolumeControlDiv>
          <StyledLink
            to={`/track/${currentTrack._id}`}
            onClick={() => {
              socket.emit('playSound', currentTrack);
            }}>
            <StyledIcon src={PlayTogetherIcon} alt="Play Together" />
          </StyledLink>

          <VolumeControlComponent
            volumeLogo={volumeLogo}
            MuteSound={MuteSound}
            volumeValue={volumeValue}
            handleVolumeChange={handleVolumeChange}
            handleMaximizeClick={
              isMaximized ? handleMinimizeClick : handleMaximizeClick
            }
            isMaximized={isMaximized}
          />
        </VolumeControlDiv>
      </Column>
    </PlayerContainer>
  );
};

const Player = styled.audio`
  width: 100%;

  color: #b3b3b3;
`;
const VolumeControlDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayerContainer = styled.div`
  position: fixed;
  bottom: 0;
  background-color: ${props => (props.isMaximized ? '' : 'black')};

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: grid;
  grid-template-columns: 20% 60% 20%;
  padding: 0.5rem 1rem;
  gap: 20px;
  height: ${props => (props.isMaximized ? '100vh' : '8vh')};
  width: 100%;
  align-items: ${props => (props.isMaximized ? 'flex-end' : 'center')};
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledLink = styled(Link)`
  width: 30px;
  height: 30px;
  padding: 0 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  &&:hover {
    opacity: 0.5;
  }
  &&:active {
    opacity: 0.5;
  }
`;
const StyledIcon = styled.img`
  width: 30px;
  height: 30px;
  padding: 0 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  &&:hover {
    opacity: 0.5;
  }
  &&:active {
    opacity: 0.5;
  }
`;

export default AudioPlayer;
