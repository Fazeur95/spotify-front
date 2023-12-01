// App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import SearchPage from '../src/pages/SearchPage';
import LibraryPage from '../src/pages/LibraryPage';
import HomePage from '../src/pages/HomePage';
import AudioPlayer from './components/AudioPlayer';
import AlbumPage from './pages/AlbumPage';

import AudioPlayerProvider from './utils/context/AudioPlayerContext/AudioPlayerContext';

const App = () => {
  return (
    <>
      <AudioPlayerProvider>
        <Router>
          <Routes>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/album/:id" element={<AlbumPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </Router>
        <AudioPlayer />
      </AudioPlayerProvider>
    </>
  );
};

export default App;
