import { Link, Outlet } from 'react-router-dom';

export default function App() {
  return (
    <header>
      <h1>
        <Link to='/'>뭐라도 만들어봤다.</Link>
      </h1>

      <nav>
        <ul>
          <li>
            <Link to='/counter'>Simple Counter</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </header>
  );
}
