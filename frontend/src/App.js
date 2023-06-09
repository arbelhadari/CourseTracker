import {
  BrowserRouter,    // wraps everything that needs to use the routing system
  Routes,           // wraps each of our individual routes
  Route,   
  Navigate          // create a single route
} from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
// pages
import Home from "./pages/Home";
import Course from "./pages/Course";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// components
import Navbar from "./components/Navbar";

function App() {
  const {user} = useAuthContext() 
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path="/course/:courseId" element={<Course />}/>
            <Route path="/" element={user ? <Home /> : <Navigate to ="/login"/>}/>
            <Route path="/login" element={!user ? <Login />: <Navigate to = "/"/>}/>
            <Route path="/signup" element={!user ? <Signup />:<Navigate to = "/"/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
