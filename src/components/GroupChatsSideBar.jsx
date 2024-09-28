import {collection, getDocs, query, where} from 'firebase/firestore'
import { useEffect, useState } from 'react';
import {database} from "../firebase-config";
import {GroupChatButton} from "./GroupChatButton"
import Cookies from "universal-cookie";

export const GroupChatsSideBar = (props) => {
    const groupChatId = props.groupChatId
    const setGroupChatId = props.setGroupChatId 

    // Firestore References
    const [groupChats, setGroupChats] = useState([]);
    
    // Cookies
    const cookies = new Cookies()
    const userEmail = cookies.get("user-email")

    useEffect(() => {
        // Async Function to get groupchats
        const fetchGroupChats = async () => {
            // Firestore Querry
            const groupChatsQuery = query(collection(database, 'group-chats'), where("members", "array-contains", userEmail))
            const querySnapshot = await getDocs(groupChatsQuery)
            
            let chats = []
            querySnapshot.forEach((doc) => {
                chats.push({ id: doc.id, name: doc.name, ...doc.data() });
            });

            setGroupChats(chats)
        }
        fetchGroupChats();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <>
            <div className="flex flex-col items-center chat overflow-auto bg-white pt-2">                
                {groupChats.map((groupchat) => (
                    <GroupChatButton key={groupchat.id} name={groupchat.name} id={groupchat.id} setGroupChatId={setGroupChatId}/>
                ))}
            </div>
        </>
    )
}   