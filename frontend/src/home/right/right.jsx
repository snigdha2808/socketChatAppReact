import ChatUser from "./ChatUser"
import Messages from "./Messages"
import Type from "./Type"
export default function Right() {
  return (
    <div className='w-[70%] border-white bg-slate-900 text-white p-4 flex flex-col' style={{height: "100vh"}}>
      <div className="flex-1 min-h-0">
        <ChatUser />
        <div className="flex-1 overflow-y-auto min-h-0">
          <Messages />
        </div>
      </div>
      <Type />
    </div>
  )
}
