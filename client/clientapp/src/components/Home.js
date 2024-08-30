import React from 'react';

const Home = () => {
  return (
    <div className="container mt-5">
      <img 
        src='https://josefacchin.com/wp-content/uploads/2021/05/crear-un-blog-gratis.png.webp' 
        className='d-block m-auto' 
        alt='Blog illustration'
        style={{ width: '400px', height: '300px' }}
      />
      <h2 className="text-center mt-4">Welcome to MyApp</h2>
      <p className="mt-3">
        A Blog App is a web application that allows users to engage with blog content by creating, reading, updating, and deleting posts. The app features user authentication to ensure that only registered users can manage content. Users are typically divided into readers and authors, with readers able to explore and comment on posts, while authors can create, edit, and manage their own articles.<br/><br/>
        The app includes dashboards tailored to each role—readers can track their interactions, and authors can manage their posts and view comments. Posts can be enhanced with rich text, images, and categorized by tags for easier navigation. The app supports a comments system for interaction, which authors can moderate. Additionally, it’s designed to be responsive across devices, often includes search and filter functions for content discovery, and may feature real-time updates. An optional admin panel could be included for site-wide content and user management. This structure provides a versatile platform for content creation and engagement.
      </p>
    </div>
  );
};

export default Home;
