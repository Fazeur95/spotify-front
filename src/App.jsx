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
import AlbumPage from './pages/AlbumPage';
import Layout from './components/SideBarLayout'; // Importez votre composant Layout
import AudioPlayer from './components/AudioPlayer';
import AudioPlayerProvider from './utils/context/AudioPlayerContext/AudioPlayerContext';
import ArtistPage from './pages/ArtistPage';

const App = () => {
  return (
    <>
      <AudioPlayerProvider>
        <Router>
          <Routes>
            <Route
              path="/search"
              element={<Layout rightComponent={<SearchPage />} />}
            />
            <Route
              path="/library"
              element={<Layout rightComponent={<LibraryPage />} />}
            />
            <Route
              path="/album/:id"
              element={<Layout rightComponent={<AlbumPage />} />}
            />
            <Route
              path="/artist/:id"
              element={<Layout rightComponent={<ArtistPage />} />}
            />
            <Route
              path="/"
              element={<Layout rightComponent={<HomePage />} />}
            />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </Router>

        <AudioPlayer />
      </AudioPlayerProvider>
    </>
  );
};

export default App;
