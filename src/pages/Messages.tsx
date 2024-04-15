import { useState } from "react"
import { useNavigate } from "react-router-dom";

const Messages = () => {

  const navigate = useNavigate();

  const [chatOpend, setChatOpened ] = useState(false);
  const [chatID , setChatId] = useState("");

  return (
    <div className="px-4 py-4 w-full " style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
            Messages
          </h1>
        </div>
        <div className="mt-6 w-full bg-gray-100 rounded-md h-[80vh]">
          <div className="flex flex-row">
            <div className="w-64 py-2 bg-white rounded-l-md h-[80vh]">
              <div onClick={()=>{ setChatOpened(true); setChatId("123") }} className="h-16 ring-1 ring-gray-200 rounded-md flex flex-col justify-center">
                Contact 
              </div>
              <div className="h-16 ring-1 ring-gray-200 rounded-md flex flex-col justify-center">
                Contact 
              </div>
              <div className="h-16 ring-1 ring-gray-200 rounded-md flex flex-col justify-center">
                Contact 
              </div>
              <div className="h-16 ring-1 ring-gray-200 rounded-md flex flex-col justify-center">
                Contact 
              </div>
              <div className="h-16 ring-1 ring-gray-200 rounded-md flex flex-col justify-center">
                Contact 
              </div>
            </div>
            <div className="w-full">
              {chatOpend ? (
                <div>
                  {chatID}
                </div>
              ): (
                <div className="flex flex-row justify-center">
                  <div className="flex flex-col justify-center min-h-[80vh] font-semibold ">
                    No Open Conversations
                  </div>
                </div>
              )}
              
            </div>
          </div>
        </div>
    </div>
  )
}

export default Messages
