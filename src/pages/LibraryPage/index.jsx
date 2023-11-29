import styled from 'styled-components';
import Header from '../../components/Header';
import Playlists from '../../components/Playlists';
import AudioPlayer from '../../components/AudioPlayer';
import PopularArtists from '../../components/PopularArtists';
import {useState} from 'react';

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
  const [currentTrack, setCurrentTrack] = useState(null);

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
        <PopularArtists
          currentTrack={currentTrack}
          setCurrentTrack={setCurrentTrack}
        />
      </RightContainer>
      {currentTrack && (
        <AudioPlayer
          currentTrack={currentTrack}
          setCurrentTrack={setCurrentTrack}
        />
      )}
    </HomePageContainer>
  );
}

export default HomePage;
