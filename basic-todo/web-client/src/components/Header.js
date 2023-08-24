import { NavLink, useNavigate } from "react-router-dom";
import { DEAD_LINK } from '../constants';

function Header() {
  const navigate = useNavigate();

  const logMeOut = () => {
    localStorage.removeItem('auth_token');
    navigate('/');
  }

  return (
    <nav className="navbar navbar-dark bg-primary navbar-expand-lg sticky-top">
      <div className="container-fluid justify-content-start w-100">
        <NavLink
          to="/articles"
          className="navbar-brand"
        >
          Blogs
        </NavLink>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                to="/todos"
                className="nav-link"
              >
                Todos
              </NavLink>
            </li>
          </ul>
        </div>
        <a
          className="nav-link text-white"
          href={DEAD_LINK}
          onClick={logMeOut}
        >
          Log Out
        </a>
      </div>
    </nav>
  );
}

export default Header;
