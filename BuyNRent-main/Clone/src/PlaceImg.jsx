export default function PlaceImg({places,index=0,className=null}){
    if(!places.photos?.length)
    {
        return "";
    }
    if(!className)
    {
        className='object-cover';
    }
    return(
        <div>
          
            <img className={className} src={'http://localhost:4000/uploads/'+places.photos[index]} alt="" />
                      
        </div>
    );
}