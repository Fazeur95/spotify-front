// HomePage.js
import styled from 'styled-components';
import Header from '../../components/Header';
import Playlists from '../../components/Playlists';
import WelcomePage from '../../components/WelcomePage';
import RandomPlaylist from '../../components/RandomPlaylist';

function HomePage() {
  return (
    <HomePageContainer>
      <div>
        <WelcomePage />
      </div>
    </HomePageContainer>
  );
}
const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  //Mettre un dégradé de couleur
  border-radius: 7px;
  background: linear-gradient(180deg, #523a3a 0%, #121212 100%);
  height: 100vh; // Prend toute la hauteur de la page
  padding: 20px;
`;
export default HomePage;
