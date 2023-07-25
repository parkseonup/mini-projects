import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { StrictMode } from 'react';
import Index from './pages';
import Counter from './pages/counter';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: '/counter',
        element: <Counter />,
      },
    ],
  },
]);

const root = createRoot(document.getElementById('app') as HTMLElement);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
