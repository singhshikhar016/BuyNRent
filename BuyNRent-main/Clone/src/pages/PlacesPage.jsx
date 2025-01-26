
import { Link} from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";


export default function PlacesPage(){
   const [places,setPlaces] = useState([]);
    useEffect(()=>{
    axios.get('/user-places').then(({data})=>{
      setPlaces(data);
    });
   },[]);
    return(
        <div>
          <AccountNav/>
           

<div className="text-center">
<Link className="bg-primary inline-flex gap-1 text-white px-6 py-2 rounded-full " to = {'/account/places/new'}>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

    Add new places</Link>
</div>
           <div className="mt-4 ">
            {places.length>0 && places.map(places=>(
                <Link key={places} to ={'/account/places/'+places._id} className="flex gap-4 cursor-pointer bg-gray-200 rounded-2xl p-4">
                   <div  className="flex w-32 h-32 bg-gray-300  shrink-0" >
                      
                      <PlaceImg places={places}/>
                   </div>
                   <div className="grow-0 shrink">
                       <h2 className="text-xl">{places.title}</h2>
                       <p className="text-sm mt-2">{places.description}</p>
                   </div>
                    
                </Link>
            ))}
           </div>
            
           
        </div>
    )
}