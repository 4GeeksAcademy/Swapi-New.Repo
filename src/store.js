export const initialStore = () => ({
  personajes: [],
  planetas: [],
  naves: [],
  favoritos: [],
  personajeDetalle: null,
  naveDetalle: null,
  planetaDetalle: null,
  loadingPersonajes: false,
  loadingPlanetas: false,
  loadingNaves: false,
  loadingDetallePersonaje: false,
  loadingDetalleNave: false,
  loadingDetallePlaneta: false,
  errorPersonajes: null,
  errorNaves: null,
  errorPlanetas: null,
  errorDetallePersonaje: null,
  errorDetalleNave: null,
  errorDetallePlaneta: null
});

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'GET_PERSONAJES_LOADING':
      return { ...store, loadingPersonajes: true, errorPersonajes: null };
    case 'GET_PERSONAJES_SUCCESS':
      return { ...store, personajes: action.payload, loadingPersonajes: false };
    case 'GET_PERSONAJES_ERROR':
      return { ...store, errorPersonajes: action.payload, loadingPersonajes: false };

    case 'LOADING_DETALLE_PERSONAJE':
      return { ...store, loadingDetallePersonaje: true, errorDetallePersonaje: null };
    case 'SET_PERSONAJE_DETALLE':
      return { ...store, personajeDetalle: action.payload, loadingDetallePersonaje: false };
    case 'ERROR_DETALLE_PERSONAJE':
      return { ...store, errorDetallePersonaje: action.payload, loadingDetallePersonaje: false };

    //------------------------------------------------------------------

    case 'GET_PLANETAS_LOADING':
      return { ...store, loadingPlanetas: true, errorPlanetas: null };
    case 'GET_PLANETAS_SUCCESS':
      return { ...store, planetas: action.payload, loadingPlanetas: false };
    case 'GET_PLANETAS_ERROR':
      return { ...store, errorPlanetas: action.payload, loadingPlanetas: false };

    case 'LOADING_DETALLE_PLANETA':
      return { ...store, loadingDetallePlaneta: true, errorDetallePlaneta: null };
    case 'SET_PLANETA_DETALLE':
      return { ...store, planetaDetalle: action.payload, loadingDetallePlaneta: false };
    case 'ERROR_DETALLE_PLANETA':
      return { ...store, errorDetallePlaneta: action.payload, loadingDetallePlaneta: false };

    //------------------------------------------------------------------  

    case 'GET_NAVES_LOADING':
      return { ...store, loadingNaves: true, errorNaves: null };
    case 'GET_NAVES_SUCCESS':
      return { ...store, naves: action.payload, loadingNaves: false };
    case 'GET_NAVES_ERROR':
      return { ...store, errorNaves: action.payload, loadingNaves: false };

    case 'LOADING_DETALLE_NAVE':
      return { ...store, loadingDetalleNave: true, errorDetalleNave: null };
    case 'SET_NAVE_DETALLE':
      return { ...store, naveDetalle: action.payload, loadingDetalleNave: false };
    case 'ERROR_DETALLE_NAVE':
      return { ...store, errorDetalleNave: action.payload, loadingDetalleNave: false };

    //------------------------------------------------------------------  

    case 'ADD_FAVORITO':
      return {
        ...store,
        favoritos: [...store.favoritos, action.payload],
      };

    case 'REMOVE_FAVORITO':
      return {
        ...store,
        favoritos: store.favoritos.filter(item => item.uid !== action.payload),
      };

    case 'TOGGLE_FAVORITO':
      const exists = store.favoritos.some(fav =>
        fav.uid === action.payload.uid && fav.type === action.payload.type
      );
      return {
        ...store,
        favoritos: exists
          ? store.favoritos.filter(fav =>
            !(fav.uid === action.payload.uid && fav.type === action.payload.type)
          )
          : [...store.favoritos, action.payload]
      };

    default:
      return store;
  }
}
