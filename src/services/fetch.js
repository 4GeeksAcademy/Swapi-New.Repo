const base_Url = "https://www.swapi.tech/api/";

export const GetPersonajes = async (dispatch) => {
  try {
    dispatch({ type: "GET_PERSONAJES_LOADING" });
    const response = await fetch(`${base_Url}people`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    if (!data?.results) throw new Error("Formato de datos inesperado");
    dispatch({ type: "GET_PERSONAJES_SUCCESS", payload: data.results });
  } catch (error) {
    dispatch({ type: "GET_PERSONAJES_ERROR", payload: error.message });
  }
};

export const GetPlanetas = async (dispatch) => {
  try {
    dispatch({ type: "GET_PLANETAS_LOADING" });
    const response = await fetch(`${base_Url}planets`);
    if (!response.ok) throw new Error(`HTTP error! status ${response.status}`);
    const data = await response.json();
    if (!data.results) throw new Error("Formato de datos inesperado");
    dispatch({ type: "GET_PLANETAS_SUCCESS", payload: data.results });
  } catch (error) {
    dispatch({ type: "GET_PLANETAS_ERROR", payload: error.message });
  }
};

export const GetNaves = async (dispatch) => {
  try{
    dispatch({ typa: "GET_NAVES_LOADING" });
    const response = await fetch(`${base_Url}starships`);
    if (!response.ok) throw new Error (`HTTP error! status ${response.status}`);
    const data = await response.json();
    if (!data.results) throw new Error ("Formato de datos inesperado");
    dispatch({ type: "GET_NAVES_SUCCESS", payload: data.results });
  } catch (error) {
    dispatch({ type: "GET_NAVES_ERROR", payload: error.message });
  }
}