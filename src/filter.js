import React, { useState } from 'react'

const Filter = (props) => {
 
  return (
      <div>
          filter: <input value={props.newFilter} onChange={props.handleFilteredChange}/>
      </div>
  )
}

export default Filter