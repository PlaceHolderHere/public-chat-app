export const ChatMessage = (props) =>{
    const messageValue = props.message
    const user = props.user
    const photo = props.photo
    const currentUser = props.currentUser

    if (currentUser == user){
        return(
        <div className="flex justify-end ml-auto items-center m-4 max-w-lg">
            <p className="py-2 px-4 m-1 text-base bg-blue-100 rounded-lg whitespace-normal overflow-auto break-words">
                {messageValue}
            </p>
            <img alt="current-user-photo" src={photo} className="w-10 h-10 object-cover rounded-full"/>
        </div>
    )}

    return(
        <div className="p-4">
            <h1 className="text-md break-words">{user}</h1>
            <div className="flex items-center max-w-lg">
                <img alt="user-photo" src={photo} className="w-10 h-10 object-cover rounded-full"/>
                <p className="py-2 px-4 m-1 text-base bg-neutral-100 rounded-lg whitespace-normal overflow-auto break-words">
                    {messageValue}
                </p>
            </div>
        </div>
    )
}