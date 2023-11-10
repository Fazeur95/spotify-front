import styled from 'styled-components';
import Header from '../Header';
import Playlists from '../Playlists';
import AudioPlayer from '../AudioPlayer';
import PopularArtists from '../PopularArtists';

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
`;

const HomePageMain = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
  max-width: 800px;
`;

function HomePage() {
  return (
    <HomePageContainer>
      <Header />
      <HomePageMain>
        <Playlists />
        <AudioPlayer />
        <PopularArtists />
      </HomePageMain>
    </HomePageContainer>
  );
}

export default HomePage;
