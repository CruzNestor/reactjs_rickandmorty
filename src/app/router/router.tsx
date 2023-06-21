import { createBrowserRouter } from "react-router-dom";
import CharacterPage from '../../features/characters/presentation/pages/CharacterPage';
import HomePage from "../../features/home/presentation/pages/HomePage";
import ErrorPage from '../pages/ErrorPage';
import Root from "../components/root";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path:"/",
        element: <HomePage />
      },
      {
        path: "/characters",
        element: <CharacterPage />,
      },
    ],
  },
]);

export default router