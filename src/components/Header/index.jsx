// components/Header.js

import styled from 'styled-components';
import SpotifyLogo from '../../assets/spotify-1.svg';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
  padding: 20px 0;
`;

const Logo = styled.img`
  height: 50px;
`;

const SearchInput = styled.input`
  padding: 10px;
  border-radius: 20px;
  border: none;
  width: 300px;
  font-size: 16px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo src={SpotifyLogo} alt="Spotify Logo" />
      <SearchInput type="text" placeholder="Rechercher" />
    </HeaderContainer>
  );
};

export default Header;
