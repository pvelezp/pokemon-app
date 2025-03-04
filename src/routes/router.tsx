import Home from 'views/home';
import PokemonDetails from 'views/pokemon-detail';
import { createElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const routePaths = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/pokemon/:id',
    component: PokemonDetails,
  },
];

const Router = () => (
  <BrowserRouter
    future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
  >
    <Routes>
      {routePaths.map(({ path, component }, index) => (
        <Route key={index} path={path} element={createElement(component)} />
      ))}
    </Routes>
  </BrowserRouter>
);

export default Router;
