import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import Sidebar from "./components/elements/SideBar";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Postings from "./pages/Postings";
import Onboarding from "./pages/Onboarding";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { useRecoilValue } from "recoil";
import { Authenticated } from "./atom";
import Posting from "./pages/Posting";
import ApplicantProfile from "./pages/ApplicantProfile";

const MainRoutes = () => {
  const isAuthenticated = useRecoilValue(Authenticated);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      if (location.pathname === "/") {
        navigate('/auth');
      }
    } else {
      if (location.pathname === "/") {
        navigate('/postings');
      }
    }
  }, [navigate, location, isAuthenticated]);

  return (
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
            <Route path='/posting/:id' element={<Posting/>}/>
            <Route path='posting/:id/applicant/:uid' element={<ApplicantProfile/>}/>
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
  );
}

const App = () => {
  return(
    <Router>
      <MainRoutes />
    </Router>
  );
}

export default App