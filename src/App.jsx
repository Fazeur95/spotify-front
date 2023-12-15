// App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import LibraryPage from './pages/LibraryPage';
import HomePage from './pages/HomePage';
import FavoritePage from './pages/FavoritePage';
import AlbumPage from './pages/AlbumPage';
import Layout from './components/SideBarLayout'; // Importez votre composant Layout
import AudioPlayer from './components/AudioPlayer';
import AudioPlayerProvider from './utils/context/AudioPlayerContext/AudioPlayerContext';
import ArtistPage from './pages/ArtistPage';
import PlaylistPage from './pages/PlaylistPage';
import CustomPlaylist from './pages/CustomPlaylist';

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
              path="/favorite"
              element={<Layout rightComponent={<FavoritePage />} />}
            />
            <Route
              path="/playlist/:id"
              element={<Layout rightComponent={<PlaylistPage />} />}
            />
            <Route
              path="/"
              element={<Layout rightComponent={<HomePage />} />}
            />
            <Route
              path="/customPlaylist"
              element={<Layout rightComponent={<CustomPlaylist />} />}
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
