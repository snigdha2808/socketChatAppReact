function ChatUser() {
  return (
    <div className="flex pt-1 h-[12vh] space-x-4 bg-gray-900 hover:bg-gray-600 cursor-pointer">
        <div className="flex space-x-4 px-8 py-7 hover:bg-gray-600 rounded-lg cursor-pointer">
                <div className="avatar avatar-online">
                    <div className="w-14 rounded-full">
                        <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="font-bold">Snigdha</h1>
                    <span className="text-sx">snigdha@gmail.com</span>
                </div>
            </div>
    </div>
  )
}

export default ChatUser