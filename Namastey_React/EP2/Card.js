import React , {useEffect} from 'react'
import { swiggy_api_URL } from './config';

const Card = (props) => {
 const {image , name ,gender ,status , type , species, origin , location} = props?.character; 
 
 useEffect(() => {
   apiCall(swiggy_api_URL);
 }, [])
 
 
 
    
 
  return (
    <>
    <div className="card-item">
    <img alt={image} src={image}/>    
        
        <div className="data">
        <span className='name'>{name}</span>
        <span>{gender}</span>
        
            {status == "Alive" ? <span className='green'> Status: {status}</span> : <span className='red'> Status: {status}</span>} {species}
            { origin.name === "unknown" ? (<span>{location.name}</span>) : (<span>{origin.name}</span>)}
            <span>{type}
            </span>
            </div>
    </div>
    </>
  )
}

export default Card
