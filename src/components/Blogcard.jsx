import React from 'react'

const Blogcard = ({item}) => {
  return (
    <div>
        <div key={item._id}> 
        
        <h2>{item.title}</h2>
        <p>{item.content}</p>
      </div>
    </div>
  )
}

export default Blogcard
