import styled from 'styled-components';
import Header from '../../components/Header';
import Playlists from '../../components/Playlists';
import PopularArtists from '../../components/PopularArtists';
import {useContext} from 'react';
import {AudioPlayerContext} from '../../utils/context/AudioPlayerContext/AudioPlayerContext';

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
const BorderContainer2 = styled.div`
  border-radius: 10px;
  border: 1px solid #121212;
  background-color: #121212;
  margin-bottom: 20px;
  overflow: hidden;
  height: 100vh;
`;

function LibraryPage() {
  const {currentTrack, setCurrentTrack} = useContext(AudioPlayerContext);

  return (
    <HomePageContainer>
      <LeftContainer>
        <BorderContainer>
          <Header />
        </BorderContainer>
        <BorderContainer2>
          <BorderContainer>
            <Playlists />
          </BorderContainer>
        </BorderContainer2>
      </LeftContainer>

      <RightContainer>
        <PopularArtists
          currentTrack={currentTrack}
          setCurrentTrack={setCurrentTrack}
        />
      </RightContainer>
    </HomePageContainer>
  );
}

export default LibraryPage;
