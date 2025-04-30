export const initialStore = () => ({
  personajes: [],
  planetas: [],
  loadingPersonajes: false,
  loadingPlanetas: false,
  errorPersonajes: null,
  errorPlanetas: null
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
    default:
      return store;
  }
}
