import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Modal from 'styled-react-modal';
import CloseModal from '../../assets/x.svg';
import OpenModal from '../../assets/more.svg';

function EditPlaylistComponent({playlistId}) {
  const [playlistName, setPlaylistName] = useState('');
  const [playlistImage, setPlaylistImage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchPlaylist = async () => {
      const response = await fetch(
        `http://localhost:6868/api/playlist/${playlistId}`,
      );
      const data = await response.json();
      setPlaylistName(data.name);
      setPlaylistImage(data.imageUrl);
    };

    fetchPlaylist();
  }, [playlistId]);

  const handleNameChange = event => {
    setPlaylistName(event.target.value);
  };

  const updatePlaylist = async () => {
    await fetch(`http://localhost:6868/api/playlist/${playlistId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: playlistName,
        imageUrl: playlistImage,
      }),
    });
    setModalOpen(false);
    window.location.reload();
  };

  return (
    <PlaylistContainer>
      <PlaylistButton onClick={() => setModalOpen(true)}>
        <OpenIcon />
      </PlaylistButton>
      <StyledModal
        isOpen={modalOpen}
        onBackgroundClick={() => setModalOpen(false)}
        onEscapeKeydown={() => setModalOpen(false)}>
        <CloseButton onClick={() => setModalOpen(false)}>
          <CloseIcon />
        </CloseButton>
        <ModalTitle>Modifier les informations</ModalTitle>
        <ModalInput
          type="text"
          value={playlistName}
          placeholder="Nom de votre playlist"
          onChange={handleNameChange}
        />
        <ModalButton onClick={updatePlaylist}>Sauvegarder</ModalButton>
      </StyledModal>
    </PlaylistContainer>
  );
}

const OpenIcon = styled.img.attrs({
  src: OpenModal,
  alt: 'Open Modal',
})`
  width: 20px;
  height: 20px;
`;

const CloseIcon = styled.img.attrs({
  src: CloseModal,
  alt: 'Close Modal',
})`
  width: 20px;
  height: 20px;
`;

const PlaylistContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  //Put on right
  right: 0;
  //Put down a little bit
  top: 1rem;
  margin-right: 1rem;
`;

const PlaylistButton = styled.button`
  position: relative;
  border: none;
  background-color: transparent;
  cursor: pointer
  &:hover {
    opacity: 0.5;
  }

  &:focus {
    outline: none;
  }

`;

// Styled component pour la modal
const StyledModal = Modal.styled`
  width: 28rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
  margin: auto;
  //add custom space between each element
  gap: 1rem;

  background-color: #282828;
  padding: 1rem;
  border-radius: 8px;
  position: relative;
`;

// Styled component pour le bouton close
const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  border: none;
  background-color: transparent;
`;

// Styled components pour les éléments de la modal
const ModalTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  font-family: 'Gotham SSm A', 'Gotham SSm B', sans-serif;
  font-weight: bold;
  color: white;
`;

const ModalInput = styled.input`
  width: 54%;
  margin-left: auto;
  padding: 9px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
`;

const ModalButton = styled.button`
  width: 40%;
  padding: 15px;
  border: none;
  border-radius: 35px;
  background-color: white;
  color: black;
  font-size: 16px;
  cursor: pointer;
  margin-left: auto;
  margin-top: auto;
`;

export default EditPlaylistComponent;
