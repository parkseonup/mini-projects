import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from './routes';

const root = createRoot(document.getElementById('app') as HTMLElement);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
