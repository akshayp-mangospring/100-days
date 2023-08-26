import { NavLink, useNavigate } from "react-router-dom";
import { DEAD_LINK } from '../constants';
import { getCurrentUser } from '../utils';

function Header() {
  const navigate = useNavigate();

  const logMeOut = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
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
                to="/videos"
                className="nav-link"
              >
                Videos
              </NavLink>
            </li>
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
        <div className="d-flex">
          <NavLink
            to="/profile"
            className="nav-link fw-bold text-white"
          >
            {getCurrentUser().username}
          </NavLink>
          <a
            className="nav-link text-white ms-3"
            href={DEAD_LINK}
            onClick={logMeOut}
          >
            Log Out
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Header;
