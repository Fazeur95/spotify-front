import React, {useState, useRef, useEffect, useContext} from 'react';
import styled from 'styled-components';
import PlaylistCover from '../../assets/playlist-image.png';
import AddIcon from '../../assets/plus.svg';
import AddMusic from '../../assets/music-add.svg';
import {useNavigate} from 'react-router-dom';
import {PlaylistContext} from '../../utils/context/PlaylistContext/PlaylistContext';

function CreatePlaylist() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  // const {playlists, setPlaylists} = useContext(PlaylistContext);

  const createPlaylistRequest = async () => {
    const response = await fetch('http://localhost:6868/api/playlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Nouvelle Playlist',
        imageUrl: PlaylistCover,
      }),
    });
    const data = await response.json();
    // setPlaylists([...playlists, data]);
    navigate(`/playlist/${data._id}`);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [containerRef]);

  return (
    <PlaylistContainer ref={containerRef}>
      <PlaylistButton onClick={() => setIsOpen(!isOpen)}>
        <StyledImage src={AddIcon} alt="Add" />
      </PlaylistButton>
      <Dropdown isOpen={isOpen}>
        <StyledButton onClick={createPlaylistRequest}>
          <StyledImage src={AddMusic} alt="Add Music" /> Créer une playlist
        </StyledButton>
      </Dropdown>
    </PlaylistContainer>
  );
}

const PlaylistContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled.img`
  height: 20px;
  margin-right: 10px;
`;

const PlaylistButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  &:hover {
    opacity: 0.5;
    outline: none;
  }
  &:clicked {
    opacity: 0.5;
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;

const Dropdown = styled.div`
  display: ${({isOpen}) => (isOpen ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  right: 0;
  background: #282828;
  border-radius: 5px;
  padding: 1px;
  z-index: 1;

  margin-top: 10px;
  width: 220px;
  height: 60px;
  overflow: auto;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #282828;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  transition: 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    background-color: #3e3e3e;
    outline: none;
  }
  &:clicked {
    background-color: #3e3e3e;
    outline: none;
  }
  outline: none;
`;

export default CreatePlaylist;
