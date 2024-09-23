import React, { useState } from 'react'
import "../styles/List.scss"

const TripList = () => {
    const [ loading, setLoading ] = useState(true)


  return loading ? <Loader/> : (
    <div className=''>
      
    </div>
  )
}

export default TripList
