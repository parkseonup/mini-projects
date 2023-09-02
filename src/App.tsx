import { Link, Outlet } from 'react-router-dom';
import Nav from './components/unit/Nav/Nav';

export default function App() {
  return (
    <header>
      <h1>
        <Link to='/'>뭐라도 만들어봤다.</Link>
      </h1>

      <Nav />

      <section>
        <Outlet />
      </section>
    </header>
  );
}
