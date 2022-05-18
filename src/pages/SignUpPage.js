import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };
 
    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        console.log("error login account", errorDescription);
        setErrorMessage("Error creating a new account please make sure to provide the correct information");
      })
  };

  
  return (
    <div className="SignupPage">
      <h1>Register</h1>

    { errorMessage && <p className="error-message">{errorMessage}</p> }


      <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input 
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password:</label>
        <input 
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Name:</label>
        <input 
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">Sign Up</button>
      </form>

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  )
}

export default SignupPage;
