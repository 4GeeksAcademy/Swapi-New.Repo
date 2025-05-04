import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetPersonajes } from '../services/fetch';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

function Personajes() {
  const { store, dispatch } = useGlobalReducer();
  const { personajes, loading, error } = store;
  const navigate = useNavigate();

  useEffect(() => {
    GetPersonajes(dispatch);
  }, [dispatch]);

  const handleClick = (personaje) => {
    if (!personaje.uid) {
      console.error("No UID found in character:", personaje);
      return;
    }
    navigate(`/personajes/${personaje.uid}`);
  };

  if (loading) return <div>Loading characters...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!personajes || personajes.length === 0) return <div>No Characters Available</div>;

  return (
    <div>
      <h1>Star Wars Characters</h1>
      <ul>
        {personajes.map((personaje) => (
          <li 
            key={personaje.uid}
            onClick={() => handleClick(personaje)}
            style={{ cursor: 'pointer', margin: '10px 0' }}
          >
            {personaje.name || personaje.properties?.name || 'Unknown Character'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Personajes;
