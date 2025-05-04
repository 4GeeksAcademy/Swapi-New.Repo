import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Personajes from "./Personajes.jsx";
import Planetas from "./Planetas.jsx";
import Naves from "./Naves.jsx";
import FavoritosList from "../components/FavoritosList.jsx";



export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

	return (
		<div className="text-center mt-5">
			
		<div><Personajes /></div>
		<div><Planetas /></div>
		<div><Naves /></div>	
		<div><FavoritosList /></div>
		</div>
		
	);
}; 