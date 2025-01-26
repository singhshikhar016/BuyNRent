import { useContext, useEffect, useState } from "react";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function BookingWidget({place}){
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuest,setMaxGuest] = useState(1);
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [redirect,setRedirect] = useState('');
    const {user} = useContext(UserContext);

    useEffect(()=>{
        if(user)
        {
            setName(user.name);
        }
    },[user]);

    let numberOfNight = 0;
    if(checkIn && checkOut)
    {
        // using model date-fns
        numberOfNight = differenceInCalendarDays(new Date(checkOut),new Date(checkIn));
    }

   async function bookThisPlace(){
        
       const response = await axios.post('/bookings',
        {checkIn,checkOut,maxGuest,name,phone,
        place:place._id,
    price:numberOfNight*place.price,});

    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
    }
    if(redirect)
    {
       return <Navigate to={redirect}/>
    }
    return(
        <div className="bg-white shadow p-4 rounded-2xl">
        <div className="text-2xl text-center">
            Price: Rs.{place.price} /per night
        </div>
        <div className="border rounded-2xl mt-4">
            <div className="flex">
            <div className="  py-3 px-4">
            <label >Check in :</label>
            <input type="date"  value={checkIn} onChange={ev=>setCheckIn(ev.target.value)} />
        </div>
        <div className="  py-3 px-4 border-l ">
            <label >Check out:</label>
            <input type="date"  value={checkOut} onChange={ev=>setCheckOut(ev.target.value)}/>
        </div>
            </div>
            <div className="py-3 px-4 border-t">
            <label htmlFor=""> Number of Guest :</label>
              <input type="number" name="" id="" value={maxGuest}  onChange={ev=>setMaxGuest(ev.target.value)}/>
        </div>
        {numberOfNight>0 && (
            <div className="py-3 px-4 border-t">
            <label htmlFor=""> Your Name :</label>
              <input type="text" name="" id="" value={name}  onChange={ev=>setName(ev.target.value)}/>
              <label htmlFor=""> Phone Number :</label>
              <input type="tel" name="" id="" value={phone}  onChange={ev=>setPhone(ev.target.value)}/>
        </div>
        
        )}
        </div>
        
        <button onClick={bookThisPlace} className=" mt-4 primary" >Book this place
        {numberOfNight>0 && (
            <span> Rs.{numberOfNight*place.price}</span>
        )}
        </button>
        </div>
    );
}