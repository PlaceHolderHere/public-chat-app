// React
import { useState } from 'react';

// Components
import {ChatRoom} from './components/ChatRoom.jsx'
import { Auth } from './components/auth.jsx'
import {GroupChatsSideBar} from './components/GroupChatsSideBar.jsx'

// Firebase 
import { signOut } from 'firebase/auth';
import {auth} from './firebase-config.js'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

function App() {
  const [groupChatId, setGroupChatId] = useState("NONE")
  const [authenticated, setAuthenticated] = useState(cookies.get('auth-token'))

  if (!authenticated){
    return (
      <div className="flex justify-center items-center h-screen">
        <header className="App-header">
          
        </header>
        <section className='flex justify-center text-center'>
          <Auth setAuthenticated={setAuthenticated}/>
        </section>
      </div>
    );
  }

  const signOutUser = async () => {
    await signOut(auth)
    cookies.remove("auth-token")
    cookies.remove("user-email")
    cookies.remove("user-photo")
    setAuthenticated(false)
  }

  return(
    <div className="flex px-4 py-1 bg-slate-200 w-screen h-screen rounded-lg">
      <div className='w-1/4 m-2 bg-white rounded-lg'>
        <GroupChatsSideBar groupChatId={groupChatId} setGroupChatId={setGroupChatId}/>
      </div>
      <div className='flex flex-col w-3/4 px-2 py-1 m-2 bg-white rounded-lg'>
        <button onClick={signOutUser} className='bg-slate-100 hover:bg-slate-300 p-2 justify-center'>Sign Out</button>
        <ChatRoom groupChatId={groupChatId} setGroupChatId={setGroupChatId}/>
      </div>
    </div>
  )
} 

export default App;