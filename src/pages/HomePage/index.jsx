// HomePage.js
import styled from 'styled-components';
import WelcomePage from '../../components/WelcomePage';

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
  border-radius: 7px;
  background: linear-gradient(180deg, #091221 0%, #121212 8%);
  height: 100rem;
  overflow: hidden;
  padding: 20px;

  @media (max-width: 768px) {
    height: auto; // Ajuster la hauteur pour les petits écrans
    padding: 10px; // Réduire le padding pour les petits écrans
  }
`;

export default HomePage;
