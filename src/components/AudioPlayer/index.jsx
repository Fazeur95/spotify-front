/* eslint-disable react/prop-types */
import styled from 'styled-components';
import {useState, useEffect, useRef} from 'react';
import PlayLogo from '../../assets/play.svg';
import PauseLogo from '../../assets/pause.svg';
import NextLogo from '../../assets/skip-forward.svg';
import PreviousLogo from '../../assets/skip-back.svg';
import ShuffleLogo from '../../assets/shuffle.svg';
import RepeatLogo from '../../assets/repeat.svg';
import VolumeLogo from '../../assets/volume.svg';
import shuffle from 'just-shuffle';

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

const AudioPlayer = ({currentTrack, setCurrentTrack}) => {
  const [progress, setProgress] = useState(0);
  const [volumeValue, setVolumeValue] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackList, setTrackList] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef();

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

  const handleLoadedData = () => {
    setTotalDuration(audioRef.current.duration);
  };

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleShuffle = () => {
    const newTrackList = [...trackList];
    const currentTrackUrl = newTrackList.splice(currentTrackIndex, 1)[0];

    const shuffledList = shuffle(newTrackList);

    shuffledList.unshift(currentTrackUrl);
    setTrackList(shuffledList);
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
  };

  useEffect(() => {
    if (localStorage.getItem('volume')) {
      setVolumeValue(localStorage.getItem('volume'));
    }
  }, []);

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
            src={
              currentTrack?.imageUrl ||
              'data:image/jpeg;base64,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'
            }
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
          onLoadedData={handleLoadedData}
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
            src={ShuffleLogo}
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
          <IconStyled src={RepeatLogo} alt="Repeat Logo" />
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
          <Timer>
            {Math.floor(totalDuration / 60)}:{Math.floor(totalDuration % 60)}
          </Timer>
        </ProgressContainer>
      </Column>
      <Column>
        <VolumeContainer>
          <IconStyled src={VolumeLogo} alt="Volume Logo" />
          <VolumeControl
            min="0"
            max="1"
            step={0.01}
            value={volumeValue}
            onChange={handleVolumeChange}
          />
        </VolumeContainer>
      </Column>
    </PlayerContainer>
  );
};

export default AudioPlayer;
