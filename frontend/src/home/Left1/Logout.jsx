import { TbLogout2 } from "react-icons/tb";

export default function Logout() {
    return (
      <div className='w-[4%] bg-slate-900 text-white flex flex-col justify-end'>
        Logout
        <div className="p-3 align-bottom"></div>
            <button>
            <TbLogout2 />
            </button>
        </div>
    )
  }
  