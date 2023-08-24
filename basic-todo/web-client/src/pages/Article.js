import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { BLOGS_API } from '../constants';

import OverlayLoader from '../components/OverlayLoader';

function Article() {
  const navigate = useNavigate();
  const location = useLocation();
  const articleId = location.pathname.split('/').pop();

  const [article, setArticle] = useState(null);
  const [hasEditRights, setHasEditRights] = useState(false);

  useEffect(() => {
    fetch(`${BLOGS_API}/${articleId}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
      },
    })
      .then(r => r.json())
      .then(({ status, article: res, has_edit_rights }) => {
        if (status === 'ok') {
          setArticle(res);
          setHasEditRights(has_edit_rights);
        } else {
          navigate('/');
        }
      }).catch((e) => {
        navigate('/');
      });
  }, [navigate, articleId]);

  if (!article) return <OverlayLoader />;

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center border-bottom pb-3 my-3">
        <h1 className="my-0">{article.title}</h1>
        {
          hasEditRights && (
            <div>
              <NavLink to={`/articles/${articleId}/edit`} className="btn btn-primary">Edit</NavLink>
              <button className="btn btn-danger mx-2" type="button">Delete</button>
            </div>
          )
        }
      </div>
      <p>{article.content}</p>
    </div>
  );
}

export default Article;
