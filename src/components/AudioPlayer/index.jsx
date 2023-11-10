import styled from 'styled-components';

const AudioPlayerContainer = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 20px;
  background-color: #282828;
  color: #fff;
  border-radius: 8px;
`;

const AudioPlayer = () => {
  return (
    <AudioPlayerContainer>
      <h2>Now Playing</h2>
    </AudioPlayerContainer>
  );
};

export default AudioPlayer;
