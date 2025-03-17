import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// pages and components 
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {

  const users = JSON.parse(localStorage.getItem('user'))

  return (
  // check if u have user 
    <div className="App">
      <BrowserRouter>
         <Navbar />
         <div className="pages">
          <Routes>
            
            <Route 
            path="/" 
            element={users? <Home />: <Navigate to="/login"/>}
            />

            <Route
              path='/login'
              element={!users? <Login/> : <Navigate to="/"/>}
            />

            <Route
              path='/signup'
              element={!users? <Signup/> : <Navigate to="/"/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
);
} export default App;