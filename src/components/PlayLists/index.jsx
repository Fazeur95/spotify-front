import styled from 'styled-components';
import {Link} from 'react-router-dom';
import LibraryLogo from '../../assets/library.svg'; // Ajoutez le chemin de votre logo Library

const Playlists = () => {
  return (
    <PlaylistsContainer>
      <LogoContainer>
        <Logo src={LibraryLogo} alt="Library Logo" />
        <p>Bibliothèque</p>
      </LogoContainer>
    </PlaylistsContainer>
  );
};
const PlaylistsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1px 10px 1px 10px;
  width: 100%;
  height: 100%;
`;

const LogoContainer = styled.div`
  display: flex;
  padding: 1px 10px 1px 10px;
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

export default Playlists;
