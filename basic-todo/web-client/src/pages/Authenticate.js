import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { updateObjProp } from '../utils';
import { LOGIN, LOGIN_API, SIGNUP_API, SIGNUP } from '../constants';

function Authenticate() {
  const navigate = useNavigate();
  const activeTabClasses = 'text-white bg-primary active';

  const [activeTab, setActiveTab] = useState(LOGIN);
  const [requestProcessing, setRequestProcessing] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: ''
  });
  const [signupInfo, setSignupInfo] = useState({
    username: '',
    password: '',
    email: ''
  });

  const updateLoginForm = (k, v) => setLoginInfo(updateObjProp(loginInfo, k, v));
  const updateSignupForm = (k, v) => setSignupInfo(updateObjProp(signupInfo, k, v));
  const isLoginTab = () => activeTab === LOGIN;
  const isSignupTab = () => activeTab === SIGNUP;

  const isFormValid = () => {
    if (isLoginTab()) {
      const { username, password } = loginInfo;
      if (username.length && password.length) return true;
      return false;
    }

    if (isSignupTab()) {
      const { username, password, email } = signupInfo;
      if ((username.length || email.length) && password.length) return true;
      return false;
    }

    return false;
  };

  const shouldDisableButton = () => {
    if (!isFormValid()) return true;
    if (requestProcessing) return true;
    return false;
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    const entryUrl = isLoginTab() ? LOGIN_API : SIGNUP_API;
    const userInfo = isLoginTab() ? loginInfo : signupInfo;
    const headers = isLoginTab() ? {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('auth_token')}`,
    } : {
      "Content-Type": "application/json",
    }

    setRequestProcessing(true);

    fetch(entryUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        user: userInfo,
      }),
    }).then(r => r.json())
      .then(({ status, auth_token }) => {
        setRequestProcessing(false);

        if (status === 'ok') {
          localStorage.setItem('auth_token', auth_token);
          navigate('/blogs');
        } else {
          alert("There's an error");
        }
      }).catch((e) => {
        setRequestProcessing(false);
        alert("There's an error");
      });
  };

  return (
    <div className="container">
      <div className="row">
        <h1 className="text-center my-5">LogMinder</h1>
        <div className="offset-md-4 col-md-4 card pb-3">
          <div className="d-flex mb-3">
            <span
              role="button"
              tabIndex="0"
              className={`w-50 py-3 text-center ${isLoginTab() ? activeTabClasses : ''}`}
              onClick={() => { setActiveTab(LOGIN) }}
            >Login</span>
            <span
              role="button"
              tabIndex="0"
              className={`w-50 py-3 text-center ${isSignupTab() ? activeTabClasses : ''}`}
              onClick={() => { setActiveTab(SIGNUP) }}
            >Sign Up</span>
          </div>
          <div className={`${isLoginTab() ? '' : 'd-none'}`}>
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
              <button
                type="submit"
                onClick={onFormSubmit}
                className={`btn btn-primary w-100 ${shouldDisableButton() ? 'disabled' : ''}`}
              >Log In</button>
            </form>
          </div>
          <div className={`${isSignupTab() ? '' : 'd-none'}`}>
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
              <button
                type="submit"
                onClick={onFormSubmit}
                className={`btn btn-primary w-100 ${shouldDisableButton() ? 'disabled' : ''}`}
              >Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authenticate;
