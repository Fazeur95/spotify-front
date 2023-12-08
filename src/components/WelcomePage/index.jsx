import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

const WelcomePage = () => {
  const [albums, setAlbums] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:6868/api/album?populate=true')
      .then(response => response.json())
      .then(data => setAlbums(data));
  }, []);

  return (
    <HomePageContainer>
      <Title>Bonjour</Title>
      <Section>
        <CardContainer>
          {albums.map((album, index) => (
            <Card
              key={index}
              onClick={() => {
                navigate(`/album/${album._id}`);
              }}>
              <CardImage src={album.imageUrl} />
              <CardTitle>{album.name}</CardTitle>
              <CardArtist>{album.artist.name}</CardArtist>
            </Card>
          ))}
        </CardContainer>
      </Section>
    </HomePageContainer>
  );
};
const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  //Mettre un dégradé de couleur
  border-radius: 7px;
  background: linear-gradient(180deg, #523a3a 0%, #121212 100%);
  height: 100vh; // Prend toute la hauteur de la page
  padding: 20px;
`;

const Title = styled.h1`
  color: white;
  font-size: 30px;

  font-weight: bold;
`;
const CardContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Card = styled.div`
  width: 170px;
  border-radius: 10px;
  padding: 1rem;
  background-color: #121212;
  &:hover {
    cursor: pointer;
    background-color: #282828;
    transition: 0.3s ease-in-out;
  }
`;

const CardTitle = styled.h2`
  color: white;
  font-size: 20px;
  font-weight: bold;
  white-space: nowrap;
  margin-top: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardArtist = styled.p`
  color: grey;
  font-size: 18px;
  margin-top: 0;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardImage = styled.img`
  width: 100%; /* Make sure the image takes the full width of its container */
  height: auto; /* Maintain the aspect ratio of the image */
  border-radius: 10px;
  object-fit: cover;
  object-position: center;
`;

const Section = styled.section``;

const SectionTitle = styled.h2`
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

const Playlists = styled.div`
  //mettre en grid
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  width: 100%;
  align-items: center;
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Playlist = styled.div`
  background-color: #282828;
  padding: 20px;
`;
export default WelcomePage;
