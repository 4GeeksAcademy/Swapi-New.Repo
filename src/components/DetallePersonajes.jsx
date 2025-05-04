import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetPersonajeByUid } from '../services/fetch';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { toggleFavorito } from '../hooks/actions.js';

function DetallePersonajes() {
  const { uid } = useParams();
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const { personajeDetalle, loadingDetalle, errorDetalle, favoritos } = store;

  useEffect(() => {
    if (uid && uid !== "undefined") {
      GetPersonajeByUid(dispatch, uid);
    }
  }, [uid, dispatch]);

  if (loadingDetalle) return <div className="loading">Loading character details...</div>;
  if (errorDetalle) return <div className="error">Error: {errorDetalle.message}</div>;
  if (!personajeDetalle) return <div>No character data available</div>;

  const characterData = personajeDetalle.result?.properties || {};
  
  const esFavorito = favoritos.some(fav => 
    fav.uid === personajeDetalle.uid && 
    fav.type === 'personaje' &&
    fav.name === characterData.name
  );

  const handleToggleFavorito = () => {
    dispatch(toggleFavorito({
      uid: personajeDetalle.uid,
      type: 'personaje',
      name: characterData.name,
      ...characterData
    }));
  };

  return (
    <div className="character-detail">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back to list
      </button>

      <h1>{characterData.name || 'Unknown Character'}</h1>

      <button 
        onClick={handleToggleFavorito}
        className={`favorite-btn ${esFavorito ? 'active' : ''}`}
        aria-label={esFavorito ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      >
        {esFavorito ? '❤️' : '♡'}
      </button>

      <div className="character-properties">
        <p><strong>Height:</strong> {characterData.height} cm</p>
        <p><strong>Mass:</strong> {characterData.mass} kg</p>
        <p><strong>Hair Color:</strong> {characterData.hair_color}</p>
        <p><strong>Skin Color:</strong> {characterData.skin_color}</p>
        <p><strong>Eye Color:</strong> {characterData.eye_color}</p>
        <p><strong>Birth Year:</strong> {characterData.birth_year}</p>
        <p><strong>Gender:</strong> {characterData.gender}</p>
      </div>
    </div>
  );
}

export default DetallePersonajes;