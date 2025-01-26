import {useContext, useState} from 'react'
import { UserContext } from '../UserContext';
import { Navigate,Link, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import AccountNav from '../AccountNav';


export default function AccountPage() {
    const [redirect,setRedirect] = useState(null);
    const {user,ready,setUser} = useContext(UserContext);
    let {subpage}=useParams();
    if(subpage===undefined)
    {
        subpage = 'profile'
    }
    async function Logout()
    {
       await axios.post('/logout');
       setRedirect('/');
       setUser(null);
    }
    if(!ready)
    {
        return 'Loading...';
    }
    if(ready && !user && !redirect)
    {
        return <Navigate to ={'/login'}/>
    }

  
    
    if(redirect)
    {
       return <Navigate to ={redirect}/>
    }

    return(
        <div>
           <AccountNav/>
            {/* it means if-then */}
           {subpage=='profile' && (
           
                <div className='text-center max-w-lg mx-auto'>
                   Logged in as {user.name}({user.email})<br/>
                   <button onClick={Logout} className='primary max-w-sm mt-2' >logout</button>
                </div>
            
           )}
           {subpage==='places' && (
             <PlacesPage/>
           )}
            
        </div>
    );
}