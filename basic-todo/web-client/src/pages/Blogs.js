import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { BLOGS_API } from '../constants';
import { convertToReadableDate } from '../utils';

import CommentIcon from '../components/icons/Comment';

function Blog() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState('');

  useEffect(() => {
    fetch(BLOGS_API, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
      },
    })
      .then(r => r.json())
      .then(({ status, articles: res }) => {
        if (status === 'ok') {
          setArticles(res);
        } else {
          navigate('/');
        }
      }).catch((e) => {
        navigate('/');
      });
  }, [navigate]);

  return (
    <div className="container">
      <div className="d-flex justify-content-between border-bottom pb-3 my-3">
        <h1 className="my-0">Latest Blogs</h1>
        <button className="btn btn-primary" type="button">New Article</button>
      </div>
      {
        articles.length ? (
          <ul className="list-unstyled">
            {articles.map(({ id, title, created_at }) => {
              return (
                <li key={id}>
                  <NavLink to={`/articles/${id}`} className="d-block fs-2 mb-2 fw-bold">{title}</NavLink>
                  <div className="d-flex align-items-center">
                    <span className="me-2">Published: {convertToReadableDate(created_at)}</span>
                    <CommentIcon />
                    <span className="mx-2">30 Comments</span>
                  </div>
                </li>
              )
            })
            }
          </ul>
        ) : (
          <>
            <h3 className="text-center">Seems pretty empty here...</h3>
            <h3 className="text-center">Pen down some thoughts of your own</h3>
          </>
        )
      }
    </div>
  );
}

export default Blog;
