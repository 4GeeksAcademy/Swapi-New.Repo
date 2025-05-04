export const addFavorito = (item) => ({
    type: 'ADD_FAVORITO',
    payload: item,
  });
  
  export const removeFavorito = (uid) => ({
    type: 'REMOVE_FAVORITO',
    payload: uid,
  });
  
  export const toggleFavorito = (item) => ({
    type: 'TOGGLE_FAVORITO',
    payload: {
        uid: item.uid,
        type: item.type, 
        ...item.properties || item
    }
  });
  