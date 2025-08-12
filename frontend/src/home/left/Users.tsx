import React from 'react'

function Users() {
  return (
    <div>
        <div className="flex gap-4 p-4 hover:bg-gray-600 rounded-lg cursor-pointer">
                <div className="avatar avatar-online">
                    <div className="w-14 rounded-full">
                        <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="font-bold">Snigdha</h1>
                    <span className="text-gray-500">snigdha@gmail.com</span>
                </div>
            </div>
    </div>
  )
}

export default Users