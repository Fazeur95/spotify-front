import styled from 'styled-components';

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  //Mettre un dégradé de couleur
  background: linear-gradient(180deg, #523a3a 0%, #121212 100%);
  height: 100vh; // Prend toute la hauteur de la page
  padding: 20px;
`;

const Title = styled.h1`
  color: white;
  font-size: 30px;

  font-weight: bold;
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

const HomePage = () => (
  <HomePageContainer>
    <Title>Bonjour</Title>

    <Section>
      <SectionTitle>Vos playlists</SectionTitle>
      <Playlists>
        {/* Remplacez "playlist1", "playlist2", etc. par vos propres playlists */}
        <Playlist>playlist1</Playlist>
        <Playlist>playlist2</Playlist>
        <Playlist>playlist3</Playlist>
      </Playlists>
    </Section>

    <Section>
      <SectionTitle>Votre Rétrospective 2023</SectionTitle>
      <p>Découvrez vos morceaux de l'année</p>
    </Section>

    <Section>
      <SectionTitle>Conçu spécialement pour vous</SectionTitle>
      <Playlists>
        {/* Remplacez "playlist4", "playlist5", etc. par vos autres playlists */}
        <Playlist>playlist4</Playlist>
        <Playlist>playlist5</Playlist>
        <Playlist>playlist6</Playlist>
      </Playlists>
    </Section>
    <Section>
      <SectionTitle>Ecouté</SectionTitle>
      <Playlists>
        {/* Remplacez "playlist4", "playlist5", etc. par vos autres playlists */}
        <Playlist>playlist4</Playlist>
        <Playlist>playlist5</Playlist>
        <Playlist>playlist6</Playlist>
      </Playlists>
    </Section>
  </HomePageContainer>
);

export default HomePage;
