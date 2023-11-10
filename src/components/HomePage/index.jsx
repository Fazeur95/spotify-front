// HomePage.js
import styled from 'styled-components';
import Header from '../Header';
import Playlists from '../Playlists';
import AudioPlayer from '../AudioPlayer';
import PopularArtists from '../PopularArtists';

const HomePageContainer = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const LeftContainer = styled.div`
  grid-column: 1 / 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 10px;
  border: 1px solid #121212;
  background-color: #121212;
  overflow: hidden;
`;

const LeftContainer2 = styled.div`
  grid-column: 1 / 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 10px;
  border: 1px solid #121212;
  background-color: #121212;
  overflow: hidden;
`;

const RightContainer = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / 3;
  border-radius: 10px;
  border: 1px solid #121212;
  background-color: #121212;
  overflow: hidden;
`;

function HomePage() {
  return (
    <HomePageContainer>
      <LeftContainer>
        <Header />
      </LeftContainer>
      <LeftContainer2>
        <Playlists />
      </LeftContainer2>
      <RightContainer>
        <AudioPlayer />
        <PopularArtists />
      </RightContainer>
    </HomePageContainer>
  );
}

export default HomePage;
