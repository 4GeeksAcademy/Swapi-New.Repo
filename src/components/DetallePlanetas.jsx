import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetPlanetaByUid } from '../services/fetch';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { toggleFavorito } from '../hooks/actions.js';

function DetallePlanetas() {
    const { uid } = useParams();
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
    const { planetaDetalle, loadingDetalle, errorDetalle, favoritos } = store;

    useEffect(() => {
        if (uid && uid !== "undefined") {
            GetPlanetaByUid(dispatch, uid);
        }
    }, [uid, dispatch]);

    if (loadingDetalle) return <div className="loading">Loading planet details...</div>;
    if (errorDetalle) return <div className="error">Error: {errorDetalle.message}</div>;
    if (!planetaDetalle) return <div>No planet data available</div>;

    const planetData = planetaDetalle.result?.properties || {};
    const esFavorito = favoritos.some(fav => 
        fav.uid === planetaDetalle.uid && 
        fav.type === 'planeta' &&
        fav.name === planetData.name
    );

    const handleToggleFavorito = () => {
        dispatch(toggleFavorito({
            uid: planetaDetalle.uid,
            type: 'planeta',
            name: planetData.name,
            ...planetData
        }));
    };

    return (
        <div className="character-detail">
            <button onClick={() => navigate(-1)} className="back-button">
                ← Back to list
            </button>

            <h1>{planetData.name || 'Unknown Planet'}</h1>

            <button
                onClick={handleToggleFavorito}
                className={`favorite-button ${esFavorito ? 'active' : ''}`}
            >
                {esFavorito ? '❤️' : '♡'}
            </button>

            <div className="planet-properties">
                <p><strong>Climate:</strong> {planetData.climate}</p>
                <p><strong>Diameter:</strong> {planetData.diameter} km</p>
                <p><strong>Gravity:</strong> {planetData.gravity}</p>
                <p><strong>Orbital Period:</strong> {planetData.orbital_period} days</p>
                <p><strong>Population:</strong> {planetData.population}</p>
                <p><strong>Rotation Period:</strong> {planetData.rotation_period} hours</p>
                <p><strong>Surface Water:</strong> {planetData.surface_water}%</p>
                <p><strong>Terrain:</strong> {planetData.terrain}</p>
            </div>
        </div>
    );
}

export default DetallePlanetas;