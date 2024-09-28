export const GroupChatButton = (props) =>{
    const groupChatName = props.name
    const id = props.id
    const setGroupChatId =  props.setGroupChatId

    const updateGroupChatId = () => {
        setGroupChatId(id)
    }

    return(
        <button onClick={updateGroupChatId} className="p-4 flex items-center bg-slate-100 m-1 rounded-md w-11/12 hover:bg-slate-200">
            <h1 className="text-md break-words whitespace-normal overflow-auto">{groupChatName}</h1>
        </button>
    )
}