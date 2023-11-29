// HomePage.js
import styled from 'styled-components';
import Header from '../../components/Header';
import Playlists from '../../components/Playlists';
import SearchBar from '../../components/SearchBar';
import AllPlaylist from '../../components/AllPlaylist';

const HomePageContainer = styled.div`
  display: flex;
  height: 100vh; // Prend toute la hauteur de la page
`;

const LeftContainer = styled.div`
  width: 15%;

  padding: 10px;
`;
const BorderContainer = styled.div`
  border-radius: 10px;
  border: 1px solid #121212;
  background-color: #121212;
  margin-bottom: 20px;
  overflow: hidden;
`;

const RightContainer = styled.div`
  width: 90%;
  border-radius: 10px;
  background-color: #121212;
`;

function HomePage() {
  return (
    <HomePageContainer>
      <LeftContainer>
        <BorderContainer>
          <Header />
        </BorderContainer>
        <BorderContainer>
          <Playlists />
        </BorderContainer>
      </LeftContainer>

      <RightContainer>
        <SearchBar />
        <AllPlaylist />
      </RightContainer>
    </HomePageContainer>
  );
}

export default HomePage;
