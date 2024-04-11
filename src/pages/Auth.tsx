import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { FaEye,FaEyeSlash } from "react-icons/fa";


const Auth = () => {

  const [orgId, setOrgId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-gray-200 w-screen h-screen">
      <div className="flex flex-row justify-center">
        <div className="flex flex-col justify-center min-h-screen">
         <div className="bg-white w-96 py-4 rounded-md shadow-md ">
            <div>
              <h1 className="scroll-m-20 text-3xl font-bold tracking-tight flex flex-row justify-center my-8">
                  Meved Org
              </h1>
            </div>
            <div className="px-8">
              <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                Org Id
              </h4>
              <Input  type="text" value={orgId} onChange={(e)=>{setOrgId(e.target.value)}} placeholder="Enter Your Org ID" className="mt-2"/>
            </div>
            <div className="px-8 mt-4">
              <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                Password
              </h4>
              <Input type={showPassword ? "text" : "password"} value={password}  onChange={(e)=>{setPassword(e.target.value)}}  placeholder="Enter Your Org ID" className="mt-2"/>
              <div className="flex flex-row justify-end items-center gap-2 my-2 mr-2" onClick={() => showPassword ? setShowPassword(false) : setShowPassword(true) }>{showPassword ?  <FaEyeSlash/> : <FaEye/>} Password</div>            </div>
            <div className="mt-4 flex flex-row justify-center">
              <Button>
                Submit
              </Button>
            </div>
          </div>          
        </div>
      </div>
    </div>
  )
}

export default Auth
