import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import Index from './pages';
import Counter from './pages/counter';
import Palindrome from './pages/palindrome';
import Calendar from './pages/calendar';
import DatePicker from './pages/datePicker';

export const router = createBrowserRouter([
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
      {
        path: '/palindrome',
        element: <Palindrome />,
      },
      {
        path: '/calendar',
        element: <Calendar />,
      },
      {
        path: '/datePicker',
        element: <DatePicker />,
      },
    ],
  },
]);
