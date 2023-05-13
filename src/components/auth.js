import react,{ useState } from 'react';
import {auth, googleProvider} from '../config/firebase';
import{createUserWithEmailAndPassword, signInWithPopup,signOut }from 'firebase/auth';

const Auth = () => {

  const [email, setEmail] =useState();
  const [password, setPassword] =useState();
  console.log(auth?.currentUser?.email)

  const signIn =async ()=>{
    try{
      await  createUserWithEmailAndPassword(auth, email,password)
    } catch(err){
      console.error(err);
    }
};
const signInWithGoogle = async()=>{
  try{
      await signInWithPopup(auth,googleProvider)
  }catch(err){
    console.error(err);
  }

}
const logOut = async()=>{
  try{
    await signOut(auth);
  } catch(err){
    console.error(err)
  }
}
  return (
    <div>
        <input placeholder="email..." 
        onChange={(e)=>{setEmail(e.target.value)}}/>
        <input type='password' placeholder="password..." 
        onChange={(e)=>{setPassword(e.target.value)}} />
        <button onClick={signIn}> Sign In</button>

        <button onClick={signInWithGoogle}> Sign In with google</button>
        <button onClick={logOut} > Logout</button>
    </div>
  )
}

export default Auth;