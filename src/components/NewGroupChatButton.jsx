import React, {useState} from 'react'
import {docRef} from 'firebase/firestore'
import Cookies from 'universal-cookie';

const cookies = new Cookies()

export const NewGroupChatButton = () =>{ 
    // Variables & Constants
    const userEmail = cookies.get("user-email")

    // Hooks
    const [screenIsOpen, setScreenIsOpen] = useState(false)
    const [email, setEmail] = useState('');
    const [groupChatName, setGroupChatName] = useState('')
    const [members, setMembers] = useState([userEmail]); 

    const toggleNewGCScreen = () => {
        setMembers([userEmail])
        setEmail('')
        setGroupChatName('')
        setScreenIsOpen(!screenIsOpen)
    }

    const addNewMember = (event) => {
        event.preventDefault()
        if (email){
            setMembers([...members, email]);
            setEmail('')
        }
    }

    const createGroupChat = async () => {
        setGroupChatName('')
        setEmail('')
        setMembers([userEmail])
        if (!groupName || members.length === 0) {
            alert("Group name and at least one member are required!");
            return;
        }
        if (groupName && members.length > 1){
            try {
            const docRef = await addDoc(collection(db, "groupChats"), {
                name: groupName,
                members: members
            });
        
            alert(`Group Chat "${groupName}" created!`);
        
            } catch (e) {
            console.error("Error creating document: ", e);
            }
        }
    }

    return(
        <>
            <div className='flex items-center justify-between w-full'>
                <div class="flex-grow pl-1 md:pl-2">
                    <h1 className='invisible sm:visible sm:text-md md:text-xl font-bold'>Group Chats</h1>
                </div>
                <button onClick={toggleNewGCScreen} className="p-1 m-2 rounded-md flex justify-center items-center bg-slate-200 hover:bg-slate-300 aspect-square text-xl">
                    📝
                </button>
            </div>

            {screenIsOpen ? 
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded shadow-lg w-11/12 h-5/6">
                    <div className='flex items-center justify-between w-full'>
                        <div class="flex-grow text-center">
                            <h1 className='text-xl font-bold'>New Group Chat</h1>
                        </div>
                        <button
                            type="button"
                            onClick={toggleNewGCScreen}
                            className="px-2 py-1 bg-red-500 text-white text-center rounded hover:bg-red-600">
                            X
                        </button>
                    </div>
                    <div className="flex justify-center mt-4">
                        <input className="p-2 w-full rounded-lg border-2 border-gray-200" 
                            placeholder="Group Chat Name:"
                            value={groupChatName}
                            onChange={(e) => setGroupChatName(e.target.value)}>
                        </input>
                    </div>
                    
                    <div className="h-1/2 overflow-y-auto bg-gray-100 p-4 rounded-lg mt-1">
                        <ul className="mb-4">
                            {members.map((member, index) => (
                                <li key={index} className="p-2 border-b">
                                {member}
                                </li>
                            ))}
                        </ul>
                        <form onSubmit={addNewMember} className="p-2 m-2 flex w-full">
                            <input className="p-2 w-full rounded-lg border-2 border-gray-200" 
                                placeholder="Email:"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}>
                            </input>
                            <button type="submit" className="px-2 m-2 bg-neutral-200 rounded-lg">Add</button>
                        </form>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button className='m-1 p-2 text-xl rounded-md bg-slate-200 hover:bg-slate-300'>
                            Create Group Chat
                        </button>
                    </div>
                </div>
            </div> : <></>}
        </>
    )
}