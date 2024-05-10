import  { useState } from 'react'
import { registerUser } from '../utils/ApiFunction';


const Register = () => {
    const [userData, setUserData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
  
    const handleChange = (e) => {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await registerUser(userData);
          setSuccessMessage("l'ajout a réussi !");
          setUserData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          }); // Clear all fields
          setError(null); // Clear any previous error message
        } catch (error) {
          setError("Échec de l'enregistrement. Veuillez réessayer"); // Set error message
        }
      };
  
    return (
      <div className="container">
        <h2><br></br></h2>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>
          <br></br>
          <button type="submit" className="btn button-12">Register</button>
        </form>
      </div>
    );
  };
  
  export default Register;