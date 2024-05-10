import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserByEmail } from '../utils/ApiFunction';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate()

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getUserByEmail(email);
      if (response.password == password  && response.email==email)  {
        setIsSignedIn(true);
        navigate("/existing-salles", { state: { message: "redirecting" } })
      } else {
        setError('Incorrect email ou mot de passe est incorrect. Please try again.');
      }
    } catch (error) {
      setError('Sign in failed. Please check ');
    }
  };

  return (
    <div className="container">
      <h2>Sign In</h2>
      {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={handleChangeEmail}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={handleChangePassword}
              required
            />
          </div>
          <br></br>
          <button type="submit" className="btn button-12">Sign In</button>
        </form>
    </div>
  );
};

export default SignIn;
