import PopularArtists from '../../components/PopularArtists';
import {useContext} from 'react';
import {AudioPlayerContext} from '../../utils/context/AudioPlayerContext/AudioPlayerContext';

function LibraryPage() {
  const {currentTrack, setCurrentTrack} = useContext(AudioPlayerContext);

  return (
    <PopularArtists
      currentTrack={currentTrack}
      setCurrentTrack={setCurrentTrack}
    />
  );
}

export default LibraryPage;
