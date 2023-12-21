import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import Modal from 'styled-react-modal';
import CloseModal from '../../assets/x.svg';
import OpenModal from '../../assets/more.svg';
import {useParams, useNavigate} from 'react-router-dom';
import {PlaylistContext} from '../../utils/context/PlaylistContext/PlaylistContext';

function EditPlaylistComponent({playlist, setPlaylist}) {
  const [modalOpen, setModalOpen] = useState(false);
  const {fetchPlaylists} = useContext(PlaylistContext);
  const {id} = useParams();
  const navigate = useNavigate();

  // Utilisez un état local pour le nom de la playlist
  const [playlistName, setPlaylistName] = useState(playlist.name);

  const handleNameChange = event => {
    setPlaylistName(event.target.value);
  };

  const updatePlaylist = async () => {
    const response = await fetch(
      `https://spotify-api-43ur.onrender.com/api/playlist/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: playlistName,
          imageUrl: playlist.imageUrl,
        }),
      },
    );
    const data = await response.json();
    setPlaylist(data);
    setModalOpen(false);
    //Reload the page
    window.location.reload();
  };

  const deletePlaylist = async () => {
    const response = await fetch(
      `https://spotify-api-43ur.onrender.com/api/playlist/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await response.json();
    await fetchPlaylists();
    navigate(`/`);
  };

  if (!playlist) return null;

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
        <ModalButtonContainer>
          <DeleteButton onClick={deletePlaylist}>Supprimer</DeleteButton>
          <ModalButton onClick={updatePlaylist}>Sauvegarder</ModalButton>
        </ModalButtonContainer>
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
const ModalButtonContainer = styled.div`
  //Display on bottom and space the elements
  margin-top: auto;
  display: flex;
  justify-content: space-between;
`;

const DeleteButton = styled.button`
  width: 40%;
  padding: 15px;
  border: none;
  border-radius: 35px;
  background-color: red;
  color: white;
  font-size: 16px;
  cursor: pointer;
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

  margin-top: auto;
`;

export default EditPlaylistComponent;
