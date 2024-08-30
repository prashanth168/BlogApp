import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import getAxiosWithToken from '../axiosWithToken';

function AddArticles() {
  let { register, handleSubmit } = useForm();
  let { currentUser } = useSelector((state) => state.authorUser);
  let [err, setErr] = useState("");
  let navigate = useNavigate();
  let token = localStorage.getItem('token');

  // Create axios instance with token
  const axiosWithToken = getAxiosWithToken()

  const postNewArticle = async (article) => {
    article.dateOfCreation = new Date();
    article.dateOfModification = new Date();
    article.articleId = Date.now();
    article.username = currentUser.username;
    article.comments = [];
    article.status = true;
    console.log(article)
    let res = await axiosWithToken.post(`http://localhost:4001/author-api/article`, article);
    console.log(res)
    if (res.data.message === 'New article created') {
      navigate(`/author-profile/articles-by-author/${currentUser.username}`);
    } else {
      setErr(res.data.message);
    }
  };
  //<p> style="white-space:pre-line">multi-line text</p>
  return (
    <div className="container mt-5">
      <div className='row justify-content-center mt-5'>
        <div className='col-lg-8 col-md-10 col-sm-12'>
          <div className='card shadow'>
            <div className='card-title text-center border-bottom'>
              <h2 className='p-3'>Write an Article</h2>
            </div>
            <div className='card-body bg-light'>
              <form onSubmit={handleSubmit(postNewArticle)}>
                <div className="form-group mb-3">
                  <label htmlFor="title" className='form-label'>Title</label>
                  <input
                    type="text"
                    id="title"
                    className="form-control"
                    {...register('title')}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="category">Select a Category</label>
                  <select
                    id="category"
                    {...register('category')}
                    className="form-control"
                  >
                    <option value="">Select a category</option>
                    <option value="Programming">Programming</option>
                    <option value="Technology">Technology</option>
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="content">Content</label>
                  <textarea
                    id="content"
                    className="form-control"
                    rows="10"
                    {...register('content')}
                  ></textarea>
                </div>
                <div className="form-group mb-3">
                  <button type="submit" className="btn btn-primary d-block m-auto">Post</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddArticles;
