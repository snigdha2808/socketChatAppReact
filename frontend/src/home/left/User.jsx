import Users from "./Users"

function User() {
    return (
        <div 
            style={{
                height: "calc(100vh - 200px)",
                overflowY: "auto",
                overflowX: "hidden",
                scrollbarWidth: "none", /* Firefox */
                msOverflowStyle: "none", /* IE and Edge */
            }} 
            className="py-2 px-4 flex-snigdha hide-scrollbar"
        >
            <Users />
            <Users />
            <Users />
            <Users />
            <Users />
            <Users />
            <Users />
            <Users />
            <Users />
            <Users />
            <Users />
            <Users />
            <Users />
        </div>
    )
}

export default User