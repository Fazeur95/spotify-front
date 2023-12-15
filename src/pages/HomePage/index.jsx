// HomePage.js
import styled from 'styled-components';
import Header from '../../components/Header';
import Playlists from '../../components/Playlists';
import WelcomePage from '../../components/WelcomePage';
import RandomPlaylist from '../../components/RandomPlaylist';

function HomePage() {
  return (
    <HomePageContainer>
      <WelcomePage />
    </HomePageContainer>
  );
}
const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  //Mettre un dégradé de couleur
  border-radius: 7px;
  background: linear-gradient(180deg, #091221 0%, #121212 8%);
  height: 100rem; // Prend toute la hauteur de la page
  overflow: hidden; // Pour éviter que le dégradé ne déborde
  padding: 20px;
`;
export default HomePage;
