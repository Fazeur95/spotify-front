import styled from 'styled-components';

const PlaylistsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
`;
const Title = styled.h2`
  margin: 20px 0;
  display: flex;
`;

const Playlists = () => {
  return (
    <PlaylistsContainer>
      <Title>Bibliothèque</Title>
    </PlaylistsContainer>
  );
};

export default Playlists;
