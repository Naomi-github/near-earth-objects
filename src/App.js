import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className="pages">
      <Routes>
        < Route path="/"
        element={<Homepage />}
        />
      </Routes>

      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
