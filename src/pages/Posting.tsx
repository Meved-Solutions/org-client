import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"

  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import ApplicantCard from "@/components/elements/ApplicantCard";
  

const Posting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const parts = location.pathname.split("/");
  const _id = parts[parts.length - 1];
  const [posting, setPosting] = useState({
    postingStatus : false,
    title: "",
    job_description: "",
    minExperience: "",
    job_type: "",
    location: [{
      name: "",
      state: "",
      country: ""
    }],
    numberOfVacancies: "",
    notice_period: "",
    salaryRange: {
      min: "",
      max: ""
    },
    department: "",
    domain: "",
    skills: [""],
    evaluation: [{
      question: ""
    }],
    org_id: null,
    org_name: "",
  });
  const [postingStatus, setPostingStatus] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [evaluationQuestions, setEvaluationQuestions] = useState<string[]>([]);
  const [applications,setApplications] = useState([]);
  
  const handleEvaluationQuestionChange = (index: number, newQuestion: string) => {
    const newEvaluationQuestions = [...evaluationQuestions];
    newEvaluationQuestions[index] = newQuestion;
    setEvaluationQuestions(newEvaluationQuestions);
  };
  
  const handleAddEvaluationQuestion = () => {
    setEvaluationQuestions([...evaluationQuestions, ""]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
        postingStatus : postingStatus,
        newEvaluationQuestions : evaluationQuestions,
        job_description : jobDescription
    }

    const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/posting/updatePosting/${_id}`, data,{
        headers: {
            'Authorization': localStorage.getItem("token"),
          }
    });

    console.log(res.data);
    
    
  }

  useEffect(()=>{
    const fetchPosting = async () => {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/posting/getPosting/${_id}`,{
            headers: {
                'Authorization': localStorage.getItem("token"),
              },
              withCredentials : true
        })
        console.log(res.data);
        setPosting(res.data)
    }

    const fectchApplications = async () =>{
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/application/getApplicationsByPosting/${_id}`,{
        headers: {
            'Authorization': localStorage.getItem("token"),
            },
            withCredentials : true
        })

        console.log(res.data);
        setApplications(res.data)
    }

    fetchPosting()
    fectchApplications()
  },[_id])

  const handleDelete = async(e) => {
    e.preventDefault();
    const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/posting/deletePosting/${_id}`,{
        headers: {
            'Authorization': localStorage.getItem("token"),
          }
    })
    console.log(res.data);  
    navigate('/postings')
  }

  return (
    <div className="px-4 py-4 w-full " style={{ maxHeight: '100vh', overflowY: 'auto' }}>
        <div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
                Posting
            </h1>
        </div>
        <div className="mt-6">
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="Info">Info</TabsTrigger>
                    <TabsTrigger value="Applications">Applications</TabsTrigger>
                </TabsList>
                <TabsContent value="Info">
                <div className="flex flex-row items-center gap-3">
                    <div>
                        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
                            Info
                        </h1>
                    </div>
                    <div>
                    <Sheet>
                        <SheetTrigger><FaPencilAlt/></SheetTrigger>
                        <SheetContent className="oveflow-auto">
                            <SheetHeader>
                            <SheetTitle>
                            <h1 className="scroll-m-20 text-2xl font-bold tracking-tight">
                            Edit Posting
                            </h1></SheetTitle>
                            <div className="mt-6">
                                <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                                Posting Status
                                </h4>
                                <Select onValueChange={(value) => setPostingStatus(value == "true" ? true : false)}>
                                <SelectTrigger className="w-full mt-2">
                                    <SelectValue placeholder={posting.postingStatus ? "Showing" : "Hidden"} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="true">Showing</SelectItem>
                                    <SelectItem value="false">Hidden</SelectItem>
                                </SelectContent>
                                </Select>
                            </div>
                            <div className="mt-6">
                                <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                                Job Description
                                </h4>
                                <textarea 
                                value={posting.job_description} 
                                onChange={(e) =>  {setPosting({...posting, job_description: e.target.value}) ; setJobDescription(e.target.value)}} 
                                className="text-xs h-20 px-1 py-1 mt-2 w-full rounded-sm shadow-sm ring-1 ring-gray-200"
                                />
                            </div>
                            <div className="mt-6">
                                <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                                Evaluation Questions
                                </h4>
                                {posting.evaluation.map((evalu, index) => (
                                <Input 
                                    key={index} 
                                    type="text" 
                                    value={evalu.question} 
                                    onChange={(e) => {
                                    const newEvaluation = [...evaluation];
                                    newEvaluation[index].question = e.target.value;
                                    setEvaluation(newEvaluation);
                                    }} 
                                    className="mt-2 w-full"
                                />
                                ))}
                                {evaluationQuestions.map((question, index) => (
                                <Input 
                                    key={index} 
                                    type="text" 
                                    value={question} 
                                    onChange={(e) => handleEvaluationQuestionChange(index, e.target.value)} 
                                    className="mt-2 w-full"
                                />
                                ))}
                                <Button onClick={handleAddEvaluationQuestion}>Add Evaluation Question</Button>  
                            </div>
                            <Button onClick={handleSubmit}>
                                Submit
                            </Button>
                            </SheetHeader>
                        </SheetContent>
                        </Sheet>
                    </div>
                    <div>
                    <Dialog>
                        <DialogTrigger><MdDelete/></DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone.
                            </DialogDescription>
                            </DialogHeader>
                            <Button onClick={handleDelete}>Delete</Button>
                        </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <div className="mt-6">
                    <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Posting Status
                    </h4>
                    <Input disabled type="text" value={posting.postingStatus ? "Showing" : "Hidden"} className="mt-2 w-full"/>
                </div>
                <div className="mt-6">
                    <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Title
                    </h4>
                    <Input disabled type="text" value={posting.title} className="mt-2 w-full"/>
                </div>
                <div className="mt-6">
                    <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Job Description
                    </h4>
                    <textarea disabled  value={posting.job_description} className="mt-2 w-full"/>
                </div>
                <div className="mt-6">
                    <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Minimum Experience
                    </h4>
                    <Input disabled type="text" value={posting.minExperience} className="mt-2 w-full"/>
                </div>
                <div className="mt-6">
                    <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Job Type
                    </h4>
                    <Input disabled type="text" value={posting.job_type} className="mt-2 w-full"/>
                </div>
                <div className="mt-6">
                    <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Location
                    </h4>
                    {posting.location.map((loc, index) => (
                    <div key={index}>
                        <Input disabled type="text" value={loc?.name} className="mt-2 w-full"/>
                        <Input disabled type="text" value={loc?.state} className="mt-2 w-full"/>
                        <Input disabled type="text" value={loc?.country} className="mt-2 w-full"/>
                    </div>
                ))}
                </div>
                <div className="mt-6">
                    <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Number of Vacancies
                    </h4>
                    <Input disabled type="text" value={posting.numberOfVacancies} className="mt-2 w-full"/>
                </div>
                <div className="mt-6">
                    <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Notice Period
                    </h4>
                    <Input disabled type="text" value={posting.notice_period} className="mt-2 w-full"/>
                </div>
                <div className="mt-6">
                    <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Salary Range
                    </h4>
                    <Input disabled type="text" value={posting.salaryRange.min} className="mt-2 w-full"/>
                    <Input disabled type="text" value={posting.salaryRange.max} className="mt-2 w-full"/>
                </div>
                <div className="mt-6">
                    <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Department
                    </h4>
                    <Input disabled type="text" value={posting.department} className="mt-2 w-full"/>
                </div>
                <div className="mt-6">
                    <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Domain
                    </h4>
                    <Input disabled type="text" value={posting.domain} className="mt-2 w-full"/>
                </div>
                <div className="mt-6">
                    <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Skills
                    </h4>
                    {posting.skills.map((skill, index) => (
                        <Input key={index} disabled type="text" value={skill} className="mt-2 w-full"/>
                    ))}
                </div>
                <div className="mt-6">
                    <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Evaluation
                    </h4>
                    {posting.evaluation.map((evalu, index) => (
                        <Input key={index} disabled type="text" value={evalu.question} className="mt-2 w-full"/>
                    ))}
                </div>
                </TabsContent>
                <TabsContent value="Applications">
                     <div className="mt-6 mx-8 grid grid-cols-3 gap-6 overflow-y-auto" style={{ maxHeight: '400px' }}>
                        {applications.map((application,index)=>(
                          <ApplicantCard key={index} application={application}/>
                        ))}
                     </div>
                </TabsContent>
            </Tabs>
        </div>
    </div>
  )
}

export default Posting;