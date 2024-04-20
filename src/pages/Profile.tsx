// import { User , UserI } from "@/atom";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { IoIosLink } from "react-icons/io";
import { IoGlobeOutline } from "react-icons/io5";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { FaPencilAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useRecoilValue } from "recoil";
import { Org } from "@/atom";
import axios from "axios";


const Profile = () => {
  
  const forg = useRecoilValue(Org)  
  const [org,setOrg] = useState({})
  const [newLogo,setNewLogo] = useState<File|null>(null);
  const [website,setWebsite] = useState("")
  const [description,setDescription] = useState("")
  const [reasonForJoining,setReasonForJoining] = useState("")
  const [otherLinks,setOtherLinks] = useState("")


  useEffect(()=>{
    setOrg(forg)
  },[forg,setOrg])

  const handleUpdates = async (e) => {
    e.preventDefault();
    const _id= localStorage.getItem("_id")

    const data = {
      newLogo,
      description: description, 
      reasonForJoining : reasonForJoining ,
      website : website ,
      otherLinks : otherLinks
    }

    
    
    const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/org/updateOrganization/${_id}` , data,{
      headers : {
        'Content-Type': 'multipart/form-data',
        'Authorization': localStorage.getItem("token"),
      },
      withCredentials: true
    })

    console.log(res.data);
    
  }

  return (
    <div className="px-10 py-4 w-full " style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
          Org Profile
        </h1>
      </div>
      <div className="pt-16 px-4 flex flex-row gap-4">
        <div>
          <div>
            <img src={org.logo} className="w-48 h-48 rounded-full"/>
          </div>
          <div className="flex flex-row mt-6 justify-center gap-4">
                <a href={org.website}>
                  <IoGlobeOutline size={25}/>
                </a>
                <a href={org.otherLinks}>
                  <IoIosLink size={25}/>
                </a>
        </div>
        </div>
        <div className="ml-8 w-[50vh]">
        <Sheet>
              <SheetTrigger>
                <div className="font-medium flex flex-row gap-3">
                  <FaPencilAlt /> Edit Profile
                </div>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto w-full">
              <SheetHeader>
                <SheetTitle>Edit Profile</SheetTitle>
                <SheetDescription>
                <div>
                <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                  Logo
                </h4>
                    <Input type="file" onChange={(e)=>{setNewLogo(e.target.files ? e.target.files[0] : null )}} className="mt-2"/>
                  </div>
                {/* <div>
                <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                  Name
                </h4>
                    <Input type="text" value={org.name} onChange={(e)=>{setOrg({...org , "name" : e.target.value})}} className="mt-2"/>
                  </div>
                  <div className="mt-6">
                      <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                        Email
                      </h4>
                      <Input type="text" value={org.email} onChange={(e) => setOrg({ ...org, "email": e.target.value })} className="mt-2"/>                  </div>
                  <div className="mt-6">
                      <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                        Phone Number
                      </h4>
                      <Input type="text" value={org.phone} onChange={(e) => setOrg({ ...org, "Phone": e.target.value })} className="mt-2"/>
                  </div>
                  <div className="mt-6">
                      <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                          Location
                      </h4>
                      <Input type="text" value={org.location?.name} onChange={(e) => setOrg({ ...org, "location": { ...org.location , "name" :  e.target.value } })} className="mt-2"/>
                      <Input type="text" value={org.location?.state} onChange={(e) => setOrg({ ...org, "location": { ...org.location , "state" :  e.target.value } })} className="mt-2"/>
                      <Input type="text" value={org.location?.country} onChange={(e) => setOrg({ ...org, "location": { ...org.location , "country" :  e.target.value } })} className="mt-2"/>
                  </div> */}
                  <div className="mt-6">
                        <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                          Description
                        </h4>
                        <textarea  value={org.description} onChange={(e) => { setOrg({ ...org, "description": e.target.value }); setDescription(e.target.value); }} className="text-xs h-20 px-1 py-1 mt-2 w-full rounded-sm shadow-sm ring-1 ring-gray-200"/>
                  </div>
                  <div className="mt-6">
                        <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                          Why to join
                        </h4>
                        <textarea  value={org.reasonForJoining} onChange={(e) => { setOrg({ ...org, "reasonForJoining": e.target.value }); setReasonForJoining(e.target.value); }} className="text-xs h-20 px-1 py-1 mt-2 w-full rounded-sm shadow-sm ring-1 ring-gray-200"/>
                  </div>
                <div className="px-8 mt-6">
                  <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Website
                  </h4>
                  <Input type="text" value={org.website} onChange={(e) => { setOrg({ ...org, "website": e.target.value }); setWebsite(e.target.value); }} className="mt-2"/>
                </div>
                <div className="px-8 mt-6">
                      <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                        Other Links
                      </h4>
                      <Input type="text" value={org.otherLinks} onChange={(e) => { setOrg({ ...org, "otherLinks": e.target.value }); setOtherLinks(e.target.value); }} className="mt-2"/>
                  </div>
                <div className="px-8 mt-6">
                  <Button onClick={handleUpdates}>
                    Save Changes
                  </Button>
                </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
              <div>
                <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                  Approved By Admin
                </h4>
              <Input disabled type="text" value={org.approvedByAdmin} className="mt-2"/>
            </div>
              <div>
                <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                  Name
                </h4>
              <Input disabled type="text" value={org.name} className="mt-2"/>
            </div>
            <div className="mt-6">
                <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                  Email
                </h4>
              <Input disabled type="text" value={org.email} className="mt-2"/>
            </div>
            <div className="mt-6">
                <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                  Phone Number
                </h4>
              <Input disabled type="text" value={org.phone} className="mt-2"/>
            </div>
            <div className="mt-6">
                <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Location
                </h4>
                <Input
                    disabled  
                    type="text" 
                    value={org.location?.name}  
                    className="mt-2"
                />
                <Input
                    disabled  
                    type="text" 
                    value={org.location?.state} 
                    className="mt-2"
                />
                <Input 
                    disabled 
                    type="text" 
                    value={org.location?.country} 
                    className="mt-2"
                />
            </div>
            <div className="mt-6">
                  <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Description
                  </h4>
                  <div className="mt-2 w-[95vh]">
                    {org.description}
                  </div>
            </div>
            <div className="mt-6">
                  <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Why to Join
                  </h4>
                  <div className="mt-2 w-[95vh]">
                    {org.reasonForJoining}
                  </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Profile