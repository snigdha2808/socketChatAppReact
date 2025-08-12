import Search from "./Search";
import User from "./User";

export default function Left() {
    return (
        <div className='w-[30%] bg-black text-gray-300'>
            <h1 className="font-bold text-3xl p-4">Chat</h1>
            <Search />
            <hr className="border-gray-700" />
            <User />
        </div>
    )
}
