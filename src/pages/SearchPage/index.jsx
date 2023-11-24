// HomePage.js
import styled from 'styled-components';
import Header from '../../components/Header';
import Playlists from '../../components/Playlists';
import AudioPlayer from '../../components/AudioPlayer';
import SearchBar from '../../components/SearchBar';
import AllPlaylist from '../../components/AllPlaylist';
import PopularArtists from '../../components/PopularArtists';

const HomePageContainer = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  gap: 20px;
  max-width: 100wv;
  margin: 0 auto;
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
      <LeftContainer>
        <Playlists />
      </LeftContainer>

      <RightContainer>
        <SearchBar />
        <AllPlaylist />
      </RightContainer>
      <AudioPlayer />
    </HomePageContainer>
  );
}

export default HomePage;
