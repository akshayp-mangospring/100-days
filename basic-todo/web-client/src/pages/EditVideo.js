import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { VIDEOS_API } from '../constants';

import OverlayLoader from '../components/OverlayLoader';

function EditVideo() {
  const navigate = useNavigate();
  const { videoId } = useParams();
  const editVideo = !!videoId;
  const saveUrl = editVideo ? `${VIDEOS_API}/${videoId}` : VIDEOS_API;
  const saveMethod = editVideo ? 'PUT' : 'POST';

  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (editVideo) {
      fetch(saveUrl, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
        },
      })
        .then(r => r.json())
        .then(({ status, video: res }) => {
          if (status === 'ok') {
            setVideo(res);
            setTitle(res.title);
            setDescription(res.description);
            setUrl(res.url);
          } else {
            navigate('/');
          }
        }).catch((e) => {
          navigate('/');
        });
    }
  }, [navigate, editVideo, saveUrl]);

  const saveVideo = () => {
    fetch(saveUrl, {
      method: saveMethod,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
      },
      body: JSON.stringify({
        video: {
          title,
          description,
          url,
        }
      }),
    }).then(r => r.json())
      .then(({ status, video, message, error }) => {
        if (status === 'ok') {
          navigate(`/videos/${video.id}`);
        } else {
        }
      });
  };

  if (editVideo && !video) return <OverlayLoader />;

  return (
    <div className="container">
      <div className="my-5">
        <div className="mb-3">
          <label className="form-label fs-4">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" placeholder="Enter title here..." />
        </div>
        <div className="mb-3">
          <label className="form-label fs-4">Link</label>
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="form-control" placeholder="Enter video link here..." />
        </div>
        <div>
          <label className="form-label fs-4">Description</label>
          <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description here..." rows={20}>{description}</textarea>
        </div>
      </div>
      <button className="btn btn-primary" type="button" onClick={saveVideo}>Save</button>
    </div>
  );
}

export default EditVideo;
