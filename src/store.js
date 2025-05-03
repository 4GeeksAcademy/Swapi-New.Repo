export const initialStore = () => ({
  personajes: [],
  planetas: [],
  naves: [],
  loadingPersonajes: false,
  loadingPlanetas: false,
  loadingNaves: false,
  errorPersonajes: null,
  errorPlanetas: null,
  errorNaves: null,
});

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'GET_PERSONAJES_LOADING':
      return { ...store, loadingPersonajes: true, errorPersonajes: null };
    case 'GET_PERSONAJES_SUCCESS':
      return { ...store, personajes: action.payload, loadingPersonajes: false };
    case 'GET_PERSONAJES_ERROR':
      return { ...store, errorPersonajes: action.payload, loadingPersonajes: false };
    case 'GET_PLANETAS_LOADING':
      return { ...store, loadingPlanetas: true, errorPlanetas: null };
    case 'GET_PLANETAS_SUCCESS':
      return { ...store, planetas: action.payload, loadingPlanetas: false };
    case 'GET_PLANETAS_ERROR':
      return { ...store, errorPlanetas: action.payload, loadingPlanetas: false };
      case 'GET_NAVES_LOADING':
        return { ...store, loadingNaves: true, errorNaves: null };
      case 'GET_NAVES_SUCCESS':
        return { ...store, naves: action.payload, loadingNaves: false };
      case 'GET_NAVES_ERROR':
        return { ...store, errorNaves: action.payload, loadingNaves: false }; 
    default:
      return store;
  }
}
