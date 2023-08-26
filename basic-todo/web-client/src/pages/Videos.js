import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { VIDEOS_API } from '../constants';
import { convertToReadableDate } from '../utils';

import CommentIcon from '../components/icons/Comment';

function Video() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState('');

  useEffect(() => {
    fetch(VIDEOS_API, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
      },
    })
      .then(r => r.json())
      .then(({ status, videos: res }) => {
        if (status === 'ok') {
          setVideos(res);
        } else {
          navigate('/');
        }
      }).catch((e) => {
        navigate('/');
      });
  }, [navigate]);

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center border-bottom pb-3 my-3">
        <h1 className="my-0">Latest Videos</h1>
        <NavLink to='/videos/new' className="btn btn-primary">New Video</NavLink>
      </div>
      {
        videos.length ? (
          <ul className="list-unstyled">
            {videos.map(({ video: { id, title, created_at }, owner: { username }, comments }) => {
              return (
                <li className="pb-4 mb-3 border-bottom" key={id}>
                  <NavLink to={`/videos/${id}`} className="d-block fs-2 mb-2 fw-bold">{title}</NavLink>
                  <div className="d-flex align-items-center">
                    <span className="me-3">By: <span className="fw-medium">{username}</span></span>
                    <span className="mx-3">Published: {convertToReadableDate(created_at)}</span>
                    <span className="d-flex align-items-center mx-3">
                      <CommentIcon />
                      <span className="ms-1">{comments} {`${comments === 1 ? 'Comment' : 'Comments'} `}</span>
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        ) : (<>
          <h3 className="text-center">Seems pretty empty here...</h3>
          <h3 className="text-center">Upload some videos to have some fun</h3>
        </>)
      }
    </div>
  );
}

export default Video;
