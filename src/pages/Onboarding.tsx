import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Onboarding = () => {

  const navigate = useNavigate();

  const [orgName , setOrgName ] = useState('');
  const [locationName, setLocationName] = useState('');
  const [locationState, setLocationState] = useState('');
  const [locationCountry, setLocationCountry] = useState('');
  const [orgDescription , setOrgDescription ] = useState('');
  const [orgUniqueNess , setOrgUniqueNess ] = useState('');
  const [orgLogo, setOrgLogo] = useState<File | null>(null);
  const [ orgEmail , setOrgEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const handleNavigateToAuth = () => {
    navigate('/auth')
  }


  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    const orgData = {
      orgName,
      locationName,
      locationState,
      locationCountry,
      orgDescription,
      orgUniqueNess,
      orgLogo,
      orgEmail,
      password,
    };
  
    console.log(orgData);
  
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="bg-gray-200 w-screen h-screen">
        <div className="flex flex-row justify-center">
          <div className="flex flex-col justify-center min-h-screen">
            <div className="bg-white w-[80vh] py-4 rounded-md shadow-md h-[70vh] overflow-auto ">
              <div>
                <h1 className="scroll-m-20 text-2xl font-bold tracking-tight flex flex-row justify-center my-8">
                  Meved Org Onboarding
                </h1>
              </div>
              <div onClick={handleNavigateToAuth} className="flex flex-row justify-center text-sm font-medium text-black hover:text-gray-500">Org Already Resigtered?</div>
              <div className="px-8">
                  <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Org Name
                  </h4>
                  <Input  type="text" value={orgName} onChange={(e)=>{setOrgName(e.target.value)}} placeholder="Enter Your Org Name" className="mt-2"/>
              </div>
              <div className="px-8 mt-4">
                  <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Org Logo
                  </h4>
                  <Input  type="file" onChange={(event)=>{setOrgLogo(event.target.files ? event.target.files[0] : null)}} placeholder="Enter Your Org Name" className="mt-2"/>
              </div>
              <div className="px-8 mt-4 gap-4">
                <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Org Location
                </h4>
                <Input  
                    type="text" 
                    value={locationName} 
                    onChange={(e) => setLocationName(e.target.value)} 
                    placeholder="Enter Your Org Name" 
                    className="mt-2"
                />
                <Input  
                    type="text" 
                    value={locationState} 
                    onChange={(e) => setLocationState(e.target.value)} 
                    placeholder="Enter Your Org State" 
                    className="mt-2"
                />
                <Input  
                    type="text" 
                    value={locationCountry} 
                    onChange={(e) => setLocationCountry(e.target.value)} 
                    placeholder="Enter Your Org Country" 
                    className="mt-2"
                />
            </div>
              <div className="px-8 mt-4">
                  <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Org Description
                  </h4>
                  <textarea value={orgDescription} onChange={(e)=>{setOrgDescription(e.target.value)}} placeholder="Org Description" className="text-xs h-20 px-1 py-1 mt-2 w-full rounded-sm shadow-sm ring-1 ring-gray-200"/>
              </div>
              <div className="px-8 mt-4">
                  <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    What makes your Org unique?
                  </h4>
                  <textarea value={orgUniqueNess} onChange={(e)=>{setOrgUniqueNess(e.target.value)}} placeholder="Org Characteristics" className="text-xs h-20 px-1 py-1 mt-2 w-full rounded-sm shadow-sm ring-1 ring-gray-200"/>
              </div>
              <div className="px-8 mt-4">
                  <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Contact Email
                  </h4>
                  <Input type="text" value={orgEmail} onChange={(e)=>{setOrgEmail(e.target.value)}} placeholder="Enter Your Org Name" className="mt-2"/>
              </div>
              <div className="px-8 mt-4">
                <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                  Password
                </h4>
                <Input type={showPassword ? "text" : "password"} value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter Your Password" className="mt-2"/>
                <div className="flex flex-row justify-end items-center gap-2 my-2 mr-2" onClick={() => setShowPassword(!showPassword)}>{showPassword ?  <FaEyeSlash/> : <FaEye/>} Show Password</div>
              </div>
              <div className="px-8 mt-4">
                <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                  Confirm Password
                </h4>
                <Input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} placeholder="Confirm Your Password" className="mt-2"/>
                <div className="flex flex-row justify-end items-center gap-2 my-2 mr-2" onClick={() => setConfirmShowPassword(!showConfirmPassword)}>{showConfirmPassword ?  <FaEyeSlash/> : <FaEye/>} Show Password</div>
              </div>
              <div className="flex flex-row justify-center my-4">
                <Button type="submit">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Onboarding
