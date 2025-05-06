import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetPlanetas } from '../services/fetch';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

import tatooine from '../assets/Planetas/01-Tatooine.jpg';
import alderaan from '../assets/Planetas/02-Alderaan.jpg';
import yavin from '../assets/Planetas/03-Yavin IV.jpg';
import hoth from '../assets/Planetas/04-Hoth.jpg';
import dagobah from '../assets/Planetas/05-Dagobah.jpg';
import bespin from '../assets/Planetas/06-Bespin.jpg';
import endor from '../assets/Planetas/07-Endor.jpg';
import naboo from '../assets/Planetas/08-Naboo.jpg';
import coruscant from '../assets/Planetas/09-Coruscant.jpg';
import kamino from '../assets/Planetas/10-Kamino.jpg';

function Planetas() {
  const { store, dispatch } = useGlobalReducer();
  const { planetas, loading, error } = store;
  const navigate = useNavigate();

  useEffect(() => {
    GetPlanetas(dispatch);
  }, [dispatch]);

  const uidToImageMap = {
    "1": tatooine,
    "2": alderaan,
    "3": yavin,
    "4": hoth,
    "5": dagobah,
    "6": bespin,
    "7": endor,
    "8": naboo,
    "9": coruscant,
    "10": kamino
  };

  const handleClick = (planeta) => {
    if (!planeta.uid) {
      console.error("No UID found in planet", planeta);
      return;
    }
    navigate(`/planetas/${planeta.uid}`);
  };

  if (loading) return <div>Loading planets...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!planetas || planetas.length === 0) return <div>The Galaxy Has Been Destroyed!</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Star Wars Planets</h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {planetas.map((planeta) => {
          const imageSrc = uidToImageMap[planeta.uid] || tatooine;
          return (
            <div 
              key={planeta.uid}
              onClick={() => handleClick(planeta)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '15px',
                borderRadius: '8px',
                background: '#f0f0f0',
                transition: 'transform 0.3s',
                ':hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                }
              }}
            >
              <img 
                src={imageSrc} 
                alt={planeta.name || planeta.properties?.name || 'Unknown Planet'}
                style={{
                  width: '180px',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  marginBottom: '10px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
              <span style={{ 
                textAlign: 'center', 
                fontWeight: 'bold',
                color: '#333'
              }}>
                {planeta.name || planeta.properties?.name || 'Unknown Planet'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Planetas;