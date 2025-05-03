import React, { useEffect } from 'react'
import { GetPlanetas } from '../services/fetch' 
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

function Planetas() {

  const { store, dispatch } = useGlobalReducer();
 const { planetas } = store

  useEffect(() => {
    GetPlanetas(dispatch) 
  }, [dispatch])
  
  console.log(planetas); 

  return (
    <div>Planetas</div>
  )
}

export default Planetas