import { useEffect, useState, useRef } from "react";
import {addDoc, collection, onSnapshot, serverTimestamp, query, orderBy} from 'firebase/firestore'
import { auth, database } from "../firebase-config";
import { ChatMessage } from "./ChatMessage";
import Cookies from "universal-cookie";

const cookies = new Cookies()

export const ChatRoom = (props) => {
    // Group Chat id
    const groupChatId = props.groupChatId  

    // Hooks
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([])
    const scrollRef = useRef(null)

    // Cookies Info
    const userEmail = cookies.get("user-email")
    const userPhoto = cookies.get("user-photo")

    // Firestore References
    const [messagesRef, setMessagesRef] = useState(collection(database, 'group-chats', groupChatId, 'messages'))

    useEffect(() => {
        // This code runs whenever myState changes
        console.log(groupChatId)
        setMessagesRef(collection(database, 'group-chats', groupChatId, 'messages'))
      }, [groupChatId]);

    useEffect(() => {
        const queryMessages = query(messagesRef, orderBy("whenCreated"))

        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            scrollRef.current?.scrollIntoView()
            let messages = [];
            snapshot.forEach((doc) =>{
                messages.push({...doc.data(), id: doc.id})
            })
            setMessages(messages)
        })
        return () => unsubscribe()
    }, [messagesRef])

    const handleSubmit = async (event) => {
        setNewMessage("");
        event.preventDefault();
        if (newMessage.replaceAll(" ", "") === "") return;
        await addDoc(messagesRef, {
            text: newMessage,
            whenCreated: serverTimestamp(),
            user: auth.currentUser.displayName,
            userEmail: userEmail,
            userPhoto: userPhoto,
        })    
      };

    if (groupChatId !== "NONE"){
        return (
            <>
                <div className="chat overflow-auto bg-white">                
                    {messages.map((message) => (
                        <ChatMessage key={message.whenCreated} message={message.text} user={message.user} photo={message.userPhoto} currentUser={auth.currentUser.displayName}/>
                    ))}
                    <div ref={scrollRef}></div>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className="p-2 m-2 flex w-full">
                        <input className="p-2 w-full rounded-lg border-2 border-gray-200" placeholder="Send Message..." onChange={(e) => setNewMessage(e.target.value)} value={newMessage}></input>
                        <button type="submit" className="px-2 m-2 bg-neutral-200 rounded-lg">Send</button>
                    </form>
                </div>
            </>
        )
    }
}   