import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import AsteroidTracker from './pages/AsteroidTracker'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className="pages">
      <Routes>
        < Route path="/"
        element={<AsteroidTracker />}
        />
      </Routes>

      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
