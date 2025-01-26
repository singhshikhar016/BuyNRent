import { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'
export default function RegisterPage(){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setpassword] = useState('');
    
    async function registeruser(e){
        e.preventDefault();
        try{
           
           await axios.post('/register',{
                name,
                email,
                password,
        }); 
     alert("Registration Successfull");
     }catch(e){
         alert("Registration Failed");
     }
    }
    return(
        
        <div className="mt-4 grow flex items-center justify-around">
            <div className ="mb-64">
            <h1 className="text-4xl text-center mb-4 ">Register</h1>
            <form className="max-w-md mx-auto" onSubmit={registeruser}>
                <input type="text" placeholder='Name' value ={name} onChange={e=> setName(e.target.value)} />
            <input type="email"  placeholder="yourEmail" value ={email} onChange={e=> setEmail(e.target.value)} />
            <input type="password" placeholder="password" value ={password} onChange={e=> setpassword(e.target.value)} />
            <button type="submit" className="primary">Register</button>
             <div className ="text-center py-2 text-gray-500">
               Already a member ? <Link className="underline text-black"to={"/login"}>Login</Link>
             </div>
           </form>
            </div>
        </div>
        
        
    );
}