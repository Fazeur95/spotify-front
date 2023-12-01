import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';

const AlbumPage = () => {
  const {id} = useParams();

  useEffect(() => {
    fetch(`http://localhost:6868/api/album/${id}?populate=true`)
      .then(response => response.json())
      .then(data => console.log(data));
  }, [id]);
  return (
    <div>
      <h1>Artist's Albums</h1>
      {/* Add your code here to display the artist's albums */}
    </div>
  );
};

export default AlbumPage;
