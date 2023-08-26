import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { VIDEOS_API, VIDEO_COMMENTS_API } from '../constants';
import { getYoutubeEmbedUrl } from '../utils';

import Comments from '../components/Comments';
import OverlayLoader from '../components/OverlayLoader';

function VideoDetail() {
  const navigate = useNavigate();
  const { videoId } = useParams();

  const [video, setVideo] = useState(null);
  const [videoOwner, setVideoOwner] = useState('');
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
      <div className="card">
        <iframe
          width="100%"
          height="743"
          src={`${getYoutubeEmbedUrl(video.url)}?controls=0`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mt-2 mb-1">
            <h2 className="my-0">{video.title}</h2>
            {
              hasEditRights && (
                <div>
                  <NavLink to={`/videos/${videoId}/edit`} className="btn btn-primary">Edit</NavLink>
                  <button className="btn btn-danger mx-2" type="button" onClick={deleteVideo}>Delete</button>
                </div>
              )
            }
          </div>
          <div className="mb-3">
            <span>
              By: <span className="fw-medium">{videoOwner.username}</span>
            </span>
          </div>
          <div>
            <h5 className="border-bottom pb-2 mb-2">Description</h5>
            <p>{video.description}</p>
          </div>
        </div>
      </div>
      <Comments commentsList={videoComments} embeddedParent={video} apiEndPoint={VIDEO_COMMENTS_API} />
    </div>
  );
}

export default VideoDetail;
