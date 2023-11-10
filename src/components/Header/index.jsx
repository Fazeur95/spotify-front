// components/Header.js
import styled from 'styled-components';
import HomeLogo from '../../assets/home.svg'; // Ajoutez le chemin de votre logo Home
import SearchLogo from '../../assets/search.svg'; // Ajoutez le chemin de votre logo de recherche

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column; /* Mettez les éléments en colonne */

  width: 100%;
  max-width: 800px;

  padding: 20px 20px;
`;

const LogoContainer = styled.div`
  display: flex;

  align-items: center;
  &:hover {
    cursor: pointer;
    transition: 0.2s ease-in-out;
    font-weight: bold;
    & > img {
      filter: brightness(2.5);
      transform: scale(1.2);
    }
  }
`;

const Logo = styled.img`
  height: 30px; /* Ajustez la taille selon vos besoins */
  margin-bottom: 5px; /* Ajoutez une marge en bas pour l'espace */
  margin-right: 10px; /* Ajoutez une marge à droite pour l'espace */
`;

const Header = () => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo src={HomeLogo} alt="Home Logo" />
        <p>Accueil</p>
      </LogoContainer>
      <LogoContainer>
        <Logo src={SearchLogo} alt="Search Logo" />
        <p>Rechercher</p>
      </LogoContainer>
    </HeaderContainer>
  );
};

export default Header;
