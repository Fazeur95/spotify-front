import {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import LibraryLogo from '../../assets/library.svg';
import LikedCover from '../../assets/likedCover.webp';

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [likedTracks, setLikedTracks] = useState(
    JSON.parse(localStorage.getItem('likedTracks')) || [],
  );
  useEffect(() => {
    fetch('http://localhost:6868/api/playlist')
      .then(response => response.json())
      .then(data => setPlaylists(data));
  }, []);

  return (
    <PlaylistsContainer>
      <LogoContainer>
        <Logo src={LibraryLogo} alt="Library Logo" />
        <LogoTitle>Bibliothèque</LogoTitle>
      </LogoContainer>
      <LikedTracksContainer>
        <LinkStyled to="/favorite">
          <StyledCover src={LikedCover} alt="Liked Cover" loading="lazy" />
          <TitleContainer>
            <Title>Titre Likés</Title>
            <SubTitle>{likedTracks.length} morceaux</SubTitle>
          </TitleContainer>
        </LinkStyled>
        {playlists?.map((playlist, index) => (
          <LinkStyled key={index} to={`/playlist/${playlist._id}`}>
            <StyledCover
              src={playlist.imageUrl}
              alt="Playlist Image"
              loading="lazy"
            />
            <TitleContainer>
              <Title>{playlist.name}</Title>
              <SubTitle>{playlist?.tracks?.length} morceaux</SubTitle>
            </TitleContainer>
          </LinkStyled>
        ))}
      </LikedTracksContainer>
    </PlaylistsContainer>
  );
};

const PlaylistsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  width: 100%;
  height: 100%;
  background-color: #121212;
  color: #fff;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    font-weight: bold;

    & > img {
      filter: brightness(2.5);
      transform: scale(1.2);
    }
  }
`;

const Logo = styled.img`
  height: 30px;
  margin-right: 10px;
`;

const LogoTitle = styled.h2`
  font-size: 1.2em;
`;

const LikedTracksContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
`;

const LinkStyled = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #fff;
  margin-bottom: 1rem;
  &:hover {
    cursor: pointer;
    transition: 0.2s ease-in-out;
    font-weight: bold;
    color: #fff;
  }
`;

const StyledCover = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 10px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 1em;
  margin: 0;
`;

const SubTitle = styled.h4`
  font-size: 1em;
  margin: 0;
  color: #b3b3b3;
`;

export default Playlists;
