import { IoMdSend } from "react-icons/io"
function Type() {
  return (
    <div className="flex space-x-3 items-center p-4 bg-gray-800 rounded-lg">
        <input type="text" placeholder="Type here" 
        className="input input-bordered w-full bg-gray-700 outline-none border-1px 
        border-gray-700 rounded-xl bg-slate-900 items-center px-3 py-2" />
        <button className="btn btn-primary">
          <IoMdSend className="text-2xl" />
        </button>
    </div>
  )
}

export default Type 