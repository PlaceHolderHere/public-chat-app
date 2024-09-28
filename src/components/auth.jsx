import {auth, authProvider} from '../firebase-config.js';
import {signInWithPopup} from 'firebase/auth';

import Cookies from 'universal-cookie'
const cookies = new Cookies()

export const Auth = (props) => {
    const {setAuthenticated} = props
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, authProvider);
            setAuthenticated(true)
            cookies.set("auth-token", result.user.refreshToken)
            cookies.set("user-email", result.user.email)
            cookies.set("user-photo", result.user.photoURL)            
        } catch(err){
            console.log(err)
        }
    }

    return(
        <div>
            <h1 className='text-2xl font-bold'>Sign in with Google to Continue</h1>
            <button onClick={signInWithGoogle} className="p-3 rounded-md shadow-xl bg-gray-800 m-2 text-white text-xl hover:bg-gray-900">Sign in With Google</button>
        </div>
    )
}
