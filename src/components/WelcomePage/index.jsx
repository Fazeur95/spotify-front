import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {useMemo} from 'react';

const WelcomePage = () => {
  const [albums, setAlbums] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:6868/api/album?populate=true')
      .then(response => response.json())
      .then(data => setAlbums(data));
  }, []);

  const randomAlbums = albums
    .sort(() => Math.random() - Math.random())
    .slice(0, 6);

  console.log(randomAlbums);

  return (
    <HomePageContainer>
      <Title>Bonjour</Title>
      <Section>
        <AlbumContainer>
          {randomAlbums.map((album, index) => (
            <PlaylistsContainer
              key={index}
              onClick={() => {
                navigate(`/album/${album._id}`);
              }}>
              <PlaylistImage src={album.imageUrl} alt="Playlist Image" />
              <PlaylistTitle>{album.name}</PlaylistTitle>
            </PlaylistsContainer>
          ))}
        </AlbumContainer>
      </Section>
      <Section>
        <SectionTitle>Conçu spécialement pour vous</SectionTitle>
        <CardContainer>
          {albums.map((album, index) => (
            <Card
              key={index}
              onClick={() => {
                navigate(`/album/${album._id}`);
              }}>
              <CardImage src={album.imageUrl} alt="Card Image" />
              <CardTitle>{album.name}</CardTitle>
              <CardArtistName>{album.artist?.name}</CardArtistName>
            </Card>
          ))}
        </CardContainer>
      </Section>
      <Section>
        <SectionTitle>pov: tu cherches les sons du moments</SectionTitle>
      </Section>
    </HomePageContainer>
  );
};

const HomePageContainer = styled.div`
  padding-top: 1rem;
  color: white;
  height: 100vh;
  overflow-y: auto;
`;
const Title = styled.h1`
  color: white;
  font-size: 30px;
  font-weight: bold;
`;
const AlbumContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0px 10px;
`;
const PlaylistsContainer = styled.div`
  display: flex;

  align-items: center;
  background: #1a1a1a;
  color: white;
  margin: 10px;
  padding: 5px;

  &:hover {
    cursor: pointer;
    background-color: #282828;
    transition: 0.3s ease-in-out;
  }
`;
const PlaylistImage = styled.img`
  height: 100%;
  width: 70px;
  object-fit: cover;
`;
const PlaylistTitle = styled.p`
  font-size: 1em;
  font-weight: bold;
  margin-left: 10px;
`;
const CardContainer = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  width: 100%;
  scrollbar-width: thin;
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
const CardArtistName = styled.p`
  color: grey;
  font-size: 18px;
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
  font-size: 1.5rem;
  font-weight: bold;
`;

export default WelcomePage;
