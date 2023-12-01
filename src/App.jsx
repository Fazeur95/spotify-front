// App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Layout from './Layout';
import SearchPage from '../src/pages/SearchPage';
import LibraryPage from '../src/pages/LibraryPage';
import HomePage from '../src/pages/HomePage';
import AudioPlayer from './components/AudioPlayer';
import {useState} from 'react';
import AudioPlayerProvider from './utils/context/AudioPlayerContext/AudioPlayerContext';

const App = () => {
  return (
    <>
      <AudioPlayerProvider>
        <Router>
          <Routes>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/library" element={<LibraryPage />} />
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
