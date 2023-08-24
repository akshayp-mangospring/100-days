import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { BLOGS_API } from '../constants';

import OverlayLoader from '../components/OverlayLoader';

function EditArticle() {
  const navigate = useNavigate();
  const { articleId } = useParams();
  const editArticle = !!articleId;
  const saveUrl = editArticle ? `${BLOGS_API}/${articleId}` : BLOGS_API;
  const saveMethod = editArticle ? 'PUT' : 'POST';

  const [article, setArticle] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editArticle) {
      fetch(saveUrl, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
        },
      })
        .then(r => r.json())
        .then(({ status, article: res }) => {
          if (status === 'ok') {
            setArticle(res);
            setTitle(res.title);
            setContent(res.content);
          } else {
            navigate('/');
          }
        }).catch((e) => {
          navigate('/');
        });
    }
  }, [navigate, editArticle, saveUrl]);

  const saveArticle = () => {
    fetch(saveUrl, {
      method: saveMethod,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
      },
      body: JSON.stringify({
        article: {
          title,
          content,
        }
      }),
    }).then(r => r.json())
      .then(({ status, article, message, error }) => {
        if (status === 'ok') {
          navigate(`/articles/${article.id}`);
        } else {
        }
      });
  };

  if (editArticle && !article) return <OverlayLoader />;

  return (
    <div className="container">
      <div className="my-5">
        <div className="mb-3">
          <label className="form-label fs-4">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" placeholder="Enter title here..." />
        </div>
        <div>
          <label className="form-label fs-4">Content</label>
          <textarea className="form-control" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Enter content here..." rows={20}>{content}</textarea>
        </div>
      </div>
      <button className="btn btn-primary" type="button" onClick={saveArticle}>Save</button>
    </div>
  );
}

export default EditArticle;
