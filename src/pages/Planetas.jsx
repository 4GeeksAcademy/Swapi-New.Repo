import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { GetPlanetas } from '../services/fetch'
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

function Planetas() {

  const { store, dispatch } = useGlobalReducer();
  const { planetas, loading, error } = store;
  const navigate = useNavigate();

  useEffect(() => {
    GetPlanetas(dispatch)
  }, [dispatch])

  const handleClick = (planeta) => {
    if (!planeta.uid) {
      console.error("No UID found in planet", planeta);
      return;
  }
  navigate(`/planetas/${planeta.uid}`);
};

if (loading) return <div>Loading planets...</div>;
if (error) return <div>Error: {error.message}</div>;
if (!planetas || planetas.length === 0) return <div>The Galaxy Has Been Destroyed!</div>

return(
  <div>
    <h1>Star Wars Planets</h1>
    <ul>
      {planetas.map((planeta) => (
        <li
          key={planeta.uid}
          onClick={() => handleClick(planeta)}
          style={{ cursor:'pointer', margin:'10px 0'}}
          >
            {planeta.name || planeta.properties?.name || 'Unknown Planet'}
        </li>
      ))}
    </ul>
  </div>
);
}

export default Planetas