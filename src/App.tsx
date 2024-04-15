import { useState, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import Sidebar from "./components/elements/SideBar";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Postings from "./pages/Postings";
import Onboarding from "./pages/Onboarding";
import Auth from "./pages/Auth";
import Home from "./pages/Home";



const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return(
    <Router>
        <div>
        {isAuthenticated &&
          <div className="flex flex-row py-2">
            <div>
              <Sidebar/>
            </div>
            <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/postings' element={<Postings/>}/>
            <Route path='/messages' element={<Messages/>}/>
          </Routes>
          </div>
        }
        {
          !isAuthenticated &&
              <Routes>
                <Route path="/onboarding" element={<Onboarding/>} />
                <Route path="/auth" element={<Auth/>}/>
              </Routes>
        }
      </div>
    </Router>
  );
}
export default App
