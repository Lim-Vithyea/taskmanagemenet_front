import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StateContext } from './context/StateContext';
import Dashboard from './layout/Dashboard';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // Save to localStorage
  };

 

  return (
    <AuthProvider>
    <StateContext>
      <BrowserRouter>
        <Routes>
          {isLoggedIn && (
          <>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/dashboard/*" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}/>
          <Route path="*" element={<Navigate to={"/login"}  />}/>
          </>
          )
          }
          <Route path="*" element={<Navigate to={"/login"}  />}/>
        </Routes>
      </BrowserRouter>
    </StateContext>
    </AuthProvider>
   
  );
}

export default App;