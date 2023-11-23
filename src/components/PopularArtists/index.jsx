import styled from 'styled-components';

const PopularArtistsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 800px;
`;

const PopularArtists = () => {
  return <PopularArtistsContainer>Bonjour</PopularArtistsContainer>;
};

export default PopularArtists;
