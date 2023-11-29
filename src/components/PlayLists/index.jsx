import styled from 'styled-components';
import {Link} from 'react-router-dom';
import LibraryLogo from '../../assets/library.svg'; // Ajoutez le chemin de votre logo Library

const PlaylistsContainer = styled.div`
  display: flex;
  flex-direction: column; /* Mettez les éléments en colonne */
  background-color: #121212;
  border-radius: 10px;
  width: 100%;
  max-width: 800px;

  padding: 20px 20px;
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
const Playlists = () => {
  return (
    <PlaylistsContainer>
      <LinkStyled to="/library">
        <LogoContainer>
          <Logo src={LibraryLogo} alt="Library Logo" />
          <p>Bibliothèque</p>
        </LogoContainer>
      </LinkStyled>
    </PlaylistsContainer>
  );
};

export default Playlists;
