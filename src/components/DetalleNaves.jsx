import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetNaveByUid } from '../services/fetch';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { toggleFavorito } from '../hooks/actions.js';

function DetalleNaves() {
  const { uid } = useParams();
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const { naveDetalle, loadingDetalleNave, errorDetalleNave, favoritos } = store;

  useEffect(() => {
    if (uid && uid !== "undefined") {
      GetNaveByUid(dispatch, uid);
    }
  }, [uid, dispatch]);

  if (loadingDetalleNave) return <div>Loading starship details...</div>;
  if (errorDetalleNave) return <div>Error: {errorDetalleNave.message}</div>;
  if (!naveDetalle || !naveDetalle.result) return <div>No starship data available</div>;

  const starshipData = naveDetalle.result.properties || {};
  
  const esFavorito = favoritos.some(fav => {
    const match = fav.uid === naveDetalle.uid && 
                 fav.type === 'nave' &&
                 fav.name === starshipData.name;
    console.log('Checking favorite:', { fav, match });
    return match;
  });

  const handleToggleFavorito = () => {    
    dispatch(toggleFavorito({
      uid: naveDetalle.uid,
      type: 'nave',
      name: starshipData.name,
      ...starshipData
    }));
  };

  return (
    <div className="starship-detail">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back to list
      </button>
      
      <h1>{starshipData.name || 'Unknown starship'}</h1>

      <button
        onClick={handleToggleFavorito}
        className={`favorite-button ${esFavorito ? 'active' : ''}`}
        aria-label={esFavorito ? 'Remove from favorites' : 'Add to favorites'}
      >
        {esFavorito ? '❤️' : '♡'}
      </button>
      
      <div className="starship-properties">
        <p><strong>Model:</strong> {starshipData.model}</p>
        <p><strong>Manufacturer:</strong> {starshipData.manufacturer}</p>
        <p><strong>Cost in Credits:</strong> {starshipData.cost_in_credits}</p>
        <p><strong>Length:</strong> {starshipData.length} m</p>
        <p><strong>Max Atmosphering Speed:</strong> {starshipData.max_atmosphering_speed}</p>
        <p><strong>Crew:</strong> {starshipData.crew}</p>
        <p><strong>Passengers:</strong> {starshipData.passengers}</p>
        <p><strong>Cargo Capacity:</strong> {starshipData.cargo_capacity} kg</p>
        <p><strong>Consumables:</strong> {starshipData.consumables}</p>
        <p><strong>Hyperdrive Rating:</strong> {starshipData.hyperdrive_rating}</p>
        <p><strong>MGLT:</strong> {starshipData.MGLT}</p>
        <p><strong>Starship Class:</strong> {starshipData.starship_class}</p>
      </div>
    </div>
  );
}

export default DetalleNaves;