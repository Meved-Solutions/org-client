// import { User , UserI } from "@/atom";
import { Input } from "@/components/ui/input";
import { useRecoilValue } from "recoil";

const Profile = () => {
  // const user = useRecoilValue<UserI | null>(User);

  // if (!user) {
  //   return <div>Loading...</div>;
  // }

  // const date = new Date(user.createdAt);
  // const formattedDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;

  return (
    <div className="px-4 py-4 " style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
          Org Profile
        </h1>
      </div>
      <div className="pt-16 px-4 flex flex-row gap-4">
        <div>
          <img src="https://avatars.githubusercontent.com/u/92905896?v=4" className="w-48 h-48 rounded-full"/>
        </div>
        <div className="font-semibold flex flex-col">
             <div className="flex flex-row gap-10">
                  <label>
                    Organization Name:
                    <Input disabled className="my-2 w-80" value="name" />
                  </label>
                  <label>
                    Organization Email:
                    <Input disabled  className="my-2 w-80"  value="name"/>
                  </label>
             </div>
             <div className="flex flex-row gap-10">
                  <label>
                    Organization Since:
                    <Input disabled className="my-2 w-80"  value="name"/>
                  </label>
                  <label>
                    Organization Description:
                    <Input disabled  className="my-2 w-80" value="name" />
                  </label>
             </div>
             <div className="flex flex-row gap-10">
                  <label>
                    Reason For Joining:
                    <Input disabled className="my-2 w-80" value="name"/>
                  </label>
                  <label>
                    Approved By Admin:
                    <Input disabled  className="my-2 w-80" value="name" />
                  </label>
             </div>
        </div>
      </div>
    </div>
  )
}

export default Profile