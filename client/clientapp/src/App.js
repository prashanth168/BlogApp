import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Registration';
import Home from './components/Home';
import AuthorProfile from './components/AuthorProfile';
import UserProfile from './components/UserProfile';
import AddArticles from './components/AddArticles';
import ArticleByAuthor from './components/ArticleByAuthor';
import Article from './components/Article';
import Articles from './components/Articles'; // Assuming you have an Articles component

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="d-flex flex-column" style={{  backgroundImage:" linear-gradient(to top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)",
    // height: '100vh',      // Full height of the viewport
    // width: '100%',        // Full width of the parent element
    // display: 'flex',      // Optional: to center content
   // Optional: to vertically center content
    // justifyContent: 'center' // Optional: to horizontally center content
        }}>
          <Header />
          <div className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/author-profile" element={<AuthorProfile />}>
                <Route path="new-article" element={<AddArticles />} />
                <Route path="articles-by-author/:author" element={<ArticleByAuthor />} />
                <Route path="article/:articleId" element={<Article />} />
                <Route path="" element={<Navigate to="articles-by-author/:author" />} />
              </Route>
              <Route path="/user-profile" element={<UserProfile />}>
                <Route path="articles" element={<Articles />} />
                <Route path="article/:articleId" element={<Article />} />
                <Route path="" element={<Navigate to="articles" />} />
              </Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
