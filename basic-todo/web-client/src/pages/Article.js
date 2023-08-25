import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { BLOGS_API, COMMENTS_API, DEAD_LINK, ENTER_KEY_CODE } from '../constants';

import Pen from '../components/icons/Pen';
import Trash from '../components/icons/Trash';

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

  const handleKeyDown = ({ keyCode }) => {
    if (keyCode === ENTER_KEY_CODE) addComment();
  };

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

  const deleteComment = (id) => {
    fetch(COMMENTS_API(articleId), {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
      },
      body: JSON.stringify({
        comment_id: id,
      }),
    }).then(r => r.json())
      .then(({ status, comment, error }) => {
        if (status === 'ok') {
          setComments(comments.filter(({ comment: { id: cId } }) => cId !== id));
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
          onKeyDown={handleKeyDown}
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
        {comments.length ? (comments.map(({ comment, author, has_edit_rights }) => (
          <div key={comment.id} className="mb-1 d-flex">
            <span className="fw-medium me-3">{author.username}:</span>
            <span className="me-auto">{comment.content}</span>
            {has_edit_rights && (
              <div className="d-flex align-items-center">
                <a href={DEAD_LINK} className="d-flex align-items-center text-primary">
                  <Pen />
                </a>
                <a href={DEAD_LINK} onClick={() => deleteComment(comment.id)} className="d-flex align-items-center text-danger ms-3">
                  <Trash />
                </a>
              </div>
            )}
          </div>
        ))) : (
          <span>No Comments</span>
        )}
      </div>
    </div>
  );
}

export default Article;
