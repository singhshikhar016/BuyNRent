// import Header from "../Header";
import axios from 'axios';
import {useContext, useState } from 'react'
import {Link, Navigate} from 'react-router-dom';
import { UserContext } from '../UserContext.jsx';
export default function LoginPage(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [redirect,setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);
    
    async function handelLoginSubmit(ev)
    {   
        ev.preventDefault();
        try{
           const userInfo = await axios.post('/login',{email,password});
           setUser(userInfo.data);  
           alert("Login successfull");
             setRedirect(true);
        }catch(e)
        {
            alert("Please try again Later ");
        }
    }
    
    if(redirect)
    {
        return <Navigate to={'/'}/>
    }
    return(
              
        <div className="mt-4 grow flex items-center justify-around">
            <div className ="mb-64">
            <h1 className="text-4xl text-center mb-4 ">Login</h1>
            <form className="max-w-md mx-auto" onSubmit={handelLoginSubmit}>
            <input type="email"  placeholder="yourEmail" value={email} onChange={ev => setEmail(ev.target.value)} />
            <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)}/>
            <button type="submit" className="primary">Login</button>
             <div className ="text-center py-2 text-gray-500">
                Dont have an account yet ? <Link className="underline text-black"to={"/register"}>Register Now</Link>
             </div>
           </form>
            </div>
        </div>
        
        
    );
}