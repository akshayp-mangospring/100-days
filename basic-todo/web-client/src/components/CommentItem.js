import { useEffect, useRef, useState } from 'react';
import { COMMENTS_API, DEAD_LINK, ENTER_KEY_CODE } from '../constants';

import Pen from './icons/Pen';
import Trash from './icons/Trash';
import Tick from './icons/Tick';
import Close from './icons/Close';

function Comment({ comment, author, hasEditRights, article, setComments, comments }) {
  const articleId = article.id;
  const commentId = comment.id;
  const inputRef = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editValue, setEditValue] = useState(comment.content);

  useEffect(() => {
    if (isEditMode) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  const handleKeyDown = ({ keyCode }) => {
    if (keyCode === ENTER_KEY_CODE) editComment();
  };

  const deleteComment = () => {
    fetch(COMMENTS_API(articleId), {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
      },
      body: JSON.stringify({
        comment_id: commentId,
      }),
    }).then(r => r.json())
      .then(({ status }) => {
        if (status === 'ok') {
          setComments(comments.filter(({ comment: { id: cId } }) => cId !== commentId));
        } else {
        }
      });
  };

  const editComment = () => {
    fetch(COMMENTS_API(articleId), {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
      },
      body: JSON.stringify({
        comment_id: commentId,
        content: editValue,
      }),
    }).then(r => r.json())
      .then(({ status, comment: upddatedComment, error }) => {
        if (status === 'ok') {
          setComments(comments.map((c) => {
            if (c.comment.id !== commentId) return c;
            return {
              ...c,
              comment: upddatedComment,
            }
          }));
          setIsEditMode(false);
        } else {
        }
      });
  };

  return (
    <div className="mb-1 d-flex align-items-center">
      <span className="fw-medium me-3">{author.username}:</span>
      {
        isEditMode ? (
          <>
            <input
              type="text"
              ref={inputRef}
              className="w-100 form-control me-auto"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <a href={DEAD_LINK} onClick={editComment} className="d-flex align-items-center text-success ms-3">
              <Tick />
            </a>
            <a href={DEAD_LINK} onClick={() => setIsEditMode(false)} className="d-flex align-items-center text-danger ms-3">
              <Close />
            </a>
          </>
        ) : (
          <>
            <span className="me-auto">{comment.content}</span>
            {hasEditRights && (
              <div className="d-flex align-items-center">
                <a href={DEAD_LINK} onClick={() => setIsEditMode(true)} className="d-flex align-items-center text-primary">
                  <Pen />
                </a>
                <a href={DEAD_LINK} onClick={() => deleteComment(comment.id)} className="d-flex align-items-center text-danger ms-3">
                  <Trash />
                </a>
              </div>
            )}
          </>
        )
      }
    </div>
  );
}

export default Comment;
