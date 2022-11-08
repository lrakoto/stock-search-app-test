import './App.css';
import SearchForm from './components/SearchForm';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

function App() {
  return (     
    <Router>
      <Routes>
          <Route path="*" element={<SearchForm />} />
      </Routes>
    </Router>
  );
}

export default App;
