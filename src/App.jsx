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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
