import React  from 'react'
import conf from '../conf';


const Image = ({url}) => {
    
  return (
    <div className="img">
        <img src={conf.apiUrl+`/images/${url}`} alt=''></img>
    </div>
  )
}

export default Image
