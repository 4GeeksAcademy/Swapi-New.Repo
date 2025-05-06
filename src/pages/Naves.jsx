import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetNaves } from '../services/fetch';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

import cr90 from '../assets/Naves/01-CR90.jpg';
import starDestroyer from '../assets/Naves/02-Star Destroyer.jpg';
import sentinel from '../assets/Naves/03-Sentinel Class.jpg';
import deathStar from '../assets/Naves/04-Death Star.jpg';
import yWing from '../assets/Naves/05-Y-Wing.jpg';
import falcon from '../assets/Naves/06-millenium Falcon.jpg';
import tie from '../assets/Naves/07-TIE.jpg';
import executor from '../assets/Naves/08-Executor.jpg';
import xWing from '../assets/Naves/09-X-Wing.jpg';
import rebelTransport from '../assets/Naves/10-Rebel Transport.jpg';

function Naves() {
  const { store, dispatch } = useGlobalReducer();
  const { naves, loading, error } = store;
  const navigate = useNavigate();

  useEffect(() => {
    GetNaves(dispatch);
  }, [dispatch]);

  const uidToImageMap = {
    "2": cr90,
    "3": starDestroyer,
    "5": sentinel,
    "9": deathStar,
    "11": yWing,
    "12": falcon,
    "13": tie,
    "15": executor,
    "10": xWing,
    "17": rebelTransport
  };

  const handleClick = (nave) => {
    if (!nave.uid) {
      console.error("No UID found in starship", nave);
      return;
    }
    navigate(`/naves/${nave.uid}`);
  };

  if (loading) return <div>Loading Your Transport...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!naves || naves.length === 0) return <div>No Transport Available</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Star Wars Starships</h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {naves.map((nave) => {
          const imageSrc = uidToImageMap[nave.uid] || "No Image Aviable";
          return (
            <div 
              key={nave.uid}
              onClick={() => handleClick(nave)}
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
                alt={nave.name || nave.properties?.name || 'Unknown Starship'}
                style={{
                  width: '180px',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  marginBottom: '10px'
                }}
              />
              <span style={{ textAlign: 'center', fontWeight: 'bold' }}>
                {nave.name || nave.properties?.name || 'Unknown Starship'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Naves;