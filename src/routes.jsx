// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import Personajes from "./pages/Personajes";
import Planetas from "./pages/Planetas";
import Naves from "./pages/Naves";
import DetallePersonajes from "./components/DetallePersonajes";
import DetalleNaves from "./components/DetalleNaves";
import DetallePlanetas from "./components/DetallePlanetas";
import FavoritosList from "./components/FavoritosList";
import VistaAdmin from "./pages/VistaAdmin";
import UserList from "./pages/UserList";

export const router = createBrowserRouter(
    createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

      // Root Route: All navigation will start from here.
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

        {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
        <Route path= "/" element={<Home />} />
        <Route path="/single/:theId" element={ <Single />} />
        <Route path="/personajes" element={<Personajes />} />
        <Route path="/personajes/:uid" element={<DetallePersonajes />} />
        <Route path="/planetas" element={<Planetas />} />
        <Route path="/planetas/:uid" element={<DetallePlanetas />} />
        <Route path="/naves" element={<Naves />} />
        <Route path="/naves/:uid" element={<DetalleNaves />} />
        <Route path="/favorites" element={<FavoritosList />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/admin/users" element={
          <VistaAdmin>
            <UserList />
          </VistaAdmin>
        } />
      </Route>
    )
);