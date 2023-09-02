import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/counter'>Simple Counter</Link>
        </li>
        <li>
          <Link to='/palindrome'>Valid Palindrome</Link>
        </li>
        <li>
          <Link to='/calendar'>Calendar</Link>
        </li>
        <li>
          <Link to='/selectdate'>Select Date</Link>
        </li>
        <li>
          <Link to='/signup'>Sign up</Link>
        </li>
      </ul>
    </nav>
  );
}
