import { Authenticated, Org } from "@/atom";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios";
import { useEffect, useState } from "react";
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";


const Auth = () => {

  const navigate = useNavigate();
  const setAuthenticated = useSetRecoilState(Authenticated);
  const setOrg = useSetRecoilState(Org);
  const [orgEmail, setOrgEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleNavigateToOnBoarding = () => {
    navigate('/onboarding');
  } 

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = {
      email : orgEmail,
      password,
    }
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/org/login`,data)
    console.log(res.data);
    localStorage.setItem("token" ,res.data.token );
    localStorage.setItem("_id" ,res.data.organization._id );
    setAuthenticated(true);
    setOrg(res.data.organization);
    navigate('/');
    window.location.reload()
  }

  return (
    <form onSubmit={handleSubmit}>
    <div className="bg-gray-200 w-screen h-screen">
      <div className="flex flex-row justify-center">
        <div className="flex flex-col justify-center min-h-screen">
          <div className="bg-white w-96 py-4 rounded-md shadow-md ">
              <div>
                <h1 className="scroll-m-20 text-2xl font-bold tracking-tight flex flex-row justify-center my-8">
                  Meved Org Login
                </h1>
              </div>
              <div className="px-8 mt-4">
                <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                  Org Contact Email
                </h4>
                <Input type="text" value={orgEmail} onChange={(e) => { setOrgEmail(e.target.value) }} placeholder="Enter Your Org Email" className="mt-2" />
              </div>
              <div className="px-8 mt-4">
                <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                  Password
                </h4>
                <Input type={showPassword ? "text" : "password"} value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter Your Password" className="mt-2" />
                <div className="flex flex-row justify-end items-center gap-2 my-2 mr-2" onClick={() => showPassword ? setShowPassword(false) : setShowPassword(true)}>{showPassword ? <FaEyeSlash /> : <FaEye />} Password</div>
              </div>
              <div onClick={handleNavigateToOnBoarding} className="flex flex-row justify-center text-sm font-medium text-black hover:text-gray-500">Want to register your Organization?</div>
              <div className="mt-4 flex flex-row justify-center">
                <Button type="submit">
                  Submit
                </Button>
              </div>
          </div>
        </div>
      </div>
    </div>
    </form>
  )
}

export default Auth
