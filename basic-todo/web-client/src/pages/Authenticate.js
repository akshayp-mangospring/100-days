import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { alterObjProp } from '../utils';

function Authenticate() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('login');
  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: ''
  });
  const [signupInfo, setSignupInfo] = useState({
    username: '',
    password: '',
    email_address: ''
  });

  const updateLoginForm = (k, v) => setLoginInfo(alterObjProp(loginInfo, k, v));
  const updateSignupForm = (k, v) => setSignupInfo(alterObjProp(signupInfo, k, v));

  const onFormSubmit = (e) => {
    e.preventDefault();
    navigate('/todos');
  };

  return (
    <div className="container">
      <div className="row">
        <h1 className="text-center my-5">LogMinder</h1>
        <div className="offset-md-4 col-md-4 card pb-3">
          <div className="d-flex mb-3">
            <span
              className={`w-50 py-3 text-center ${activeTab === 'login' && 'text-white bg-primary active'}`}
              onClick={() => { setActiveTab('login') }}
            >Login</span>
            <span
              className={`w-50 py-3 text-center ${activeTab === 'signup' && 'text-white bg-primary active'}`}
              onClick={() => { setActiveTab('signup') }}
            >Sign Up</span>
          </div>
          <div className={`${activeTab === 'login' ? '' : 'd-none'}`}>
            <form>
              <div className="mb-3">
                <label htmlFor="login-email" className="form-label">Username or Email address</label>
                <input
                  type="text"
                  onChange={(e) => updateLoginForm('username', e.target.value)}
                  value={loginInfo.username}
                  className="form-control"
                  id="login-email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="login-password" className="form-label">Password</label>
                <input
                  type="password"
                  onChange={(e) => updateLoginForm('password', e.target.value)}
                  value={loginInfo.password}
                  className="form-control"
                  id="login-password"
                />
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="login-remember" />
                <label className="form-check-label" htmlFor="login-remember">Remember Me</label>
              </div>
              <button type="submit" onClick={onFormSubmit} className="btn btn-primary w-100">Log In</button>
            </form>
          </div>
          <div className={`${activeTab === 'signup' ? '' : 'd-none'}`}>
            <form>
              <div className="mb-3">
                <label htmlFor="signup-email" className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  onChange={(e) => updateSignupForm('email', e.target.value)}
                  id="signup-email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="signup-username" className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => updateSignupForm('username', e.target.value)}
                  id="signup-username"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="signup-password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  onChange={(e) => updateSignupForm('password', e.target.value)}
                  id="signup-password"
                />
              </div>
              <button type="submit" onClick={onFormSubmit} className="btn btn-primary w-100">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authenticate;
