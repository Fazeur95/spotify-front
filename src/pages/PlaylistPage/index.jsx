import React from 'react';
import PlaylistAlbum from '../../components/PlaylistAlbum';
import {useParams} from 'react-router-dom';

const PlaylistPage = () => {
  const {id} = useParams();

  return <PlaylistAlbum id={id} />;
};

export default PlaylistPage;
