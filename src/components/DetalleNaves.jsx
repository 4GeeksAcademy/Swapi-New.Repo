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
  if (errorDetalleNave) return <div>Error: {errorDetalleNave}</div>;
  if (!naveDetalle || !naveDetalle.result) return <div>No starship data available</div>;

  const properties = naveDetalle.result.properties;
  const esFavorito = favoritos?.some(fav => fav.uid === naveDetalle.uid);

      const handleToggleFavorito = () => {
          dispatch(toggleFavorito({
              uid: naveDetalle.uid,
              ...starshipData,
              type: 'nave'
          }));
      };


  return (
    <div>
      <button onClick={() => navigate(-1)}>
        ← Back to list
      </button>
      
      <h1>{properties.name || 'Unknown starship'}</h1>

      <button
                onClick={handleToggleFavorito}
                className={`favorite-button ${esFavorito ? 'active' : ''}`}
            >
                {esFavorito ? '❤️ Remove Favorite' : '♡ Add Favorite'}
            </button>
      
      <div>
        <p><strong>Model:</strong> {properties.model}</p>
        <p><strong>Manufacturer:</strong> {properties.manufacturer}</p>
        <p><strong>Cost in Credits:</strong> {properties.cost_in_credits}</p>
        <p><strong>Length:</strong> {properties.length} m</p>
        <p><strong>Max Atmosphering Speed:</strong> {properties.max_atmosphering_speed}</p>
        <p><strong>Crew:</strong> {properties.crew}</p>
        <p><strong>Passengers:</strong> {properties.passengers}</p>
        <p><strong>Cargo Capacity:</strong> {properties.cargo_capacity} kg</p>
        <p><strong>Consumables:</strong> {properties.consumables}</p>
        <p><strong>Hyperdrive Rating:</strong> {properties.hyperdrive_rating}</p>
        <p><strong>MGLT:</strong> {properties.MGLT}</p>
        <p><strong>Starship Class:</strong> {properties.starship_class}</p>
      </div>
    </div>
  );
}

export default DetalleNaves;