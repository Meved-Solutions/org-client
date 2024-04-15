import { Button } from "@/components/ui/button"

const Postings = () => {
  return (
    <div className="px-4 py-4 w-full " style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
            Postings
          </h1>
        </div>
        <div className="flex flex-row gap-4">
          <Button>
            Filer Postings
          </Button>
          <Button>
            Create Postings
          </Button>
        </div>
      </div>
      <div className="mt-6 mx-8 grid grid-cols-3 gap-6 overflow-y-auto" style={{ maxHeight: '400px' }}>
        <div>
          Card
        </div>
      </div>
    </div>
  )
}

export default Postings
