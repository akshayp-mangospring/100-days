import { useState } from 'react';
import { ENTER_KEY_CODE } from '../constants';

import CommentItem from './CommentItem';

function Comments({ commentsList, embeddedParent, apiEndPoint }) {
  const [myComment, setMyComment] = useState('');
  const [comments, setComments] = useState(commentsList);

  const addComment = () => {
    fetch(apiEndPoint(embeddedParent.id), {
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

  const handleKeyDown = ({ keyCode }) => {
    if (keyCode === ENTER_KEY_CODE) addComment();
  };

  return (
    <>
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
          <CommentItem
            key={comment.id}
            comment={comment}
            author={author}
            apiEndPoint={apiEndPoint}
            hasEditRights={has_edit_rights}
            embeddedParent={embeddedParent}
            comments={comments}
            setComments={setComments}
          />
        ))) : (
          <span>No Comments</span>
        )}
      </div>
    </>
  )
}

export default Comments;
