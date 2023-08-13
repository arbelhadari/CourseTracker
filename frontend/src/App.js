import {
  BrowserRouter,
  Routes,
  Route,   
  Navigate} from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import { useEffect, useState } from 'react';

// pages
import Home from "./pages/Home";
import Course from "./pages/Course";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// components
import Navbar from "./components/Navbar";

function App() {

  // const {user} = useAuthContext() 

  const [user, setUser] = useState(null);
  const [finish, setFinish] = useState(false);
  const authContext = useAuthContext(); // Use the custom hook or context

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await authContext.user; // Use a method from the custom hook or context
      setUser(userData);
      setFinish(true);
    };

    if (!user) {
      fetchUser();
    }
  }, [user, authContext]);

  if (!user && !finish) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path="/course/:courseId" element={user ? <Course /> : <Navigate to ="/login"/>}/>
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
