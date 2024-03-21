// Navigate is used to redirect the user
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Home from './pages/Home'
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Navbar from './components/Navbar';

function App() {
  // User if used below to conditionally redirect to pages based on user object's status
  // Element={user ? <Home/> : <Navigate to="/login"/>} means 
  // if user is not null stay in Home, else goto login page

  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home/> : <Navigate to="/login"/>}
            />
            <Route
              path="/login"
              element={!user ? <Login/> : <Navigate to="/"/>}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/"/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
