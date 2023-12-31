import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { BLOGS_API, ARTICLE_COMMENTS_API } from '../constants';

import Comments from '../components/Comments';
import OverlayLoader from '../components/OverlayLoader';

function Article() {
  const navigate = useNavigate();
  const { articleId } = useParams();

  const [article, setArticle] = useState(null);
  const [author, setAuthor] = useState('');
  const [articleComments, setArticleComments] = useState([]);
  const [hasEditRights, setHasEditRights] = useState(false)
  const articleActionUrl = `${BLOGS_API}/${articleId}`;

  useEffect(() => {
    fetch(articleActionUrl, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
      },
    })
      .then(r => r.json())
      .then(({ status, article: res, has_edit_rights, author, comments }) => {
        if (status === 'ok') {
          setArticle(res);
          setAuthor(author);
          setArticleComments(comments);
          setHasEditRights(has_edit_rights);
        } else {
          navigate('/');
        }
      }).catch((e) => {
        navigate('/');
      });
  }, [navigate, articleActionUrl]);

  const deleteArticle = () => {
    fetch(articleActionUrl, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
      },
    })
      .then(r => r.json())
      .then(({ status }) => {
        if (status === 'ok') {
          navigate('/articles');
        } else {
          navigate('/');
        }
      }).catch((e) => {
        navigate('/');
      });
  }

  if (!article) return <OverlayLoader />;

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center my-3">
        <h1 className="my-0">{article.title}</h1>
        {
          hasEditRights && (
            <div>
              <NavLink to={`/articles/${articleId}/edit`} className="btn btn-primary">Edit</NavLink>
              <button className="btn btn-danger mx-2" type="button" onClick={deleteArticle}>Delete</button>
            </div>
          )
        }
      </div>
      <div className="border-bottom pb-3 my-3">
        <span className="me-2">
          By: <span className="fw-medium">{author.username}</span>
        </span>
      </div>
      <p>{article.content}</p>
      <Comments commentsList={articleComments} embeddedParent={article} apiEndPoint={ARTICLE_COMMENTS_API} />
    </div>
  );
}

export default Article;
