import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import { useSidebarContext } from './context/SidebarContext';

// pages & components
import Home from './pages/Home'
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Navbar from './components/Navbar/Navbar';

function App() {
  const { user } = useAuthContext();
  const { toggleSidebar } = useSidebarContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div><button onClick={toggleSidebar}>Toggle</button></div>
        <div className='content'>
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
