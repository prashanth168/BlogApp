import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetState } from '../redux/auth/authSlice';

const Header = () => {
  const { loginUserStatus, currentUser } = useSelector((state) => state.authorUser);

  const dispatch = useDispatch();

  function SignOut() {
    localStorage.removeItem('token');
    dispatch(resetState());
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <Link className="navbar-brand" to="/">MyApp</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto"> {/* ms-auto pushes items to the right */}
              {loginUserStatus === false ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link nav-link-custom text-dark" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link nav-link-custom text-dark" to="/login">Signin</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link nav-link-custom text-dark" to="/register">Signup</Link>
                  </li>
                </>
              ) : (
                <li className="nav-item d-flex align-items-center">
                  <p className="fs-5 text-primary mb-0 me-3">Welcome, {currentUser.username}</p>
                  <Link className="nav-link nav-link-custom text-dark" to="/" onClick={SignOut}>Signout</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
