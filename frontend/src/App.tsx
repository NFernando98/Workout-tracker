import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages & components
import Home from "./pages/Home"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className="pages">
        <Routes>
          <Route>
            path="/"
            element={<Home/>}
          </Route>
        </Routes>

      </div>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
