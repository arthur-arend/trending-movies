import { useEffect, useState } from "react";
import "./App.css";
import { Card } from "./components/Card/Card.component";
import { getTrendingMovies } from "./services/movies.service";

function App() {
  const [count, setCount] = useState(0);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    getTrendingMovies().then((movies) => {
      setMovies(movies);
    });
  }, [count]);

  return (
    <>
      {movies.map((movie) => (
        <Card key={movie.id} movie={movie} />
      ))}
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
