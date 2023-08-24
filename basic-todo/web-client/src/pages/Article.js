import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { BLOGS_API } from '../constants';

function Article() {
  const navigate = useNavigate();
  const location = useLocation();
  const [article, setArticle] = useState('');
  const [hasEditRights, setHasEditRights] = useState(false);

  useEffect(() => {
    fetch(`${BLOGS_API}/${location.pathname.split('/').pop()}`, {
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
  }, [navigate]);

  return (
    <div className="container">
      <div className="d-flex justify-content-between border-bottom pb-3 my-3">
        <h1 className="my-0">{article.title}</h1>
        {
          hasEditRights && <button className="btn btn-primary" type="button">Edit Article</button>
        }
      </div>
      <p>{article.content}</p>
    </div>
  );
}

export default Article;
