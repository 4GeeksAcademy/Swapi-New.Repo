import React, { useEffect } from 'react'
import { GetNaves } from '../services/fetch'
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


function Naves () {

 const { store, dispatch } = useGlobalReducer();
 const { naves } = store

  useEffect(() => {
    GetNaves(dispatch) 
  }, [dispatch])
  
  console.log(naves); 

  return (
    <div>Planetas</div>
  )
}

export default Naves