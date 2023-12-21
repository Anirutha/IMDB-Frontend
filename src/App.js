import { Route, Routes } from 'react-router-dom';
import './App.css';
import MoviesList from './components/MoviesList';
import MovieSearch from './components/MovieSearch';
import MovieUpdate from './components/MovieUpdate';
import MovieForm from './components/MovieForm';

function App() {
  return (
    <div className="App">
      <Routes>

        <Route exact path="/"
          element={<MoviesList />} />

        <Route path="/search"
          element={<MovieSearch />}
        />

        <Route path="/update"
          element={<MovieUpdate />}
        />

        <Route path="/add"
          element={<MovieForm />}
        />

      </Routes>
    </div>
  );
}

export default App;
