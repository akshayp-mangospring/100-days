import { getCurrentUser } from '../utils';

function EditProfile() {
  const { email, username } = getCurrentUser();

  return (
    <div className="container">
      <div className="my-5">
        <div className="mb-3">
          <label className="form-label fs-4">Email</label>
          <input type="email" readOnly disabled className="form-control" placeholder="Enter email here..." value={email} />
        </div>
        <div className="mb-3">
          <label className="form-label fs-4">Username</label>
          <input type="text" readOnly disabled className="form-control" placeholder="Enter Username here..." value={username} />
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
