import {
  BrowserRouter,    // wraps everything that needs to use the routing system
  Routes,           // wraps each of our individual routes
  Route             // create a single route
} from 'react-router-dom';

// pages
import Home from "./pages/Home";

// components
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path="/" element={<Home />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
