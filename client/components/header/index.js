import Link from 'next/link';

const Header = ({ user }) => {

  const links = [
    !user && { label: 'Signup', href: '/auth/signup' },
    !user && { label: 'Signin', href: '/auth/signin' },
    user && { label: 'Signout', href: '/auth/signout' },
  ]
    .filter(linkConfig => linkConfig) //takes the first truthy value from the array
    .map(({ label, href }) => {
      return <li key={href}>
        <Link href={href}>
          <a className="nav-link">{label}</a>
        </Link>
      </li>
    });

  return <nav className="navbar navbar-light bg-light">
    <Link href="/">
      <a className="navbar-brand">TICKTRADE</a>
    </Link>
    <div className="d-flex justify-content-end">
      <ul className="nav d-flex align-items-center">
        {/* {user ? 'Sign Out' : 'Sign In'} */}
        {links}
      </ul>
    </div>
  </nav>
};

export default Header;

