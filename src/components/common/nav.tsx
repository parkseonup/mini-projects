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
          <Link to='/datePicker'>Date Picker</Link>
        </li>
      </ul>
    </nav>
  );
}