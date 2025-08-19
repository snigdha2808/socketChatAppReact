import Message from "./Message"

function Messages() {
    return (
        <div 
            style={{
                height: "calc(100vh - 300px)",
                overflowY: "auto",
                overflowX: "hidden",
                scrollbarWidth: "none", /* Firefox */
                msOverflowStyle: "none", /* IE and Edge */
            }} 
            className="hide-scrollbar"
        >
            <Message />
            <Message />
            <Message />
            <Message />
            <Message /> 
            <Message />
            <Message />
            <Message />
            <Message />
        </div>
    )
}

export default Messages
