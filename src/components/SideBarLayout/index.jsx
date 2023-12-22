// Layout.js
import styled from 'styled-components';
import Playlists from '../PlayLists';
import Header from '../Header';
import NavigationButtons from '../NavigationButtons';

function Layout({rightComponent}) {
  return (
    <LayoutContainer>
      <Sidebar>
        <BorderContainer>
          <Header />
        </BorderContainer>
        <BorderContainer2>
          <Playlists />
        </BorderContainer2>
      </Sidebar>

      <MainContent>
        <NavigationButtons />
        {rightComponent}
      </MainContent>
    </LayoutContainer>
  );
}

const LayoutContainer = styled.div`
  display: flex;
  position: relative;

  padding: 8px;
  background-color: black; // Changed to a darker color for a more Spotify-like look

  width: 100%;
  height: 100vh; // Added to make sure it takes up the full viewport height
`;

const Sidebar = styled.div`
  width: 20%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding: 15px;
  color: #ffffff;
  background-color: black;

  @media (max-width: 768px) {
    width: 50%; // Augmenter la largeur pour les petits écrans
  }
`;

const BorderContainer = styled.div`
  border-radius: 10px;
  border: 1px solid #121212;
  background-color: #121212;
  margin-bottom: 20px;
  overflow: hidden;
  width: 100%;
  color: #ffffff; // Added to make text white
`;
const BorderContainer2 = styled.div`
  border-radius: 10px;
  border: 1px solid #121212;
  background-color: #121212;
  margin-bottom: 18px;
  overflow: hidden;
  width: 100%;
  height: 95vh;
  color: #ffffff; // Added to make text white
`;

const MainContent = styled.div`
  width: 80%;
  margin-left: 21%;
  padding: 7px 10px;
  position: relative;
  color: #ffffff;

  @media (max-width: 768px) {
    width: 50%; // Réduire la largeur pour les petits écrans
    margin-left: 51%; // Ajuster la marge gauche pour les petits écrans
  }
`;

export default Layout;
