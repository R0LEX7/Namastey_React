import React from 'react'

const Card = (props) => {
    // console.log(props.character);
 const {image , name ,gender ,status , type , species, origin , location} = props.character;  
    
  return (
    <>
    <div className="card-item">
    <img alt={image} src={image}/>    
        <h2>{name}</h2>
        <div className="data"><p>{gender}</p>
        <p>Status: 
            {status == "Alive" ? <span className='green'> {status}</span> : <span className='red'> {status}</span>} {species}</p>
            <p>{ origin.name === "unknown" ? (<p>{location.name}</p>) : (<p>{location.name}</p>)}</p>
            <p>{type}</p></div>
    </div>
    </>
  )
}

export default Card