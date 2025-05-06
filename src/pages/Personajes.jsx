import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetPersonajes } from '../services/fetch';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

import luke from '../assets/Personajes/01-Luke.jpg';
import c3po from '../assets/Personajes/02-C3-PO.jpg';
import r2d2 from '../assets/Personajes/03-R2-D2.jpg';
import darthVader from '../assets/Personajes/04-Darth Vader.jpg';
import leia from '../assets/Personajes/05-Leia.jpg';
import owen from '../assets/Personajes/06-Owen.jpg';
import beru from '../assets/Personajes/07-Beru.jpg';
import r5d4 from '../assets/Personajes/08-R5-D4.jpg';
import briggs from '../assets/Personajes/09-Briggs.jpg';
import obiWan from '../assets/Personajes/10-Obi-Wan.jpg';

function Personajes() {
  const { store, dispatch } = useGlobalReducer();
  const { personajes, loading, error } = store;
  const navigate = useNavigate();

  useEffect(() => {
    GetPersonajes(dispatch);
  }, [dispatch]);

  const uidToImageMap = {
    "1": luke,
    "2": c3po,
    "3": r2d2,
    "4": darthVader,
    "5": leia,
    "6": owen,
    "7": beru,
    "8": r5d4,
    "9": briggs,
    "10": obiWan
  };

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
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Star Wars Characters</h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {personajes.map((personaje) => {
          const imageSrc = uidToImageMap[personaje.uid] || "No Image Aviable";
          return (
            <div 
              key={personaje.uid}
              onClick={() => handleClick(personaje)}
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
                alt={personaje.name || personaje.properties?.name || 'Unknown Character'}
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
                {personaje.name || personaje.properties?.name || 'Unknown Character'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Personajes;
