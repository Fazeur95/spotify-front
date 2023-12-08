import styled from 'styled-components';

const AllPlaylist = () => {
  return (
    <PopularArtistsContainer>
      <Title>Parcourir tout</Title>
    </PopularArtistsContainer>
  );
};

const PopularArtistsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

const Title = styled.h1`
  color: white;
  font-size: 30px;
  margin: 20px;
  font-weight: bold;
`;

const GenreColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 20px;
  width: 100%;
  align-items: center;
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const GenreCard = styled.div`
  background-color: #121212;
  color: white;
  padding: 5px;
  border-radius: 10px;
`;

const GenreImage = styled.img`
  width: 100%; /* Make sure the image takes the full width of its container */
  height: auto; /* Maintain the aspect ratio of the image */
  border-radius: 10px;
`;

export default AllPlaylist;
