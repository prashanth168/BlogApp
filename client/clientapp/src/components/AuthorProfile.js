import React from 'react';
import { useSelector } from 'react-redux';
import { Link,Outlet } from 'react-router-dom';

const AuthorProfile = () => {
  const { currentUser } = useSelector((state) => state.authorUser);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-12">
          <h1>Author Profile</h1>
          <p>Welcome to your profile page.</p>
          <nav className='d-flex justify-content-evenly'>
            <Link className="btn btn-secondary text-dark nav-link-info" to={`articles-by-author/${currentUser.username}`}>
              Articles
            </Link>
            <Link className="btn btn-secondary text-dark nav-link-info" to="new-article">
              Add Articles
            </Link>
          </nav>
          <Outlet/>{/* This will render the nested routes most importantone to be mentioned */}
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;
