import Users from "./Users"
import useGetAllUsers from "../../context/useGetAllUsers"

function User() {
    const [allUsers] = useGetAllUsers();
    console.log(allUsers,'allUsers');
    return (
        <div 
            style={{
                height: "calc(100vh - 200px)",
                ovzerflowY: "auto",
                overflowX: "hidden",
                scrollbarWidth: "none", /* Firefox */
                msOverflowStyle: "none", /* IE and Edge */
            }} 
            className="py-2 px-4 flex-snigdha hide-scrollbar"
        >
            {allUsers.map((user, index) => (
                <Users key={index} user={user} />
            ))}
        </div>
    )
}

export default User