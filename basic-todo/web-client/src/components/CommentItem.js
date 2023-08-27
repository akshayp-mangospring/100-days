import { useEffect, useRef, useState } from 'react';
import { DEAD_LINK, ENTER_KEY_CODE } from '../constants';

import Pen from './icons/Pen';
import Trash from './icons/Trash';
import Tick from './icons/Tick';
import Close from './icons/Close';

function Comment({ comment, author, hasEditRights, embeddedParent, setComments, comments, apiEndPoint }) {
  const parentId = embeddedParent.id;
  const commentId = comment.id;
  const inputRef = useRef(null);
  const hasReplies = false;
  const [isEditMode, setIsEditMode] = useState(false);
  const [shouldShowReplies, setShouldShowReplies] = useState(false);
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
    fetch(apiEndPoint(parentId), {
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
    fetch(apiEndPoint(parentId), {
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
    <div className="mb-2">
      <div className="d-flex align-items-center">
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
      <div className="mb-2">
        <span className="text-primary" role="button" onClick={() => setShouldShowReplies(!shouldShowReplies)}>
          Replies
        </span>
      </div>
      <div className="ms-3">
        {
          shouldShowReplies && (
            <>
              <div className="mb-2">
                {
                  hasReplies ? (
                    <>
                      {
                        [{ username: 'abp437', content: 'This is dummy reply', }, { username: 'sanketsheth', content: 'Main Badla Loonga', },].map(({ username, content }) => (
                          <div>
                            <span className="fw-medium me-3">{username}:</span>
                            <span className="me-3">{content}</span>
                          </div>
                        ))
                      }
                    </>
                  ) : (<span>No replies</span>)
                }
              </div>
              <div className="input-group input-group-md mb-3">
                <input type="text" className="form-control" placeholder="Add your reply here..." value="" />
                <button type="button" className="btn btn-primary disabled">Add</button>
              </div>
            </>
          )
        }
      </div>
    </div>
  );
}

export default Comment;
