// components/Header.js
import styled from 'styled-components';
import HomeLogo from '../../assets/home.svg'; // Ajoutez le chemin de votre logo Home
import SearchLogo from '../../assets/search.svg'; // Ajoutez le chemin de votre logo de recherche
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <LogoContainer>
        <LinkStyled to="/">
          <Logo src={HomeLogo} alt="Home Logo" />
          <p>Accueil</p>
        </LinkStyled>
      </LogoContainer>
      <LogoContainer>
        <LinkStyled to="/search">
          <Logo src={SearchLogo} alt="Search Logo" />
          <p>Rechercher</p>
        </LinkStyled>
      </LogoContainer>
    </div>
  );
};

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1px 10px 1px 10px;
  width: 100%;
  height: 100%;
`;
const LinkStyled = styled(Link)`
  display: flex;
  align-items: center;
  color: #fff;
  &:hover {
    cursor: pointer;
    transition: 0.2s ease-in-out;
    font-weight: bold;
    color: #fff;
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
const Title = styled.h3``;

export default Header;
