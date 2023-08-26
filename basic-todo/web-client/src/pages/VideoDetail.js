import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { VIDEOS_API, VIDEO_COMMENTS_API } from '../constants';

import Comments from '../components/Comments';
import OverlayLoader from '../components/OverlayLoader';

function VideoDetail() {
  const navigate = useNavigate();
  const { videoId } = useParams();

  const [video, setVideo] = useState(null);
  const [videoOwner, setVideoOwner] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoComments, setVideoComments] = useState([]);
  const [hasEditRights, setHasEditRights] = useState(false)
  const videoActionUrl = `${VIDEOS_API}/${videoId}`;

  useEffect(() => {
    fetch(videoActionUrl, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
      },
    })
      .then(r => r.json())
      .then(({ status, video: res, has_edit_rights, owner, url, comments }) => {
        if (status === 'ok') {
          setVideo(res);
          setVideoOwner(owner);
          setVideoUrl(url);
          setVideoComments(comments);
          setHasEditRights(has_edit_rights);
        } else {
          navigate('/');
        }
      }).catch((e) => {
        navigate('/');
      });
  }, [navigate, videoActionUrl]);

  const deleteVideo = () => {
    fetch(videoActionUrl, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
      },
    })
      .then(r => r.json())
      .then(({ status }) => {
        if (status === 'ok') {
          navigate('/videos');
        } else {
          navigate('/');
        }
      }).catch((e) => {
        navigate('/');
      });
  }

  if (!video) return <OverlayLoader />;

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center my-3">
        <h1 className="my-0">{video.title}</h1>
        {
          hasEditRights && (
            <div>
              <NavLink to={`/videos/${videoId}/edit`} className="btn btn-primary">Edit</NavLink>
              <button className="btn btn-danger mx-2" type="button" onClick={deleteVideo}>Delete</button>
            </div>
          )
        }
      </div>
      <div className="border-bottom pb-3 my-3">
        <span className="me-2">
          By: <span className="fw-medium">{videoOwner.username}</span>
        </span>
      </div>
      <p>{video.url}</p>
      <Comments commentsList={videoComments} embeddedParent={video} apiEndPoint={VIDEO_COMMENTS_API} />
    </div>
  );
}

export default VideoDetail;
