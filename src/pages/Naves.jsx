import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { GetNaves } from '../services/fetch'
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


function Naves () {
 const { store, dispatch } = useGlobalReducer();
 const { naves, loading, error } = store;
 const navigate = useNavigate();

  useEffect(() => {
    GetNaves(dispatch) 
  }, [dispatch])
  
  const handleClick = (nave) => {
    if (!nave.uid) {
      console.error("No UID found in starship", nave);
      return;
    }
    navigate(`/naves/${nave.uid}`);
  };

  if (loading) return <div>Loading Your Transport...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!naves || naves.length === 0) return <div>No Transport Aviable</div>

  return (
    <div>
      <h1>Star Wars Starships</h1>
      <ul>
        {naves.map((nave)=>(
          <li
            key={nave.uid}
            onClick={() => handleClick(nave)}
            style={{
              cursor: 'pointer', margin: '10px 0'}}
              >
                {nave.name || nave.properties?.name || 'Unknown Starship'}
              </li>
        ))}
      </ul>
    </div>
  )
}

export default Naves