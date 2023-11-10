import styled from 'styled-components';

const PopularArtistsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 800px;
`;

const ArtistCard = styled.div`
  margin: 10px;
  padding: 10px;
  background-color: #282828;
  color: #fff;
  border-radius: 8px;
`;

const PopularArtists = () => {
  return (
    <PopularArtistsContainer>
      <h2>Popular Artists</h2>
      <ArtistCard>Artist 1</ArtistCard>
      <ArtistCard>Artist 2</ArtistCard>
    </PopularArtistsContainer>
  );
};

export default PopularArtists;
