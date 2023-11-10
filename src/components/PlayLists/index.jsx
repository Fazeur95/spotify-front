import styled from 'styled-components';

const PlaylistsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
`;

const Playlist = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  background-color: #282828;
  color: #fff;
  border-radius: 8px;
`;

const Playlists = () => {
  return (
    <PlaylistsContainer>
      <h2>Playlists</h2>
      <Playlist>Playlist 1</Playlist>
      <Playlist>Playlist 2</Playlist>
    </PlaylistsContainer>
  );
};

export default Playlists;
