import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import getAxiosWithToken from '../axiosWithToken';

function Articles() {
  const [articleList, setArticleList] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.authorUser);

  const getArticlesOfCurrentAuthor = async () => {
    const axiosWithToken = getAxiosWithToken();
    const res = await axiosWithToken.get(`http://localhost:4001/user-api1/articles`);
    setArticleList(res.data.payload);
  };

  const readArticleByArticleId=(articleObj)=>{
    navigate(`../article/${articleObj.articleId}`,{state:articleObj})
  }



  useEffect(() => {
    getArticlesOfCurrentAuthor();
  }, [currentUser.username]);

  return (
    <div className="container mt-5">
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5'>
        {articleList.map((article) => (
          <div className='col' key={article.articleId}>
            <div className='card  h-100'>
              <div className='card-body bg-warning'>
                <h5 className='card-title'>{article.title}</h5>
                <p className='card-text'>
                  {article.content.substring(0, 80) + '....'}
                </p>
                <button className='btn  btn-info btn-4' onClick={() => readArticleByArticleId(article)}>
                  <span>Read More</span>
                </button>
              </div>
              <div className='card-footer'>
                <small className='text-body-secondary'>
                  Last Updated on {article.dateOfModification}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Outlet/>
    </div>
  );
}

export default Articles;
