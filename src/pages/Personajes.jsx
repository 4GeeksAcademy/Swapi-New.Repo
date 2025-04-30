import React, { useEffect } from 'react'
import { GetPersonajes } from '../services/fetch'
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

function Personajes() {

    const { store, dispatch } = useGlobalReducer ();

 useEffect (() => {
    GetPersonajes (dispatch) 
 } , [dispatch]) 
 console.log(store.personajes);
 

    return (
    <div>Personajes</div>
  )
}

export default Personajes 

