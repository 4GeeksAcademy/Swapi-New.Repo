import React from 'react'
import { useParams } from 'react-router-dom';

function DetallePersonajes() {
    const {id} = useParams
  return (
    <div>Hola Soy DetallePersonajes</div>
  )
}

export default DetallePersonajes