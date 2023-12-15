import React, {useState} from 'react';
import styled from 'styled-components';
import PlaylistCover from '../../assets/549.jpg';

const PlaylistContainer = styled.div`
  /* Votre style ici */
`;

const PlaylistButton = styled.button`
  color: #fff;
`;

const Dropdown = styled.div`
  display: ${({isOpen}) => (isOpen ? 'block' : 'none')};
  position: absolute;
  background-color: black;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
`;

function PlaylistComponent() {
  const [isOpen, setIsOpen] = useState(false);

  async function createPlaylistRequest() {
    const defaultName = 'Ma playlist';
    const defaultImage = PlaylistCover;

    // Fetch the image file
    const imageResponse = await fetch(defaultImage);
    const imageBlob = await imageResponse.blob();

    const formData = new FormData();
    formData.append('name', defaultName);
    formData.append('image', imageBlob);

    const response = await fetch('http://localhost:6868/api/playlist', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    return data.id;
  }

  return (
    <PlaylistContainer>
      <PlaylistButton onClick={() => setIsOpen(!isOpen)}>+</PlaylistButton>
      <Dropdown isOpen={isOpen}>
        <button onClick={createPlaylistRequest}>Créer une playlist</button>
      </Dropdown>
    </PlaylistContainer>
  );
}

export default PlaylistComponent;
