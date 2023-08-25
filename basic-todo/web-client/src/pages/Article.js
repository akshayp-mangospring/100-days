import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { BLOGS_API, COMMENTS_API } from '../constants';

import OverlayLoader from '../components/OverlayLoader';

function Article() {
  const navigate = useNavigate();
  const { articleId } = useParams();

  const [article, setArticle] = useState(null);
  const [author, setAuthor] = useState('');
  const [comments, setComments] = useState([]);
  const [myComment, setMyComment] = useState('');
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
          setComments(comments);
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

  const addComment = () => {
    fetch(COMMENTS_API(articleId), {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
      },
      body: JSON.stringify({
        content: myComment,
      }),
    }).then(r => r.json())
      .then(({ status, comment, error }) => {
        if (status === 'ok') {
          setMyComment('');
          setComments([...comments, comment])
        } else {
        }
      });
  };

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
      <h4 className="border-bottom pb-3 mb-3 mt-5">Comments</h4>
      <div className="input-group input-group-md mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add your comment here..."
          value={myComment}
          onChange={(e) => setMyComment(e.target.value)}
        />
        <button
          type="button"
          className={`btn btn-primary ${myComment.length ? '' : 'disabled'}`}
          onClick={addComment}
        >
          Add
        </button>
      </div>
      <div className="mb-5">
        {comments.length ? (comments.map(({ comment, author }) => (
          <div key={comment.id}>
            <span className="fw-medium me-3">{author.username}:</span>
            <span>{comment.content}</span>
          </div>
        ))) : (
          <span>No Comments</span>
        )}
      </div>
    </div>
  );
}

export default Article;
